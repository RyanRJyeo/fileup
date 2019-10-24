var React = require("react");

class CommentEdit extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let created = this.props.results[0].created_at;
    let date = `${created.getFullYear()}/${created.getMonth() + 1}/${created.getDate()}`;
    let time = `${created.getHours()}:` + `${created.getMinutes()}:${created.getSeconds()}`;

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

            <h1 className="text-center mt-5">Edit Comment: {this.props.results[0].user_name}</h1>
            <div className="container mt-5">
                <form className="col align-self-center" method='POST' action={"/case/" + this.props.results[0].case_id + "/commentEdit"}>
                  <div className="form-group">
                    <input type="number" className="form-control rounded d-none" readonly="true" name="comment_id" value={this.props.results[0].id} required/>
                  </div>
                  <div className="form-group">
                    <input type="number" className="form-control rounded d-none" readonly="true" name="case_id" value={this.props.results[0].case_id} required/>
                  </div>
                  <div className="form-group">
                    <p>Created at:</p>
                    <input type="text" className="form-control rounded" readonly="true" name="created_at" value={date + "   ("+ time + ")"} required/>
                  </div>
                  <div className="form-group">
                    <p>Previous Comment:</p>
                    <textarea type="text" rows="9" className="form-control rounded" name="previous_comment" value={this.props.results[0].content} readonly="true" required></textarea>
                  </div>
                  <div className="form-group">
                    <textarea type="text" rows="9" className="form-control rounded" name="new_comment" placeholder="Edit comment here" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mb-5">Edit Comment</button>
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

module.exports = CommentEdit;