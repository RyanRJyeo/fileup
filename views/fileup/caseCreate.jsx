var React = require("react");

class CaseCreate extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    return (
      <html>
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>

            <Navbar/>

            <h1 className="display-4 text-center mt-5">Create Case File</h1>
            <div className="container mt-5">
                <form className="col align-self-center" method='POST' action='/caseCreate'>
                  <div className="form-group">
                    <input type="number" className="form-control rounded d-none" readonly="true" name="users_id" value={this.props.results[0].id} required/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control rounded" name="name" placeholder="Name" maxlength="20" required/>
                  </div>
                  <div className="form-group">
                    <input type="number" className="form-control rounded" name="age" placeholder="Age" required/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control rounded" name="contact" placeholder="Contact Number" maxlength="20" required/>
                  </div>
                  <button type="submit" className="btn btn-primary">Create This File</button>
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

module.exports = CaseCreate;