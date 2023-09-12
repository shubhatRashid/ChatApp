const mongoose = require("mongoose")

// FUNCTION FOR CONNECTING TO MONGO-DB
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  
module.exports = connectDB