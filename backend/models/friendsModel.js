// This file will contain the database interactions for the friends.
class FriendsModel extends Model {
    constructor(at) {
        super(at)
    }
    async getfriends(user_id) {
        const sql =
            `SELECT "Users".id, "Users".display_name, "Friends_status".status
            FROM "Users" 
            JOIN "Friends" ON "Users".id = "Friends".friend_id
            JOIN "Friends_status" ON "Friends".status = "Friends_status".id
            WHERE user_id = $1`
        const response = await atomic_query(sql, [user_id])
        return response.rows
    
    }

    async addFriend(user_id,friendID){
        await this.atomic_query(
            `INSERT INTO "Friends" ( user_id, friend_id, status )
            VALUES ( $1, $2, 1 ),( $2, $1, 0 );`,
            [user_id,friendID],
            'add friend failed'
        )
    }

    async confirmFriend(user_id,friendID){
        await this.atomic_query(
            `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 and status <=1 RETURNING *`,
            [user_id,friendID],
            'confirmation failed')
        await this.atomic_query(
            `UPDATE "Friends" SET status=2 WHERE user_id = $2 AND friend_id = $1  and status <=1 RETURNING *`,
            [user_id,friendID],
            'confirm friend failed'
        )
    }

    async unfollowFriend(user_id,friendID){
        await this.atomic_query(
            `UPDATE "Friends" SET status=4 WHERE user_id = $1 AND friend_id = $2 AND (status = 2 OR status = 3) RETURNING *`,
            [user_id,friendID],
            'unfollow friend failed'
        )
    }
    async blockFriend(user_id,friendID){
        await this.atomic_query(
            `UPDATE "Friends" SET status=3 WHERE user_id = $1 AND friend_id = $2 AND (status = 2 OR status = 4) RETURNING *`,
            [user_id,friendID],
            'block friend failed'
        )
    }
    async refollowFriend(user_id,friendID){
        await this.atomic_query(
            `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 AND status = 4 RETURNING *`,
            [user_id,friendID],
            'refollow friend failed'
        )
    }
    async unblockFriend(user_id,friendID){
        await this.atomic_query(
            `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 AND status = 3 RETURNING *`,
            [user_id,friendID],
            'unblock friend failed'
        )
    }


}

module.exports = FriendsModel