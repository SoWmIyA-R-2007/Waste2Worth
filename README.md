# ♻️ Waste2Worth 2.0 — End-to-End E-Waste Lifecycle & Valuation Platform

Waste2Worth 2.0 is an automated circular economy platform that transforms hazardous electronic waste into recoverable wealth. It features deterministic rule-based valuation, intelligent proximity-based recycler matching, cryptographic QR tracking with SHA-256 verification, tamper-evident recycling certificates with PDF generation, and dedicated role portals for **Citizens (Users)**, **Recyclers**, and **Central Administrators**.

---

## 🏗️ System Architecture

```text
                         WASTE2WORTH 2.0
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
            USER             RECYCLER           ADMIN
          REACT UI            REACT UI          REACT UI
              │                 │                 │
              └─────────────────┼─────────────────┘
                                │
                              Axios
                                │
                                ▼
                         SPRING BOOT API
                                │
       ┌────────────────────────┼────────────────────────┐
       │                        │                        │
       ▼                        ▼                        ▼
 Authentication           Business Services          Algorithms
       │                        │                        │
       │                 ┌──────┼──────┐          ┌──────┼──────┐
       │                 │      │      │          │      │      │
       │              Valuation Pickup Processing Matching Route
       │
       └────────────────────────┬────────────────────────┘
                                │
                       Spring Data MongoDB
                                │
                                ▼
                         MONGODB ATLAS
                                │
        ┌───────────────────────┼────────────────────────┐
        │                       │                        │
        ▼                       ▼                        ▼
      USERS               E-WASTE ITEMS             RECYCLERS
                                │                        │
                                ▼                        │
                         PICKUP REQUESTS ◄──────────────┘
                                │
                                ▼
                         PICKUP ROUTES
                                │
                                ▼
                       PROCESSING RECORDS
                                │
                     ┌──────────┴──────────┐
                     ▼                     ▼
                 INVENTORY          RECOVERED MATERIALS
                     │
                     ▼
                CERTIFICATES
                     │
                     ▼
               SHA-256 VERIFY

              REWARDS ─────────► USERS
              ALERTS ─────────► ADMIN
              NOTIFICATIONS ──► USERS/RECYCLERS
```

---

## 🚀 Key Modules & Algorithms

1. **Rule-Based Valuation Engine (`ValuationEngine.java` & `ValuationService.java`)**
   - 100% deterministic calculation covering 21 e-waste categories and condition multipliers (`working`, `used`, `broken`).
   - Computes citizen **EcoPoints** rewards: 10 points per KG + 1 point per 10 INR value.

2. **Intelligent Recycler Matching (`RecyclerMatching.java` & `HaversineCalculator.java`)**
   - 4-factor scoring model:
     - **Compatibility (40%)**: Facility accepted categories.
     - **Capacity Headroom (25%)**: `(capacity - currentLoad) / capacity`.
     - **Distance Proximity (25%)**: Spherical Haversine distance.
     - **Availability (10%)**: Efficiency rating.

3. **Logistics & Route Optimization (`RouteOptimizer.java` & `RouteService.java`)**
   - Practical **Greedy / Nearest Neighbor TSP** algorithm to sequence daily pickup stops from the recycling facility.

4. **Tamper-Evident SHA-256 Verification & Chaining (`HashUtility.java` & `CertificateService.java`)**
   - Cryptographic SHA-256 hash chaining of recycling certificates.
   - Detects data tampering by comparing recomputed hashes against stored records (`MATCH` vs `SUSPICIOUS`).

5. **Official PDF Recycling Certificate (`PdfCertificateGenerator.java`)**
   - Generates downloadable compliance certificates via iText PDF with cryptographic proofs and raw material yields.

6. **Deterministic Security Rule Engine (`SecurityRuleEngine.java`)**
   - Flags rapid submission velocities (> 10 requests / 10 min).
   - Detects excessive weight (> 100 KG manual inspection).
   - Flags duplicate QR scans and illegal lifecycle state machine transitions.

---

## 📦 MongoDB Collections

| Collection | Description | Key Indexes |
| :--- | :--- | :--- |
| `users` | Citizen, Recycler, and Admin profiles with EcoPoints | `email` (UNIQUE) |
| `ewaste_items` | Registered electronics with tracking IDs (`W2W-EW-XXXXXX`) | `userId`, `status`, `matchedRecyclerId`, `category` |
| `recyclers` | Certified processing centers with daily capacity & location | `location` (2dsphere), `status`, `verified` |
| `pickup_requests` | Scheduled doorstep appointments with full audit status history | `userId`, `recyclerId`, `status`, `scheduledDate` |
| `pickup_routes` | Optimized collection routes with sequenced stops | `recyclerId`, `routeDate` |
| `processing_records`| Facility decontamination, classification, and methods | `ewasteId`, `recyclerId` |
| `inventory` | Recycler warehouse stock levels | `recyclerId`, `category` |
| `recovered_materials`| Precious & base metals recovered (Gold, Copper, Aluminium) | `recyclerId`, `processingId` |
| `certificates` | Official recycling certificates with SHA-256 block hash chaining | `certificateNumber` (UNIQUE), `ewasteId` |
| `rewards` | Transactional ledger for EcoPoints | `userId`, `ewasteId` |
| `security_alerts` | Fraud anomalies and tamper warning logs | `userId`, `status` |
| `notifications` | User notifications and unread badge counters | `userId`, `read` |

