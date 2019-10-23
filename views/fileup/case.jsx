var React = require("react");

class Case extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let button;

    if (this.props.results[0].group_name){
        button =    <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal">
                      Edit Group
                    </button>
    } else {
        button =    <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal">
                      Add Group
                    </button>
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


              <div className="editProfile container text-right">
                    <button className="btn btn-primary btn-sm mt-3">Edit</button>
              </div>


            <h1 className="row justify-content-center">{this.props.results[0].name}</h1>

            <div className="row text-center mt-5">
                <div className="basicInfoContent col">
                    <p><u>Age:</u></p>
                    <p className="lead" >{this.props.results[0].age}</p>
                </div>
                <div className="col">
                    <p><u>Contact:</u></p>
                    <p className="lead" >{this.props.results[0].contact}</p>
                </div>
                <div className="col">
                    <p><u>Group:</u></p>
                    <p className="lead">{this.props.results[0].group_name}</p>
                    {button}
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Group</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form className="col align-self-center" method='POST' action='/case'>
                      <div className="form-group">
                        <input type="number" className="form-control rounded" name="case_id" value={this.props.results[0].case_id} readonly="true" required/>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control rounded" name="group" placeholder="Group Name" required/>
                      </div>
                      <button type="btn" class="btn btn-secondary mr-4" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="container row mt-5">
                <div className="col">
                    <p><u>Likes:</u></p>
                    <li>Apples</li>
                    <li>Apples</li>
                    <li>Apples</li>
                    <button class="btn btn-outline-primary btn-sm mt-3" type="submit">Edit Likes</button>
                </div>

                <div className="col">
                    <p><u>Dislike:</u></p>
                    <li>Oranges</li>
                    <li>Pears</li>
                    <li>Apples</li>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</li>
                    <button class="btn btn-outline-primary btn-sm mt-3" type="submit">Edit Dislikes</button>
                </div>
            </div>


          <div className="comments container mt-5">
            <p><u>Comments:</u></p>

            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                  <span class="lead mr-4">Commented by Lalala</span><span>12/31/2019</span>
                  <hr class="my-4"/>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
            </div>


            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                  <span class="lead mr-4">Commented by Yoyoyo</span><span>49/31/2019</span>
                  <hr class="my-4"/>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
            </div>


            <form className="col align-self-center" method='POST' action='/register'>
              <div className="form-group">
                <textarea type="text" className="form-control rounded" name="comments" placeholder="Comment Here" required></textarea>
              </div>
              <button type="submit" className="btn btn-outline-primary btn-sm">Comment</button>
            </form>
          </div>


          <div className="container deleteButton text-right mb-5">
              <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Delete This Case
              </button>

                <div class="collapse text-left" id="collapseExample">
                  <div class="card card-body">
                    <p>Are you sure you want to delete this case?</p>
                    <p>It will be permanently removed from the database</p>
                    <button type="submit" className="btn btn-outline-primary btn-sm">Delete Case</button>
                  </div>
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

module.exports = Case;