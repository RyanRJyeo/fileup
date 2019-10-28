var React = require("react");

class GroupPage extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let cases;

    if (this.props.results[0].cases_id){
        cases = this.props.results.map(x=>{
            let id = x.cases_id;
            let name = x.name;
            let age = x.age;
            let contact = x.contact

            return  <div class="card mr-3 mt-5">
                      <div class="card-body">
                        <h5 class="card-title">{name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Age: {age}</h6>
                        <p class="card-text">Contact: {contact}</p>
                        <a href={"/case/" + id} class="card-link files">Get this file</a>
                      </div>
                    </div>


        });
    } else {
        cases = <p className="lead text-center mt-5">No files in this folder yet</p>
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

            <div className="container">
                <div className="text-right">
                    <button type="button" class="btn btn-sm btn-info mt-3 mr-4 " data-toggle="modal" data-target="#exampleModal">
                      <i class='bx bx-edit-alt' ></i>
                    </button>
                    <button class="btn btn-sm btn-danger mt-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i class='bx bxs-eraser' ></i>
                    </button>
                </div>

                <div class="modal fade container" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Change Folder Name</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">


                        <form className="col align-self-center" method='POST' action='/groupEdit'>
                          <div className="form-group">
                            <input type="number" className="form-control rounded d-none" name="group_id" value= {this.props.results[0].group_id} readonly="true" required/>
                          </div>
                          <div className="form-group">
                            <input type="text" className="form-control rounded" name="previous_group_name" value= {this.props.results[0].group_name} readonly="true" required/>
                          </div>
                          <div className="form-group">
                            <input type="text" maxlength="20" className="form-control rounded" name="group_name" placeholder="Folder Name" required/>
                          </div>
                          <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal"><i class='bx bx-x' ></i></button>
                          <button type="submit" className="btn btn-info"><i class='bx bx-save' ></i></button>
                        </form>


                      </div>
                    </div>
                  </div>
                </div>


                <div className="mb-5">
                    <div class="collapse row justify-content-center" id="collapseExample">
                        <div class="card card-body mt-2 col-8 text-center">
                            <p>Are you sure you want to delete this folder?</p>
                            <p>It will be permanently removed from the database</p>
                            <form method='POST' action={"/groupDelete"}>
                                <input type="text" className="form-control rounded d-none" name="group_name" value= {this.props.results[0].group_name} readonly="true" required/>
                                <input type="number" className="form-control rounded d-none" name="group_id"value={this.props.results[0].group_id} readonly="true" required/>
                                <button type="submit" className="btn btn-outline-danger btn-sm">Yes Delete Permanently</button>
                            </form>
                        </div>
                    </div>
                </div>


            <h3 className="text-center mt-5">Folder: {this.props.results[0].group_name}</h3>
                <div className=" row justify-content-center">
                    {cases}
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

module.exports = GroupPage;