// src/controllers/studentsController.js

import { Student } from '../models/student.js';
import createHttpError from 'http-errors';

export const getStudents = async (req, res) => {
  // Отримуємо пара метри пагінації
  const {
    page = 1,
    perPage = 10,
    gender,
    minAvgMark,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;
  const skip = (page - 1) * perPage;

  // Додаємо критерій пошуку тільки студентів поточного користувача
  const studentsQuery = Student.find({ userId: req.user._id });

  if (search) {
    studentsQuery.where({
      $text: { $search: search },
      // name: { $regex: search, $options: 'i' },
    });
  }

  if (gender) {
    studentsQuery.where('gender').equals(gender);
  }
  if (minAvgMark) {
    studentsQuery.where('avgMark').gte(minAvgMark);
  }

  // Виконуємо одразу два запити паралельно
  const [totalItems, students] = await Promise.all([
    studentsQuery.clone().countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      }),
  ]);

  // Обчислюємо загальну кількість «сторінок»
  const totalPages = Math.ceil(totalItems / perPage);
  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    students,
  });
};

export const getStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findOne({
    _id: studentId,
    userId: req.user._id,
  });

  // if (!student) {
  //   return res.status(404).json({ message: 'Student not found' });
  // }

  // Додаємо базову обробку помилки замість res.status(404)
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  const student = await Student.create({
    ...req.body,
    // Додаємо властивість userId
    userId: req.user._id,
  });
  res.status(201).json(student);
};

export const deleteStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({
    _id: studentId,
    userId: req.user._id,
  });

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(200).send(student);
};

export const updateStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndUpdate(
    // Критерій пошуку по userId
    { _id: studentId, userId: req.user._id },
    req.body,
    { new: true },
  );

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(200).json(student);
};
