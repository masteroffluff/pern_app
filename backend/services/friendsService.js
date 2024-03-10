const helperFunctions = require('../utils/helperFunctions')
const db = require('../utils/db')

module.exports.funcfriends = function funcfriends(req, res) {
    res.send({
        message: 'This is the mockup controller for funcfriends'
    });
}

module.exports.get_friend = async function get_friend(req, res) {
    try {

        res.send(await helperFunctions.getfriends(req.user.id));

    } catch (e) {
        console.log('get_friend error', e)
        return res.status(400).send(e)
    }
}

module.exports.add_friend = async function add_friend(req, res) {

    try {
        console.log('add_friend')
        const { id: friendID, displayName: friendDisplayName } = req.body
        const { id, display_name } = req.user
        console.log('check friend exists')
        const friendExists = await helperFunctions.findIfUserNameExists(friendDisplayName)
        if (!friendExists) { throw new Error({ message: `${friendDisplayName} does not exist` }) }
        console.log('make sure relationship does not already exist')
        const friendshipExists = await existingFriend(id, friendID)
        console.log('...')
        if (friendshipExists) { throw new Error({ message: `${friendDisplayName} is already a friend` }) }
        //add to fiends lists and don't forget to add the other dude too
        console.log('adding friend and reverse relationship')
        await addfriends(id, friendID)
        const friendsList = await helperFunctions.getfriends(id)
        await helperFunctions.postWallNotification(id, `You have asked ${friendDisplayName} to be friends`, '')
        await helperFunctions.postWallNotification(friendID, `${display_name} has asked to be friends with you.`, 'Confirm on the friends page')
        res.send(friendsList)
    } catch (e) {
        console.log('add_friend error', e)
        return res.status(400).send(e)
    }


}

module.exports.update_friend = function update_friend(req, res) {
    // note sure if this route is supposed to exist?
    res.send({
        message: 'This is the mockup controller for update_friend'
    });
}

// helper functions

// async function getfriends(id) {
//     const sql =
//     `SELECT "Users".id, "Users".display_name, "Friends_status".status
//     FROM "Users" 
//     JOIN "Friends" ON "Users".id = "Friends".friend_id
//     JOIN "Friends_status" ON "Friends".status = "Friends_status".id
//     WHERE user_id = $1`
//     const response = await db.queryPromisified(sql, [id])
//     return  response.rows

// }

async function existingFriend(id, friendID) {
    const sql = `SELECT COUNT(*) as fr FROM "Friends" WHERE user_id = $1 AND friend_id = $2`
    const response = await db.queryPromisified(sql, [id, friendID])
    return response.rows[0].fr > 0

}

async function addfriends(id, friendID) {
    const sql =
        `INSERT INTO "Friends" ( user_id, friend_id, status )
    VALUES ( $1, $2, 1 ),( $2, $1, 0 );`
    await db.queryPromisified(sql, [id, friendID])

}

