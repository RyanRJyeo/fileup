var React = require("react");

class Home extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let groups;

    if (this.props.groups){
        groups = this.props.groups.map(x=>{
            let id = x.id;
            let users_id = x.users_id;
            let name = x.group_name;

            return <a className="lead ml-3 d-inline-block" href={"group/" + id}>{name}</a>

        });
    } else {
        groups = <p>You have no folders yet, let's create one!</p>
    }


    let cases;

    if (this.props.cases){
        let array = []
        for (let i=0; i<this.props.cases.length; i++){
            if(this.props.cases[i].group_id == null){

                let id = this.props.cases[i].id;
                let name = this.props.cases[i].name;

                array.push(<a className="lead ml-3 d-inline-block d-none" href={"case/" + id}>{name}</a>)
                cases = array
            };
        };
    } else {
        cases = <p>You have no files yet, let's create one!</p>
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

          <div className="editProfile">
                <a className="btn btn-primary btn-sm mr-3 mt-3" href="/profileEdit" ><i class='bx bx-edit-alt' ></i></a>
          </div>
          <div className="profile">
                <img className="img-thumbnail profilePic mb-5"src={this.props.user[0].image}/>
                <div className="details">
                    <section className="text-center">
                        <p><u>Name:</u></p>
                        <p className="lead info">{this.props.user[0].name}</p>
                    </section>
                    <section className="text-center mt-5">
                        <p><u>Email:</u></p>
                        <p className="lead info">{this.props.user[0].email}</p>
                    </section>
                    <section className="text-center mt-5">
                        <p><u>Company Name:</u></p>
                        <p className="lead info">{this.props.user[0].company_name}</p>
                    </section>
                </div>
          </div>

          <div className="cases container mb-5">
                <h3 className="mt-5">
                    <u>
                        <span className="mr-3">
                            Your Folders
                        </span>
                    </u>
                    <span>
                        <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                          <i class='bx bx-folder-plus'></i>
                        </button>
                    </span>
                </h3>

                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Create Folder</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form className="col align-self-center" method='POST' action='/groupCreate'>
                          <div className="form-group">
                            <input type="number" className="form-control rounded d-none" name="user_id" value={this.props.user[0].id} readonly="true" required/>
                          </div>
                          <div className="form-group">
                            <input type="text" maxlength="20" className="form-control rounded" name="group_name" placeholder="Folder Name" required/>
                          </div>
                          <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal"><i class='bx bx-x' ></i></button>
                          <button type="submit" className="btn btn-primary"><i class='bx bx-save' ></i></button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                    {groups}
                </div>
          </div>

          <div className="cases container mb-5">
                <h3 className="mt-5"><u><span className="mr-3">Your Files</span><span><a href="/caseCreate" class="btn btn-primary btn-sm"><i class='bx bx-file'></i></a></span></u></h3>
                <div>
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

module.exports = Home;