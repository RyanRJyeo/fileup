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
  app.post('/login', controllerCallbacks.loginUser);
  app.get('/case/:id', controllerCallbacks.case);
  app.post('/case', controllerCallbacks.addGroup);
  app.get('/caseCreate', controllerCallbacks.caseCreate);
  app.post('/caseCreate', controllerCallbacks.addInCase);
  app.get('/caseEdit', controllerCallbacks.caseEdit);
  app.get('/', controllerCallbacks.home);

};