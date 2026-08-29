# 📁 File Storage API

A production-style RESTful File Storage API built with **Node.js, Express, TypeScript, PostgreSQL, Prisma, Multer, and Cloudinary**.

The API provides functionality for uploading, storing, retrieving, and deleting image files. Binary files are stored in **Cloudinary**, while file metadata is persisted in **PostgreSQL** using **Prisma ORM**.

The project follows a **layered backend architecture** and is designed to be extended with authentication, AWS S3, Redis, Docker, automated testing, and CI/CD.

---

## 🚀 Features

* 📤 Upload image files
* ☁️ Store files in Cloudinary
* 🔗 Return secure Cloudinary URLs
* 📋 Get all uploaded files
* 🔎 Get a file by ID
* 🗑️ Delete files
* 🛡️ File type validation
* 📦 File size validation
* 🧠 Multer memory storage
* 🌊 Stream-based Cloudinary uploads
* 🗄️ PostgreSQL database
* 🔄 Prisma ORM
* ⚠️ Centralized error handling
* 🛡️ Helmet security middleware
* 🌐 CORS support
* 📚 Swagger API documentation
* 🧩 Layered architecture
* 🔐 Environment-based configuration

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**

### Database

* **PostgreSQL**
* **Prisma ORM**

### Cloud Storage

* **Cloudinary**

### File Upload

* **Multer**
* **Node.js Streams**

### Validation & Security

* **Zod**
* **Helmet**
* **CORS**

### API Documentation

* **Swagger**
* **swagger-jsdoc**
* **swagger-ui-express**

---

## 🏗️ Architecture

The application follows a layered architecture:

```text
Client
   │
   ▼
Express
   │
   ▼
Controller
   │
   ▼
Service
   │
   ├───────────────┐
   ▼               ▼
Repository    Cloudinary Service
   │               │
   ▼               ▼
Prisma         Cloudinary
   │
   ▼
PostgreSQL
```

### Controller

Responsible for handling HTTP requests and responses.

```text
HTTP Request
     ↓
Controller
     ↓
Service
```

### Service

Contains the application's business logic.

Examples:

* Upload file
* Delete file
* Get file
* Validate business rules
* Coordinate database and cloud storage operations

### Repository

Responsible for database access through Prisma.

Examples:

```ts
prisma.file.create()
prisma.file.findMany()
prisma.file.findUnique()
prisma.file.delete()
```

### Cloudinary Service

Responsible for communication with Cloudinary.

Main operations:

```text
uploadFile()
deleteFile()
```

---

## 📂 Project Structure

```text
file-storage-api/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   │
│   ├── config/
│   │   ├── cloudinary.ts
│   │   ├── env.ts
│   │   ├── multer.ts
│   │   └── prisma.ts
│   │
│   ├── docs/
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   └── upload.middleware.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │
│   │   ├── user/
│   │   │
│   │   └── file/
│   │       ├── dto/
│   │       ├── file.controller.ts
│   │       ├── file.repository.ts
│   │       ├── file.routes.ts
│   │       ├── file.service.ts
│   │       └── file.validation.ts
│   │
│   ├── services/
│   │   ├── cloudinary.service.ts
│   │   └── storage.service.ts
│   │
│   ├── types/
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd file-storage-api
```

## 2. Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/filestorageAPI"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### ⚠️ Important

Never commit `.env` or cloud credentials to GitHub.

Add the following to `.gitignore`:

```gitignore
.env
.env.local
node_modules/
dist/
```

---

# 🗄️ Database Setup

Make sure PostgreSQL is installed and running.

Create a database named:

```text
filestorageAPI
```

Then apply the Prisma migration:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

You can inspect your database using Prisma Studio:

```bash
npx prisma studio
```

Prisma Studio will normally be available at:

```text
http://localhost:5555
```

---

# ▶️ Running the Project

## Development

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

## Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# ❤️ Health Check

### `GET /`

Returns the current API status.

**Response:**

```json
{
  "success": true,
  "message": "File Storage API is running"
}
```

---

# 📡 API Endpoints

Base URL:

```text
http://localhost:5000
```

