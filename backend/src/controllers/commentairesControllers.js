// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const comments = await tables.commentaires.readAll();

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const getCommentsForRando = async (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  const randoId = req.params.randoId;

  try {
    // Utilisez l'ID de la bière pour récupérer les commentaires associés
    const comments = await tables.commentaires.getCommentsForRando(randoId);
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const comment = await tables.commentaires.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.json(comment);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const edit = async (req, res, next) => {
  const { id } = req.params;
  req.body.id = id;
  try {
    const result = await tables.commentaires.update(req.body);
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
// const add = async (req, res, next) => {
//   // Extract the item data from the request body
//   const comment = req.body;

//   try {
//     // Insert the item into the database
//     console.log(req.body.url);
//     console.log("req.file", req.file);

//     const insertId = await tables.commentaires.create(comment);
//     if (insertId.insertId) {
//       const newcomment = {
//         id: insertId.insertId,

//         description: comment.description,
//       };
//       res.status(201).json({ newcomment });
//       console.log(newcomment);
//     }

//     // Respond with HTTP 201 (Created) and the ID of the newly inserted item
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

const add = async (req, res, next) => {
  const comment = req.body;
  // eslint-disable-next-line prefer-destructuring
  const randoId = req.params.randoId;

  try {
    // Utilisez l'ID de la bière dans votre logique pour ajouter le commentaire
    const insertId = await tables.commentaires.create({
      ...comment,
      randoId,
    });

    if (insertId.insertId) {
      const newcomment = {
        id: insertId.insertId,
        description: comment.description,
      };
      res.status(201).json({ newcomment });
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await tables.commentaires.delete(id);
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
  getCommentsForRando,
};
