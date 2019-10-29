const sha256 = require('js-sha256');
var cloudinary = require('cloudinary');
//          Config
//================================


module.exports = (db) => {
    let SALT;
    if(process.env.SALT){
        SALT = process.env.SALT
    }else{
        SALT = "23891289814893748274723470234809"
    }

    let tempUser;
    let alertUser;

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
    response.clearCookie('user_name', { path: '/' });
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
                let hashedcookie = sha256(SALT + user_id);

                response.cookie('user_id', user_id);
                response.cookie('user_name', results[0].name);
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
            db.fileup.getUser(user_id, (error, user) => {
                db.fileup.getCases(user_id, (error, cases)=>{

                    let data = {
                        user: user,
                        cases: cases,
                        alertUser: alertUser
                    }

                    setTimeout(function(){alertUser = null}, 200);
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
            db.fileup.getUser(user_id, (error, results) => {

                let data = {
                    results: results,
                    alert: changePasswordAlert
                }

                setTimeout(function(){changePasswordAlert = null}, 200);
                response.render('fileup/profileEdit', data);
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
  let changeProfilePicCC = (request, response) => {

    let user_id = request.cookies['user_id'];

    cloudinary.uploader.upload(request.file.path, function(image) {

        db.fileup.getPPChanged(image.url, user_id, (err, results)=>{

            response.redirect('/profileEdit');

        });
      });

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

                response.render('fileup/caseCreate');

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
                    response.render('fileup/errorCaseCreate');
                };
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
            alertUser = "File " + request.body.case_name + " has been deleted"
            db.fileup.getCaseDeleted(user_id, case_id, (err, results)=>{

                response.redirect('/');

            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================


let requestCaseID;


//============================================================
  let caseCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let user_name = request.cookies['user_name'];
    let hashedValue = sha256( SALT + user_id );
    requestCaseID = request.params.id;


        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getOneCase(requestCaseID, (error, cases) => {
                if (cases){
                    let verifyUser = new Set(cases.map(x=>x.users_id))
                    let verifyUser2 = parseInt(user_id);
                    if (verifyUser.has(verifyUser2)){
                        db.fileup.getPreference(cases[0].case_id, (error, preference)=>{
                            db.fileup.getComments(cases[0].case_id, (err, comments)=>{

                                let data= {
                                    user_name: user_name,
                                    cases: cases,
                                    preference: preference,
                                    comments: comments
                                };

                                response.render('fileup/case', data);
                            });
                        });
                    } else {
                        response.redirect('/');
                    };
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
    requestCaseID = request.params.id

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getOneCase(requestCaseID, (error, results) => {
                if (results){
                    let verifyUser = new Set(results.map(x=>x.users_id))
                    let verifyUser2 = parseInt(user_id);
                    if (verifyUser.has(verifyUser2)){

                            response.render('fileup/caseEdit', {results});

                    } else {
                        response.redirect('/');
                    };
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

        let requestCaseID = request.body.id;
        let requestName = request.body.name;
        let requestAge = request.body.age;
        let requestContact = request.body.contact;
        db.fileup.getCaseEdited(requestCaseID, requestName, requestAge, requestContact, (error, results) => {

            response.redirect('/case/'+requestCaseID);

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
    requestCaseID = request.params.id;

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getOneCase(requestCaseID, (error, results) => {
                if (results){
                    let verifyUser = new Set(results.map(x=>x.users_id))
                    let verifyUser2 = parseInt(user_id);
                    if (verifyUser.has(verifyUser2)){
                        db.fileup.getPreference(requestCaseID, (err, preferences)=>{

                            let data = {
                                preferences: preferences,
                                results: results
                            };

                            response.render('fileup/preferenceEdit', data);
                        });
                    } else {
                        response.redirect('/');
                    };
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
    requestCaseID = request.params.id


    if( request.cookies['hasLoggedIn'] === hashedValue){
        let case_id = request.body.case_id;
        let likes = request.body.likes;
        let dislikes = request.body.dislikes;
        db.fileup.getPreferenceEdited(case_id, likes, dislikes, (error, results) => {

            response.redirect('/case/'+case_id);

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
    requestCaseID = request.params.id

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
    requestCommentID = request.params.id


    if( request.cookies['hasLoggedIn'] === hashedValue){
        let comment_id = requestCommentID;
        db.fileup.getCommentEditPage(comment_id, (error, results) => {
            if (results){
                let verifyUser = new Set(results.map(x=>x.user_id))
                let verifyUser2 = parseInt(user_id);
                if (verifyUser.has(verifyUser2)){

                response.render('fileup/commentEdit', {results});

                } else {
                    response.redirect('/');
                };
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


        if( request.cookies['hasLoggedIn'] === hashedValue){
            let comment_id = request.body.comment_id;
            let case_id = request.body.case_id;
            let new_comment = request.body.new_comment;
            let updated_at = Date(Date.now());
            let updated_by = request.cookies['user_name'];

            db.fileup.getCommentEdited(comment_id, new_comment, updated_at, updated_by, (error, results) => {

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




//============================================================
  let findCaseCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            let case_name = request.body.name;
            db.fileup.getSearchCase(user_id, case_name, (error, results) => {

                response.render('fileup/findCase', {results});

            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================





//============================================================
  let findUsersCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            let name = request.body.username;
            db.fileup.getSearchUsers(name, user_id, (error, results) => {
                db.fileup.getAllInvites(user_id, (err, invites)=>{
                    db.fileup.getAllFriends(user_id, (err, friends)=>{

                        let data = {
                            results: results,
                            invites: invites,
                            friends: friends,
                            user_id: user_id
                        }

                        response.render('fileup/findUsers', data);


                    });
                });
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================



//============================================================
  let sendInviteCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            let sender_id = request.body.sender_id;
            let receiver_id = request.body.receiver_id;
            db.fileup.getInvitesSent(sender_id, receiver_id, (error, results) => {

                response.redirect('/invitesSent');

            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




//============================================================
  let invitesSentCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getAllSentInvites(user_id, (error, results) => {

                response.render('fileup/allInvitesSent', {results});

            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================





//============================================================
  let invitesSentAjaxCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getAllSentInvites(user_id, (error, results) => {

                response.send({results});

            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================





//============================================================
  let acceptRequestCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            let sender_id = request.body.sender_id;
            let receiver_id = request.body.receiver_id;
            db.fileup.getRequestAccepted(sender_id, receiver_id, (error, results) => {
                db.fileup.getRequestAcceptedAgain(sender_id, receiver_id, (error, res)=>{
                    response.redirect('/connections');
                });
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================



//============================================================
  let invitesReceivedCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getAllReceivedInvites(user_id, (error, results) => {

                let data = {
                    results: results,
                    user_id: user_id
                }
                response.render('fileup/allInvitesReceived', data);

            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================



//============================================================
  let invitesReceivedAjaxCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getAllReceivedInvites(user_id, (error, results) => {

                response.send({results});

            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================


let shareMessage;


//============================================================
  let connectionsCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            db.fileup.getAllConnections(user_id, (error, results) => {
                db.fileup.getCases(user_id, (err, cases)=>{

                    let data = {
                        results: results,
                        cases: cases,
                        shareMessage: shareMessage
                    };

                    setTimeout(function(){shareMessage = null}, 200);
                    response.render('fileup/allConnections', data)
                });
            });
        } else {
            response.redirect('/login');
        };
  };
//============================================================




//============================================================
  let shareCaseCC = (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256( SALT + user_id );

        if( request.cookies['hasLoggedIn'] === hashedValue){
            let users_id = request.body.users_id;
            let case_id = request.body.case_id;
            db.fileup.getCaseShared(users_id, case_id, (error, results) => {
                if (results){
                    let case_name;
                    let user_name;
                    db.fileup.getOneCase(case_id, (err, cases)=>{
                        case_name = cases[0].name
                        db.fileup.getUser(users_id, (err, user)=>{
                            user_name = user[0].name

                                shareMessage = "File " + case_name + " has been shared with User " + user_name
                                response.redirect('/connections');

                        });
                    })
                } else {
                    shareMessage = "File have already been shared with this user"
                    response.redirect('/connections');
                }

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
    changeProfilePic: changeProfilePicCC,
    changePassword: changePasswordCC,
    caseCreate: caseCreateCC,
    deleteCase: deleteCaseCC,
    addInCase: addInCaseCC,
    case: caseCC,
    caseEdit: caseEditCC,
    caseEditing: caseEditingCC,
    preference: preferenceCC,
    preferenceEdit: preferenceEditCC,
    comments: commentsCC,
    commentEdit: commentEditCC,
    commentEditing: commentEditingCC,
    commentDelete: commentDeleteCC,
    findCase: findCaseCC,
    findUsers: findUsersCC,
    sendInvite: sendInviteCC,
    invitesSent: invitesSentCC,
    invitesSentAjax: invitesSentAjaxCC,
    acceptRequest: acceptRequestCC,
    invitesReceived: invitesReceivedCC,
    invitesReceivedAjax: invitesReceivedAjaxCC,
    connections: connectionsCC,
    shareCase: shareCaseCC,
  };

}