/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope

  let getRegister = (name, email, image, hashedpassword, callback) => {

    let inputValues = [name, email, image, hashedpassword];

    let query = 'INSERT INTO users (name, email, image, password) VALUES ($1, $2, $3, $4) RETURNING *';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };


  let getLogin = (email, callback) => {

    let inputValues = [email];

    let query = 'SELECT * FROM users WHERE email = ($1)';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };



  let getHome = (user_id, callback) => {

    let inputValues = [user_id];

    let query = 'SELECT users.id AS currentUser_id, users.name AS user_name, email, company_name, image, cases.id AS case_id, cases.name AS case_name FROM users INNER JOIN cases ON (users.id = cases.users_id) WHERE users.id = ($1)';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };


  let getUserID = (user_id, callback) => {

    let inputValues = [user_id];

    let query = 'SELECT * FROM users WHERE id = ($1)';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };



  let getCaseAdded = (user_id, name, age, contact, callback) => {

    let inputValues = [user_id, name, age, contact];

    let query = 'INSERT INTO cases (users_id, name, age, contact) VALUES ($1, $2, $3, $4) RETURNING *';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };




  let getCase = (requestCaseID, callback) => {

    let inputValues = [requestCaseID];

    let query = 'SELECT cases.id AS case_id, name, age, contact, groups.id AS group_id, group_name FROM cases LEFT JOIN groups ON (cases.id = groups.case_id) WHERE cases.id = ($1);';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        // invoke callback function with results after query has executed
        callback(error, null);

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };



  let getGroup = (groupName, case_id, callback) => {

    let inputValues = [groupName, case_id];

    let query = 'INSERT INTO groups (case_id, group_name) values ($2, $1) RETURNING *';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        console.log(error);

        let inputValues = [groupName, case_id];

        let query = 'UPDATE groups SET group_name = ($1) WHERE case_id = ($2) RETURNING *';

            dbPoolInstance.query(query, inputValues, (error, queryResult) => {
              if( error ){

                // invoke callback function with results after query has executed
                callback(error, null);

              }else{

                // invoke callback function with results after query has executed

                if( queryResult.rows.length > 0 ){
                  callback(null, queryResult.rows);

                }else{
                  callback(null, null);

                }
              }
            });

      }else{

        // invoke callback function with results after query has executed

        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
          callback(null, null);

        }
      }
    });
  };




  return {
    getRegister,
    getLogin,
    getHome,
    getUserID,
    getCaseAdded,
    getCase,
    getGroup,
  };
};