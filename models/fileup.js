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



  let getUser = (user_id, callback) => {

    let inputValues = [user_id];

    let query = "SELECT * FROM users WHERE users.id = ($1)";

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





  let getGroups = (user_id, callback) => {

    let inputValues = [user_id];

    let query = "SELECT * FROM groups WHERE users_id = ($1)";

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





  let getGroupAdded = (group_name, user_id, callback) => {

    let inputValues = [group_name, user_id];

    let query = "INSERT INTO groups (group_name, users_id) VALUES ($1, $2)";

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





  let getCases = (user_id, callback) => {

    let inputValues = [user_id];

    let query = "SELECT * FROM cases WHERE users_id = ($1)";

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



  let getProfileEdited = (user_id, name, company_name, callback) => {

    let inputValues = [user_id, name, company_name];

    let query = 'UPDATE users SET name = ($2), company_name = ($3) WHERE id = ($1)';

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



  let getPasswordChanged = (user_id, hashedpassword, callback) => {

    let inputValues = [user_id, hashedpassword];

    let query = 'UPDATE users SET password = ($2) WHERE id = ($1)';

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




  let getCaseAdded = (user_id, group, name, age, contact, callback) => {

    let inputValues = [user_id, group, name, age, contact];

    let query = 'INSERT INTO cases (users_id, group_id, name, age, contact) VALUES ($1, $2, $3, $4, $5) RETURNING *';

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

    let query = "SELECT cases.id AS case_id, cases.name, age, contact, groups.id AS group_id, group_name, users.name AS user_name, users.id, likes, dislikes FROM cases LEFT JOIN groups ON (cases.id = groups.case_id) LEFT JOIN users ON (users.id = cases.users_id) LEFT JOIN preferences ON (cases.id = preferences.case_id) WHERE cases.id = ($1)"

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






  let getCaseDeleted = (case_id, callback) => {

    let inputValues = [case_id];

    let query = "DELETE FROM cases WHERE id = ($1)"

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





  let getCaseEdited = (requestCaseID, requestUserID, requestName, requestAge, requestContact, callback) => {

    let inputValues = [requestCaseID, requestUserID, requestName, requestAge, requestContact];

    let query = "UPDATE cases SET name = ($3), age = ($4), contact = ($5) WHERE id = ($1) AND users_id = ($2)";

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




  let getPreferenceEdited = (case_id, likes, dislikes, callback) => {

    let inputValues = [case_id, likes, dislikes];

    let query = 'INSERT INTO preferences (case_id, likes, dislikes) values ($1, $2, $3) RETURNING *';

    dbPoolInstance.query(query, inputValues, (error, queryResult) => {
      if( error ){

        let inputValues = [case_id, likes, dislikes];

        let query = 'UPDATE preferences SET case_id = ($1), likes = ($2), dislikes = ($3) WHERE case_id = ($1) RETURNING *';

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



  let getComments= (requestCaseID, callback) => {

    let inputValues = [requestCaseID];

    let query = "SELECT * FROM comments WHERE case_id = ($1)";


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



  let getCommentsAdded = (case_id, name, comment, callback) => {

    let inputValues = [case_id, name, comment];

    let query = "INSERT INTO comments (case_id, user_name, content) VALUES ($1, $2, $3)";


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





  let getCommentEditPage = (comment_id, callback) => {

    let inputValues = [comment_id];

    let query = "SELECT comments.id, case_id, user_name, content, created_at, name FROM comments INNER JOIN cases ON (comments.case_id = cases.id) WHERE case_id = ($1)";


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



  let getCommentEdited = (comment_id, new_comment, updated_at, callback) => {

    let inputValues = [comment_id, new_comment, updated_at];


    let query = "UPDATE comments SET content = ($2), updated_at = ($3) WHERE id = ($1) RETURNING *";


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




  let getCommentDeleted = (comment_id, callback) => {

    let inputValues = [comment_id];

    let query = "DELETE FROM comments WHERE id = ($1)";


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



  let getOneCase = (user_id, case_name, callback) => {

    let inputValues = [user_id, case_name + "%"];

    let query = "SELECT * FROM cases WHERE name LIKE ($2) AND users_id = ($1)";


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






  return {
    getRegister,
    getLogin,
    getUser,
    getGroups,
    getGroupAdded,
    getCases,
    getProfileEdited,
    getPasswordChanged,
    getCaseAdded,
    getCase,
    getCaseDeleted,
    getCaseEdited,
    getPreferenceEdited,
    getComments,
    getCommentsAdded,
    getCommentEditPage,
    getCommentEdited,
    getCommentDeleted,
    getOneCase,
  };
};