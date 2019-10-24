module.exports = (app, allModels) => {


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
  app.get('/logout', controllerCallbacks.logout)
  app.post('/login', controllerCallbacks.loginUser);
  app.get('/caseCreate', controllerCallbacks.caseCreate);
  app.post('/caseCreate', controllerCallbacks.addInCase);
  app.get('/case/:id', controllerCallbacks.case);
  app.get('/case/:id/edit', controllerCallbacks.caseEdit);
  app.post('/case/:id/edit', controllerCallbacks.caseEditing);
  app.post('/case', controllerCallbacks.addGroup);
  app.post('/case/:id/comments', controllerCallbacks.comments);
  app.get('/case/:id/preference', controllerCallbacks.preference);
  app.post('/case/:id/preference', controllerCallbacks.preferenceEdit);
  app.get('/', controllerCallbacks.home);

};