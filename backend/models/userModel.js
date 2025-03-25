// This file will contain the database interactions for the user.
const Model = require("./Model");

class UserModel extends Model {
    // ** calendar ** //
    constructor(at) {
      super(at)
    }
    async addUser(display_name, email, phone_no, password, birthday){
        const response = this.atomic_query(
            `INSERT INTO "Users" ( display_name, email, password_hash, third_party_data, third_party_provider, phone_no, birthday, colour )
                VALUES( $1, $2, $3, $4, $5, $6, $7, $8 )
                RETURNING id`,
            [id, item_text, item_done],
            "add user failed"
          );
          return response.rows;
    }
    async updateUser(){
        const response = this.atomic_query(
            `UPDATE "Users"
            SET display_name = $2, email = $3, phone_no = $4, birthday=$5, colour=$6
            WHERE id=$1
            RETURNING display_name, email, phone_no, birthday, colour;`,
            [id, item_text, item_done],
            "update user failed"
          );
          return response.rows;
    }
    async getUser(){

    }
    async findUser(){

    }
}

module.exports = UserModel