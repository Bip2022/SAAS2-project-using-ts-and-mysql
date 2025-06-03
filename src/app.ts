import expree from 'express';
import authRoute from './routes/globals/auth/auth.route';
const app = expree();

app.use(expree.json());


app.use('/api',authRoute)
export default app;