const mysql = require("mysql2/promise");
const dbConfig = require("../../config/db");

class BaseRepository {
  constructor(table) {
    this.table = table;
  }

  async executeQuery(query, values) {
    const connection = await mysql.createConnection(dbConfig);

    try {
      const [results] = await connection.execute(query, values);
      return results;
    } finally {
      // Ensure the connection is always released
      connection.end();
    }
  }

  async findOneByField(fieldName, value) {
    try {
      const query = `SELECT * FROM ${this.table} WHERE ${fieldName} = ? LIMIT 1`;
      console.log("SQL Query:", query);
      const [result] = await this.executeQuery(query, [value]);
      console.log(result);
      return result[0];
    } catch (error) {
      console.error("Error in findOneByField:", error);
      throw error;
    }
  }

  async insert(data) {
    const fields = Object.keys(data).join(", ");
    const placeholders = Object.values(data)
      .map(() => "?")
      .join(", ");
    const values = Object.values(data);
    const query = `INSERT INTO ${this.table} (${fields}) VALUES (${placeholders})`;
    await this.executeQuery(query, values);
  }

  async updateByField(fieldName, value, data) {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(data), value];
    const query = `UPDATE ${this.table} SET ${setClause} WHERE ${fieldName} = ?`;
    await this.executeQuery(query, values);
  }
}

module.exports = BaseRepository;
