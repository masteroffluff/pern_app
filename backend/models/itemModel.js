// This file will contain the database interactions for the itemsNote.
// This file will contain the database interactions for the calendar calendar/a


const helperFunctions = require("../utils/helperFunctions");
const Model = require("./Model");


class ItemModel extends Model {
  // ** items ** //
  constructor(at) {
    super(at)
  }
  async get_items(owner_id, type){
    const sql =
    `SELECT id, shared_to, title, notes, date
    FROM "Items"
    WHERE type = $2 AND owner_id = $1`
    const response = await this.atomic_query(sql, [owner_id, type])
    return  response.rows
}

  async add_item(shared_to, type, title, notes, owner_id) {
    try {
      
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
        now.toISOString(),
      ],
      "add_calendar_item error");
      return item_idResponse.rows[0].id;
    } catch (e) {
      console.log("add_calendar_item error", e);
      const err = new Error(e.message);
      throw err;
    }
  }
   async update_item(      
    item_id,
    shared_to,
    title,
    notes
    ) {
    try {
      
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
      ],"update_item nothing updated");
      return item_rows.rows;
    } catch (e) {
      console.log("update_item error", e);
      const err = new Error(e.message);
      throw err;
    }
  }
  async delete_item(      
    item_id
    ) {
    try {
      
      const sqlCalendarDetails = `
      DELETE FROM "Items" 
        WHERE id = $1`;
        await this.atomic_query(sqlCalendarDetails, [
        item_id,
      ], "delete_item error", true);
      return true;
    } catch (e) {
      console.log("delete_item error", e);
      const err = new Error(e.message);
      throw err;
    }
  }  
  
  
  //// **END OF CLASS ** /////
}

