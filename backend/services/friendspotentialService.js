const e = require('express');
const db = require('../utils/db')

module.exports.funcfriendspotential = function funcfriendspotential(req, res) {
    res.send({
        message: 'This is the mockup controller for funcfriendspotential'
    });
}

module.exports.get_potentialFriends = async function get_potentialFriends(req, res) {
    try {
        const { id } = req.user

        const potentialFriends = await db.queryPromisified(
            `SELECT id, display_name
            FROM "Users"
            WHERE id <> $1
                AND NOT EXISTS (
                    SELECT 1
                    FROM "Friends"
                    WHERE (user_id = $1 AND friend_id = "Users".id)
                    OR (user_id = "Users".id AND friend_id = $1)
        );`, [id])


        return res.send(potentialFriends.rows);
    }catch(e){
        console.log(e)
        return res.status(400).send({message:e.message})
    }
}

