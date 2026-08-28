📁 File Storage API

A RESTful File Storage API built with Node.js, Express, TypeScript,
PostgreSQL, Prisma, Multer, and Cloudinary.

The project provides an API for uploading, storing, retrieving, and
deleting image files using cloud storage while keeping file metadata in
PostgreSQL.

🚀 Features

📤 Upload images

☁️ Store files in Cloudinary

🔗 Return secure file URLs

📋 Get all files

🔎 Get a file by ID

🗑️ Delete files

🛡️ File type validation

📦 File size validation

🧠 Multer memory storage

🌊 Stream-based file uploading

🗄️ PostgreSQL database

🔄 Prisma ORM

⚠️ Centralized error handling

🛡️ Helmet security middleware

🌐 CORS support

📚 Swagger API documentation

🧩 Layered backend architecture

🛠️ Tech Stack

Backend

Node.js

Express.js

TypeScript

Database

PostgreSQL

Prisma ORM

Cloud Storage

Cloudinary

File Upload

Multer

Node.js Streams

Validation & Security

Zod

Helmet

CORS

API Documentation

Swagger

swagger-jsdoc

swagger-ui-express

📂 Project Structure

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

⚙️ Installation

1. Clone the repository

git clone <YOUR_REPOSITORY_URL>
cd file-storage-api

2. Install dependencies

npm install

🔐 Environment Variables

Create a .env file in the project root:

PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/filestorageAPI"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

Never commit your .env file or cloud credentials to GitHub.

Add the following to .gitignore:

.env
.env.local
node_modules/
dist/

🗄️ Database Setup

Make sure PostgreSQL is running.

Create a database named:

filestorageAPI

Then run the Prisma migration:

npx prisma migrate dev

Generate the Prisma Client:

npx prisma generate

▶️ Running the Project

Development

npm run dev

The API will be available at:

http://localhost:5000

Production

Build the project:

npm run build

Start the production server:

npm start

❤️ Health Check

GET

GET /

Example response:

{
  "success": true,
  "message": "File Storage API is running"
}

📡 API Endpoints

Base URL:

http://localhost:5000

Files

Method   Endpoint          Description

POST     /files/upload   Upload an image
GET      /files          Get all files
GET      /files/:id      Get a file by ID
DELETE   /files/:id      Delete a file

📤 Upload File

POST

POST /files/upload

The endpoint accepts multipart/form-data.

Request

In Postman:

Body
→ form-data

Field:

image

Type:

File

Example:

image: Screenshot.png

Allowed file types

PNG
JPG
JPEG
WEBP

Maximum file size

5 MB

Example response

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

📋 Get All Files

GET

GET /files

Example response:

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

Files are returned in descending order by creation date.

🔎 Get File by ID

GET

GET /files/:id

Example:

GET /files/cm123456

Example response:

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

🗑️ Delete File

DELETE

DELETE /files/:id

Example:

DELETE /files/cm123456

Delete flow

DELETE /files/:id
        ↓
Find file in PostgreSQL
        ↓
Get Cloudinary publicId
        ↓
Delete file from Cloudinary
        ↓
Delete metadata from PostgreSQL
        ↓
Return response

Example response:

{
  "success": true,
  "message": "File deleted successfully"
}

☁️ Cloudinary Integration

Cloudinary is used as the cloud storage provider.

Uploaded files are stored inside:

file-storage-api/

Cloudinary returns:

secure_url
public_id

These values are stored in PostgreSQL.

Example:

url:
https://res.cloudinary.com/your-cloud/image/upload/...

publicId:
file-storage-api/abc123

The publicId is used when deleting a file from Cloudinary.

📦 File Upload Flow

The complete upload process:

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
   │ URL + publicId
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

🧠 Architecture

The project follows a layered architecture:

Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL

Controller

Responsible for handling HTTP requests and responses.

HTTP Request
     ↓
Controller
     ↓
Service

Service

