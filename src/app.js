const express = require('express');
const exphbs = require("express-handlebars");
const morgan = require('morgan');
const multer = require('multer')
const path = require('path')
const cors = require('cors')

// Initializations
const app = express();
require('./database');
app.use(cors())


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const storage = multer.diskStorage({
  destination:path.join(__dirname,'public/uploads'),
  filename:(req,file,cb) => {
    cb(null,new Date().getTime() + path.extname(file.originalname))
  }
})
// console.log(storage);

app.use(multer({storage}).single('file'))
// para q lo te salga fallas al enviar 



// routes
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/category', require('./routes/category'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/send-email', require('./routes/sendEmail'))

// static files
app.get("/", function(req, res) {
  res.render("home");
});
// app.get("/", function(req, res) {
//   res.send("Hola Mundo!");
// });
// app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;


