import express from 'express';
import authRoute from './routes/globals/auth/auth.route';
import instituteRoute from './routes/institute/institute.route';
import courseRoute from './routes/institute/course/course.route';
import studentRoute from './routes/institute/student/student.route'
import categoryRoute from './routes/institute/category/category.route'

const app = express();


app.use(express.json());


app.use('/api',authRoute)
app.use('/api/institute', instituteRoute);
app.use('/api/institute/course',courseRoute)
app.use('/api/institute/student', studentRoute)
app.use('/api/institute/category', categoryRoute)
// app.use('/api/teacher', teacherRoute);

export default app;