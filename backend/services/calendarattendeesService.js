const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')


module.exports.funccalendarattendees = function funccalendar(req, res) {
    res.send({
        message: 'This is the mockup controller for funccalendar'
    });
}

module.exports.post_calendar_attendees = async function post_calendar_attendees(req, res) {
    try {
        const {item_id, attendee} = req.query
        const sql = `
        INSERT INTO "Attending" (item_id, person)
        Values($1,$2)
        RETURNING *;`
        const response = await db.queryPromisified(sql, [item_id, attendee])
        if (response.rows.length===0){
            const err = new Error('Add Attendee Failed')
            throw err            
        }


        res.send(await helperFunctions.getListofCalendarItems(req));
    } catch (e) {
        console.log('get_calendar error', e)
        return res.status(400).send({ message: e.message })
    }
}

module.exports.delete_calendar_attendees = async function delete_calendar_attendees(req, res) {
    try {
        const {item_id, attendee} = req.query
        const sql = `
        DELETE FROM "Attending"
        WHERE item_id =$1 AND person=$2
        RETURNING *;`
        const response = await db.queryPromisified(sql, [item_id, attendee])
        if (response.rows.length===0){
            const err = new Error('Remove Attendee Failed')
            throw err            
        }
        res.send(await helperFunctions.getListofCalendarItems(req));
    } catch (e) {
        console.log('get_calendar error', e)
        return res.status(400).send({ message: e.message })
    }
}


module.exports.update_calendar_attendees = async function update_calendar_attendees(req, res) {
    const at = db.atomicTrasaction()
    try {
        const {item_id, attendees} = req.body
        await at.begin()
        await at.query(`
        DELETE FROM "Attending"
        WHERE item_id =$1
        RETURNING *;`,
        [item_id]
        )
        for (const index in attendees){
            const sql = `
            INSERT INTO "Attending" (item_id, person)
            Values($1,$2)
            RETURNING *;`
            const response = await at.query(sql, [item_id, attendees[index]])
            if (response.rows.length===0){
                const err = new Error('(update atendee list)Add Attendee Failed')
                throw err            
            }
        }
        await at.commit()
        at.releaseClient()
        res.send(await helperFunctions.getListofCalendarItems(req));
    } catch (e) {
        console.log('get_calendar error', e)
        return res.status(400).send({ message: e.message })
    }
}
