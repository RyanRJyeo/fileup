var React = require("react");

class Case extends React.Component {
  render() {

    let Navbar = require('./navbar.jsx');

    let groupButton;

    if (this.props.results[0].group_name){
        groupButton =    <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal">
                      Edit Group
                    </button>
    } else {
        groupButton =    <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exampleModal">
                      Add Group
                    </button>
    }


    let preferenceContent;
    let preferenceButton;

    if (this.props.results[0].likes){
        preferenceContent = <tbody>
                                <tr>
                                    <th scope="col-6">Likes</th>
                                    <td className="preferenceContent">{this.props.results[0].likes}</td>
                                </tr>
                                <tr>
                                    <th scope="col-6">Disikes</th>
                                    <td className="preferenceContent">{this.props.results[0].dislikes}</td>
                                </tr>
                            </tbody>

        preferenceButton =  <div className="row justify-content-center">
                                <a class="btn btn-outline-primary btn-sm mt-3" href={"/case/" + this.props.results[0].case_id + "/preference"}>Edit Preferences</a>
                            </div>
    } else {
        preferenceContent = <p className="text-center mt-5">Preferences have not been set yet</p>

        preferenceButton =  <div className="row justify-content-center">
                                <a class="btn btn-outline-primary btn-sm mt-3" href={"/case/" + this.props.results[0].case_id + "/preference"}>Add Preferences</a>
                            </div>
    }


    let comments;
    if (this.props.res){
        comments = this.props.res.map(x=>{
            let comment_id = parseInt(x.id);
            let case_id = x.case_id;
            let name = x.user_name;
            let content = x.content;
            let created = x.created_at;
            let date = `${created.getFullYear()}/${created.getMonth() + 1}/${created.getDate()}`;
            let time = `${created.getHours()}:` + `${created.getMinutes()}:${created.getSeconds()}`;
            let updated_at;
            if(x.updated_at){
                let updating = new Date(x.updated_at)
                console.log("updated at is "+ updating)
                let upDate = `${updating.getFullYear()}/${updating.getMonth() + 1}/${updating.getDate()}`;
                let upTime = `${updating.getHours()}:` + `${updating.getMinutes()}:${updating.getSeconds()}`;
                updated_at =    <div>
                                    <span className="lead mr-4">Updated by {name}</span><br/><span className="mr-2">{upDate}</span><span>{upTime}</span>
                                </div>
            } else {
                updated_at = null;
            }



            return  <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <p><span className="lead mr-4">Commented by {name}</span><br/><span className="mr-2">{date}</span><span>{time}</span></p>
                            {updated_at}
                            <hr className="my-4"/>
                            <p className="comments">{content}</p>
                                <div className="row">
                                    <form className="ml-4 align-self-center" method='GET' action={"/case/" + case_id + "/commentEdit"}>
                                        <div className="form-group">
                                            <input type="number" className="form-control rounded d-none" name="comment_id" value={comment_id} readonly="true" required/>
                                        </div>
                                        <button type="submit" className="btn btn-outline-primary btn-sm"><i class='bx bx-edit-alt' ></i></button>
                                    </form>
                                    <a class="ml-4 btn btn-outline-danger btn-sm mt-3" data-toggle="collapse" href={"#multiCollapseExample" + comment_id} role="button" aria-expanded="false" aria-controls="multiCollapseExample1"><i class='bx bxs-eraser' ></i></a>
                                </div>

                                <div class="collapse multi-collapse row justify-content-center" id={"multiCollapseExample" + comment_id}>
                                  <div class="card card-body col-10 mt-3 text-center">
                                    <p>Are you sure you want to delete this comment?</p>
                                    <p>It will be permanently removed from the database</p>

                                    <form className="col align-self-center" method='POST' action='/case/commentDelete'>
                                        <div className="form-group">
                                            <input type="number" className="form-control rounded d-none" name="comment_id" value={comment_id} readonly="true" required/>
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control rounded d-none" name="case_id" value={case_id} readonly="true" required/>
                                        </div>
                                        <button type="submit" className="btn btn-outline-danger btn-sm">Delete Comment</button>
                                    </form>
                                  </div>
                                </div>

                        </div>
                    </div>
        })



    } else {
        comments = <p className="text-center mt-5">No comments for this file yet</p>
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


            <main className="container">
                <div className="editProfile container text-right">
                    <a className="btn btn-primary mt-3 mr-4" href={"/case/" + this.props.results[0].case_id + "/edit"}><i class='bx bx-edit-alt' ></i></a>
                    <button class="btn btn-danger mt-3" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i class='bx bxs-eraser' ></i>
                    </button>
                </div>

                <div className="container text-right mb-5">
                    <div class="collapse text-left row justify-content-center" id="collapseExample">
                        <div class="card card-body mt-2 col-8 text-center">
                            <p>Are you sure you want to delete this file?</p>
                            <p>It will be permanently removed from the database</p>
                            <form method='POST' action={"/case/" + this.props.results[0].case_id + "/delete"}>
                                <input type="number" className="form-control rounded d-none" name="case_id"value={this.props.results[0].case_id} readonly="true" required/>
                                <button type="submit" className="btn btn-outline-danger btn-sm">Yes Delete Permanently</button>
                            </form>
                        </div>
                    </div>
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
                        {groupButton}
                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Group</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">
                                <form className="col align-self-center" method='POST' action='/case'>
                                    <div className="form-group">
                                        <input type="number" className="form-control rounded d-none" name="case_id" value={this.props.results[0].case_id} readonly="true" required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control rounded" name="group" placeholder="Group Name" maxlength="20" required/>
                                    </div>
                                        <button type="btn" class="btn btn-secondary mr-4" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <table class="table table-sm text-center mt-5">
                    {preferenceContent}
                </table>
                {preferenceButton}

                <div className="container mt-5">
                    <p><u>Comments:</u></p>

                    {comments}

                    <form className="col align-self-center" method='POST' action={"/case/" + this.props.results[0].case_id + "/comments"}>
                        <div className="form-group">
                            <div className="form-group">
                                <input type="number" className="form-control rounded d-none" name="case_id"value={this.props.results[0].case_id} readonly="true" required/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control rounded d-none" name="name"value={this.props.results[0].user_name} readonly="true" required/>
                            </div>
                            <textarea type="text" rows="10" className="form-control rounded" name="content" placeholder="Comment Here" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-outline-primary btn-sm mb-5">Comment</button>
                    </form>
                </div>

            </main>


        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Case;