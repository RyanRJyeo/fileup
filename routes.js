module.exports = (app, allModels) => {

    var multer = require('multer');
    var upload = multer({ dest: './uploads/' });
    var cloudinary = require('cloudinary');



  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const controllerCallbacks = require('./controllers/fileup')(allModels);

  app.get('/register', controllerCallbacks.register);
  app.post('/register', controllerCallbacks.registerUser);

  app.get('/login', controllerCallbacks.login);
  app.post('/login', controllerCallbacks.loginUser);

  app.get('/logout', controllerCallbacks.logout)

  app.get('/profileEdit', controllerCallbacks.profileEdit);
  app.post('/profileEdit', controllerCallbacks.profileEditing);
  app.post('/changeProfilePic', upload.single('myFile'), controllerCallbacks.changeProfilePic);
  app.post('/changePassword', controllerCallbacks.changePassword);

  app.get('/caseCreate', controllerCallbacks.caseCreate);
  app.post('/caseCreate', controllerCallbacks.addInCase);

  app.get('/case/:id', controllerCallbacks.case);
  app.post('/case/:id/delete', controllerCallbacks.deleteCase);

  app.get('/caseEdit/:id', controllerCallbacks.caseEdit);
  app.post('/caseEdit/:id', controllerCallbacks.caseEditing);

  app.get('/casePreference/:id', controllerCallbacks.preference);
  app.post('/casePreference/:id', controllerCallbacks.preferenceEdit);

  app.post('/caseComments/:id', controllerCallbacks.comments);
  app.post('/caseComment/delete', controllerCallbacks.commentDelete);
  app.get('/caseCommentsEdit/:id', controllerCallbacks.commentEdit);
  app.post('/caseCommentsEdit/:id', controllerCallbacks.commentEditing);

  app.post('/findCase', controllerCallbacks.findCase);
  app.post('/findUsers', controllerCallbacks.findUsers);

  app.post('/sendInvite', controllerCallbacks.sendInvite);
  app.get('/invitesSent', controllerCallbacks.invitesSent);
  app.get('/invitesSentAjax', controllerCallbacks.invitesSentAjax);

  app.post('/acceptRequest', controllerCallbacks.acceptRequest);
  app.get('/invitesReceived', controllerCallbacks.invitesReceived);
  app.get('/invitesReceivedAjax', controllerCallbacks.invitesReceivedAjax);

  app.get('/connections', controllerCallbacks.connections);
  app.post('/shareCase', controllerCallbacks.shareCase);

  app.get('/', controllerCallbacks.home);

};