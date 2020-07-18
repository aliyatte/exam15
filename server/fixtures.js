const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Place = require('./models/Place');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
  }, {
    username: 'admin',
    password: '123',
    role: 'admin',
    token: nanoid(),
  });

  await Place.create({
    name: 'Burger House',
    user: user,
    description: 'Some nice place',
    image: 'uploads/fixtures/hh.jpg',
  }, {
    name: 'Cafe de Paris',
    user: user,
    description: 'Comfortable place',
    image: 'uploads/fixtures/paris.jpeg',
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});