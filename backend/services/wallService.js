const db = require('../utils/db')


module.exports.funcwall = function funcwall(req, res) {
    res.send({
        message: 'This is the mockup controller for funcwall'
    });
}

module.exports.get_wall = async function get_wall(req, res) {
    try {
        const { id } = req.user
        const friendsSQL = `
        SELECT friend_id from "Friends"
        WHERE status=2 AND user_id = $1 AND friend_id not in (
            SELECT user_id FROM "Friends"
            WHERE friend_id = $1 AND status = 4);`
        const friendsResponse = await db.queryPromisified(friendsSQL, [id])
        const friendsList = friendsResponse.rows
        friendsList.push(id) // always remenber to be friends with yourself
        const wallSQL =
            `SELECT "Items".id, "Item_type".type, "Items".owner_id, "Items".shared_to, "Items".title, "Items".notes as value, "Items".date	
        FROM "Items"
        JOIN "Item_type" ON "Items".type = "Item_type".id   
        
        WHERE type IN (1,6) AND owner_id = ANY($1)`
        const wallResponse = await db.queryPromisified(wallSQL, [friendsList])
        res.send(wallResponse.rows)
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}

