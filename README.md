# ♻️ Waste2Worth 2.0 — E-Waste Lifecycle & Valuation Platform

Waste2Worth 2.0 is an automated end-to-end circular economy platform that transforms hazardous electronic waste into recoverable wealth. It features real-time rule-based valuation, intelligent proximity-based recycler matching, cryptographic QR tracking with SHA-256 verification, and dedicated role portals for **Citizens (Users)**, **Recyclers**, and **System Administrators**.

---

## 🏗️ System Architecture

```text
                         WASTE2WORTH 2.0
                              PLATFORM
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
              ▼                                   ▼
       REACT FRONTEND                       SPRING BOOT
       (Port 5173)                          BACKEND (Port 8080)
              │                                   │
      ┌───────┼────────┐                  ┌───────┼────────┐
      │       │        │                  │       │        │
      ▼       ▼        ▼                  ▼       ▼        ▼
    User   Recycler   Admin            REST API Services Security
    UI       UI        UI                  │       │        │
                                            │       │        │
                                            └───────┼────────┘
                                                    │
                                                    ▼
                                              MongoDB Atlas
                                                Database
```

---

## 🚀 Key Modules & Algorithms

1. **Rule-Based Valuation Engine (`ValuationEngine.java`)**
   - Dynamic valuation computed using device category base rates, condition multipliers (`working`, `used`, `broken`), unit weight, and quantity.
   - Calculates citizen **EcoPoints** rewards to incentivize circular recycling.

2. **Haversine Recycler Matching (`RecyclerMatching.java` & `HaversineCalculator.java`)**
   - Real-time geospatial distance calculation using spherical trigonometry.
   - Matches requests with certified recycling centers based on accepted category, headroom capacity, and efficiency ratings.

3. **Cryptographic SHA-256 QR Verification (`HashUtility.java`)**
   - Tamper-proof tracking proofs ensuring chain-of-custody verification from citizen doorstep to recycling facility.

4. **Multi-Role Portals**
   - **User Portal**: Instant valuation estimates, doorstep pickup scheduling, status lifecycle tracking, and EcoPoints ledger.
   - **Recycler Portal**: Facility load monitoring, status transition pipeline, and precious materials inventory (Gold, Copper, Lithium, Aluminium).
   - **Admin Command Center**: Macro analytics, collection growth metrics (Recharts), and security verification logs.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Axios, Lucide Icons, Recharts, Canvas Confetti, QRCode.react, JSPDF.
- **Backend**: Java 21, Spring Boot 3.2.5, Spring Web, Spring Data MongoDB, Spring Security, Lombok.
- **Database**: MongoDB Atlas (NoSQL cloud document database).

---

## 🚦 Getting Started

### 1. MongoDB Atlas Configuration
In `backend/src/main/resources/application.properties`, update your MongoDB connection string:
```properties
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/waste2worth?retryWrites=true&w=majority
```

### 2. Run Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```

### 3. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
