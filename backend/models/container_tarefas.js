const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
  nomeContainer: { type: String, required: true },
  idUserContainer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  dataContainer: { type: Date, default: Date.now }
});

const Containers = mongoose.model('Containers', containerSchema);

module.exports = Containers;