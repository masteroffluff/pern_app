//const isAuthenticated = require('../utils/isAuthenticated')
const db = require('../utils/db')
const fs = require('fs');



module.exports.funcuserpfp = function funcuserpfp(req, res) {
  res.send({
    message: 'This is the mockup controller for funcuserpfp'
  });
}

module.exports.get_user_pfp = async function get_user_pfp(req, res) {
  try {
    let reqID = req.query.id
    res.removeHeader('Content-Type'); 
    res.removeHeader('Content-Type-Options');

    
    res.setHeader('Content-Type', 'image/png');
    
     
    if(!reqID){reqID=req.user.id}
    const filename=req.user.id + ".png"
    console.log(reqID)
    const sql = `SELECT data FROM "User_PFP" WHERE id=$1;`

    const response = (await db.query(sql, [reqID]));
    console.log(response.rowCount)
    const defaultNo = Math.floor(Math.random()*3)
    if (response.rowCount === 0||response.rows[0].data===null){
      const defaultImage = `./media/defaultImage${defaultNo}.png` /* note: this should be relative to the servers working folder not the one this script resides in*/ 
      const imageBuffer = fs.readFileSync(defaultImage);
      
      res.setHeader('Content-Disposition', `inline; filename=defaultImage${defaultNo}.png`);


      console.log(imageBuffer)
      return res.send({data:imageBuffer})
    }else{
      res.setHeader('Content-Disposition', `inline; filename=${filename}`);
      return res.status(200).send(response.rows[0])
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

