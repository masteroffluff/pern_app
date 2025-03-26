// This file will contain the database interactions for the itemsNote.
// This file will contain the database interactions for the calendar calendar/a


const helperFunctions = require("../utils/helperFunctions");
const Model = require("./Model");


class ItemModel extends Model {
  // ** items ** //
  constructor(at) {
    super(at)
    this.itemTypes = {
      note: 1,
      todo: 2,
      reminder: 3,
      appointment: 4,
      event: 5,
      notification: 6
    };
    this.sharedTo = {
      private: 1,
      friends: 2,
      public: 3
    };
  }
  async getItems(owner_id, type){
    const sql =
    `SELECT id, shared_to, title, notes, date
    FROM "Items"
    WHERE type = $2 AND owner_id = $1`
    const response = await this.atomic_query(sql, [owner_id, type])
    return  response.rows
}
async getAllItems(owner_id){
  const sql =
  `SELECT id, shared_to, title, notes, date
  FROM "Items"
  WHERE owner_id = $1`
  const response = await this.atomic_query(sql, [owner_id])
  return  response.rows
}

  async addItem(shared_to, type, title, notes, owner_id, date) {
    const sqlItems = `
    INSERT INTO "Items" ( shared_to, type, title, notes, owner_id, date )
    VALUES( $1, $2, $3, $4, $5, $6 )
    RETURNING id;`;
    const item_idResponse = await this.atomic_query(sqlItems, [
      shared_to,
      type,
      title,
      notes,
      owner_id,
      date
    ],
    "add_calendar_item error");
    return item_idResponse.rows[0].id;
  }

  async updateItem(item_id, shared_to, title, notes) {
    const sqlItems = `
    UPDATE "Items"
    SET shared_to= $2, title= $3, notes= $4
    WHERE id = $1
    RETURNING *;`;
    const item_rows = await this.atomic_query(sqlItems, [
      item_id,
      shared_to,
      title,
      notes,
    ], "update_item nothing updated");
    return item_rows.rows;
  }

  async deleteItem(item_id) {
    const sqlCalendarDetails = `
    DELETE FROM "Items" 
    WHERE id = $1
    RETURNING *`;
    await this.atomic_query(sqlCalendarDetails, [
      item_id,
    ], "delete_item error", true);
    return true;
  }  
  
  
  //// **END OF CLASS ** /////
}

