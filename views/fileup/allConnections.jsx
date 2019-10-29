var React = require("react");

class AllConnections extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let users;

    if (this.props.results){
        users = this.props.results.map(x=>{
            let id = x.user_id;
            let name = x.name;
            let email = x.email;
            let image = x.image;
            let company_name;
            if (x.company_name){
                company_name = x.company_name
            } else {
                company_name = "Nil"
            }
            let option;
            if (this.props.cases){
                option = this.props.cases.map(x=>{
                    let case_id = x.case_id
                    let case_name = x.name

                    return <option value={case_id}>{case_name}</option>
                })
            } else {
                option = <option>No case files yet</option>
            }



            return  <div class="card mr-3 mt-5">
                      <img class="card-img-top img-thumbnail" src={image} alt="Card image cap"/>
                      <div class="card-body">
                        <h5 class="card-title">{name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Email: {email}</h6>
                        <p class="card-text">Company Name: {company_name}</p>
                        <button type="button" class="btn btn-outline-info mb-5" data-toggle="modal" data-target={"#exampleModalLong" + id}>Share File <i class='bx bx-share-alt'></i></button>
                        <div class="modal fade" id={"exampleModalLong" + id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Share Files</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <form className="col align-self-center" method='POST' action='/shareCase'>
                                  <div className="form-group">
                                    <input type="number" className="form-control rounded d-none" name="users_id" value={id} readonly="true" required/>
                                  </div>
                                  <div className="form-group">
                                    <select class="form-control" id="exampleFormControlSelect1" className="form-control rounded" name="case_id" required>
                                        {option}
                                    </select>
                                  </div>
                                  <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal"><i class='bx bx-x' ></i></button>
                                  <button type="submit" className="btn btn-info"><i class='bx bx-share-alt'></i></button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>




                      </div>
                    </div>


        });
    } else {
        users = <p className="lead text-center mt-5">You have no connections yet, let's start sending some invites!</p>
    }


    let shareMessage;

    if (this.props.shareMessage){
        if (this.props.shareMessage === "File have already been shared with this user"){
            shareMessage =  <div class="alert alert-danger text-center" role="alert">
                              File have already been shared with this user
                            </div>
        } else {
            shareMessage =  <div class="alert alert-primary text-center" role="alert">
                              {this.props.shareMessage}
                            </div>
        }

    } else {
        shareMessage = null;
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

            {shareMessage}
            <h3 className="text-center mt-5">All Connections:</h3>
            <div className="container">
                <div className="row justify-content-center mb-5">
                    {users}
                </div>
            </div>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>

      </html>
    );
  }
}

module.exports = AllConnections;