Contains the application's business logic.

For example:

Upload file
Delete file
Get file
Validate business rules

Repository

Responsible for database operations.

Examples:

prisma.file.create()
prisma.file.findMany()
prisma.file.findUnique()
prisma.file.delete()

Cloudinary Service

Responsible for communication with Cloudinary.

Main operations:

uploadFile()
deleteFile()

🗃️ Database Schema

Current File model:

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

Field description

Field            Description

id             Unique file identifier
filename       Stored filename
originalName   Original uploaded filename
mimeType       File MIME type
size           File size in bytes
url            Cloudinary file URL
publicId       Cloudinary identifier
createdAt      Creation timestamp
updatedAt      Last update timestamp

🛡️ File Validation

The API validates uploaded files by:

MIME type

image/png
image/jpeg
image/webp

File extension

.png
.jpg
.jpeg
.webp

File size

Maximum: 5 MB

Invalid files are rejected before being uploaded to Cloudinary.

🧪 Testing

The API can be tested using:

Postman

Insomnia

cURL

Swagger UI

Recommended test sequence

1. POST   /files/upload
2. GET    /files
3. GET    /files/:id
4. DELETE /files/:id
5. GET    /files/:id

Expected behavior:

Upload              → 201
Get all files       → 200
Get file by ID      → 200
Delete file         → 200
Get deleted file    → 404

Validation tests

Also test:

✓ PNG upload
✓ JPG upload
✓ JPEG upload
✓ WEBP upload
✗ PDF upload
✗ TXT upload
✗ EXE upload
✗ File larger than 5 MB
✗ Request without a file

🔍 Prisma Studio

To inspect the PostgreSQL database:

npx prisma studio

Prisma Studio will normally be available at:

http://localhost:5555

📖 Swagger API Documentation

Swagger documentation can be accessed at:

http://localhost:5000/api-docs

Swagger provides an interactive interface for viewing and testing API
endpoints.

🚨 Error Handling

The API uses centralized error handling.

Example:

{
  "success": false,
  "message": "File not found"
}

Validation error:

{
  "success": false,
  "message": "Only PNG, JPEG and WEBP images are allowed"
}

The goal is to return consistent error responses instead of exposing raw
server errors to clients.

🔒 Security

The project uses:

Helmet

CORS

Environment variables

File type validation

File size limits

Centralized error handling

Sensitive credentials should never be hardcoded into the source code.

📜 Available Scripts

# Start development server
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Create and apply Prisma migration
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

🚧 Roadmap

Planned improvements:

File ownership

Update file

Pagination

Storage abstraction

Unit tests

Integration tests

CI/CD

Multiple file upload

File folders

Soft delete

File sharing

Signed URLs

📌 Planned Architecture

The planned production-style architecture:

                         ┌──────────────┐
                         │    Client    │
                         └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │   Express    │
                         └──────┬───────┘
                                │
                                │
                         ┌──────▼───────┐
                         │ File Service │
                         └──────┬───────┘
                                │
                   ┌────────────┴────────────┐
                   │                         │
                   ▼                         ▼
            ┌──────────────┐         ┌──────────────┐
            │  PostgreSQL  │         │    Storage   │
            │    Prisma    │         │              │
            └──────────────┘         │ Cloudinary   │
                                     │      /       │
                                     │     S3       │
                                     └──────────────┘

🎯 Project Goal

The goal of this project is to build a production-style file storage
backend and practice real-world backend development concepts.

The core stack is:

Node.js
   +
Express
   +
TypeScript
   +
PostgreSQL
   +
Prisma
   +
Multer
   +
Cloudinary

The architecture is designed to be extended with authentication, AWS S3,
Redis, Docker, automated testing, and CI/CD.

👨‍💻 Author

Svatoslav Kyshiei

Backend project created for learning and demonstrating real-world
Node.js backend development.

⭐ License

This project is intended for educational and portfolio purposes.