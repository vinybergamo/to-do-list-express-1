require('dotenv').config()
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("Conectado ao mongoDB")).catch((err) => console.log(err));
