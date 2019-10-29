var React = require("react");

class Home extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let cases;

    if (this.props.cases){
        cases = this.props.cases.map(x=>{
            let id = x.case_id;
            let name = x.name

            return <a className="lead ml-3 d-inline-block d-none files" href={"case/" + id}>{name}</a>

        });
    } else {
        cases = <p>You have no files yet, let's create one!</p>
    }


    let alertUser;

    if(this.props.alertUser){
        alertUser =     <div class="alert alert-danger text-center" role="alert">
                          {this.props.alertUser}
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
          <div className="editProfile">
                <a className="btn btn-warning btn-sm mr-3 mt-3" href="/profileEdit" ><i class='bx bx-edit-alt' ></i></a>
          </div>
          <div className="profile">
                <img className="img-thumbnail profilePic mb-5"src={this.props.user[0].image}/>
                <div className="details">
                    <section className="text-center">
                        <p><u>Name:</u></p>
                        <p className="lead warning">{this.props.user[0].name}</p>
                    </section>
                    <section className="text-center mt-5">
                        <p><u>Email:</u></p>
                        <p className="lead warning">{this.props.user[0].email}</p>
                    </section>
                    <section className="text-center mt-5">
                        <p><u>Company Name:</u></p>
                        <p className="lead warning">{this.props.user[0].company_name}</p>
                    </section>
                </div>
          </div>

          <div className="cases container mb-5">
                <h3 className="mt-5"><u><span className="mr-3">Your Files</span><span><a href="/caseCreate" class="btn btn-warning btn-sm"><i class='bx bx-file'></i></a></span></u></h3>
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