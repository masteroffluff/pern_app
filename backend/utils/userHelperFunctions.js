const db = require('./db')

module.exports.findIfUserNameAlreadTaken = async function findIfUserNameAlreadTaken(display_name) {
    const response = await db.queryPromisified('SELECT COUNT(*) AS A FROM "Users" WHERE display_name=$1', [display_name], 'findByUsername')
    return response.rows[0].a >= 1
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

module.exports.updateUserDetails = async function updateUserDetails( id, display_name, email, phone_no ){
    const sql = `UPDATE "Users"
    SET display_name = $2, email = $3, phone_no = $4
    WHERE id=$1
    RETURNING display_name, email, phone_no;`
    const response = await db.queryPromisified(sql, [id, display_name, email, phone_no], 'findByUsername')
    const user = response.rows[0]
    return user
}

module.exports.findByThirdPartyId = async function findByThirdPartyId(id, third_party){

}