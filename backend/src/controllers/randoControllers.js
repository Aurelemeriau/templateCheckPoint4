// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const beers = await tables.rando.readAll();

    res.json(beers);
  } catch (err) {
    next(err);
  }
};

const getRandoByUser = async (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  const userId = req.params.userId;

  try {
    // Utilisez l'ID de la bière pour récupérer les commentaires associés
    const posts = await tables.rando.getRandoByUser(userId);
    if (posts == null) {
      res.sendStatus(404);
    } else {
      res.json(posts);
    }
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const rando = await tables.rando.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (rando == null) {
      res.sendStatus(404);
    } else {
      res.json(rando);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// eslint-disable-next-line consistent-return
const edit = async (req, res, next) => {
  const { id } = req.params;
  req.body.id = id;
  try {
    const result = await tables.rando.update(req.body);
    if (result) {
      res.json(result);
      res.status(204);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const rando = req.body;

  try {
    // Insert the item into the database
    // console.log(req.body);
    // console.log("req.file", req.file);

    const insertId = await tables.rando.create(rando);
    if (insertId.insertId) {
      const newrando = {
        userId: rando.userId,
        id: insertId.insertId,
        title: rando.title,
        categorie: rando.categorie,
        description: rando.description,
        distance: rando.distance,
        imageUrl: rando.url,
      };
      res.status(201).json({ newrando });
      // console.log(newrando);
    }

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await tables.rando.delete(id);
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getRandoByUser,
};
