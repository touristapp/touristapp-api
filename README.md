# touristappServer

## APIs

### SERVER API Endpoints


---

- **AUTH ENDPOINT**

| method       | endpoint              | body                                                        |  auth |
|--------------|-----------------------|-------------------------------------------------------------|-------|
| **POST**     | `/api/auth/register ` | body : { nickname, email, password, password_confirmation } | none  |
| **POST**     | `/api/auth/login`     | body : { email, password }                                  | token |
