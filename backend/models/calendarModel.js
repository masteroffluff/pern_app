// This file will contain the database interactions for the calendar calendar/a


const helperFunctions = require("../utils/helperFunctions");
const Model = require("./Model");


class CalendarModel extends Model {
  // ** calendar ** //
  constructor(at) {
    super(at)
  }

  async getCalendar(user_id, date_from, date_to){
    const response = this.atomic_query(
      `SELECT DISTINCT * FROM (
        SELECT DISTINCT "Item_type".type, "Items".id, "Items".shared_to, "Items".title, "Items".notes, "Items".owner_id, "Users".display_name,  "Calendar_Details".*
            FROM "Items"
            JOIN "Calendar_Details" ON "Items".id = "Calendar_Details".item_id
            JOIN "Item_type" ON "Items".type = "Item_type".id
            JOIN "Users" ON "Items".owner_id = "Users".id
            WHERE "Items".type IN (3,4,5) AND 
            ("Items".owner_id = $1 ) AND
            ("Calendar_Details".date_from, "Calendar_Details".date_to) OVERLAPS ($2::timestamptz, $3::timestamptz)
        UNION ALL
        SELECT DISTINCT "Item_type".type, "Items".id, "Items".shared_to, "Items".title, "Items".notes, "Items".owner_id, "Users".display_name,  "Calendar_Details".*
            FROM "Items"
            JOIN "Calendar_Details" ON "Items".id = "Calendar_Details".item_id
            JOIN "Item_type" ON "Items".type = "Item_type".id
            JOIN "Attending" ON "Items".id = "Attending".item_id
            JOIN "Users" ON "Items".owner_id = "Users".id
            WHERE "Items".type IN (3,4,5) AND 
            ("Attending".person=$1) AND
            ("Calendar_Details".date_from, "Calendar_Details".date_to) OVERLAPS ($2::timestamptz, $3::timestamptz)
        UNION ALL
            SELECT DISTINCT "Item_type".type, "Items".id, "Items".shared_to, "Items".title, "Items".notes, "Items".owner_id, "Users".display_name,  "Calendar_Details".*
            FROM "Items"
            JOIN "Calendar_Details" ON "Items".id = "Calendar_Details".item_id
            JOIN "Item_type" ON "Items".type = "Item_type".id
            JOIN "Users" ON "Items".owner_id = "Users".id
            WHERE "Items".type IN (3,4,5) AND 
            ("Items".shared_to = 3) AND
            ("Calendar_Details".date_from, "Calendar_Details".date_to) OVERLAPS ($2::timestamptz, $3::timestamptz)
        UNION ALL
        SELECT DISTINCT "Item_type".type, "Items".id, "Items".shared_to, "Items".title, "Items".notes, "Items".owner_id, "Users".display_name,  "Calendar_Details".*
            FROM "Items"
            JOIN "Calendar_Details" ON "Items".id = "Calendar_Details".item_id
            JOIN "Item_type" ON "Items".type = "Item_type".id
            JOIN "Users" ON "Items".owner_id = "Users".id
            JOIN "Friends" ON "Friends".friend_id = "Items".owner_id
            WHERE "Items".type IN (3,4,5) AND 
            ("Friends".user_id =$1 ) AND
            ("Items".shared_to = 2) AND
            ("Calendar_Details".date_from, "Calendar_Details".date_to) OVERLAPS ($2::timestamptz, $3::timestamptz)
      ) as t`,
      [ user_id, date_from, date_to]
    );
    return response.rows;
  }
  async getCalendarAttendees(){
    const response = await this.atomic_query(
      `SELECT  "Attending".item_id, "Attending".person, "Users".display_name
      FROM "Attending"
      JOIN "Users" ON "Attending".person = "Users".id
      WHERE "Attending".item_id = ANY($1)`
      , [owner_id]);
      return response.rows;
  }
  

  async add_calendar_attendees(item_id, attendees) {
    try {
      
      // if a single attendee is provided make it an array.
      if (tyopeof(attendees) === "string") {
        attendees = [attendees];
      }
      

      for (const index in attendees) {
        const sql = `
            INSERT INTO "Attending" (item_id, person)
            Values($1,$2)
            RETURNING *;`;
        await this.atomic_query(sql, [item_id, attendees[index]], "(add atendee list)Add Attendee Failed");
        
      }

      return true;
    } catch (e) {
      console.log("add_calendar_attendees error", e);
      const err = new Error(e.message);
      throw err;
    }
  }
  async delete_calendar_attendees(item_id, attendee) {
    try {
      
      const sql = `
        DELETE FROM "Attending"
        WHERE item_id =$1 AND person=$2
        RETURNING *;`;
      await this.atomic_query(sql, [item_id, attendee], "Remove Attendee Failed");
      return true;
    } catch (e) {
      console.log("delete_calendar_attendees error", e);
      const err = new Error(e.message);
      throw err;
    }
  }
  async add_item(shared_to, type, title, notes, owner_id) {

      
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
  }
  async add_calendar_detail(item_id, date_from, date_to, place) {
      
      const sqlCalendarDetails = `
      INSERT INTO "Calendar_Details" (item_id, date_from, date_to, place )
      VALUES( $1, $2, $3, $4 )
      RETURNING item_id;`;
      const item_idResponse =  await this.atomic_query(sqlCalendarDetails, [item_id, date_from, date_to, place],"add_calendar_detail error");
      return item_idResponse.rows[0].item_id;
  }
  async update_item(      
    item_id,
    shared_to,
    title,
    notes
    ) {
      
      const sqlItems = `
      UPDATE "Items"
      SET shared_to= $2, title= $3, notes= $4
      WHERE id = $1
      RETURNING *;`;
      const item_rows = await at.query(sqlItems, [
        item_id,
        shared_to,
        title,
        notes,
      ]);
      if (item_rows.rows.length === 0) {
        
        const err = new Error("update_item nothing updated");
        throw err;
      }
      return item_rows.rows;

  }
  async updateCalendar(      
    item_id,
    date_from,
    date_to,
    place,
    ) {
      const sqlCalendarDetails = `
      UPDATE "Calendar_Details"
      SET date_from= $2, date_to= $3, place= $4
      WHERE item_id = $1
      RETURNING *;`;
      const calendar_rows = await this.atomic_query(sqlCalendarDetails, [
        item_id,
        date_from,
        date_to,
        place,
      ],
      "update_calendar nothing updated");
      
      return calendar_rows.rows;

  }
  async deleteCalendar(      
    item_id
    ) {
    try {
      
      const sqlCalendarDetails = `
      DELETE FROM "Calendar_Details" 
        WHERE item_id = $1`;
      await this.atomic_query(sqlCalendarDetails, [
        item_id,
      ],"delete_calendar error", true);
      return true;
    } catch (e) {
      console.log("delete_calendar error", e);
      const err = new Error(e.message);
      throw err;
    }
  }

  
  //// **END OF CLASS ** /////
}

module.exports = CalendarModel