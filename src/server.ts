import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('MongoDB is alive');

    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
