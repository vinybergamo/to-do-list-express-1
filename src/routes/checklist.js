const express = require("express");
const mongoose = require('mongoose');
const { populate } = require("../models/checklist");
const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    let checklist = await Checklist.find({});
    res.status(200).render("checklist/index", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklist/new", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { errors: "Erro ao carregar o formulario" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklist/edit", { checklist: checklist });
  } catch (error) {
    res
      .status(500)
      .render("pages/error", {
        error: "Erro ao exibir a edição de listas de tarefa",
      });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });

  try {
    await checklist.save();
    res.redirect("/checklist");
  } catch (error) {
    res
      .status(422)
      .render("checklist/new", { checklist: { ...checklist, error } });
  }
});


router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks')
    res.status(200).render("checklist/show", { checklist: checklist })
  } catch (error) {
    console.log(error)  
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir a lista de tarefa" });
  }
});




router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    await checklist.update({ name });
    res.redirect("/checklist");
  } catch (error) {
    let errors = error.errors;
    res
      .status(422)
      .render("checklist/edit", { checklist: { ...checklist, errors } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect("/checklist");
  } catch (error) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao deletar a lista de tarefa" });
  }
});

module.exports = router;
