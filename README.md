# touristapp-api

## APIs

---

### Config Vars

#### .env 

```
NODE_ENV=dev
PORT= YOUR_PORT

URI = db_url
```

#### config.json

```
{
    "dev": {
      "dialect": "postgres",
      "database": "DATABASE",
      "port": 5432,
      "user": "YOUR_USERNAME",
      "password": "YOUR_PASSWORD"
    }
}
```

---

### SERVER API Endpoints


---

- **AUTH ENDPOINT**

| method       | endpoint                       | body                                                       |  auth | done |
|--------------|--------------------------------|------------------------------------------------------------|-------|------|
| **POST**     | `/api/auth/register `          | { name, email, password, password_confirmation, picture }  | none  | yes   |
| **POST**     | `/api/auth/login`              | { email, password }                                        | none  | yes   |

---

- **USER ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/user/:id`                |                                                           | token | done   |
| **PUT**      | `/api/user/update/:id`         | { name, email, picture }                                  | token | no   |
| **PUT**      | `/api/user/updatepassword/:id` | { old\_password, password, password\_confirmation }       | token | no   |
| **PUT**      | `/api/user/recreatepassword`   | { email }                                                 | none  | no   |
| **DELETE**   | `/api/user/delete/:id`         |                                                           | token | no   |

---

- **TRAVEL ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/travel/`                 | { UserId, done }                                          | token | no   |
| **GET**      | `/api/travel/:id`              |                                                           | token | no   |
| **POST**     | `/api/travel/`                 | { UserId, departure, destination, carbonFootprint, distance, duration, id_vehicle } | token | no   |
| **PUT**      | `/api/travel/:id`              | { UserId, departure, destination, carbonFootprint, distance, duration, id_vehicle } | token | no   |
| **DELETE**   | `/api/travel/`                 | { UserId, done }                                          | token | no   |
| **DELETE**   | `/api/travel/:id`              |                                                           | token | no   |

---

- **VEHICLE ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/vehicle/:id`             |                                                           | token | yes   |
| **POST**     | `/api/vehicle/`                | { FuelId, conso }                                         | token | yes   |
| **PUT**      | `/api/vehicle/:id`             | { FuelId, conso }                                         | token | yes   |
| **DELETE**   | `/api/vehicle/:id`             |                                                           | token | no   |

---

- **FUEL ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/fuel/`                   |                                                           | token | yes   |
| **GET**      | `/api/fuel/:id`                |                                                           | token | yes   |
| **POST**     | `/api/fuel/`                   | { name, carbonFootprint }                                 | token | yes   |
| **DELETE**   | `/api/fuel/:id`                |                                                           | token | yes   |

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
| **GET**      | `/api/admin/users/             |                                                           | token | no   |
| **GET**      | `/api/admin/user/`             | { email }                                                 | token | no   |
| **PUT**      | `/api/admin/user/update/:id`   | { name, email, picture }                                  | token | no   |
| **DELETE**   | `/api/admin/user/delete/:id`   |                                                           | token | no   |
