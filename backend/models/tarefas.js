const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
  idContainerTarefas: { type: mongoose.Schema.Types.ObjectId, ref: 'Container', required: true },
  idUserTarefas: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  descricaoTarefas: { type: String, required: true },
  conclusaoTarefas: { type: Boolean, required: true, default: false },
  dataTarefas: { type: Date, default: Date.now }
});

const Tarefas = mongoose.model('Tarefas', tarefasSchema);

module.exports = Tarefas;