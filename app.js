const express = require("express");
const checklistRouter = require("./src/routes/checklist");
const path = require("path");
const taskRouter = require("./src/routes/task");



const rootRouter = require("./src/routes/index");

const methodOverride = require('method-override')
require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET']}))

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklist", checklistRouter);
app.use('/checklist', taskRouter.checklistDependent)
app.use('/tasks', taskRouter.simple)

app.listen(process.env.PORT, () => {
  console.log("Servidor ativo!");    
}); 
