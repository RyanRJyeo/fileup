var React = require("react");

class Login extends React.Component {
  render() {


    let alertUser;

    if (this.props.username){
        alertUser =     <div class="alert alert-info text-center" role="alert">
                          Successfully registered as {this.props.username}
                        </div>
    } else {
        alertUser = null;
    }



    return (
      <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>

            {alertUser}

            <h3 className="text-center mt-5">Welcome to</h3>
            <h1 className="display-4 text-center">File<span className="yellow">Upp</span></h1>

            <div className="mt-5 login-form">
                <form  method='POST' action='/login'>
                  <h3 className="mb-4 text-center">Login</h3>
                  <div className="form-group">
                    <input type="email" className="form-control rounded" name="email" placeholder="Email" required/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control rounded" name="password" placeholder="Password" required/>
                  </div>
                  <button type="submit" className="btn btn-warning mb-3">Login</button>
                </form>
                <form  method='GET' action='/register'>
                    <button type="submit" className="btn btn-warning">New to us? Register here</button>
                </form>
            </div>





        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        </body>
      </html>
    );
  }
}

module.exports = Login;