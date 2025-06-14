import express from 'express';
import authRoute from './routes/globals/auth/auth.route';
import instituteRoute from './routes/institute/institute.route';
// import teacherRoute from './routes/teacher/teacher.route';
const app = express();


app.use(express.json());


app.use('/api',authRoute)
app.use('/api/institute', instituteRoute);
// app.use('/api/teacher', teacherRoute);

export default app;