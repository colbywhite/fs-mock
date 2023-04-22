import dotenv from 'dotenv';
dotenv.config();

function doWork(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

console.log('Hello, world!', 'Starting work.');
doWork()
  .then(() => console.log('All done.', 'Good bye, world!'))
