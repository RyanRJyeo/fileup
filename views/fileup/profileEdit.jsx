var React = require("react");

class ProfileEdit extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let alertUser;

    if (this.props.alert){
        alertUser =     <div class="alert alert-info text-center" role="alert">
                          {this.props.alert}
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

            <Navbar/>

            {alertUser}

            <div className="container mt-5">
                <h1 className="text-center mt-5">Edit Your Profile</h1>
                <a className="row justify-content-center">
                    <img type="button" data-toggle="modal" data-target="#profilePic" className="img-thumbnail editProfilePic" src={this.props.results[0].image}/>
                </a>

                <form className="col align-self-center" method='POST' action='/profileEdit'>
                  <div className="form-group">
                    <input type="number" className="form-control rounded d-none" readonly="true" name="users_id" value={this.props.results[0].id} required/>
                  </div>
                  <div className="form-group">
                    <p>Name:</p>
                    <input type="text" className="form-control rounded" name="name" placeholder={this.props.results[0].name} maxlength="20" required/>
                  </div>
                  <div className="form-group">
                    <p>Email:</p>
                    <input type="text" className="form-control rounded" readonly="true" name="email" placeholder={this.props.results[0].email} maxlength="20" required/>
                  </div>
                  <div className="form-group">
                    <p>Company Name:</p>
                    <input type="text" className="form-control rounded" name="company_name" placeholder={this.props.results[0].company_name}/>
                  </div>
                  <button type="submit" className="btn btn-info ">Save Changes</button>
                  <br/>
                  <br/>
                  <button type="button" class="btn btn-outline-info mb-5" data-toggle="modal" data-target="#exampleModalLong">Change Password?</button>
                </form>

                <div class="modal fade" id="profilePic" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Change Profile Picture</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" required/>
                          </div>
                              <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal"><i class='bx bx-x' ></i></button>
                              <button type="submit" class="btn btn-info"><i class='bx bx-save' ></i></button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Change Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form className="col align-self-center" method='POST' action='/changePassword'>
                          <div className="form-group">
                            <input type="password" className="form-control rounded" id="password" name="password" placeholder="New Password" required/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control rounded d-none" id="confirm_password" name="confirm_password" placeholder="Confirm New Password" required/>
                          </div>
                          <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal"><i class='bx bx-x' ></i></button>
                          <button type="submit" className="btn btn-info"><i class='bx bx-save' ></i></button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>



            </div>


        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="script.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = ProfileEdit;