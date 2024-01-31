const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connect to MongoDB Database ${mongoose.connection.host}`.bgMagenta.white
    );
  } catch (err) {
    console.log(`MongoDB Connection Error ${err}`.bgRed.white);
  }
};

module.exports = connectDB;
