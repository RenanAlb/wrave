const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true }
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;