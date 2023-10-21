require("dotenv").config();
const  API_KEY  = '56ba4a1a3d2544c5a971e27f664cb52f';
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { validateUUID } = require("./utils_validate");
const { Op } = require("sequelize");

// Esta funcion esta planteada para optimizar la obtencion de los datos de la api
// de forma parelala, si se desea testear, comentar la funcion gamesFromAPI y
// descomentar esta funcion, luego, seria necesario comentar la funcion gamesFromAPI
// en el archivo videogame.js de la carpta route, y descomentar las lineas
// comentadas.

async function gamesFromAPI(total, pageSize) {
  try {
    let promises = [];
    let results = [];
    // Armo un arreglo de promesas, para poder obtener 100 resultados
    // ya que de una sola peticion no puedo.
    for (let i = 1, flag = true; total > 0 && flag; i++) {
      if (total - pageSize >= 0) {
        total -= pageSize;
      } else {
        pageSize = total;
        flag = false;
      }
      promises.push(
        axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${pageSize}&page=${i}`
        )
      );
    }

    await Promise.all(promises)
      .then((values) => {
        values.forEach((response) => {
          response.data.results.forEach((game) => {
            results.push({
              id: game.id,
              name: game.name,
              image: game.background_image,
              rating: game.rating,
              genres: game.genres.map((genre) => {
                return {
                  id: genre.id,
                  name: genre.name,
                };
              }),
            });
          });
        });
      })
      .catch((e) => console.log(e));
    return results;
  } catch (e) {
    console.log("Error gamesFromAPI", e);
  }
}

/* Esta funcion obtiene los datos de la api de manera secuencial, una vez obtenido
 * los primeros 20, avanza a la sig pag, y asi hasta alcanzar los 100 requeridos.
 * Es menos eficiente.
 */
// async function gamesFromAPI() {
//   try {
//     let results = [],
//       response;
//     for (let i = 1; i <= 5; i++) {
//       if (i === 1) {
//         response = await axios.get(
//           `https://api.rawg.io/api/games?key=${API_KEY}`
//         );
//       } else {
//         // Avanzo a la sig pag para obtener los 20 resultados sig.
//         response = await axios.get(response.data.next);
//       }
//       response.data.results.forEach((game) => {
//         results.push({
//           id: game.id,
//           name: game.name,
//           image: game.background_image,
//           rating: game.rating,
//           genres: game.genres.map((genre) => {
//             return {
//               id: genre.id,
//               name: genre.name,
//             };
//           }),
//         });
//       });
//     }
//     return results;
//   } catch (e) {
//     console.log("Error gamesFromAPI", e);
//     return [];
//   }
// }

async function gamesFromDB(name, attributes, limit = 100) {
  try {
    // sequelize.where(
    //   sequelize.fn("LOWER", sequelize.col("name")),
    //   "LIKE",
    //   "%" + name.toLowerCase() + "%"
    // )
    return await Videogame.findAll({
      attributes: attributes,

      where: name && {
        name: { [Op.iLike]: `%${name}%` },
      },
      limit: limit,
      include: {
        model: Genre,
        through: {
          attributes: [],
        },
      },
    });
  } catch (e) {
    console.log("Error gamesFromDB", e);
  }
}

async function gamesWithQuery(name, attributes) {
  try {
    // Me traigo los 15 juegos de la api que coincidan con el name pasado,
    // y 15 juegos de la db que coincidan con el name.
    // Uno los resultados (30), y devuelvo los primeros 15 ordenados.
    const gamesDB = await gamesFromDB(name, attributes, 15);
    const gamesAPI = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=15&search=${name}`
    );
    let results = gamesDB.concat(gamesAPI.data.results);
    return results
      .sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      })
      .map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: validateUUID(game.id) ? game.image : game.background_image,
          rating: game.rating,
          genres: game.genres.map((genre) => {
            return {
              id: genre.id,
              name: genre.name,
            };
          }),
        };
      });
  } catch (e) {
    console.log("Error gamesWithQuery", e);
  }
}

async function gameFromDB(id) {
  try {
    const game = await Videogame.findOne({
      include: {
        model: Genre,
        through: {
          attributes: [],
        },
      },
      where: {
        id: id,
      },
    });
    if (game) {
      return {
        id: game.id,
        description: game.description,
        name: game.name,
        image: game.image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.split("&&"),
        genres: game.genres,
      };
    } else {
      return {};
    }
  } catch (e) {
    console.log("Error gameFromDB", e);
  }
}

async function gameFromAPI(id) {
  try {
    const game = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}&`
    );
    if (game.data) {
      return {
        id: game.data.id,
        name: game.data.name,
        description: game.data.description_raw,
        image: game.data.background_image,
        released: game.data.released,
        rating: game.data.rating,
        platforms: game.data.platforms.map((p) => {
          return p.platform.name;
        }),
        genres: game.data.genres.map((genre) => {
          return {
            id: genre.id,
            name: genre.name,
          };
        }),
      };
    } else {
      return {};
    }
  } catch (e) {
    // console.log("Error gameFromAPI", e);
    return {};
  }
}

module.exports = {
  gamesFromAPI,
  gamesFromDB,
  gamesWithQuery,
  gameFromDB,
  gameFromAPI,
};
