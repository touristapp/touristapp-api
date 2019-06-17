# touristappServer

## APIs

### SERVER API Endpoints


---

- **AUTH ENDPOINT**

| method       | endpoint                       | body                                                              |  auth |
|--------------|--------------------------------|-------------------------------------------------------------------|-------|
| **POST**     | `/api/auth/register `          | body : { nickname, email, password, password_confirmation }       | none  |
| **POST**     | `/api/auth/login`              | body : { email, password }                                        | token?|

---

- **USER ENDPOINT**

| method       | endpoint                       | body                                                              |  auth |
|--------------|--------------------------------|-------------------------------------------------------------------|-------|
| **GET**      | `/api/user/`                   |                                                                   | token |
| **GET**      | `/api/user/:id`                |                                                                   | token |
| **PUT**      | `/api/user/update/:id`         | body : { nickname, email, token }                                 | token |
| **PUT**      | `/api/user/updatelocation/:id` | body : { latitude, longitude }                                    | token |
| **PUT**      | `/api/user/updatepassword/:id` | body : { old\_password, password, password\_confirmation, token } | token |
| **DELETE**   | `/api/user/delete/:id`         | body : { token }                                                  | token |
