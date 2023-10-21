<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Videogames

<p align="center">
  <img style="border-radius: 5px; -webkit-box-shadow: 0px 0px 7px 0px #000000;
  box-shadow: 0px 0px 7px 0px #000000;" height="250" src="./imgs/start-screen.png" />
</p>

## Descripción

<p>Este es el proyecto individual realizado durante la etapa de Labs de <strong>Henry.</strong> Es una SPA (Single Page Application), en la que se utiliza React, Redux, Express, una base de datos con ProgreSQL y una API (<a href="https://rawg.io/">rawg</a>) para obtener la info en la web principalmente. En la app se pueden hacer consultas a la API externa y a la DB, crear videogames, filtrar por género y pertenencia, tambien se le puede aplicar un ordenamiento, tanto alfabético como por rating.</p>

## Dependencias y programas usados

<p>Durante el proyecto, se usaron las sigs tecnologías:</p>

- Node v12.21.0
- Npm v7.20.3
- PSQL v13.4
- Express v4.17.1
- Sequelize v6.3.5
- Firefox 93.0
- Brave 1.30.87

<p>Y muchas más dependencias, consultar los package.json de la ruta <strong>/api</strong> y <strong>/client.</strong> </p>

## Instrucciones para utilizar el proyecto

- Clonar o forkear el repositorio
- Obtener una api-key desde <a href="https://rawg.io/">rawg</a>

### <u>Configurando la DB</u>

Crear un archivo <strong>.env</strong> en la carpeta <strong>/api</strong> con los sigs parámetros:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
API_KEY=api-key
```

Reemplazar usuariodepostgres y passwordDePostgres con tus propias credenciales para conectarte a postgres, y colocar en API_KEY la api creada anteriormente.

Debe ser necesario crear la DATABASE <strong>Videogames</strong> en ProgreSQL.

Una vez realizado, ya puede realizar <strong> npm install </strong> en la carpeta <strong>API</strong>, para que se instalen todas las dependencias necesarias.

Para poner en línea el servidor, ejecutar <strong>npm start</strong> .

### <u>Configurando el Front</u>

Para el front no se requieren de configuraciones adicionales. Ejecutar <strong>npm install</strong> en la carpeta <strong>Cliente</strong> y luego <strong>npm start</strong> para poner en línea el servidor web.

<br />

## Presentación y funcionalidades

### <u>Home</u>

<img  style="border-radius: 5px;" src="./imgs/home.gif"/>

Pantalla principal de la app. Se muestran los primeros 100 resultados que devuelve la api externa, junto con los primeros 100 videogames que se encuentren en la base de datos. Incluye una navbar con una barra de búsqueda y un botón que redirige a la web de creación de un videogame. También, una barra lateral, con la posibilidad de aplicar filtros, tanto a los resultados por default, como a los resultados de la búsqueda.

<br />

### <u>Create</u>

<img  style="border-radius: 5px;" src="./imgs/create.gif"/>

Pantalla de creación de un videogame. Un formulario controlado, en donde los campos Name, Description, Genres y Platforms son requeridos, el resto de campos no son obligatorios. Luego de la creación, sale un pequeño Popup indicando el resultado de la creación.

<br />

### <u>Game detail</u>

<img  style="border-radius: 5px;" src="./imgs/detail.gif"/>

Pantalla de detalle de un videogame. Se muestran más detalles que en la pantalla principal, como la descripción del mismo, la foto en mayor resolución, fecha de lanzamiento y otros datos.

<br />

### <u>Search</u>

<img  style="border-radius: 5px;" src="./imgs/search.gif"/>

Funcionalidad de búsqueda. Devuelve los primeros 15 resultados que contengan el nombre buscado. Los 15 resultados devueltos incluyen aquellos juegos que se encuentren en la DB, ej, si se busca la palabra "Fifa", va a buscar 15 resultados en la api, 15 resultados en la DB, y el resultado final, será la unión de esos 15 resultados ordenados alfabéticamente. Se pueden aplicar los filtros a la búsqueda. Para reiniciar, se puede utilizar el botón reset.

<br />

### <u>Filters</u>

<img  style="border-radius: 5px;" src="./imgs/filters.gif"/>

Funcionalidad de filtros. Se puede filtrar por Género de videogame, por pertenencia (DB o API), y aplicar un ordenamiento, sea Alfabético (A-Z o Z-A) o por Rating.

<br />

### <u>Pages</u>

<img  style="border-radius: 5px;" src="./imgs/pages.gif"/>

Funcionalidad de paginado. Es posible avanzar por páginas, tanto para mostrar todos los resultados, como para mostrar los filtros. La cantidad de juegos por páginas es de 15.

<br />

### <u>Responsive</u>

<img  style="border-radius: 5px;" src="./imgs/responsive.gif"/>

La web esta configurada para funcionar responsivamente.
