const userHelperFunctions = require('../utils/userHelperFunctions')

module.exports.funcfriends = function funcfriends(req, res) {
    res.send({
        message: 'This is the mockup controller for funcfriends'
    });
}

module.exports.get_friend = function get_friend(req, res) {
    res.send({
        message: 'This is the mockup controller for get_friend'
    });

}

module.exports.add_friend = function add_friend(req, res) {

    try{
        console.log('add_friend')
        const {id, displayName } = req.body
        // check friend exists

        // make sure relationship does not already exist

        //add to fiends lists and don't forget to add the other dude too
      }catch(e){
        console.log('add_friend error', e)
        return res.status(400).send(e)
      }


}

module.exports.update_friend = function update_friend(req, res) {
    res.send({
        message: 'This is the mockup controller for update_friend'
    });
}

