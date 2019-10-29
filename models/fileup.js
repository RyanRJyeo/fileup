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


  let getCases = (user_id, callback) => {

    let inputValues = [user_id];

    let query = "SELECT users_id, case_id, name, age, contact FROM cases INNER JOIN user_cases ON (cases.id = user_cases.case_id) WHERE user_cases.users_id = ($1) ORDER BY case_id"

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


  let getCaseAdded = (user_id, name, age, contact, callback) => {

    let inputValues = [user_id, name, age, contact];

    let query = "WITH adding_case AS (INSERT INTO cases (creator_id, name, age, contact) VALUES ($1, $2, $3, $4) RETURNING *) INSERT INTO user_cases (users_id, case_id) SELECT creator_id, id FROM adding_case RETURNING *"

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



  let getOneCase = (requestCaseID, callback) => {

    let inputValues = [requestCaseID];

    let query = 'SELECT users_id, case_id, name, age, contact FROM cases INNER JOIN user_cases ON (cases.id = user_cases.case_id) WHERE user_cases.case_id = ($1)';

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


  let getPreference = (case_id, callback) => {

    let inputValues = [case_id];

    let query = 'SELECT * FROM preferences WHERE case_id = ($1)';

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


  let getCaseDeleted = (user_id, case_id, callback) => {

    let inputValues = [user_id, case_id];

    let query = "WITH delete_case AS (DELETE FROM cases WHERE id = ($2) RETURNING *) DELETE FROM user_cases WHERE users_id = ($1) AND case_id = ($2)"

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





  let getCaseEdited = (requestCaseID, requestName, requestAge, requestContact, callback) => {

    let inputValues = [requestCaseID, requestName, requestAge, requestContact];

    let query = "UPDATE cases SET name = ($2), age = ($3), contact = ($4) WHERE id = ($1) RETURNING *";

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

    let query = "SELECT comments.id, case_id, user_name, content, created_at, name FROM comments INNER JOIN cases ON (comments.case_id = cases.id) WHERE comments.id = ($1)";


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



  let getSearchCase = (user_id, case_name, callback) => {

    let inputValues = [user_id, case_name + "%"];

    let query = "SELECT * FROM cases INNER JOIN user_cases ON (cases.id = user_cases.case_id) WHERE name LIKE ($2) AND user_cases.users_id = ($1)";


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




  let getSearchUsers = (name, user_id, callback) => {

    let inputValues = [name + "%", user_id];

    let query = "SELECT * FROM users WHERE (name LIKE ($1) OR email LIKE ($1) OR company_name LIKE ($1)) AND id != ($2)";


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




  let getAllInvites = (user_id, callback) => {

    inputValues = [user_id]

    let query = "SELECT * FROM invites WHERE sender = ($1) or receiver = ($1)";


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



  let getAllFriends = (user_id, callback) => {

    let inputValues = [user_id]

    let query = "SELECT * FROM friends WHERE first_user = ($1) OR second_user = ($1)";


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



  let getInvitesSent = (sender_id, receiver_id, callback) => {

    inputValues=[sender_id, receiver_id];

    let query = "INSERT INTO invites (sender, receiver) VALUES ($1, $2)";


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



  let getAllSentInvites = (user_id, callback) => {

    inputValues=[user_id];

    let query = "SELECT sender, receiver, users.id AS user_id, name, email, company_name, password, image FROM invites LEFT JOIN users ON (receiver = users.id) WHERE sender = ($1)";


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



  let getRequestAccepted = (sender_id, receiver_id, callback) => {

    inputValues=[sender_id, receiver_id];

    let query = "WITH pushing_to_friends AS (DELETE FROM invites WHERE sender = ($1) AND receiver = ($2) RETURNING *) INSERT INTO friends (first_user, second_user) VALUES ($1, $2)";


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



  let getRequestAcceptedAgain = (sender_id, receiver_id, callback) => {

    inputValues=[sender_id, receiver_id];

    let query = "INSERT INTO friends (first_user, second_user) VALUES ($2, $1)";


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



  let getAllReceivedInvites = (user_id, callback) => {

    inputValues=[user_id];

    let query = "SELECT sender, receiver, users.id AS user_id, name, email, company_name, password, image FROM invites LEFT JOIN users ON (sender = users.id) WHERE receiver = ($1)";


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




  let getAllConnections = (user_id, callback) => {

    inputValues=[user_id];

    let query = "SELECT users.id AS user_id, name, email, company_name, image, first_user, second_user FROM users RIGHT JOIN friends ON (friends.first_user = ($1)) WHERE (users.id = friends.first_user OR users.id = friends.second_user) AND users.id != ($1) ORDER BY users.id;"

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




  let getCaseShared = (users_id, case_id, callback) => {

    inputValues=[users_id, case_id,];

    let query = "INSERT INTO user_cases (users_id, case_id) VALUES ($1, $2) RETURNING *";


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
    getCases,
    getProfileEdited,
    getPasswordChanged,
    getCaseAdded,
    getOneCase,
    getPreference,
    getCaseDeleted,
    getCaseEdited,
    getPreferenceEdited,
    getComments,
    getCommentsAdded,
    getCommentEditPage,
    getCommentEdited,
    getCommentDeleted,
    getSearchCase,
    getSearchUsers,
    getAllInvites,
    getAllFriends,
    getInvitesSent,
    getAllSentInvites,
    getRequestAccepted,
    getRequestAcceptedAgain,
    getAllReceivedInvites,
    getAllConnections,
    getCaseShared,
  };
};