const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')

module.exports.funcitemstodo = function funcitemstodo(req, res) {
    res.send({
        message: 'This is the mockup controller for funcitemstodo'
    });
}

module.exports.get_todos = async function get_todos(req, res) {
    try {

        res.send(await helperFunctions.getListOfTodosAndTheirItems(req.user.id));

    } catch (e) {
        console.log('get_friend error', e)
        return res.status(400).send(e)
    }
}

module.exports.post_todo = async function post_todo(req, res) {
    console.log('post_todo')
    const at = db.atomicTrasaction()
    try {
        await at.begin()
        const { id } = req.user
        const { title, notes, items } = req.body
        const now = new Date()
        const sqlTodo =
            `INSERT INTO "Items" (type, shared_to, owner_id, title, notes, date)
            VALUES (2, 1, $1, $2, $3, $4) RETURNING id`
        console.log(sqlTodo, id, title, notes, now.toISOString())
        const response = await at.query(sqlTodo, [id, title, notes, now.toISOString()])
        if (response.rows.length === 0) {
            const err = new Error({ message: 'Add Todo Failed' })
            throw err
        }
        const { id: item_id } = response.rows[0]
        const sqlTodo_Item = `
            INSERT INTO "Todo_Items" (item_id, item_text, item_done)
            VALUES ($1, $2, FALSE) RETURNING *`
        for (const item of items) {
            const response = await at.query(sqlTodo_Item, [item_id, item.item_text])
            if (response.rows.length === 0) {
                const err = new Error({ message: 'Add Todo Failed' })
                throw err
            }
        }

        await at.commit()

        res.send(await helperFunctions.getListOfTodosAndTheirItems(id));


    } catch (e) {
        console.log('get_friend error', e)
        return res.status(400).send(e)
    }
}

module.exports.update_todo = async function update_todo(req, res) {
    // only need to update the top line data here updating the lines will be done on the todod items route. 
    try {

        const { id: item_id, title, notes } = req.body

        const sql =
            `UPDATE "Items" 
            SET title=$2, notes=$3
            WHERE id=$1
            RETURNING *`
        const response = await db.queryPromisified(sql, [item_id, title, notes])
        if (response.rows.length === 0) {
            const err = new Error({ message: 'Update Todo list Failed' })
            throw err
        }
        const { id } = req.user
        res.send(await helperFunctions.getListOfTodosAndTheirItems(id));
    } catch (e) {
        console.log(e)
        res.status(400).send({ message: e.message })
    }



}

module.exports.delete_todo = async function delete_todo(req, res) {
    try {
        await helperFunctions.deleteItem(req.res)
        const { id } = req.user
        res.send(await helperFunctions.getListOfTodosAndTheirItems(id));
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }

}


