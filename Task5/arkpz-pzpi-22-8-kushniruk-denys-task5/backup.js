const backup = require('mongodb-backup');
require('dotenv').config();

const uri = process.env.CONNECT_URL_MONGODB;
const backupPath = './backup';

backup({
  uri: uri,
  root: backupPath,
  callback: (err) => {
    if (err) {
      console.error('Помилка під час резервного копіювання:', err);
    } else {
      console.log('Резервне копіювання успішно завершено!');
    }
  }
});
