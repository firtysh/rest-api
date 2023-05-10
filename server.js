import { config } from 'dotenv';
import app from './app.js';

config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
