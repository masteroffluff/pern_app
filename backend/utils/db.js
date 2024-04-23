const {Pool, Client} = require('pg')
const dotenv = require('dotenv')
dotenv.config();

constConnectionOptions= {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
}

const sharedPool = new Pool(constConnectionOptions)

const makeClient = async () => {
  const client = new Client(constConnectionOptions);
  await client.connect();
  return client}

// Function to execute a query
async function query(text, params, callback) {
  return sharedPool.query(text, params,callback);

}


function where_from_query({query}){
  const result = {
    where:"",
    params:[]
  };
  //console.log(Object.keys(query).length);
  if(Object.keys(query).length > 0){
    result.where = " WHERE " + Object.keys(query).map((key,id)=>`${key}=$${id}`).join(" AND ")
    result.params = Object.values(query)
  }
  return result;
  
}

function queryPromisified(sql, params, action = 'unknown action') {
  return new Promise((resolve, reject) => {
    
    makeClient().then((client)=>{
    client.query(sql, params, (error, results) => {
      if (error) {
        console.log(`queryPromisified: Error in query ${action}: ${error}`);
        
        client.end()
        reject(error);
      } else {
        client.end()
        resolve(results);
        //console.log(results);
      }
    });
  })
  });
}
// atomic transactions for queries 
class AtomicTranasction {
  constructor(pool){
    this.pool = pool;
    this.client = null;
    }
  async begin(){
    try{
      this.client = await this.pool.connect();
      await this.client.query('BEGIN')
    }catch(err){
      this.releaseClient();
      throw(err)
      
    }
  };
  async query(sql,params){
    try{
      if (!this.client) {
        throw new Error('Transaction not started. Call begin() first.');
      }
      return await this.client.query(sql,params)
      }catch(err){
        await this.rollback()  
        throw(err)
    }
  };
  async commit(){
    try{
      if (!this.client) {
        throw new Error('Transaction not started. Call begin() first.');
      }
      await this.client.query('COMMIT')
    }catch(err){
      await this.rollback()
      throw(err)
    }finally{
      this.releaseClient();
    }
  }
  async rollback(){
    try{
      if (this.client) {
        await this.client.query('ROLLBACK');
      }
    }catch(err){
      throw(err)
    } finally{
      this.releaseClient();
    }
  
  }
  releaseClient() {
    if (this.client) {
      this.client.release();
      this.client = null; // Reset client to null after releasing
    }
  }
}

function atomicTrasaction(){
  return new AtomicTranasction(sharedPool)
}



module.exports = {
  sharedPool,
  query,
  where_from_query,
  queryPromisified,
  atomicTrasaction
};

////////////////////////////////////
// dismiss pool at end of process //
////////////////////////////////////

process.on('exit', () => {
  console.log("\n Goodbye!")
  sharedPool.end();
});

process.on('SIGINT', async () => {
  // Handle Ctrl+C
  try {
    await sharedPool.end();
    process.exit(0);
  } catch (err) {
    console.error('Error closing pool:', err);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  // Handle termination signal
  try {
    await sharedPool.end();
    process.exit(0);
  } catch (err) {
    console.error('Error closing pool:', err);
    process.exit(1);
  }
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught exception:', err);
  try {
    await sharedPool.end();
    process.exit(1);
  } catch (err) {
    console.error('Error closing pool:', err);
    process.exit(1);
  }
});
