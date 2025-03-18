// This file will contain the database interactions for the friendsAction.
class FriendsAction extends Model {
    constructor(at) {
        super(at)
    }
    async confirmFriend(id,friendID){
        await this.atomic_sql(
            `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 and status <=1 RETURNING *`,
            [id,friendID],
            'confirmation failed')
        await this.atomic_sql(
            `UPDATE "Friends" SET status=2 WHERE user_id = $2 AND friend_id = $1  and status <=1 RETURNING *`,
            [id,friendID],
            'confirmation failed'
        )
    }

    async unfollowFriend(id,friendID){
        await this.atomic_sql(
            `UPDATE "Friends" SET status=4 WHERE user_id = $1 AND friend_id = $2 AND (status = 2 OR status = 3) RETURNING *`,
            [id,friendID],
            'unfollow failed'
        )
    }
    async blockFriend(id,friendID){
        await this.atomic_sql(
            `UPDATE "Friends" SET status=3 WHERE user_id = $1 AND friend_id = $2 AND (status = 2 OR status = 4) RETURNING *`,
            [id,friendID],
            'block failed'
        )
    }
    async refollowFriend(id,friendID){
        await this.atomic_sql(
            `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 AND status = 4 RETURNING *`,
            [id,friendID],
            'refollow failed'
        )
    }
    async unblockFriend(id,friendID){
        await this.atomic_sql(
            `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 AND status = 3 RETURNING *`,
            [id,friendID],
            'unblock failed'
        )
    }

}