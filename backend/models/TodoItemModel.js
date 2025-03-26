// This file will contain the database interactions for todoItemItems.
const Model = require("./Model");

class TodoItemModel extends Model {
  constructor(at) {
    super(at);
  }

  async get_todoItems(id) {
    const response = await this.atomic_query(
    `SELECT "Todo_Items".id, "Todo_Items".item_id, "Todo_Items".item_text, "Todo_Items".item_done
    FROM "Todo_Items"
    JOIN "Items" ON "Todo_Items".item_id = "Items".id
    WHERE "Items".owner_id = $1
    ORDER BY "Todo_Items".id`
    , [owner_id]);
    return response.rows;
  }
  async add_todoItem(item_id, item_text) {
    const response = this.atomic_query(
      `INSERT INTO "Todo_Items" (item_id, item_text, item_done)
        VALUES ($1, $2, FALSE) RETURNING *`,
      [item_id, item_text],
      "add todo item failed"
    );
    return response.rows;
  }
  async update_todoItem(id, item_text, item_done) {
    const response = this.atomic_query(
      `UPDATE "Todo_Items" 
        SET item_text =  $2, item_done = $3
        WHERE id = $1
        RETURNING *`,
      [id, item_text, item_done],
      "add todo item failed"
    );
    return response.rows;
  }
  async delete_todoItem(item_id, id) {
    const response = this.atomic_query(
      `DELETE FROM "Todo_Items" 
        WHERE item_id = $1 AND id = $2
        RETURNING *`,
      [item_id, id],
      "add todo item failed"
    );
    return response.rows;
  }
}

module.exports = TodoItemModel;
