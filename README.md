# 🏨 Hotell Lunden – Bokningsplattform

Välkommen till **Hotell Lunden** – en modern bokningsplattform för arbetsplatser och konferensrum. Användare kan registrera sig, logga in och boka rum. Administratörer kan hantera alla användare, rum och bokningar.

---

## 🚀 Funktioner

### 👤 Användare
- Registrering och inloggning (JWT-autentisering)
- Se sina bokningar
- Skapa, uppdatera och ta bort egna bokningar
- Realtidsnotifiering vid bokningar

### 🛠️ Admin
- Hantera rum (skapa, redigera, ta bort)
- Se alla användare
- Se alla bokningar
- Ta bort användare

---

## 🧱 Teknikstack

| Teknologi          | Användning                          |
|--------------------|-------------------------------------|
| Node.js            | Backend-server                      |
| Express.js         | Routing och middleware              |
| MongoDB + Mongoose | Databas och modeller                |
| JWT + bcrypt       | Autentisering & lösenordshantering  |
| Socket.io          | Realtidsnotifieringar               |
| Redis              | Caching av data (rum och användare) |
| React.js           | Frontend UI                         |
| Material UI        | Komponentbibliotek (UI)             |
| Axios              | HTTP-anrop i frontend               |

---

## 🛠️ Miljövariabler

Skapa en `.env`-fil i backendprojektets rot med följande innehåll:

```env
# MongoDB
MONGO_URI=din_mongodb_uri

# JWT
JWT_SECRET=hemlig_jwt_nyckel

# Port
PORT=5000

# CORS-stöd för frontend
CLIENT_URL=http://localhost:3000

# Redis
REDIS_URL=redis://:<password>@<redis-host>:<port>

# Socket.io
SOCKET_URL=ws://localhost:5000
```

> 🔐 Lägg till `.env` i `.gitignore` så det inte pushas till GitHub.

---

## 🧩 Installation (Lokalt)


# Klona projektet
git clone <repo-url>
cd hotell-lunden

# Installera backend
cd backend
npm install

# Installera frontend
cd ../frontend
npm install
```

### Starta projektet

# Backend
cd backend
node server.js

# Frontend
cd Hotell-frontend
npm start
```

---

## 🌐 API-specifikation

### 🔐 Autentisering
| Metod | URL                  | Roll     | Beskrivning             |
|-------|----------------------|----------|--------------------------|
| POST  | /api/auth/register   | Anonym   | Skapa ny användare       |
| POST  | /api/auth/login      | Anonym   | Logga in, få JWT-token   |
| GET   | /api/auth/all        | Admin    | Hämta alla användare     |

### 🏠 Rum
| Metod | URL                  | Roll     | Beskrivning              |
|-------|----------------------|----------|--------------------------|
| GET   | /api/rooms           | Alla     | Lista alla rum           |
| POST  | /api/rooms           | Admin    | Skapa nytt rum           |
| PUT   | /api/rooms/:id       | Admin    | Uppdatera rum            |
| DELETE| /api/rooms/:id       | Admin    | Ta bort rum              |

### 📅 Bokningar
| Metod  | URL               | Roll        | Beskrivning                      |
|--------|-------------------|-------------|----------------------------------|
| GET    | /api/booking      | User/Admin  | Hämta bokningar                  |
| POST   | /api/booking      | User/Admin  | Skapa ny bokning                 |
| PUT    | /api/booking/:id  | User/Admin  | Uppdatera bokning (om ägare)     |
| DELETE | /api/booking/:id  | User/Admin  | Radera bokning (om ägare)        |

---

## ⚡ Realtidsnotifieringar

- Socket.io används för att sända notifieringar när:
  - En bokning skapas
  - En bokning ändras eller tas bort

> Frontend kopplar upp sig automatiskt mot `SOCKET_URL`.

---

## 🧠 Caching med Redis

- Redis används för att cacha ofta hämtad data:
  - `GET /api/rooms`
  - `GET /api/auth/all` (admin – användarlista)
- Standard-cachetid: 1 timme (3600 sek)

---

## 🧪 Tester med Postman

1. Registrera ny användare via `POST /api/auth/register`
2. Logga in via `POST /api/auth/login` → hämta JWT-token
3. Lägg till rum (admin) via `POST /api/rooms` (med token)
4. Skapa bokning via `POST /api/booking`

---

## 📦 Deployment

| Del       | Status               |
|-----------|----------------------|
| Backend   | ⚠️ Ej deployad än    |
| Frontend  | ⚠️ Ej deployad än    |

> När deployment är klar, uppdatera:
> - `CLIENT_URL` i backend `.env`
> - `baseURL` i frontendens `API.js`

---

## 📁 Projektstruktur

```
/backend
  /config
  /controllers
  /models
  /routes
  /middleware
  /utils
  server.js
  .env
/frontend
  /components
  /constants
  /pages
  /hooks
  /utils
  App.js
  index.js
```

---

## 👤 Roller

| Roll   | Funktioner                                |
|--------|--------------------------------------------|
| User   | Boka rum, se egna bokningar                |
| Admin  | Hantera rum, se användare och bokningar    |

---

## 📸 Screenshots

> 💡 Lägg till skärmbilder här på t.ex.
> - Bokningsformulär
> - Adminvy
> - Inloggningssida

---

## 🧹 TODO

- [ ] Deployment på Render/Vercel
- [ ] Skärmbilder i README
- [ ] Responsiv design
- [ ] Extra UI-finesser (filter, sök)

---

## 🙌 Tack för att du använder Hotell Lunden!