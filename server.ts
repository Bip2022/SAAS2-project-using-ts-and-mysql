import app from './src/app'
import { envConfig } from './src/config/config';


//database connection import 
import './src/database/connection';

function startServer() {
  const PORT = envConfig.portNumber;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
