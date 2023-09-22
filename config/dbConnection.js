const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "DB Conntecion is success! ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(`Db failed to connect ! ${error.message}`)
    process.exit(1);
  }
};

module.exports = connectDb;