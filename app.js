const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('./models/usuario');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mi_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para mostrar el formulario de cálculo de IMC
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para calcular el IMC
app.post('/calcular', async (req, res) => {
  const { nombre, peso, altura } = req.body;
  const imc = (peso / (altura * altura)).toFixed(2);

  // Guardar el usuario en la base de datos
  await Usuario.create({ nombre, peso, altura });

  res.render('resultado', { usuario: { nombre, peso, altura }, imc });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución ${PORT}`);
});
