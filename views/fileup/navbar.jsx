var React = require("react");

class Navbar extends React.Component {
  render() {

    return (
        <html>
            <head>
                <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.3/css/boxicons.min.css' rel='stylesheet'/>
            </head>
            <header>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                  <span>
                    <a class="navbar-brand" href="/">FileUp</a>
                  </span>

                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item active">
                        <a class="nav-link" href="/connections">Connections</a>
                      </li>
                      <li class="nav-item dropdown active">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Invites <span class="badge badge-light invitesStuff"></span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a class="dropdown-item" href="/invitesSent">Invites Sent <span class="badge badge-dark invitesSent"></span></a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="/invitesReceived">Invites Received <span class="badge badge-dark invitesReceived"></span></a>
                        </div>
                      </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0 mr-4" method='POST' action='/findCase'>
                      <input class="form-control mr-sm-2" type="text" name="name" placeholder="Find Your Files" required/>
                      <button class="btn btn-outline-light my-2 my-sm-0" type="submit"><i class='bx bx-search'></i></button>
                    </form>
                    <form class="form-inline my-2 my-lg-0 mr-4" method='POST' action='/findUsers'>
                      <input class="form-control mr-sm-2" type="text" name="username" placeholder="Find Other Users" required/>
                      <button class="btn btn-outline-light my-2 my-sm-0" type="submit"><i class='bx bx-search'></i></button>
                    </form>
                    <div class="navbar-nav">
                      <a class="btn btn-outline-info" href="/logout">Log Out</a>
                    </div>
                  </div>

                </nav>
            </header>

        </html>
    );
  }
}

module.exports = Navbar;