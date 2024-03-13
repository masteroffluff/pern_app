const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')

module.exports.funcitemsnote = function funcitemsnote(req, res) {
    res.send({
        message: 'This is the mockup controller for funcitemsnote'
    });
}

module.exports.get_notes = async function get_notes(req, res) {
    try {
        const {id} = req.user
        const list = await getListOfNotes(id)
        res.send(list)
    }catch(e){
        res.status(400).send({message:e.message})
    }

}

module.exports.post_note = async function post_note(req, res) {
    try {
        const {id} = req.user
        const {shared_to, title, notes} = req.body
        const now = new Date() 
        const sql =
        `Insert into "Items" (type,owner_id,shared_to,title,notes, date)
        VALUES (1, $1, $2, $3, $4 ,$5) RETURNING *`
        const response = await db.queryPromisified(sql, [id, shared_to, title, notes, now.toISOString()])
        if (response.rows.length===0){

        }

        const list = await getListOfNotes(id)
        return res.send(list)
    }catch(e){
        res.status(400).send({message:e.message})
    }
}

module.exports.update_note = async function update_note(req, res) {
    try {
        
        const {id:item_id, shared_to, title, notes} = req.body

        const sql =
        `UPDATE "Items" 
        SET shared_to=$2, title=$3, notes=$4
        WHERE id=$1
        RETURNING *`
        const response = await db.queryPromisified(sql, [item_id, shared_to, title, notes])
        if (response.rows.length===0){
            const err = new Error({message:'Update Items Failed'})
            throw err
        }
        const { id } = req.user
        const list = await getListOfNotes(id)
        return res.send(list)
    }catch(e){
        res.status(400).send({message:e.message})
    }
}

module.exports.delete_note = async function delete_note(req, res) {
    try {
        await helperFunctions.deleteItem(req.res)
        const { id } = req.user
        const list = await getListOfNotes(id)
        return res.send(list)
    }catch(e){
        console.log(e)
        res.status(400).send(e.message)
    }
}

async function getListOfNotes(id){
    const sql =
    `SELECT id, shared_to, title, notes
    FROM "Items"
    WHERE type = 1 AND owner_id = $1`
    const response = await db.queryPromisified(sql, [id])
    return  response.rows
}