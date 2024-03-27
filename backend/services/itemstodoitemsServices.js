const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')

module.exports.funcitemstodoitems = function funcitemstodo(req, res) {
    res.send({
        message: 'This is the mockup controller for funcitemstodo'
    });
}


module.exports.post_todo_items = async function post_todo_items(req, res) {
    try {
        // add new todo items to a list the todo item need to have been crearted first :)
        const { todo_id, item_text } = req.body
        const sql = `
        INSERT INTO "Todo_Items" (item_id, item_text, item_done)
        VALUES ($1, $2, FALSE) RETURNING *`
        const response = await db.queryPromisified(sql, [todo_id, item_text])
        if (response.rows.length === 0) {
            const err = new Error('post_todo_items Failed')
            throw err
        }
        const { id } = req.user
        res.send(await helperFunctions.getListOfTodosAndTheirItems(id));
    } catch (e) {
        console.log('post_todo_items error', e)
        return res.status(400).send({ message: e.message })
    }
}

module.exports.update_todo_items = async function update_todo_items(req, res) {
    
    const at = db.atomicTrasaction()
    try {
        await at.begin()
        const { items } = req.body
        console.log(items)
        const sql = `
        UPDATE "Todo_Items" 
        SET item_text =  $2, item_done = $3
        WHERE id = $1
        RETURNING *`
        for (const i in items) {
            
            const { id, item_text, item_done } = items[i];
            const response = await at.query(sql, [id, item_text, item_done])
            if (response.rows.length === 0) {
                const err = new Error('post_todo_items Failed')
                throw err
            }
        }
        await at.commit()
        const { id: user_id } = req.user
        res.send(await helperFunctions.getListOfTodosAndTheirItems(user_id));
    } catch (e) {
        at.rollback()
        console.log('update_todo_items error', e)
        res.status(400).send({ message: e.message })
    } finally{
        at.releaseClient()
    }

}

module.exports.delete_todo_items = async function delete_todo_items(req, res) {
    try {
        const { todo_id, todoitem_id } = req.body
        const sql = `
        DELETE FROM "Todo_Items" 
        WHERE item_id = $1 AND id = $2
        RETURNING *`
        const response = await db.queryPromisified(sql, [todo_id, todoitem_id])
        console.log(response.rows)
        if (response.rows.length === 0) {
            const err = new Error('post_todo_items Failed')
            throw err
        }
        ///////////////////////
        const { id: user_id } = req.user
        res.send(await helperFunctions.getListOfTodosAndTheirItems(user_id));
    } catch (e) {
        console.log('delete_todo_items error', e)
        return res.status(400).send({ message: e.message })
    }

}