| Method   | Endpoint        | Description      |
| -------- | --------------- | ---------------- |
| `POST`   | `/files/upload` | Upload an image  |
| `GET`    | `/files`        | Get all files    |
| `GET`    | `/files/:id`    | Get a file by ID |
| `DELETE` | `/files/:id`    | Delete a file    |

---

# 📤 Upload File

### `POST /files/upload`

Uploads an image using `multipart/form-data`.

### Request

In Postman:

```text
Body
  → form-data
```

Field:

```text
image
```

Type:

```text
File
```

Example:

```text
image: Screenshot.png
```

### Allowed file types

* PNG
* JPG
* JPEG
* WEBP

### Maximum file size

```text
5 MB
```

### Example response

```json
{
  "success": true,
  "data": {
    "id": "cm123456",
    "filename": "Screenshot.png",
    "originalName": "Screenshot.png",
    "mimeType": "image/png",
    "size": 9203,
    "url": "https://res.cloudinary.com/...",
    "publicId": "file-storage-api/..."
  }
}
```

---

# 📋 Get All Files

### `GET /files`

Returns all uploaded files.

Files are sorted by creation date in descending order.

### Example response

```json
{
  "success": true,
  "data": [
    {
      "id": "cm123456",
      "filename": "Screenshot.png",
      "originalName": "Screenshot.png",
      "mimeType": "image/png",
      "size": 9203,
      "url": "https://res.cloudinary.com/...",
      "publicId": "file-storage-api/...",
      "createdAt": "2026-08-27T12:00:00.000Z",
      "updatedAt": "2026-08-27T12:00:00.000Z"
    }
  ]
}
```

---

# 🔎 Get File by ID

### `GET /files/:id`

Returns information about a specific file.

### Example

```http
GET /files/cm123456
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "cm123456",
    "filename": "Screenshot.png",
    "originalName": "Screenshot.png",
    "mimeType": "image/png",
    "size": 9203,
    "url": "https://res.cloudinary.com/...",
    "publicId": "file-storage-api/..."
  }
}
```

---

# 🗑️ Delete File

### `DELETE /files/:id`

Deletes a file from both Cloudinary and PostgreSQL.

### Example

```http
DELETE /files/cm123456
```

### Delete flow

```text
DELETE /files/:id
        │
        ▼
Find file in PostgreSQL
        │
        ▼
Get Cloudinary publicId
        │
        ▼
Delete file from Cloudinary
        │
        ▼
Delete metadata from PostgreSQL
        │
        ▼
Return response
```

### Example response

```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

---

# ☁️ Cloudinary Integration

Cloudinary is used as the cloud storage provider.

Uploaded files are stored inside:

```text
file-storage-api/
```

Cloudinary provides:

```text
secure_url
public_id
```

These values are stored in PostgreSQL.

Example:

```text
url:
https://res.cloudinary.com/your-cloud/image/upload/...

publicId:
file-storage-api/abc123
```

The `publicId` is used to identify and delete the corresponding file from Cloudinary.

---

# 📦 File Upload Flow

The complete upload process:

```text
Client
   │
   │ multipart/form-data
   ▼
Express
   │
   ▼
Multer
   │
   │ file.buffer
   ▼
File Controller
   │
   ▼
File Service
   │
   ▼
Cloudinary Service
   │
   ▼
Cloudinary
   │
   │ secure_url + public_id
   ▼
File Repository
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
   │
   ▼
