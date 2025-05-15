# Node-BookingProject
Bookingplattform-Project in Node.js course. 

# Camping Booking API

Detta projekt är en bokningsplattform för campingboenden (tält, stugor, husvagnar etc.) där användare kan registrera sig, logga in och boka platser. Admin kan hantera boenden och användare.

---

## Teknisk Stack

**Backend:** Node.js, Express.js
**Databas:** MongoDB (via Mongoose)
**Auth:** JWT + bcrypt
**Realtime:** Socket.io (för notifieringar)
**Deployment:** Render.com
**Övrigt:** Middleware, RBAC, validering

---

## Installera och köra lokalt

```bash
git clone git@github.com:CandyScull84/Node-BookingProject.git
cd camping-booking
npm install
````

Skapa en `.env`-fil i projektroten:

```env
PORT=5000
MONGO_URI=din_mongodb_url
JWT_SECRET=hemlig_nyckel
```

Starta servern:

```bash
node server.js
```

---

## Autentisering

| Metod  | URL                  | Beskrivning             |
| ------ | -------------------- | ----------------------- |
| `POST` | `/api/auth/register` | Registrera ny användare |
| `POST` | `/api/auth/login`    | Logga in, få JWT-token  |

---

## Boendehantering (`/api/accommodation`)

| Metod    | URL    | Roller     | Beskrivning           |
| -------- | ------ | ---------- | --------------------- |
| `GET`    | `/`    | User/Admin | Lista alla boenden    |
| `POST`   | `/`    | Admin      | Lägg till nytt boende |
| `PUT`    | `/:id` | Admin      | Uppdatera boende      |
| `DELETE` | `/:id` | Admin      | Ta bort boende        |

---

## Bokningar (`/api/booking`)

| Metod    | URL    | Roller               | Beskrivning                 |
| -------- | ------ | -------------------- | --------------------------- |
| `GET`    | `/`    | User/Admin           | Hämta användarens bokningar |
| `POST`   | `/`    | User/Admin           | Skapa bokning               |
| `PUT`    | `/:id` | User (ägare) / Admin | Uppdatera bokning           |
| `DELETE` | `/:id` | User (ägare) / Admin | Ta bort bokning             |

---

## Notifieringar

Socket.io används för att sända notifieringar när bokning skapas, uppdateras eller tas bort.

---

## Testa med Postman

1. Skicka `POST /api/auth/register`
2. Logga in via `POST /api/auth/login` – kopiera token
3. Lägg till boende via `POST /api/accommodation` (med token)
4. Skapa bokning via `POST /api/booking` (med token)


**React-baserad frontend** för att kunna utföra:

- Registrering / inloggning
- Visa tillgängliga boenden
- Göra bokningar
- Visa användarens bokningar
- Adminvy för boendehantering


