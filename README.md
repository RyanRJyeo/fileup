# FileUpp


![fileup](https://raw.githubusercontent.com/RyanRJyeo/fileup/master/fileupp.herokuapp.com_.png?token=AM7DPIOAMLIDFSHV2TA4HLS5XEYGQ)




## Links
Heroku Link: https://fileupp.herokuapp.com/



## Approach
The technology used in this app consist of HTML, CSS, JC, Node.js, Express, PostgreSQL, Cloudinary API.
The app was built based on a mobile-friendly-first approach. Making sure the app worked on a mobile interface was paramount as it is meant for users to be able to use it both on mobile and on desktop/laptop, but mostly on mobile. 


I've separated the project into two parts:

1. The MVP (minimum viable product). It consist of users logging in, changing their own profile information, creating case files, editing case files, commenting on those case files, updating those comments, and lastly deleting the case files.

2. The further (additional goals). It consist of users being able to add other users, and thereafter share the case files that they have created with their friends / teammates / supervisors / bosses. Thereafter all users sharing the same case files can edit, comment, update comments on those shared case files. Users can also delete this case files but it will only be removed from their own database, and not everyone else's databases.


This separation of project segments allowed me to pace myself accordingly as I worked on the project. 


## Installation Dependencies

```
  "dependencies": {
    "cloudinary": "^1.16.0",
    "cookie-parser": "^1.4.3",
    "express": "^4.16.3",
    "express-react-views": "^0.10.5",
    "js-sha256": "^0.9.0",
    "method-override": "^2.3.10",
    "multer": "^1.4.2",
    "pg": "^7.4.3",
    "react": "^16.3.2",
    "react-dom": "^16.3.2"
  }
```



## Disclaimer
This project is a school project for web developing practice and skills showcase purpose only, some images are taken from the web:
```
https://magazine.fbk.eu/wp-content/uploads/2017/09/icona.jpg
```







## WDI Unit 2 Post Mortem (for instructors reference)

#Approach and Process

What in my process and approach to this project would I do differently next time?

```
Make sure the further goals of the project are really something that i can do before implementing them.

Due to replacing the button instructions with icons, I should provide user-interface information somewhere else on the page, perhaps a bootstrap modal or something like that.
```


What in my process and approach to this project went well that I would repeat next time?

```
Got potential user inputs and work on the project based on those inputs. Finally used ERD to plan the flow of the projects and is now convinced that ERD is really helpful. Built the app based on mobile friendly first approach. Used more bootstrap this time to hasten the styling process.
```



#Code and Code Design

What in my code and program design in the project would I do differently next time?

```
            if (this.props.friends){
                let friendList = new Set(this.props.friends.map(x=>x.first_user));
                    if (friendList.has(id)){
                        button = <form className="col align-self-center" method='GET' action='/connections'>
                                  <button type="submit" className="badge badge-pill badge-warning">This user is in your connections</button>
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
                                          <button type="submit" className="badge badge-pill badge-warning">Accept Request From This User</button>
                                        </form>

                            }.... TBC (another 80 lines or so)

	It's a very long if else function which I hope that I would be able to achieve the same effect but in a neater or shorter way.
```






What in my code and program design in the project went well? Is there anything I would do the same next time?

```
																				CREATE TABLE IF NOT EXISTS users(
																					id SERIAL PRIMARY KEY,
																					name TEXT,
																					email TEXT UNIQUE,
																					company_name TEXT,
																					password TEXT,
																					image TEXT
																				);



																				CREATE TABLE IF NOT EXISTS user_cases(
																					id SERIAL PRIMARY KEY,
																					users_id INTEGER,
																					case_id INTEGER,
																					UNIQUE (users_id, case_id)
																				);



																				CREATE TABLE IF NOT EXISTS cases(
																					id SERIAL PRIMARY KEY,
																					creator_id INTEGER,
																					name VARCHAR(20),
																					age INTEGER,
																					contact VARCHAR(20)
																				);

	This is a simple set up of relationships among multiple tables, yet by using this in my app, i was able to share content with other users, and have the content displayed the same way across all the users. Very useful
```