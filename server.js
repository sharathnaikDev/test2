const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error')

//Route Files
const awards = require('./routes/Awards.routes');
const careers = require('./routes/Careers.routes')
const auth = require('./routes/auth.routes');
const users = require('./routes/users.routes');
const news = require('./routes/News.router');

// load env vars
dotenv.config();



connectDB();
const app = express();

const corsOptions = {
    methods: 'GET,POST,PATCH,DELETE,PUT',
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors(corsOptions));

//body parser
app.use(express.json());

app.use(express.urlencoded({extended: true}))

//Cookie Parser

app.use(cookieParser());

// Mount routers
app.use('/api/v1/awards', awards);
app.use('/api/v1/careers', careers);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/news', news);

//Custom  error Handler
app.use(errorHandler);

//Dev logging middleware
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


//  app.use('/', (req, res, next) => {
//     res.send('api is running')
// })

const PORT = process.env.PORT || 5000;
const server =  app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} on port 5000`))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1))
})