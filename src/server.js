import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';


const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
  .then(()=> console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));
});
