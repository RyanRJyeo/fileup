const sha256 = require('js-sha256');
//          Config
//================================


module.exports = (db) => {

    let SALT = "23891289814893748274723470234809"

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

//============================================================
  let registerCC = (request, response) => {

    response.render('fileup/register');

  };
//============================================================



//============================================================
  let registerUserCC = (request, response) => {

    let name = request.body.name;
    let email = request.body.email;
    let image = request.body.image;
    let hashedpassword = sha256(SALT + request.body.password);

    db.fileup.getRegister(name, email, image, hashedpassword, (err, results)=>{

        if(results){
            response.redirect('/login');
        } else{
            response.redirect('/register');
        }
    });
  };
//============================================================



//============================================================
  let loginCC = (request, response) => {

    response.render('fileup/login');

  };
//============================================================




//============================================================
  let loginUserCC = (request, response) => {

    let email = request.body.email;
    let password = request.body.password;

    db.fileup.getLogin(email, (err,results)=>{
        if(results){
            let hashedpassword = sha256(SALT + password);

            if (hashedpassword === results[0].password){
                let user_id = results[0].id;
                let username = results[0].username;
                let hashedcookie = sha256(SALT + user_id);

                response.cookie('user_id', user_id);
                response.cookie('username', username);
                response.cookie('hasLoggedIn', hashedcookie);

                response.redirect('/');
            } else {
                response.status(403).render('fileup/errorLogin');
            };
        } else {
            response.status(403).render('fileup/errorLogin');
        };
    });
  };
//============================================================




//============================================================
  let homeCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getHome(user_id, (error, results) => {
                response.render('fileup/index', {results});
          });
        } else {
            response.redirect('/login');
        };
  };
//============================================================



//============================================================
  let caseCreateCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){

            db.fileup.getUserID(user_id, (err, results)=>{
                response.render('fileup/caseCreate', {results});
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================



//============================================================
  let addInCaseCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){

            let name = request.body.name;
            let age = request.body.age;
            let contact = request.body.contact;

            db.fileup.getCaseAdded(user_id, name, age, contact, (err, results)=>{
                if (results){
                    response.redirect('/');
                } else {
                    data = {
                        user_id: user_id
                    }
                    response.render('fileup/errorCaseCreate', data);
                };
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================



//============================================================
  let caseCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );
    let requestCaseID = request.params.id;

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getCase(requestCaseID, (error, results) => {
                console.log(results);
                response.render('fileup/case', {results});
          });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




//============================================================
  let caseEditCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            response.render('fileup/caseEdit');


          //   db.fileup.getHome(user_id, (error, results) => {

          //   response.render('fileup/caseEdit');
          // });
        } else {
            response.redirect('/login');
        };
  };
//============================================================





//============================================================
  let addGroupCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            let groupName = request.body.group;
            let case_id = request.body.case_id;

            db.fileup.getGroup(groupName, case_id, (error, results) => {
                response.redirect('/case/'+case_id);
          });
        } else {
            response.redirect('/login');
        };
  };
//============================================================






  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    register: registerCC,
    registerUser: registerUserCC,
    login: loginCC,
    loginUser: loginUserCC,
    home: homeCC,
    caseCreate: caseCreateCC,
    addInCase: addInCaseCC,
    case: caseCC,
    caseEdit: caseEditCC,
    addGroup: addGroupCC,
  };

}