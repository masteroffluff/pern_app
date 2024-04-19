const helperFunctions = require('../utils/helperFunctions')
const db = require('../utils/db')

module.exports.funcfriendsaction = function funcfriendsaction(req, res) {
    res.send({
        message: 'This is the mockup controller for funcfriendsaction'
    });
}

module.exports.confirm_friend = async function confirm_friend(req, res) {
    const { action } = req.params
    const { id: friendID, display_name: friendDisplayName } = req.body
    const { id, display_name } = req.user
    const atomic = db.atomicTrasaction()
    

    async function atomic_sql(sql,arr, message){
        console.log(sql)
        const qry  = await atomic.query(sql,arr)
        if (qry.rows.length===0){
            console.log(message)
            console.log(arr)
            const err = new Error(message)
            throw err
        } 
        return qry      
    }

    await atomic.begin()

    try {
        console.log(action)
        switch (action) {
            case 'confirm':
                await atomic_sql(
                    `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 and status <=1 RETURNING *`,
                    [id,friendID],
                    'confirmation failed')

                await atomic_sql(
                    `UPDATE "Friends" SET status=2 WHERE user_id = $2 AND friend_id = $1  and status <=1 RETURNING *`,
                    [id,friendID],
                    'confirmation failed'
                )
                await helperFunctions.postWallNotification(id, `You have confirmed ${friendDisplayName} as your friend.`, '', atomic)
                await helperFunctions.postWallNotification(friendID, `${display_name} has confirmed they are your friend.`, '', atomic)
                // await atomic.query(
                //     `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2`,[id,friendID]
                // )
                break;
            case 'unfollow':
                await atomic_sql(
                    `UPDATE "Friends" SET status=4 WHERE user_id = $1 AND friend_id = $2 AND (status = 2 OR status = 3) RETURNING *`,
                    [id,friendID],
                    'unfollow failed'
                )
                await helperFunctions.postWallNotification(id, `You have unfollowed ${friendDisplayName} you will no longer see things they post.`, '', atomic)
                break;
            case 'block':
                await atomic_sql(
                    `UPDATE "Friends" SET status=3 WHERE user_id = $1 AND friend_id = $2 AND (status = 2 OR status = 4) RETURNING *`,
                    [id,friendID],
                    'block failed'
                )
                await helperFunctions.postWallNotification(id, `You have blocked ${friendDisplayName} you will no longer see things they post they won't see what you posted either.`, '', atomic)
                break;
            case 'refollow':
                await atomic_sql(
                    `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 AND status = 4 RETURNING *`,
                    [id,friendID],
                    'refollow failed'
                )
                await helperFunctions.postWallNotification(id, `You are following ${friendDisplayName} again you will start seeing their posts again.`, '', atomic)               
                break;
            case 'unblock':
                await atomic_sql(
                    `UPDATE "Friends" SET status=2 WHERE user_id = $1 AND friend_id = $2 AND status = 3 RETURNING *`,
                    [id,friendID],
                    'unblock failed'
                )
                await helperFunctions.postWallNotification(id, `You have unblocked ${friendDisplayName} again you will start seeing each others posts again (assuming they didn't block you too!).`, '', atomic)     
                break;
            default:
                console.log('failed')
                atomic.rollback()
                atomic.releaseClient()
                return res.status(404).send({ message: `action ${action} not recognised` })
        }

        await atomic.commit()
        res.send(await helperFunctions.getfriends(id));
    } catch (error) {
        atomic.rollback()
        console.log(error)
        res.status(400).send({message:error.message})
    } finally {
        atomic.releaseClient()
    }
}

