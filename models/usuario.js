const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  peso: Number,
  altura: Number
});

module.exports = mongoose.model('Usuario', usuarioSchema);
