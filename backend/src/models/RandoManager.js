const AbstractManager = require("./AbstractManager");

class RandoManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "rando" });
  }

  // The C of CRUD - Create operation

  async create({ userId, title, categorie, description, distance, url }) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    // console.log("userId:", userId);
    const [result] = await this.database.query(
      `insert into ${this.table} (title, categorie, description, distance, imageUrl, userId) values (?, ?, ?, ?, ?, ?)`,
      [title, categorie, description, distance, url, userId]
    );
    // Return the ID of the newly inserted item
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

  async getRandoByUser(userId) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      // `SELECT * FROM ${this.table} JOIN user ON ${this.table}.userId = user.id JOIN beer ON ${this.table}.beerId = beer.id WHERE userId = ?`,
      `SELECT * FROM ${this.table} WHERE userId = ?`,

      [userId]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [randos] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return randos;
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update({ title, categorie, description, distance, id }) {
    // Execute the SQL UPDATE query to update a item to the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title=?, categorie=?, description=?, distance=? WHERE id=?`,
      [title, categorie, description, distance, id]
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
}

module.exports = RandoManager;
