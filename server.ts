import app from './src/app.ts'
import { envConfig } from './src/config/config.ts';


function startServer() {
  const PORT = envConfig.portNumber;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
