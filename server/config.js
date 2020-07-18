const path = require('path');

const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/cafe';
let port = 8000;

if (env === 'test') {
  database = 'mongodb://localhost/cafe-test';
  port = 8010;
}

module.exports = {
  port,
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  database,
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};
