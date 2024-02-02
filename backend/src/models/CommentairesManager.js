const AbstractManager = require("./AbstractManager");

class CommentairesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "commentaires" });
  }

  // The C of CRUD - Create operation

  async create({ description, randoId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (description, randoId) VALUES (?, ?)`,
      [description, randoId]
    );
    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [comments] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return comments;
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update({ description, id }) {
    // Execute the SQL UPDATE query to update a item to the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET description=? WHERE id=?`,
      [description, id]
    );

    // Return the ID of the newly inserted item
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async getCommentsForRando(randoId) {
    const [comments] = await this.database.query(
      `SELECT * FROM commentaires WHERE randoId = ?`,
      [randoId]
    );
    return comments;
  }
}

module.exports = CommentairesManager;
