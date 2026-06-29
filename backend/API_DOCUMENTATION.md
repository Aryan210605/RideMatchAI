# RideMatch AI Backend API Documentation

## Authentication APIs

### Register User

POST /api/auth/register

Body:

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "rider"
}
```

---

### Login

POST /api/auth/login

Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Ride APIs

### Create Ride

POST /api/rides/create

```json
{
  "rider_id": 1,
  "pickup_location": "Delhi",
  "destination": "Kanpur",
  "ride_date": "2026-07-02",
  "ride_time": "09:30:00",
  "available_seats": 2,
  "fare": 450
}
```

---

### Get All Rides

GET /api/rides

---

### Get Ride By ID

GET /api/rides/:id

Example:

GET /api/rides/1

---

### Update Ride

PUT /api/rides/:id

```json
{
  "pickup_location": "Delhi",
  "destination": "Lucknow",
  "ride_date": "2026-07-03",
  "ride_time": "10:00:00",
  "available_seats": 3,
  "fare": 500
}
```

---

### Delete Ride

DELETE /api/rides/:id

---

### Search Ride

GET /api/rides/search?pickup=Delhi&destination=Lucknow&date=2026-07-03