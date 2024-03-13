const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')

module.exports.funccalendar = function funccalendar(req, res) {
    res.send({
        message: 'This is the mockup controller for funccalendar'
    });
}

module.exports.get_calendar = async function get_calendar(req, res) {
    try {
        res.send(await helperFunctions.getListofCalendarItems(req));
    } catch (e) {
        console.log('get_calendar error', e)
        return res.status(400).send({ message: e.message })
    }
}

module.exports.post_calendar = async function post_calendar(req, res) {
    const at = db.atomicTrasaction()
    try {
        const { id } = req.user
        const {shared_to, type, title, notes, date_from, date_to, place, attendees} = req.body
        const now = new Date() 
        const types ={
            reminder:3,
            appointment:4,
            event:5,
        }
        await at.begin()
        console.log('create items')        
        const sqlItems = `
        INSERT INTO "Items" ( shared_to, type, title, notes, owner_id, date )
        VALUES( $1, $2, $3, $4, $5, $6 )
        RETURNING id;`
        const item_idResponse = await at.query(sqlItems,[shared_to, types[type], title, notes, id, now.toISOString()])
        const item_id = item_idResponse.rows[0].id

        console.log('create calendar detail')
        const sqlCalendarDetails = `
        INSERT INTO "Calendar_Details" (item_id, date_from, date_to, place )
        VALUES( $1, $2, $3, $4 );`
        await at.query(sqlCalendarDetails,[item_id, date_from, date_to, place])

        
        const sqlAttendees = `
        INSERT INTO "Attending" (item_id, person)
        VALUES ( $1, $2 );`

        for(const i in attendees){
            //console.log(attendee)
            await at.query(sqlAttendees,[item_id, attendees[i]])
        }

        console.log('committing')
        await at.commit()
        

        res.send(await helperFunctions.getListofCalendarItems(req));

    } catch (e) {
        at.rollback()
        console.log('post_calendar error', e)
        return res.status(400).send({ message: e.message })
    }
}

module.exports.update_calendar = function update_calendar(req, res) {
    res.send({
        message: 'This is the mockup controller for update_calendar'
    });
}

module.exports.delete_calendar = function delete_calendar(req, res) {
    res.send({
        message: 'This is the mockup controller for delete_calendar'
    });
}


