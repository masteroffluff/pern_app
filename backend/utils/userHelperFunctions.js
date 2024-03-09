const db = require('./db')
const jwt = require('jsonwebtoken');

module.exports.generate_jwt_token= function generate_jwt_token (id){
    if(typeof id !='number'){
        throw new Error({message:"unexpected token type"})
    }
    const token = jwt.sign({ sub: id }, process.env.SECRET_KEY, { expiresIn: '6h' });
    return token
}

module.exports.findIfUserNameAlreadTaken = function findIfUserNameAlreadTaken(display_name) {
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

module.exports.add_new_user = async function add_new_user(display_name, email, password_hash, third_party_data, third_party_provider, phone_no){
    try{
    const sql = `INSERT INTO "Users" ( display_name, email, password_hash, third_party_data, third_party_provider, phone_no )
                VALUES( $1, $2, $3, $4, $5, $6 )
                RETURNING id`
    const response = await db.queryPromisified(sql, [display_name, email, password_hash, third_party_data, third_party_provider, phone_no])
    const user = response.rows[0]
    return user
    }catch(e){
        console.log(e)
        return null
    }
}

module.exports.updateUserDetails = async function updateUserDetails(id, display_name, email, phone_no) {
    const sql = `UPDATE "Users"
    SET display_name = $2, email = $3, phone_no = $4
    WHERE id=$1
    RETURNING display_name, email, phone_no;`
    const response = await db.queryPromisified(sql, [id, display_name, email, phone_no], 'findByUsername')
    //console.log('updateUserDetails',response)
    const user = response.rows[0]
    return user
}

module.exports.findByThirdPartyId = async function findByThirdPartyId(id, third_party) {

}