const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://castro013:Guii098123@cluster0.df1nkj2.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("Conectado ao mongoDB")).catch((err) => console.log(err));
