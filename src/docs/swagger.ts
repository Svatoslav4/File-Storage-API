import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "File Storage API",
    version: "1.0.0",
    description: "REST API for uploading, listing, viewing and deleting image files stored in Cloudinary.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
    {
      url: "http://localhost:5000",
      description: "Alternative local server",
    },
  ],
  tags: [
    {
      name: "Health",
      description: "Health and status checks",
    },
    {
      name: "Files",
      description: "Operations for uploading and managing files",
    },
  ],
  components: {
    schemas: {
      File: {
        type: "object",
        required: [
          "id",
          "filename",
          "originalName",
          "mimeType",
          "size",
          "url",
          "publicId",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: {
            type: "string",
            example: "cmf_1234567890abc",
          },
          filename: {
            type: "string",
            example: "image-1712345678901.jpg",
          },
          originalName: {
            type: "string",
            example: "example.jpg",
          },
          mimeType: {
            type: "string",
            example: "image/jpeg",
          },
          size: {
            type: "integer",
            example: 245760,
          },
          url: {
            type: "string",
            format: "uri",
            example: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
          },
          publicId: {
            type: "string",
            example: "files/image-1712345678901",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-30T12:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-30T12:00:00.000Z",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "File not found",
          },
        },
      },
      UploadResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            $ref: "#/components/schemas/File",
          },
        },
      },
      FilesResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/File" },
          },
        },
      },
      DeleteResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "File deleted successfully",
          },
        },
      },
    },
  },
  paths: {
    "/": {
      get: {
        tags: ["Health"],
        summary: "Check API status",
        responses: {
          "200": {
            description: "API is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "File Storage API Running",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/files/upload": {
      post: {
        tags: ["Files"],
        summary: "Upload a new image file",
        description: "Uploads a single image file using multipart/form-data. The file field name is image.",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["image"],
                properties: {
                  image: {
                    type: "string",
                    format: "binary",
                    description: "Image file to upload. Allowed: PNG, JPG, JPEG, WEBP",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "File uploaded successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UploadResponse" },
              },
            },
          },
          "400": {
            description: "File missing or invalid",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Server error while uploading file",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/files": {
      get: {
        tags: ["Files"],
        summary: "Get all files",
        description: "Returns a list of uploaded file records ordered by creation date descending.",
        responses: {
          "200": {
            description: "Files retrieved successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FilesResponse" },
              },
            },
          },
          "500": {
            description: "Server error while fetching files",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/api/files/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Unique file identifier",
          schema: { type: "string" },
        },
      ],
      get: {
        tags: ["Files"],
        summary: "Get a file by ID",
        responses: {
          "200": {
            description: "File retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/File" },
                  },
                },
              },
            },
          },
          "404": {
            description: "File not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Server error while retrieving file",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Files"],
        summary: "Delete a file by ID",
        responses: {
          "200": {
            description: "File deleted successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DeleteResponse" },
              },
            },
          },
          "404": {
            description: "File not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Server error while deleting file",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
};

export const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: [],
}) as any;