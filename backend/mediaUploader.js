const dotenv = require('dotenv')
const db = require('./utils/db')
dotenv.config();
const fs = require('fs');

const idArray = [1,3,4,5,6,7]; // the list of id numbers theat have missing default images

async function insertDefaultImage(id) {

    const imagePath = `./media/defaultImage${id % 3}.png`
    const imageBuffer = fs.readFileSync(imagePath);
    const query = `INSERT INTO "User_PFP" (id, data, type) VALUES ($1, $2, 'image/png')`;
    const values = [id, imageBuffer];

    await db.query(query, values);
    console.log(`${imagePath}: Image inserted successfully. into as ${id}`);
}
async function main() {
    console.log("connecting...")
    await db.queryPromisified('DELETE FROM "User_PFP"');
    console.log("connection OK")
    idArray.forEach(async (e) => {
        insertDefaultImage(e)
    })

}

main();

