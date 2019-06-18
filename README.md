# touristapp-api

## APIs

### SERVER API Endpoints


---

- **AUTH ENDPOINT**

| method       | endpoint                       | body                                                       |  auth | done |
|--------------|--------------------------------|------------------------------------------------------------|-------|------|
| **POST**     | `/api/auth/register `          | { name, email, password, password_confirmation, picture }  | none  | no   |
| **POST**     | `/api/auth/login`              | { email, password }                                        | none  | no   |

---

- **USER ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/user/:id`                |                                                           | token | no   |
| **PUT**      | `/api/user/update/:id`         | { name, email, picture }                                  | token | no   |
| **PUT**      | `/api/user/updatepassword/:id` | { old\_password, password, password\_confirmation }       | token | no   |
| **PUT**      | `/api/user/recreatepassword`   | { email }                                                 | none  | no   |
| **DELETE**   | `/api/user/delete/:id`         |                                                           | token | no   |

---

- **TRAVEL ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/travel/`                 | { id_user, done }                                         | token | no   |
| **GET**      | `/api/travel/:id`              |                                                           | token | no   |
| **POST**     | `/api/travel/`                 | { id_user, departure, destination, carbonFootprint, conso, id_fuel, distance, duration, id_typeTravel } | token | no   |
| **PUT**      | `/api/travel/:id`              | { id_user, departure, destination, carbonFootprint, conso, id_fuel, distance, duration, id_typeTravel } | token | no   |
| **DELETE**   | `/api/travel/`                 | { id_user, done }                                         | token | no   |
| **DELETE**   | `/api/travel/:id`              |                                                           | token | no   |

---

- **USER_VEHICLE ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/vehicle/`                | { id_user }                                               | token | no   |
| **POST**     | `/api/vehicle/`                | { id_user, conso, id_fuel }                               | token | no   |
| **PUT**      | `/api/vehicle/:id`             | { id_user, conso, id_fuel }                               | token | no   |
| **DELETE**   | `/api/vehicle/:id`             |                                                           | token | no   |

---

- **FUEL ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/fuel/`                   |                                                           | token | no   |
| **POST**     | `/api/fuel/`                   | { name }                                                  | token | no   |
| **DELETE**   | `/api/fuel/:id`                |                                                           | token | no   |

---

- **TRAVELOPTION ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/traveloption/`           |                                                           | token | no   |
| **POST**     | `/api/traveloption/`           | { name }                                                  | token | no   |
| **DELETE**   | `/api/traveloption/:id`        |                                                           | token | no   |

---

- **ADMIN ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/admin/users/`            |                                                           | token | no   |
| **GET**      | `/api/admin/user/`             | { email }                                                 | token | no   |
| **PUT**      | `/api/admin/user/update/:id`   | { name, email, picture }                                  | token | no   |
| **DELETE**   | `/api/admin/user/delete/:id`   |                                                           | token | no   |
