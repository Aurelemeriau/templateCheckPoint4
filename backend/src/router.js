const express = require("express");

const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const multer = require("multer");

const options = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    // eslint-disable-next-line prefer-template
    const name = uuidv4() + "." + extension;
    req.body.url = name;
    cb(null, name);
  },
  limits: {
    fieldSize: 1024 * 5,
  },
});

const { hashPassword, verifyToken } = require("./services/auth");

const upload = multer({
  storage: options,
});

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const randoControllers = require("./controllers/randoControllers");
const commentairesControllers = require("./controllers/commentairesControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.get("/randos/:userId", randoControllers.getRandoByUser);
router.get("/randos", randoControllers.browse);
router.get("/comments", commentairesControllers.browse);
router.get(
  "/randos/:randoId/comments",
  commentairesControllers.getCommentsForRando
);
router.get("/randos/:id", randoControllers.read);
router.get("/comments/:id", commentairesControllers.read);

router.put("/randos/:id", randoControllers.edit);
router.put("/comments", commentairesControllers.edit);

router.post("/users", hashPassword, userControllers.add);
router.post("/randos", upload.single("image"), randoControllers.add);
router.post("/comments", commentairesControllers.add);
router.post("/randos/:randoId/comments", commentairesControllers.add);
router.post("/login", authControllers.login);

router.delete("/randos/:id", randoControllers.destroy);
router.delete("/comments", commentairesControllers.destroy);

// Authentication wall
router.use(verifyToken);

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */

module.exports = router;
