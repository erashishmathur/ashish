/**@format */
const express = require("express");
const dotenv = require("dotenv");
const error = require("./middleware/errorMiddlewareHandler");
const usersRoute = require("./routes/usersRoute");
const {
  errorMiddlewareHandler,
} = require("./middleware/errorMiddlewareHandler");
const bookRouter = require("./routes/bookRoute");
const cors = require('cors');

//dotenv configuration
dotenv.config();
require("./config/dbConnect")();
//Express
const app = express();

//Passing body data
app.use(express.json());

const corsOptions = {
  origin: '*', // Allow all origins to access the API
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions))

//Routes
//Users
app.use("/api/users", usersRoute);

//Book
app.use("/api/books", bookRouter);
// console.log(process.env.MY_NAME);
//Error middleware
app.use(error.errorMiddlewareHandler);
//Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is up and running ${PORT}`);
});


