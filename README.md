# touristapp-api

## APIs

---

### Config Vars

#### .env 

```
NODE_ENV=dev
PORT= YOUR_PORT
URI = db_url
DB_USER="..."
DB_PASSWORD="..."
SUPERSECRET="..."

#AWS S3
AWS_S3_BUCKET="..."
AWS_S3_REGION="..."
AWS_S3_SECRET_ACCESS_KEY="..."
AWS_S3_ACCESS_KEY_ID="..."
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
| **POST**     | `/api/auth/register `          | { name, email, password, password_confirmation, picture }  | none  | yes  |
| **POST**     | `/api/auth/login`              | { email, password }                                        | none  | yes  |

---

- **USER ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/user/:id`                |                                                           | token | yes  |
| **GET**      | `/api/user/vehicle/:id`        |                                                           | token | yes  |
| **PUT**      | `/api/user/:id`                | { name, email }                                           | token | yes  |
| **PUT**      | `/api/user/vehicle/:id`        | { conso, FuelId }                                         | token | yes  |
| **PUT**      | `/api/user/updatepassword/:id` | { old\_password, password, password\_confirmation }       | token | yes  |
| **PUT**      | `/api/user/recreatepassword`   | { email }                                                 | none  | no   |
| **DELETE**   | `/api/user/:id`                |                                                           | token | yes  |
| **POST**     | `/api/user/addImage/:id`       |                                                           | token | yes  |
| **DELETE**   | `/api/user/deleteImage/:fileKey`|                                                          | token | yes  |

---

- **TRAVEL ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/travel/voyage/:UserId`   |                                                           | token | yes  |
| **GET**      |`/api/travel/itineraire/:UserId`|                                                           | token | yes  |
| **GET**      | `/api/travel/:idTravel`        |                                                           | token | yes  |
| **POST**     | `/api/travel/`                 | { UserId, departure, destination, carbonFootprint, distance, duration, VehicleId } | token | yes  |
| **PUT**      | `/api/travel/:idTravel`        | { UserId, departure, destination, carbonFootprint, distance, duration, VehicleId } | token | yes  |
| **PUT**      | `/api/travel/done/:idTravel`   |                                                           | token | yes |
| **DELETE**   | `/api/travel/:id`              |                                                           | token | yes |

---

- **VEHICLE ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/vehicle/:id`             |                                                           | token | yes  |
| **POST**     | `/api/vehicle/`                | { name, FuelId, conso }                                   | token | yes  |
| **PUT**      | `/api/vehicle/:id`             | { name, FuelId, conso }                                   | token | yes  |
| **DELETE**   | `/api/vehicle/:id`             |                                                           | token | no   |

---

- **FUEL ENDPOINT**

| method       | endpoint                       | body                                                      |  auth | done |
|--------------|--------------------------------|-----------------------------------------------------------|-------|------|
| **GET**      | `/api/fuel/`                   |                                                           | token | yes   |
| **GET**      | `/api/fuel/:id`                |                                                           | token | yes   |
| **POST**     | `/api/fuel/`                   | { name, carbonFootprint, unit }                           | token | yes   |
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
| **GET**      | `/api/admin/users/`            |                                                           | token | yes  |
| **GET**      | `/api/admin/user/`             | { email }                                                 | token | no   |
| **PUT**      | `/api/admin/user/update/:id`   | { name, email, picture }                                  | token | no   |
| **DELETE**   | `/api/admin/user/delete/:id`   |                                                           | token | no   |
