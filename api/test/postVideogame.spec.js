const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../src/app.js');
const { conn, Videogame } = require('../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    beforeEach(async () => {
      await Videogame.sync({ force: true });
      // Llamar a la función seedGenres antes de cada prueba
      await seedGenres();
    });

    const seedGenres = async () => {
      const response = await agent.get('/genres').expect(200);
      return response.body;
    };

  describe('POST /videogame', () => {
    it('should create a videogame with the required properties', async () => {
      const videogameData = {
        id: 1800001,
        nombre: 'Super Mario Bros',
        imagen: 'https://www.elpais.com.co/resizer/mBPF0ANIhK9C8OBjoh-0-3RA_5c=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/ES4YNNALTVAY3I5RENIXL5WIQI.jpg',
        generos:   [{ id: 4, name: 'Action' },
        { id: 51, name: 'Indie' }],
        fecha_lanzamiento: '22/8/23',
        rating: 3.5,
        plataformas: ['PC'],
        descripcion: 'descripcion...'
      };;

      const response = await agent.post('/videogame').send(videogameData).expect(200);

      // Assuming the API responds with the created videogame in the response body
      const createdVideogame = response.body;

      expect(createdVideogame).to.have.property('id');
      expect(createdVideogame).to.have.property('nombre', 'Super Mario Bros');
      expect(createdVideogame).to.have.property('imagen', 'https://www.elpais.com.co/resizer/mBPF0ANIhK9C8OBjoh-0-3RA_5c=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/ES4YNNALTVAY3I5RENIXL5WIQI.jpg');
      expect(createdVideogame).to.have.property('genres').to.deep.equal(['Action', 'Indie']);
      // Add more assertions for other properties if needed
    });

    it('should return 404 if required properties are missing', async () => {
      const invalidVideogameData = {
        // Missing required properties
      };

      const response = await agent.post('/videogame').send(invalidVideogameData).expect(404);

      expect(response.body).to.have.property('error');
      // Add more assertions if needed for the error response
    });

    it('should return 404 if videogame already exists', async () => {
      const existingVideogameData = {
        id: 1800001,
        nombre: 'Super Mario Bros',
        imagen: 'https://www.elpais.com.co/resizer/mBPF0ANIhK9C8OBjoh-0-3RA_5c=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/ES4YNNALTVAY3I5RENIXL5WIQI.jpg',
        generos: [{ id: 4, name: 'Action' },
        { id: 51, name: 'Indie' }],
        fecha_lanzamiento: '22/8/23',
        rating: 3.5,
        plataformas: ['PC'],
        descripcion: 'descripcion...'
      };

      // Create an existing videogame in the database before making the request
      await Videogame.create(existingVideogameData);

      const response = await agent.post('/videogame').send(existingVideogameData).expect(404);

      expect(response.body).to.have.property('error');
      // Add more assertions if needed for the error response
    });
  });
});
