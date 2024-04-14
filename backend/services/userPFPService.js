//const isAuthenticated = require('../utils/isAuthenticated')
const db = require('../utils/db')
const fs = require('fs');
const defaultImage = './media/defaultImage.png' // note: this should be relative to the servers working folder not the one this script resides in


module.exports.funcuserpfp = function funcuserpfp(req, res) {
  res.send({
    message: 'This is the mockup controller for funcuserpfp'
  });
}

module.exports.get_user_pfp = async function get_user_pfp(req, res) {
  try {
    const reqID = req.body.id
    console.log(reqID)
    const sql = `SELECT data FROM "User_PFP" WHERE id=$1;`

    const response = (await db.query(sql, [reqID]));
    if (response.rows.length > 0&&response.rows[0].data!==null){
      return res.send(response.rows[0])
    }else{
      const imageBuffer = fs.readFileSync(defaultImage);
      return res.send({data:imageBuffer})
    }

  } catch (e) {
    console.log('get_user_pfp error', e)
    return res.status(400).send(e)
  }
}

module.exports.update_user_pfp = async function update_user_pfp(req, res) {
  try {
    const sql_update = `UPDATE "User_PFP" set data = $2 FROM  WHERE id=$1 RETURNING data"`
    const sql_insert = `INSERT INTO "User_PFP" (id, data) VALUES($1, $2) RETURNING data`
    const rowCount = await db.queryPromisified(`SELECT COUNT(*) as r FROM "User_PFP" WHERE id=$1"`, [req.user.id])
    let response;
    if (rowCount.rows[0].r > 0) {
      response = (await db.queryPromisified(sql_update, [req.user.id, req.body.data]));
    } else {
      response = (await db.queryPromisified(sql_insert, [req.user.id, req.body.data]));
    }
    res.send(response.rows[0])

  } catch (e) {
    console.log('get_user_pfp error', e)
    return res.status(400).send(e)
  }

}

