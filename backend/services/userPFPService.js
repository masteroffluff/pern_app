//const isAuthenticated = require('../utils/isAuthenticated')
const db = require('../utils/db')
const multer = require('multer');
//const fs = require('fs');



module.exports.funcuserpfp = function funcuserpfp(req, res) {
  res.send({
    message: 'This is the mockup controller for funcuserpfp'
  });
}

module.exports.get_user_pfp = async function get_user_pfp(req, res) {
  let id = typeof(req.query.id)!=='number' ? req.user.id : req.query.id
  console.log(`Looking for image id=${id} user id is ${req.user.id}`)
  try {

    const callback = (imageData) => {
      try {
        if(imageData instanceof Error){throw(imageData)}
        if (!imageData) {
          const err = new Error(`Image not found for id:${id}`)
          err.status = 404
          throw err
        }
        const { type, data } = imageData;

        // Set appropriate response headers
        const contentDisposition=`inline; filename=PFP${id}.${type.split('/')[1]}`
  
        res.setHeader('Content-Disposition', contentDisposition);
        res.setHeader('Content-Type', type);
        // Send the image data
        console.log(data)
        res.send(data);
      } catch (error) {
        throw (error)
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

    const query = 'SELECT data, type FROM "User_PFP" WHERE id=$1;';
    await at.begin()
    const result = await at.query(query, [id]);

    // Check if a matching image was found
    if (result.rows.length === 0) {
      callback(null)
      return null; // No image found for the given ID
    }

    // Extract filename and image data from the result
    //console.log(result.rows[0])
    const { type, data } = result.rows[0];

    callback({ type, data });
  } catch (error) {
    console.error('Error fetching image from the database:', error);
    callback(error) // pass the error to the callback to be thrown there
  } finally {
    at.releaseClient()
  }
}

// Multer configuration
 const storage = multer.memoryStorage();
//

// Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log()
//     cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, 'image.png'); 
//   }
// });

const imageFilter = function(req, file, cb) {
  // Accept images only
  console.log(file)
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter: imageFilter });

module.exports.update_user_pfp = async function update_user_pfp(req, res) {
  const at = new db.atomicTrasaction();
  try {
    // Use Multer to handle file upload
    upload.single('image')(req, res, async function (err) {
      if (err) {
        console.log('Error uploading file')
        console.log(err)
        return res.status(400).send('Error uploading file');
      }
      if (req.fileValidationError) {
        console.log(req.fileValidationError)
        return res.status(400).send(req.fileValidationError);
    }
      const file = req.file;
      if (!file) {
        console.log('No file uploaded')
        console.log(req.body)
        return res.status(400).send('No file uploaded');
      }else{
        console.log('file ok')
      }

      const imageBlob = file.buffer; // Access the blob data

      // Access other properties if needed
      const type = file.mimetype;

      // Handle database operations
      await at.begin();
      const rowCount = await at.query(`SELECT COUNT(*) as r FROM "User_PFP" WHERE id=$1`, [req.user.id]);
      let response;
      if (rowCount.rows[0].r > 0) {
        response = await at.query(`UPDATE "User_PFP" SET data = $1, type = $2 WHERE id = $3 RETURNING data, type`, [imageBlob, type, req.user.id]);
      } else {
        response = await at.query(`INSERT INTO "User_PFP" (id, data, type) VALUES ($1, $2, $3) RETURNING data, type`, [req.user.id, imageBlob, type]);
      }
      await at.commit();
      const contentDisposition=`inline; filename=${file.originalname}`
  
      res.setHeader('Content-Disposition', contentDisposition);
      res.setHeader('Content-Type', type);
      res.send(response.rows[0].data);
    });
  } catch (e) {
    await at.rollback();
    console.log('update_user_pfp error', e);
    return res.status(500).send('Internal server error');
  } finally {
    await at.releaseClient();
  }
};

