# Masterpiece

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

# UML Diagram:

## ![umld](https://github.com/MP-Project-Ghadier/server/blob/main/UML.png?raw=true)

---

# ERD

## ![erd](https://github.com/MP-Project-Ghadier/server/blob/main/ERD_server.drawio.png?raw=true)

---

# Liks

- [trello](https://trello.com/b/tkoa9kQQ/mp-project-ghadier)
- [deploy](https://id.heroku.com/login)

- [presentation](www.nothing.com)
- [clinet_Repo](https://github.com/MP-Project-Ghadier/client)

---
