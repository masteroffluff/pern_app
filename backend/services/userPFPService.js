//const isAuthenticated = require('../utils/isAuthenticated')
const db = require('../utils/db')
const fs = require('fs');




module.exports.funcuserpfp = function funcuserpfp(req, res) {
  res.send({
    message: 'This is the mockup controller for funcuserpfp'
  });
}

module.exports.get_user_pfp = async function get_user_pfp(req, res) {
  let id = req.query.id==='0'?req.user.id:req.query.id
  console.log(`Looking for image id=${id} user id is ${req.user.id}`)
  try {

    const callback = (imageData) => {
      try {

        if (!imageData) {
          const err = new Error(`Image not found id=${id} image_type=${id}`)
          err.status = 404
          throw err
        }
        const { filename, data } = imageData;

        // Set appropriate response headers
        res.setHeader('Content-Disposition', `inline; filename=${filename}`);
        res.setHeader('Content-Type', 'image/png');
        // Send the image data
        console.log(data)
        res.send(data);
      } catch (error) {
        throw(error)
      }
    }
    getImageById(id, callback);
  } catch (e) {
    console.log(`error in get_images id=${id || 'unknown'}`)
    res.status(500 || e.status).send('Internal Server Error' || e.message);
  }
}


async function getImageById(id, callback) {
  const at = new db.atomicTrasaction()
  try {
    
    const query = 'SELECT data FROM "User_PFP" WHERE id=$1;';
    await at.begin()
    const result = await at.query(query, [id]);

    // Check if a matching image was found
    if (result.rows.length === 0) {
      callback(null)
      return null; // No image found for the given ID
    }

    // Extract filename and image data from the result
    //console.log(result.rows[0])
    const { filename, data } = result.rows[0];

    callback({ filename, data });
  } catch (error) {
    console.error('Error fetching image from the database:', error);
    throw error; // Rethrow the error for the calling code to handle
  }finally{
    at.releaseClient()
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

