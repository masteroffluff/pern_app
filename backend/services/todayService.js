const moment = require('moment');
const db = require('../utils/db')
const helperFunctions = require('../utils/helperFunctions')

module.exports.functoday = function functoday(req, res) {
    res.send({
        message: 'This is the mockup controller for functoday'
    });
}

module.exports.get_today = async function get_today(req, res) {
    try {
        // what we need for today 
        // retruning an array of objects depending on type with its ancillary information
        const now = moment()
        // friends birthdays today
        const { id } = req.user
        const birthdaySQL =
            `SELECT 'Birthday' as type, "Users".display_name , "Users".id
        FROM "Users" 
        JOIN "Friends" ON "Users".id = "Friends".friend_id
        WHERE "Users".id = $1 
            AND "Users".birthday IS NOT NULL
            AND EXTRACT(MONTH FROM "Users".birthday::DATE) = EXTRACT(MONTH FROM $2::DATE) 
            AND EXTRACT(DAY FROM "Users".birthday::DATE) = EXTRACT(DAY FROM $2::DATE) 
            AND "Friends".status <> 3;`
        const birthdayResponse = await db.queryPromisified(birthdaySQL, [id, now])
        // all the calendar items for today
        console.log('from', now.startOf('day'), 'to', now.endOf('day'))
        const todaysCalendar = await helperFunctions.getListofCalendarItems(req, now.startOf('day').toDate(), now.endOf('day').toDate())
        res.send([...birthdayResponse.rows || [], ...todaysCalendar])
    } catch (e) {
        console.log('get_calendar error', e)
        return res.status(400).send({ message: e.message })
    }

}

