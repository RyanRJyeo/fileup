var React = require("react");

class CaseEdit extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let groups;

    if (this.props.group){
        groups = this.props.group.map(x=>{
            let id = x.id;
            let name = x.group_name;

            return <option value={id}>{name}</option>

        });
    } else {
        groups = <option>No folders yet</option>
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

            <h1 className="text-center mt-5">Edit: {this.props.results[0].name}</h1>
            <div className="container mt-5">
                <form className="col align-self-center" method='POST' action={"/case/" + this.props.results[0].id + "/edit"}>
                    <div className="form-group">
                        <input type="text" className="form-control rounded d-none" name="id" value={this.props.results[0].id} readonly="true"  required/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control rounded d-none" name="users_id" value={this.props.results[0].users_id} readonly="true"  required/>
                    </div>
                    <div class="form-group">
                    <select class="form-control" id="exampleFormControlSelect1" name="group_id">
                        {groups}
                        <option>Folder not needed for this file</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <p>Name:</p>
                        <input type="text" className="form-control rounded" name="name" placeholder={this.props.results[0].name} required/>
                    </div>
                    <div className="form-group">
                        <p>Age:</p>
                        <input type="number" className="form-control rounded" name="age" placeholder={this.props.results[0].age} required/>
                    </div>
                   <div className="form-group">
                        <p>Contact Number:</p>
                        <input type="text" className="form-control rounded" name="contact" placeholder={this.props.results[0].contact} required/>
                    </div>
                    <button type="submit" className="btn btn-info">Save</button>
                </form>
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

module.exports = CaseEdit;