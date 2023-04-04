const express =require( "express");// library for create server
const dotenv =require ("dotenv"); // library for read .env files
const bodyParser =require( "body-parser");// library for req.body
const cors =require("cors");// library for prevent google cross script attack
const ejs =require('ejs')
const cookieParser = require('cookie-parser');



const dbConnect =require("./config/DB");//import the database connection function
//intiate the express server function
const app =express(); //express framework for server intialization

const AccountRouter= require('./routes/Account')//login or register route
const ItemsRouter= require('./routes/itemsRoute')//items routes
const BidRouter =require('./routes/bids')//auctions routes
const AdminRouter=require('./routes/default')
//enable to read .env files
dotenv.config() 
//enable to read the request.body data
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static('public'));
//intiate Database connection
dbConnect()

//route the user request and response urls
app.use('/login', AccountRouter);// user login and register route
app.use('/items', ItemsRouter);//items route
app.use('/bid', BidRouter);//auction route
app.use('/admin', AdminRouter);

//start the server on port 3000
app.listen(80)

