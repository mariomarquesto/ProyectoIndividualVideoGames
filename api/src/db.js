require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;


const sequelize = new Sequelize({
  database: "proyectoindividual", // Nombre de la base de datos
  username: "postgres",  // Nombre de usuario de la base de datos
  password: "mario123",  // Contraseña de la base de datos
  host: "localhost",     // Host de la base de datos
  dialect: "postgres",   // Tipo de base de datos (PostgreSQL en este caso)
  port: 5433,            // Puerto de la base de datos
  logging: false,        // Desactivar la salida de registros SQL en la consola
});


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre, Platform } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, { through: "game_genre" });
Genre.belongsToMany(Videogame, { through: "game_genre" });

// Alternativa a platforms como columna
// ====================================
// Relacion n <==> m entre videogame y platform, ya que un juego puede
// pertener a varias plataformas, y una plataforma puede tener varios juegos.
// Videogame.belongsToMany(Platform, { through: "game_platform" });
// Platform.belongsToMany(Videogame, { through: "game_platform" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
