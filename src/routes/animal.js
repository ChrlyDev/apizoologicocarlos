const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../models/animal");

//Nuevo animal
router.post("/create-animals", (req, res) => {
  const animal = animalSchema(req.body);
  animal
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal por id
router.get("/find-animals/:id", (req, res) => {
  const { id } = req.params;
  animalSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Consultar un animal por nombre
router.get("/find-name-animals/:nombre", (req, res) => {
  const { nombre } = req.params;

  animalSchema
    .findOne({ nombre })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

//Consultar todos los animales
router.get("/find-all-animals", (req, res) => {
  try {
    const animals = animalSchema.find();
    res.json(animals);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Modificar un animal por id
router.put("/update-animals/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, edad, tipo, fecha } = req.body;

  animalSchema
    .updateOne({ _id: id }, { $set: { nombre, edad, tipo, fecha } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar un animal por id
router.delete("/delete-animals/:id", (req, res) => {
  const { id } = req.params;
  animalSchema
    .findByIdAndDelete(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
