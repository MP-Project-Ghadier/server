# Masterpiece

# Liks

- [trello](https://trello.com/b/tkoa9kQQ/mp-project-ghadier)
- [deploy](https://id.heroku.com/login)

- [presentation](www.nothing.com)
- [clinet_Repo](https://github.com/MP-Project-Ghadier/client)

---

## Used Libraries

- express
- cors
- morgan
- dotenv
- mongoose
- bcrypt
- jsonwebtoken

---

# UML Diagram:

## ![umld](https://github.com/MP-Project-Ghadier/server/blob/main/UML.png?raw=true)

---

# Entity Relationship Diagram

## ![erd](https://github.com/MP-Project-Ghadier/server/blob/main/ERD_server.drawio.png?raw=true)

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

#### Key Dependencies

- [Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- [mongoose](https://mongoosejs.com/) is an elegant mongodb object modeling for node.js.

- [morgan](https://www.npmjs.com/package/morgan) is a HTTP request logger middleware for node.js.

- [bcrypt](https://www.npmjs.com/package/bcrypt) is a A library to help you hash passwords.

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is a JSON Web Token implementation (symmetric and asymmetric).

---

#### ▸ Setting up the variables

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

### Users Model

| Key       |  Type  |          Options | Default Value |
| :-------- | :----: | ---------------: | ------------: |
| Name      | Sting  |         Required |           N/A |
| Email     | Sting  | Required, Unique |           N/A |
| Password  | Sting  |         Required |           N/A |
| Timestamp |  Date  |              N/A |    Date.now() |
| City      | String |              N/A |    Date.now() |
| Role      |  Ref   |         Required |           N/A |
| state     |  Ref   |         Required |           N/A |
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

### Comments Role

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

### Messages Role

| Key       | Type  |  Options | Default Value |
| :-------- | :---: | -------: | ------------: |
| Desc      | Sting | Required |           N/A |
| Timestamp | Date  | Required |    Date.now() |
| User      |  Ref  |      N/A |           N/A |

---

## API Reference

## Getting Started

Base URL: This application can be run locally on the http:/localhost:4000

---