JSON Response
```

---

# 🗃️ Database Schema

Current `File` model:

```prisma
model File {
  id           String   @id @default(cuid())
  filename     String
  originalName String
  mimeType     String
  size         Int
  url          String
  publicId     String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Field Description

| Field          | Description                  |
| -------------- | ---------------------------- |
| `id`           | Unique file identifier       |
| `filename`     | Stored filename              |
| `originalName` | Original uploaded filename   |
| `mimeType`     | File MIME type               |
| `size`         | File size in bytes           |
| `url`          | Cloudinary secure URL        |
| `publicId`     | Cloudinary public identifier |
| `createdAt`    | Creation timestamp           |
| `updatedAt`    | Last update timestamp        |

---

# 🛡️ File Validation

Uploaded files are validated before being sent to Cloudinary.

### MIME type

Allowed:

```text
image/png
image/jpeg
image/webp
```

### File extension

Allowed:

```text
.png
.jpg
.jpeg
.webp
```

### File size

Maximum:

```text
5 MB
```

Invalid files are rejected before they are uploaded to Cloudinary.

---

# 🧪 Testing

The API can be tested using:

* Postman
* Insomnia
* cURL
* Swagger UI

## Recommended test sequence

```text
1. POST   /files/upload
2. GET    /files
3. GET    /files/:id
4. DELETE /files/:id
5. GET    /files/:id
```

### Expected results

| Request          | Expected Status |
| ---------------- | --------------: |
| Upload           |           `201` |
| Get all files    |           `200` |
| Get file by ID   |           `200` |
| Delete file      |           `200` |
| Get deleted file |           `404` |

### Validation tests

Test the following cases:

```text
✓ PNG upload
✓ JPG upload
✓ JPEG upload
✓ WEBP upload

✗ PDF upload
✗ TXT upload
✗ EXE upload
✗ File larger than 5 MB
✗ Request without a file
```

---

# 📖 Swagger API Documentation

Swagger UI is available at:

```text
http://localhost:5000/api-docs
```

Swagger provides an interactive interface for:

* Viewing available endpoints
* Inspecting request schemas
* Inspecting response schemas
* Testing API endpoints

---

# 🚨 Error Handling

The application uses centralized error handling to provide consistent API responses.

### Example

```json
{
  "success": false,
  "message": "File not found"
}
```

### Validation error

```json
{
  "success": false,
  "message": "Only PNG, JPEG and WEBP images are allowed"
}
```

The goal is to prevent raw server errors from being exposed to API clients.

---

# 🔒 Security

The project includes several security and validation mechanisms:

* **Helmet** for HTTP security headers
* **CORS** configuration
* Environment variables for secrets
* File type validation
* File size limits
* Centralized error handling
* No hardcoded Cloudinary credentials

Sensitive credentials should never be committed to the repository.

---

# 📜 Available Scripts

### Start development server

```bash
npm run dev
```

### Build TypeScript

```bash
npm run build
```

### Start production server

```bash
npm start
```

### Create and apply Prisma migration

```bash
npx prisma migrate dev
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

# 🚧 Roadmap

Planned improvements:

* [ ] Authentication
* [ ] File ownership
* [ ] User management
* [ ] Update file
* [ ] Pagination
* [ ] Storage abstraction
* [ ] Unit tests
* [ ] Integration tests
* [ ] CI/CD
* [ ] Multiple file upload
* [ ] File folders
* [ ] Soft delete
* [ ] File sharing
* [ ] Signed URLs
* [ ] AWS S3 support
* [ ] Redis integration
* [ ] Docker support

---

# 🏛️ Planned Production Architecture

The planned architecture is designed to make the storage layer replaceable.

```text
                         ┌──────────────┐
                         │    Client    │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │   Express    │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ File Service │
                         └──────┬───────┘
                                │
                   ┌────────────┴────────────┐
                   │                         │
                   ▼                         ▼
            ┌──────────────┐         ┌──────────────┐
            │  PostgreSQL  │         │   Storage    │
            │    Prisma    │         │   Service    │
            └──────────────┘         └──────┬───────┘
                                            │
                                  ┌─────────┴─────────┐
                                  │                   │
                                  ▼                   ▼
                            ┌───────────┐       ┌───────────┐
                            │ Cloudinary│       │    S3     │
                            └───────────┘       └───────────┘
```

This approach allows the application to switch between different storage providers without significantly changing the business logic.

---

# 🎯 Project Goal

The goal of this project is to build a **production-style file storage backend** while practicing real-world backend development concepts.

The project demonstrates experience with:

* REST API development
* TypeScript
* Express.js
* PostgreSQL
* Prisma ORM
* File uploads
* Multer
* Node.js Streams
* Cloudinary
* Input validation
* Security middleware
* Error handling
* Layered architecture
* API documentation

The architecture is designed to be extended with authentication, AWS S3, Redis, Docker, automated testing, and CI/CD.

---

# 👨‍💻 Author

**Svatoslav Kyshiei**

Backend project created for learning and demonstrating real-world Node.js backend development.

---

# ⭐ License

This project is intended for **educational and portfolio purposes**.
