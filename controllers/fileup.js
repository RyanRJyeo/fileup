const sha256 = require('js-sha256');
//          Config
//================================


module.exports = (db) => {

    let SALT = process.env.SALT

    let tempUser;

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

//============================================================
  let registerCC = (request, response) => {
    let data={
        username: tempUser
    }
    setTimeout(function(){tempUser = null}, 200);
    response.render('fileup/register', data);

  };
//============================================================



//============================================================
  let registerUserCC = (request, response) => {

    let name = request.body.name;
    let email = request.body.email;
    let image = request.body.image;
    let hashedpassword = sha256(SALT + request.body.password);

    db.fileup.getRegister(name, email, image, hashedpassword, (err, results)=>{

        tempUser = request.body.name;

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
    let data={
        username: tempUser
    }
    setTimeout(function(){tempUser = null}, 200);
    response.render('fileup/login', data);

  };
//============================================================



//============================================================
  let logoutCC = (request, response) => {

    response.clearCookie('user_id', { path: '/' });
    response.clearCookie('username', { path: '/' });
    response.clearCookie('hasLoggedIn', { path: '/' });

    response.redirect('/');

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
                db.fileup.getGroups(user_id, (err, res)=>{
                    let data = {
                        results: results,
                        res: res
                    }
                    response.render('fileup/index', data);
                });
          });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




let changePasswordAlert;


//============================================================
  let profileEditCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getUserID(user_id, (error, results) => {
                let data = {
                    results: results,
                    alert: changePasswordAlert
                }
                setTimeout(function(){changePasswordAlert = null}, 200);
                response.render('fileup/profileEdit', data)
          });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




//============================================================
  let profileEditingCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){

            let name = request.body.name;
            let company_name;
            if (request.body.company_name === undefined){
                company_name = null;
            } else {
                company_name = request.body.company_name;
            }

            db.fileup.getProfileEdited(user_id, name, company_name, (error, results) => {
                response.redirect('/');
          });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




//============================================================
  let changePasswordCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){

            let hashedpassword = sha256(SALT + request.body.password);
            changePasswordAlert = "Your password have been updated"

            db.fileup.getPasswordChanged(user_id, hashedpassword, (error, results) => {
                response.redirect('/profileEdit');
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
  let deleteCaseCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            let case_id = request.body.case_id;
            console.log(request.body)

            db.fileup.getCaseDeleted(case_id, (err, results)=>{
                response.redirect('/');
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
                let verifyUser = parseInt(results[0].id);
                let verifyUser2 = parseInt(user_id);

                if (verifyUser === verifyUser2){
                    db.fileup.getComments(requestCaseID, (err, res)=>{
                            let data= {
                                results: results,
                                res: res
                            }
                            console.log(data);
                        response.render('fileup/case', data);
                    });
                } else {
                    response.redirect('/');
                };
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
    let requestCaseID = request.params.id

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getCase(requestCaseID, (error, results) => {
                let verifyUser = parseInt(results[0].id);
                let verifyUser2 = parseInt(user_id);
                if (verifyUser === verifyUser2){
                    response.render('fileup/caseEdit', {results});
                } else {
                    response.redirect('/');
                };
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================



//============================================================
  let caseEditingCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );


    if( request.cookies['hasLoggedIn'] === hashedValue){
        db.fileup.getCase(requestCaseID, (error, results) => {
            let verifyUser = parseInt(results[0].id);
            let verifyUser2 = parseInt(user_id);
            if (verifyUser === verifyUser2){
                let requestCaseID = request.body.id;
                let requestUserID = request.body.users_id;
                let requestName = request.body.name;
                let requestAge = request.body.age;
                let requestContact = request.body.contact;
                db.fileup.getCaseEdited(requestCaseID, requestUserID, requestName, requestAge, requestContact, (error, results) => {
                    response.redirect('/case/'+requestCaseID);
                });
            } else {
                response.redirect('/');
            };
        });
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





//============================================================
  let preferenceCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );
    let requestCaseID = request.params.id;

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getCase(requestCaseID, (error, results) => {
                let verifyUser = parseInt(results[0].id);
                let verifyUser2 = parseInt(user_id);
                if (verifyUser === verifyUser2){
                    response.render('fileup/preferenceEdit', {results});
                } else {
                    response.redirect('/');
                };
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




//============================================================
  let preferenceEditCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );
    let requestCaseID = request.params.id


    if( request.cookies['hasLoggedIn'] === hashedValue){
        db.fileup.getCase(requestCaseID, (error, results) => {
            let verifyUser = parseInt(results[0].id);
            let verifyUser2 = parseInt(user_id);
            if (verifyUser === verifyUser2){
                let case_id = request.body.case_id;
                let likes = request.body.likes;
                let dislikes = request.body.dislikes;

                db.fileup.getPreferenceEdited(case_id, likes, dislikes, (error, results) => {
                    response.redirect('/case/'+case_id);
                });
            } else {
                response.redirect('/');
            };
        });
    } else {
        response.redirect('/login');
    };
  };
//============================================================





//============================================================
  let commentsCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );
    let requestCaseID = request.params.id

        if( request.cookies['hasLoggedIn'] === hashedValue){

            let case_id = request.body.case_id;
            let name = request.body.name;
            let comment = request.body.content;

            db.fileup.getCommentsAdded(case_id, name, comment, (error, results) => {
                response.redirect('/case/'+case_id);
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




//============================================================
  let commentEditCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );
    let requestCaseID = request.params.id


    if( request.cookies['hasLoggedIn'] === hashedValue){
        db.fileup.getCase(requestCaseID, (error, results) => {
            let verifyUser = parseInt(results[0].id);
            let verifyUser2 = parseInt(user_id);
            if (verifyUser === verifyUser2){
                let comment_id = request.params.id;

                db.fileup.getCommentEditPage(comment_id, (error, results) => {
                    response.render('fileup/commentEdit', {results});
                });
            } else {
                response.redirect('/');
            };
        });
    } else {
        response.redirect('/login');
    };
  };
//============================================================





//============================================================
  let commentEditingCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );
    let requestCaseID = request.params.id

        if( request.cookies['hasLoggedIn'] === hashedValue){

            let comment_id = request.body.comment_id;
            let case_id = request.body.case_id;
            let new_comment = request.body.new_comment;
            let updated_at = Date(Date.now());

            db.fileup.getCommentEdited(comment_id, new_comment, updated_at, (error, results) => {
                response.redirect('/case/'+case_id);
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================





//============================================================
  let commentDeleteCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );
    let requestCaseID = request.params.id

        if( request.cookies['hasLoggedIn'] === hashedValue){

            let case_id = request.body.case_id;
            let comment_id = request.body.comment_id;

            db.fileup.getCommentDeleted(comment_id, (error, results) => {
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
    logout: logoutCC,
    loginUser: loginUserCC,
    home: homeCC,
    profileEdit: profileEditCC,
    profileEditing: profileEditingCC,
    changePassword: changePasswordCC,
    caseCreate: caseCreateCC,
    deleteCase: deleteCaseCC,
    addInCase: addInCaseCC,
    case: caseCC,
    caseEdit: caseEditCC,
    caseEditing: caseEditingCC,
    addGroup: addGroupCC,
    preference: preferenceCC,
    preferenceEdit: preferenceEditCC,
    comments: commentsCC,
    commentEdit: commentEditCC,
    commentEditing: commentEditingCC,
    commentDelete: commentDeleteCC,
  };

}