---

## 🔑 REST API Reference

### 🔐 Authentication
* `POST /api/auth/register` — Register a new citizen or recycler
* `POST /api/auth/login` — Authenticate and receive JWT Bearer token
* `GET  /api/auth/me` — Get authenticated user details

### 🖥️ E-Waste & Valuation
* `GET  /api/ewaste/estimate` — Calculate instant valuation & EcoPoints
* `POST /api/ewaste/estimate` — POST body estimate calculation
* `POST /api/ewaste` — Submit electronic waste for pickup
* `GET  /api/ewaste/{id}` — Get e-waste details
* `GET  /api/ewaste/user/{userId}` — List user submissions
* `GET  /api/ewaste/{id}/qr` — Download PNG QR code stream
* `GET  /api/ewaste/{id}/verify` — Get chain-of-custody verification data

### 🚚 Pickups & Routes
* `POST /api/pickups` — Create pickup request
* `GET  /api/pickups/{id}` — Get pickup request details
* `PUT  /api/pickups/{id}/status` — Update status with audit notes
* `POST /api/pickups/{id}/assign` — Assign collector and time slot
* `POST /api/routes/optimize` — Run Nearest-Neighbor route optimization

### 🔬 Processing & Raw Materials
* `POST /api/processing/start` — Start facility decontamination
* `PUT  /api/processing/{id}/complete` — Complete processing & record material yields
* `GET  /api/processing/recycler/{recyclerId}` — List facility processing queue

### 📜 Certificates & Verification
* `POST /api/certificates/{ewasteId}` — Issue certificate upon recycling completion
* `GET  /api/certificates/{id}` — Get certificate record
* `GET  /api/certificates/verify/{certificateNumber}` — Verify tamper-evident SHA-256
* `GET  /api/certificates/{id}/pdf` — Download official iText PDF certificate

### 🏆 Rewards & Leaderboard
* `GET  /api/rewards/user/{userId}` — Get points transaction ledger
* `GET  /api/rewards/leaderboard` — Get top circular citizens leaderboard

### 🛡️ Admin & Analytics
* `GET  /api/admin/dashboard` — Platform KPIs & environmental impact metrics
* `GET  /api/admin/users` — List registered users
* `GET  /api/admin/alerts` — Inspect security rule alerts
* `PUT  /api/admin/alerts/{id}/resolve` — Resolve security alert

---

## 🚦 Getting Started

### 1. Prerequisites
- **Java 21**
- **Node.js 18+** & **npm**
- **MongoDB** (Local instance or MongoDB Atlas URI)

### 2. Configure Environment (Optional)
In `backend/src/main/resources/application.properties` (or environment variables):
```properties
MONGODB_URI=mongodb://localhost:27017/waste2worth
JWT_SECRET=9a3c8e5f2b7d1e4a6c8b0d2e4f6a8c0b2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2
JWT_EXPIRATION=86400000
FRONTEND_URL=http://localhost:5173
```

### 3. Run Backend (Spring Boot)
```powershell
cd backend
.\mvn.cmd spring-boot:run
```
Backend will start on `http://localhost:8080`.

### 4. Run Frontend (React + Vite)
```powershell
cd frontend
npm.cmd run dev
```
Open `http://localhost:5173` in your browser.

---

## 👥 Demo Credentials

The platform automatically seeds demo accounts on first run:

| Role | Email | Password | Features |
| :--- | :--- | :--- | :--- |
| **Citizen (User)** | `sowmiya@w2w.org` | `password123` | Submit waste, valuation, live QR tracking, certificates, rewards |
| **Recycler** | `greencycle@w2w.org` | `password123` | Operations dashboard, inventory, intake decontamination, material recovery |
| **Admin** | `admin@waste2worth.gov.in` | `password123` | Command center, macro analytics, Recharts collection trends, fraud alerts |

---

## 🧪 Running Automated Tests

Run backend unit tests for all core algorithms:
```powershell
cd backend
.\mvn.cmd test
```
Tests included:
- `ValuationEngineTest`: Verifies deterministic category base rates and condition factors.
- `HaversineCalculatorTest`: Verifies distance calculation across geospatial coordinates.
- `LifecycleValidationTest`: Verifies state machine transitions and invalid skips.
- `RouteOptimizerTest`: Verifies greedy TSP route sequencing.
- `HashUtilityTest`: Verifies SHA-256 cryptographic consistency.
