const db = require("../utils/db");

class Model {
  constructor(at) {
    if(at){
      this.at = at;
    }
    this.at = db.atomicTrasaction();
  }
  async begin() {
    await this.at.begin();
  }
  async commit_and_release() {
    await this.at.commit();
    this.at.releaseClient();
  }
  async rollback_and_release() {
    await this.at.rollback();
    this.at.releaseClient();
  }
  get at() {
    return this.at
  }
  async atomic_query(sql,arr, message, skipCheck){
    console.log(sql)
    const qry  = await atomic.query(sql,arr)
    if (!skipCheck&&qry.rows.length===0){
        console.log(message)
        console.log(arr)
        const err = new Error(message)
        throw err
    } 
    return qry
}
}

module.exports = Model;
// The Model class is a parent class that other classes inherit from. It provides the basic methods for working with a database transaction. 
// 
// This class has the following methods:
// 
// 
// begin: This method starts a database transaction.
// commit_and_release: This method commits the transaction and releases the database connection.
// rollback_and_release: This method rolls back the transaction and releases the database connection.
// atomic_query: This method executes a query within the transaction and checks if the query returned any rows. If the query did not return any rows, an error is thrown unless the skipcheck flag is.
// 
// 
// The constructor method sets up the database connection and transaction. If a transaction is passed to the constructor, it is used; otherwise, a new transaction is created.
// 
// This class is used to create database transactions and manage the database connection. It is a reusable class that can be extended by other classes that need to interact with the database. 
// 
//
// 