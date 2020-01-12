# API REST de blogs ejemplo
* [link de heroku](https://blogs-server-example.herokuapp.com/)
**Servidor para un blogs utilizando:** 
* Nodejs 
* Express.js
* Cloudinary *como almacén de imágenes*.
* JWT *para autentificación*.

### Utilizar 
* descargar
* npm install
* npm run dev

### Variables de entorno
**crear un archivo .env (en la misma dirección de readme.md) y agregar estar variables**

* MONGODB_URI = *link de la base de datos de mongo atlas*
* CLOUDINARY_CLOUD_NAME = *usuario de cloudinary*
* CLOUDINARY_API_KEY = *api key de cloudinary*
* CLOUDINARY_API_SECRET = *api secret de cloudinary*
* SECRET_KEY= *clave secreta para JWT*
* PASSWORD_EMAIL = *pass para email*
