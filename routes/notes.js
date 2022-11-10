var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const { Notes } = require("../models");

// READ GET ALL DATA
router.get("/", async (request, response, next) => {
  const notes = await Notes.findAll();
  return response.json({
    status: 200,
    message: "Success get all data",
    data: notes,
  });
});

// READ GET DATA BY ID
router.get("/:id", async (request, response, next) => {
  // check id in table note
  let note = await Notes.findByPk(request.params.id);
  if (note.id <= 0) {
    return response.status(404).json({ status: 404, message: "Data not found" });
  } else {
    return response.json({ status: 200, message: "Success get data", data: note });
  }
});

// CREATE
router.post("/", async (request, response, next) => {
  //validation
  const schema = {
    title: "string",
    description: "string|optional",
  };
  const validate = v.validate(request.body, schema);
  if (validate.length <=0 ) {
    return response.status(400).json(validate);
  }
  // proses create
  const note = await Notes.create(request.body);
  res.json({
    status: 200,
    message: "Created Successfully",
    data: note,
  });
});

// UPDATE
router.put("/:id", async (request, response, next) => {
  //const id = req.params.id;
  let note = await Notes.findByPk(request.params.id);
  if (note.id <= 0) {
    return response.status(404).json({ status: 404, message: "Data not found" });
  }
  // validation
  const schema = {
    title: "string|optional",
    description: "string|optional",
  };
  const validasi = v.validate(request.body, schema);
  if (validasi.length <= 0) {
    return response.status(400).json(validate);
  }
  // proses update
  note = await note.update(request.body);
  response.json({
    status: 200,
    message: "Update Successfully",
    data: note,
  });
});

// DELETE
router.delete("/:id", async (request, response, next) => {
  // check id in table note
  let note = await Notes.findByPk(request.params.id);
  if (note.id <= 0) {
    return response.status(404).json({ status: 404, message: "Data not found" });
  }
  // proses delete data
  await note.destroy();
  response.json({
    status: 200,
    message: "Delete Successfully",
  });
});

module.exports = router;
