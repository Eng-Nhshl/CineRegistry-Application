const express = require("express");

const createRouter = (
  Model,
  requiredFields = [],
  options = { middlewares: [] },
) => {
  const router = express.Router();

  // Apply optional array of middlewares if provided
  if (options.middlewares && options.middlewares.length > 0) {
    router.use(options.middlewares);
  }

  // GET ALL
  router.get("/", async (req, res) => {
    const documents = await Model.find({});
    res.json(documents);
  });

  // GET ONE BY ID
  router.get("/:id", async (req, res) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.json(document);
  });

  // CREATE
  router.post("/", async (req, res) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${missingFields.join(" and ")} ${missingFields.length > 1 ? "are" : "is"} required`,
      });
    }
    const data = req.body;
    const newDocument = new Model(data);

    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  });

  // UPDATE
  router.put("/:id", async (req, res) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `${missingFields.join(" and ")} ${missingFields.length > 1 ? "are" : "is"} required`,
      });
    }

    const document = await Model.findById(req.params.id);
    if (!document) return res.status(404).json({ error: "Resource not found" });

    const updatedDocument = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, context: "query" },
    );

    res.json(updatedDocument);
  });

  // DELETE
  router.delete("/:id", async (req, res) => {
    const document = await Model.findById(req.params.id);
    if (!document) return res.status(404).json({ error: "Resource not found" });

    await Model.findByIdAndDelete(req.params.id);
    res.status(204).end();
  });

  return router;
};

module.exports = createRouter;
