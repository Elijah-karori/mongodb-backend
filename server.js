const express =require( "express");
const dotenv =require ("dotenv"); 
const bodyParser =require( "body-parser");
const cors =require("cors");
const dbConnect =require("./config/DB");//import the database connection function
//intiate the express server function
const app =express(); 
const IndexRouter=require('./routes/index')
const AccountRouter= require('./routes/Account')
const ItemsRouter= require('./routes/itemsRoute')
const BidRouter =require('./routes/bids')
//enable to read .env files
dotenv.config() 
//enable to read the request.body data
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//intiate Database connection
dbConnect()

//route the user request and response urls
app.use('/', IndexRouter);
//route the user request and response urls
app.use('/login', AccountRouter);
app.use('/items', ItemsRouter);
app.use('/bid', BidRouter);


//start the server on port 3000
app.listen(3000)

