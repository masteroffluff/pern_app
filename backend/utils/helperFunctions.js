const db = require('./db')
const jwt = require('jsonwebtoken');

module.exports.generate_jwt_token= function generate_jwt_token (id){
    if(typeof id !='number'){
        throw new Error({message:"unexpected token type"})
    }
    const token = jwt.sign({ sub: id }, process.env.SECRET_KEY, { expiresIn: '6h' });
    return token
}

module.exports.findIfUserNameExists = function findIfUserNameExists(display_name) {
    return db.queryPromisified('SELECT COUNT(*) AS A FROM "Users" WHERE display_name=$1', [display_name], 'findByUsername')
        .then((response) => {
            console.log('response', response.rows[0].a >= 1)
            return response.rows[0].a >= 1
        })
        .catch((e)=>{
            console.log(e)
            return false
        })
}

// findById(id, function (err, user) 
module.exports.findById = async function findById(id, callback) {
    try {
        console.log("id:", id)
        const response = await db.queryPromisified('SELECT * FROM "Users" WHERE id=$1', [id], 'findById')
        const user = response.rows[0]
        user.password = user.password_hash
        callback(null, user)
    } catch (err) {
        console.log("id:", id, "error in findById:", err)
        callback(err, null)
    }
}

// findByUsername(id, function (err, user) 
module.exports.findByUsername = async function findByUsername(display_name) {
    try {
        console.log("display_name:", display_name)
        const response = await db.queryPromisified('SELECT * FROM "Users" WHERE display_name=$1', [display_name], 'findByUsername')
        const user = response.rows[0]
        user.password = user.password_hash
        return user
    } catch (err) {
        console.log("error in findByUsername:" + err)
        return null
    }
}

module.exports.add_new_user = async function add_new_user(display_name, email, password_hash, third_party_data, third_party_provider, phone_no, birthday){
    try{
    const sql = `INSERT INTO "Users" ( display_name, email, password_hash, third_party_data, third_party_provider, phone_no, birthday )
                VALUES( $1, $2, $3, $4, $5, $6, $7 )
                RETURNING id`
    const response = await db.queryPromisified(sql, [display_name, email, password_hash, third_party_data, third_party_provider, phone_no, birthday])
    const user = response.rows[0]
    return user
    }catch(e){
        console.log(e)
        return null
    }
}

module.exports.updateUserDetails = async function updateUserDetails(id, display_name, email, phone_no, birthday) {
    const sql = `UPDATE "Users"
    SET display_name = $2, email = $3, phone_no = $4, birthday=$5
    WHERE id=$1
    RETURNING display_name, email, phone_no;`
    const response = await db.queryPromisified(sql, [id, display_name, email, phone_no, birthday], 'findByUsername')
    //console.log('updateUserDetails',response)
    const user = response.rows[0]
    return user
}

module.exports.findByThirdPartyId = async function findByThirdPartyId(id, third_party) {

}

module.exports.postWallNotification = async function (id, title, notes, client = db){
    const now = new Date()
    const sql =
    `INSERT INTO "Items" ( type, owner_id, shared_to, title, notes, date )
    VALUES ( 6, $1, 1, $2, $3, $4 );`
    await client.query(sql, [id, title, notes, now.toISOString()])
}

module.exports.getfriends = async function getfriends(id) {
    const sql =
    `SELECT "Users".id, "Users".display_name, "Friends_status".status
    FROM "Users" 
    JOIN "Friends" ON "Users".id = "Friends".friend_id
    JOIN "Friends_status" ON "Friends".status = "Friends_status".id
    WHERE user_id = $1`
    const response = await db.queryPromisified(sql, [id],'getfriends')
    return  response.rows

}

module.exports.deleteItem = async function deleteItem(req,res){
       
        const {item_id} = req.query

        const sql =
        `DELETE FROM "Items" 
        WHERE id = $1
        RETURNING *`
        const response = await db.queryPromisified(sql, [item_id])
        if (response.rows.length===0){
            const err = new Error({message:'Delete Items Failed'})
            throw err
        }

}



function mapArrayontoArray(mainArray, subAray, mappedTo) {
    //console.log(todos, todoItems)
    const hashMap = {};
    subAray.forEach(subItem => {
        if (!hashMap[subItem.item_id]) {
            hashMap[subItem.item_id] = [];
        }
        hashMap[subItem.item_id].push(subItem);
    });
    //console.log(hashMap)
    const result = mainArray.map(mainItem => ({
        ...mainItem,
        [mappedTo]: hashMap[mainItem.id] || []
    }));
    //console.log(result)
    return result
}

module.exports.getListOfTodosAndTheirItems = async function getListOfTodosAndTheirItems(id) {
    const sqlParent =
        `SELECT id, shared_to, title, notes
        FROM "Items"
        WHERE type = 2 AND owner_id = $1`
    const todos_response = await db.queryPromisified(sqlParent, [id])
    const todos = todos_response.rows

    const sqlChild =
        `SELECT "Todo_Items".id, "Todo_Items".item_id, "Todo_Items".item_text, "Todo_Items".item_done
        FROM "Todo_Items"
        JOIN "Items" ON "Todo_Items".item_id = "Items".id
        WHERE "Items".owner_id = $1
        ORDER BY "Todo_Items".id`
    const todoItems_response = await db.queryPromisified(sqlChild, [id])
    const todoItems = todoItems_response.rows
    //console.log(todoItems)
    return mapArrayontoArray(todos, todoItems, 'items')
}

module.exports.getListofCalendarItems = async function getListofCalendarItems(req, date_from, date_to){
    if(!date_from){
        date_from = new Date('2000/01/01')
    }
    if(!date_to){
        date_to = new Date('9999/01/01')
    }
    const {id} = req.user
    const sqlCalandar =
    `SELECT "Item_type".type, "Items".id, "Items".shared_to, "Items".title, "Items".notes, "Users".display_name,  "Calendar_Details".*
    FROM "Items"
    JOIN "Calendar_Details" ON "Items".id = "Calendar_Details".item_id
    JOIN "Item_type" ON "Items".type = "Item_type".id
    JOIN "Attending" ON "Items".id = "Attending".item_id
    JOIN "Users" ON "Items".owner_id = "Users".id
    WHERE "Items".type IN (3,4,5) AND 
    ("Items".owner_id = $1 OR "Attending".person=$1) AND
    ("Calendar_Details".date_from, "Calendar_Details".date_to) OVERLAPS ($2, $3)`
    const calendarResponse = await db.queryPromisified(sqlCalandar, [id, date_from, date_to])
    const calendarItems = calendarResponse.rows
    const itemIds = calendarItems.map((e)=>e.id)
    const sqlAttendees =
    `SELECT  "Attending".item_id, "Attending".person, "Users".display_name
    FROM "Attending"
    JOIN "Users" ON "Attending".person = "Users".id
    WHERE "Attending".item_id = ANY($1)`
    const attemdeesResponse = await db.queryPromisified(sqlAttendees, [itemIds])
    const attendees = attemdeesResponse.rows
    //console.log(attendees)
    const calendarWithMappedAttendees =mapArrayontoArray(calendarItems, attendees, 'attendees')
    console.log(calendarWithMappedAttendees)
    return calendarWithMappedAttendees
}
