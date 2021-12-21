# Masterpiece

---

## Used Libraries

- [Express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [morgan](https://www.npmjs.com/package/morgan)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

### Installing Dependencies

#### Node.js

You csn install it here: [Node js docs](https://nodejs.org/en/).

#### NPM Dependencies

You can install dependencies by running in you terminal:

```
npm i
```

---

#### Setting up the variables

You have to set up some variables in the `.env` file, for the app to run properly.

```
PORT=4000
DB_URL="MongoDB DB URL..."
SALT="SALT..."
SECRET_KEY="SecretKey..."
```

---

## Running the server

To run the server, in you terminal:

```
npm run dev
```

---

## Models

### Roles Model

| Key         | Type  |          Options | Default Value |
| :---------- | :---: | ---------------: | ------------: |
| Role        | Sting | Required, Unique |           N/A |
| Permissions | Array | Required, Unique |           N/A |

---

### Status Model

| Key         | Type  |  Options | Default Value |
| :---------- | :---: | -------: | ------------: |
| Status       | Sting | Required |           N/A |

---

### Users Model

| Key       |  Type  |          Options | Default Value |
| :-------- | :----: | ---------------: | ------------: |
| Name      | Sting  |         Required |           N/A |
| Email     | Sting  | Required, Unique |           N/A |
| Password  | Sting  |         Required |           N/A |
| Timestamp |  Date  |              N/A |    Date.now() |
| City      | String |              N/A |    Date.now() |
| Role      |  Ref   |         Required |           N/A |
| Status     |  Ref   |         Required |           N/A |
| Room      |  Ref   |              N/A |           N/A |

---

### Posts Model

| Key       | Type  |  Options | Default Value |
| :-------- | :---: | -------: | ------------: |
| Desc      | Sting | Required |           N/A |
| Type      | Sting | Required |           N/A |
| Timestamp | Date  | Required |    Date.now() |
| User      |  Ref  | Required |           N/A |
| Comment   |  Ref  |      N/A |           N/A |

---

### Comments Model

| Key       | Type  |  Options | Default Value |
| :-------- | :---: | -------: | ------------: |
| Desc      | Sting | Required |           N/A |
| Timestamp | Date  | Required |    Date.now() |
| User      |  Ref  | Required |           N/A |
| Post      |  Ref  | Required |           N/A |

---

### Rooms Model

| Key     |  Type  |  Options | Default Value |
| :------ | :----: | -------: | ------------: |
| From    | Sting  | Required |           N/A |
| To      | String | Required |           N/A |
| Message |  Ref   |      N/A |           N/A |

---

### Messages Model

| Key       | Type  |  Options | Default Value |
| :-------- | :---: | -------: | ------------: |
| Desc      | Sting | Required |           N/A |
| Timestamp | Date  | Required |    Date.now() |
| User      |  Ref  |      N/A |           N/A |

---

# Entity Relationship Diagram

## ![erd](https://github.com/MP-Project-Ghadier/server/blob/main/ERD_server.drawio.png?raw=true)

---

## API Reference

## Getting Started

Base URL: This application can be run locally on the http:/localhost:4000

---

## Endpoints

### User

| HTTP Method |      Endpoint      |                    Request Body | Success status | Error Status |                                                                                                        Description |
| :---------- | :----------------: | ------------------------------: | -------------: | -----------: | -----------------------------------------------------------------------------------------------------------------: |
| post        |     /register      | { email, name, password, city } |            201 |          400 |                                                     create user with encrypted password, and store user in session |
| post        |       /login       |              {email, password } |            200 |          400 | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| put         |     /user/:id      |   {email, name, password, city} |            200 |          400 |                                                                                           Update profile By a user |
| put         | /deleteAccount/:id |               {email, password} |            200 |          400 |                                                                                           Delete account By a user |
| get         |     /research      |                         {empty} |            200 |          400 |                                                                                       Check all research By a user |
| get         |   /research/:id    |                         {empty} |            200 |          400 |                                                                                          Read a research By a user |
| get         |      /events       |                         {empty} |            200 |          400 |                                                                                         Check all events By a user |
| get         |     /event/:id     |                         {empty} |            200 |          400 |                                                                                            Read an event By a user |
| get         |       /posts       |                         {empty} |            200 |          400 |                                                                                          Check all posts By a user |
| post        |      /newPost      |                  { title, desc} |            201 |          400 |                                                                                             Add new post By a user |
| get         |     /post/:id      |                         {empty} |            200 |          400 |                                                                                              Read a post By a user |
| get         |   /userPosts/:id   |                         {empty} |            200 |          400 |                                                                                          Read all posts By user id |
| put         |  /updatePost/:id   |                        { desc } |            200 |          400 |                                                                                  Update post description By a user |
| put         |  /deletePost/:id   |                       { empty } |            200 |          400 |                                                                                      Delete post By created a user |
| post        |  /newComment/:id   |                        { desc } |            201 |          400 |                                                                                        Publish a comment By a user |
| put         | /deleteComment/:id |                       { empty } |            200 |          400 |                                                                                         Delete a comment By a user |
| get         |      /center       |                         {empty} |            200 |          400 |                                                                                        Check all centers By a user |
| get         |    /center/:id     |                         {empty} |            200 |          400 |                                                                                           Check a center By a user |

---

### Specialist

| HTTP Method |    Endpoint     | Request Body | Success status | Error Status |                       Description |
| :---------- | :-------------: | -----------: | -------------: | -----------: | --------------------------------: |
| post        | /createResearch |      {empty} |            201 |          400 | Create a new research By an admin |

---

### Admin

| HTTP Method |      Endpoint      | Request Body | Success status | Error Status |                             Description |
| :---------- | :----------------: | -----------: | -------------: | -----------: | --------------------------------------: |
| get         |    /allComments    |    { empty } |            200 |          400 |           Show all comments By an admin |
| get         |     /allUsers      |      {empty} |            200 |          400 |             Check all users By an admin |
| post        |    /adminEvent     |      {empty} |            201 |          400 |          Create a new event By an admin |
| post        |   /adminResearch   |      {empty} |            201 |          400 |       Create a new research By an admin |
| put         | /appSpecialist/:id |      {empty} |            200 |          400 | Approve any specialist user By an admin |
| put         |  /appResearch/:id  |      {empty} |            200 |          400 |   Approve any research user By an admin |
| put         | /adminDelUser/:id  |      {empty} |            200 |          400 |             Delete any user By an admin |
| put         | /adminDelPost/:id  |      {empty} |            200 |          400 |             Delete any post By an admin |

---

# UML Diagram:

## ![umld](https://github.com/MP-Project-Ghadier/server/blob/main/UML.png?raw=true)

---

# Links

- [trello](https://trello.com/b/tkoa9kQQ/mp-project-ghadier)
- [deploy](https://id.heroku.com/login)
- [presentation](www.nothing.com)
- [clinet_Repo](https://github.com/MP-Project-Ghadier/client)
