const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')
const ItemModel = require('../models/ItemModel')
const TodoItemModel = require('../models/TodoItemModel')


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
    const itemModel = new ItemModel(at)
    const todoItemModel = new todoItemModel(at)
    try {
        await at.begin()
        const { id } = req.user
        const { title, notes, items } = req.body
        const now = new Date()
        const { id: item_id } = await itemModel.addItem(itemModel.sharedTo.private, itemModel.itemTypes.todo, title, notes, id, now.toISOString())[0]
        for (const item of items) {
            await todoItemModel.add_todoItem(item_id, item.item_text)
        }
        // const sqlTodo =
        //     `INSERT INTO "Items" (type, shared_to, owner_id, title, notes, date)
        //     VALUES (2, 1, $1, $2, $3, $4) RETURNING id`
        // console.log(sqlTodo, id, title, notes, now.toISOString())
        // const response = await at.query(sqlTodo, [id, title, notes, now.toISOString()])
        // if (response.rows.length === 0) {
        //     const err = new Error({ message: 'Add Todo Failed' })
        //     throw err
        // }
        // const { id: item_id } = response.rows[0]
        // for (const item of items) {
        //     const response = await at.query(sqlTodo_Item, [item_id, item.item_text])
        //     if (response.rows.length === 0) {
        //         const err = new Error({ message: 'Add Todo Failed' })
        //         throw err
        //     }
        // }

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
        itemModel = new ItemModel()
        const { id: item_id, title, notes } = req.body
        const { id } = req.user
        await itemModel.update_item(item_id, title, notes)       

        res.send(await helperFunctions.getListOfTodosAndTheirItems(id));
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }



}

module.exports.delete_todo = async function delete_todo(req, res) {
    try {
        const { item_id } = req.query
        const itemModel = new ItemModel()
        itemModel.delete_item(item_id)
        const { id } = req.user
        res.send(await helperFunctions.getListOfTodosAndTheirItems(id));
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }

}


