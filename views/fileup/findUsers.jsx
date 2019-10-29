var React = require("react");

class FindUsers extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let users;


    if (this.props.results){
        users = this.props.results.map(x=>{
            let id = x.id;
            let name = x.name;
            let email = x.email;
            let image = x.image;
            let company_name;
            if (x.company_name){
                company_name = x.company_name
            } else {
                company_name = "Nil"
            }
            let button;



            if (this.props.friends){
                let friendList = new Set(this.props.friends.map(x=>x.first_user));
                    if (friendList.has(id)){
                        button = <form className="col align-self-center" method='GET' action='/connections'>
                                  <button type="submit" className="badge badge-pill badge-info text-white">This user is in your connections</button>
                                </form>
                    } else if (this.props.invites){

                        let receiverList = new Set(this.props.invites.map(x=>x.receiver));
                        let sender = new Set(this.props.invites.map(x=>x.sender));

                            if(sender.has(id)){
                                button =<form className="col align-self-center" method='POST' action='/acceptRequest'>
                                          <div className="form-group">
                                            <input type="number" className="form-control rounded d-none" readonly="true" name="sender_id" value={this.props.user_id} required/>
                                          </div>
                                          <div className="form-group">
                                            <input type="number" className="form-control rounded d-none" readonly="true" name="receiver_id" value={id} required/>
                                          </div>
                                          <button type="submit" className="badge badge-pill badge-info text-white">Accept Request From This User</button>
                                        </form>

                            } else if (receiverList.has(id)){
                                button = <p className="badge badge-pill badge-info text-white">You've already sent a request to this user</p>

                            } else {
                                button =<form className="col align-self-center" method='POST' action='/sendInvite'>
                                          <div className="form-group">
                                            <input type="number" className="form-control rounded d-none" readonly="true" name="sender_id" value={this.props.user_id} required/>
                                          </div>
                                          <div className="form-group">
                                            <input type="number" className="form-control rounded d-none" readonly="true" name="receiver_id" value={id} required/>
                                          </div>
                                          <button type="submit" className="badge badge-pill badge-info text-white">Send Invite To This User</button>
                                        </form>

                            };

                    } else {
                        button =    <form className="col align-self-center" method='POST' action='/sendInvite'>
                                      <div className="form-group">
                                        <input type="number" className="form-control rounded d-none" readonly="true" name="sender_id" value={this.props.user_id} required/>
                                      </div>
                                      <div className="form-group">
                                        <input type="number" className="form-control rounded d-none" readonly="true" name="receiver_id" value={id} required/>
                                      </div>
                                      <button type="submit" className="badge badge-pill badge-info text-white">Send Invite To This User</button>
                                    </form>
                    };
            } else if (this.props.invites){

                let receiverList = new Set(this.props.invites.map(x=>x.receiver));
                let sender = new Set(this.props.invites.map(x=>x.sender));

                    if(sender.has(id)){
                        button =<form className="col align-self-center" method='POST' action='/acceptRequest'>
                                  <div className="form-group">
                                    <input type="number" className="form-control rounded d-none" readonly="true" name="sender_id" value={this.props.user_id} required/>
                                  </div>
                                  <div className="form-group">
                                    <input type="number" className="form-control rounded d-none" readonly="true" name="receiver_id" value={id} required/>
                                  </div>
                                  <button type="submit" className="badge badge-pill badge-info text-white">Accept Request From This User</button>
                                </form>

                    } else if (receiverList.has(id)){
                        button = <p className="badge badge-pill badge-info text-white">You've already sent a request to this user</p>

                    } else {
                        button =<form className="col align-self-center" method='POST' action='/sendInvite'>
                                  <div className="form-group">
                                    <input type="number" className="form-control rounded d-none" readonly="true" name="sender_id" value={this.props.user_id} required/>
                                  </div>
                                  <div className="form-group">
                                    <input type="number" className="form-control rounded d-none" readonly="true" name="receiver_id" value={id} required/>
                                  </div>
                                  <button type="submit" className="badge badge-pill badge-info text-white">Send Invite To This User</button>
                                </form>

                    };

            } else {
                button =    <form className="col align-self-center" method='POST' action='/sendInvite'>
                              <div className="form-group">
                                <input type="number" className="form-control rounded d-none" readonly="true" name="sender_id" value={this.props.user_id} required/>
                              </div>
                              <div className="form-group">
                                <input type="number" className="form-control rounded d-none" readonly="true" name="receiver_id" value={id} required/>
                              </div>
                              <button type="submit" className="badge badge-pill badge-info text-white">Send Invite To This User</button>
                            </form>
            };








            return  <div class="card mr-3 mt-5">
                      <img class="card-img-top img-thumbnail" src={image} alt="Card image cap"/>
                      <div class="card-body">
                        <h5 class="card-title">{name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Email: {email}</h6>
                        <p class="card-text">Company Name: {company_name}</p>
                        {button}
                      </div>
                    </div>


        });
    } else {
        users = <p className="lead text-center mt-5">No such user found</p>
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

            <h3 className="text-center mt-5">Search Results:</h3>
                <div className=" row justify-content-center mb-5">
                    {users}
                </div>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>

      </html>
    );
  }
}

module.exports = FindUsers;