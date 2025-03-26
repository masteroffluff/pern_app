// This file will contain the database interactions for the user and user PFP.
const Model = require("./Model");

class UserModel extends Model {
    // ** calendar ** //
    constructor(at) {
      super(at)
    }
    async addUser(display_name, email, password_hash, third_party_data, third_party_provider, phone_no, birthday, colour){
        const response = await this.atomic_query(
            `INSERT INTO "Users" ( display_name, email, password_hash, third_party_data, third_party_provider, phone_no, birthday, colour )
                VALUES( $1, $2, $3, $4, $5, $6, $7, $8 )
                RETURNING id`,
                [display_name, email, password_hash, third_party_data, third_party_provider, phone_no, birthday, colour],
            "add user failed"
          );
          return response.rows;
    }
    async updateUser(){
        const response = await this.atomic_query(
            `UPDATE "Users"
            SET display_name = $2, email = $3, phone_no = $4, birthday=$5, colour=$6
            WHERE id=$1
            RETURNING display_name, email, phone_no, birthday, colour;`,
            [id, display_name, email, phone_no, birthday, colour],
            "update user failed"
          );
          return response.rows[0];
    }
    async getUser(id){
      const response = await this.atomic_query('SELECT * FROM "Users" WHERE id=$1', 
        [id]);
      return response.rows[0];
    }
    async findUser(){
      const response = await this.atomic_query('SELECT * FROM "Users" WHERE display_name=$1', [display_name]);
      return response.rows[0];
    }
    async findIfUserNameExists(){
      const response = await this.atomic_query('SELECT COUNT(*) AS A FROM "Users" WHERE display_name=$1', 
        [display_name]);
      return response.rows[0]>0;
    }
    async insertImage(id, imageBuffer){
      const response = await this.atomic_query('INSERT INTO "User_PFP" (id, data, type) VALUES ($1, $2, \'image/png\')', 
        [id, imageBuffer]);
      return response.rows[0]>0;
    }
}

module.exports = UserModel