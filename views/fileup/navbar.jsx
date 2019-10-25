var React = require("react");

class Navbar extends React.Component {
  render() {

    return (
        <html>
            <head>
                <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.3/css/boxicons.min.css' rel='stylesheet'/>
            </head>
            <header>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">

                  <span>
                    <a class="navbar-brand" href="/">FileUp</a>
                  </span>

                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="form-inline my-2 my-lg-0 mr-4" method='POST' action='/findCase'>
                      <input class="form-control mr-sm-2" type="text" name="name" placeholder="Find Your Files" required/>
                      <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <form class="form-inline my-2 my-lg-0 mr-4" method='POST' action='/users'>
                      <input class="form-control mr-sm-2" type="text" name="username" placeholder="Find Other Users" required/>
                      <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search Users</button>
                    </form>
                    <div class="navbar-nav">
                      <a class="btn btn-outline-dark" href="/logout">Log Out</a>
                    </div>
                  </div>

                </nav>
            </header>
        </html>
    );
  }
}

module.exports = Navbar;