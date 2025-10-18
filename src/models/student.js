// src/models/student.js

import { Schema } from 'mongoose';
import { model } from 'mongoose';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    avgMark: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Додаємо текстовий індекс: кажемо MongoDB, що по полю name можна робити $text
studentSchema.index(
  { name: 'text' },
  {
    name: 'StudentTextIndex',
    weights: { name: 10 },
    default_language: 'none',
  },
);

export const Student = model('Student', studentSchema);
