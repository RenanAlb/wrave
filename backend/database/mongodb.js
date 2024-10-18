const mongoose = require('mongoose');

const connectToDataBase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@wrave.ue7jy.mongodb.net/?retryWrites=true&w=majority&appName=Wrave`);
    console.log('Conectado ao MongoDB!');
  } catch(error) {
    console.error(error);
  }
};

module.exports = connectToDataBase;