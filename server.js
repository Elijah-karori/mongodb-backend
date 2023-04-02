const express =require( "express");// library for create server
const dotenv =require ("dotenv"); // library for read .env files
const bodyParser =require( "body-parser");// library for req.body
const cors =require("cors");// library for prevent google cross script attack
const dbConnect =require("./config/DB");//import the database connection function
//intiate the express server function
const app =express(); //express framework for server intialization

const AccountRouter= require('./routes/Account')//login or register route
const ItemsRouter= require('./routes/itemsRoute')//items routes
const BidRouter =require('./routes/bids')//auctions routes
//enable to read .env files
dotenv.config() 
//enable to read the request.body data
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//intiate Database connection
dbConnect()

//route the user request and response urls
app.use('/login', AccountRouter);
app.use('/items', ItemsRouter);
app.use('/bid', BidRouter);//auction route


//start the server on port 3000
app.listen(3000)

