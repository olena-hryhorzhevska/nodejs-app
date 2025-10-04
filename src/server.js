// src/server.js
import express from 'express';
import cors from 'cors';
// Такий імпорт одразу ініціалізує бібліотеку
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger); // Логування часу запиту
// ❗️Middleware для парсингу JSON
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb', // максимум 100 кілобайт
  }),
);
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(studentsRoutes);
// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);
// Middleware для обробки помилок
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// //❗️ Перший маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello world!' });
// });

// // Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // GET-запит до маршруту "/health"
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'Ok!',
//   });
// });

// // Список усіх користувачів
// app.get('/users', (req, res) => {
//   res.status(200).json([{ id: 1, name: 'Alice' }]);
// });

// // Конкретний користувач за id
// app.get('/users/:userId', (req, res) => {
//   const userId = Number(req.params.userId);
//   res.status(200).json({ id: userId, name: 'Jacob' });
// });

// // ❗️Логування часу
// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// // Маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello, World!' });
// });

// // Маршрут для тестування middleware помилки
// app.get('/test-error', (req, res) => {
//   // Штучна помилка для прикладу
//   throw new Error('Something went wrong');
// });

// // Middleware 404 (після всіх маршрутів)
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Middleware для обробки помилок
// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   res.status(500).json({
//     message: 'Internal Server Error',
//     error: err.message,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const users = [];

// // Маршрут
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello, World!' });
// });

// app.post('/users', (req, res) => {
//   console.log(req.body); // тепер тіло доступне як JS-об’єкт
//   users.push(req.body);
//   res.status(201).json({ message: 'User created', user: req.body });
// });

// app.get('/users', (req, res) => {
//   res.status(200).json({ message: users });
// });
