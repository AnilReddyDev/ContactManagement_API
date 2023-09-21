const express = require('express');
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const errorHandler = require('./middleware/errorhandler')
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
app.use(express.json())
app.use("/api/contacts", require("./Routes/contactRoutes"))
app.use(errorHandler)
