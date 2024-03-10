const db = require('../utils/db')

module.exports.funcfriendspotential = function funcfriendspotential(req, res) {
    res.send({
        message: 'This is the mockup controller for funcfriendspotential'
    });
}

module.exports.get_potentialFriends = async function get_potentialFriends(req, res) {

    const {id} = req.user

    const friendsOfFriends = await db.query(
        `SELECT id, display_name 
        FROM "Users"
        JOIN "Friends" ON "Users".id = `)


    
    

    res.send({
        message: 'This is the mockup controller for get_potentialFriends'
    });
}

