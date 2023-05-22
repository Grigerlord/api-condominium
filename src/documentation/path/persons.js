module.exports = {
    persons: {
      get: {
        tags: ["Persons"],
        description: "Obtener lista de usuarios",
        operationId: "getPersons",
        parameters: [],
        responses: {
          200: {
            description: "Success",
            content: {
              "aplication/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      description: "Related message with response status",
                      example: "Success",
                    },
                    users: {
                      type: "array",
                      items: {
                        type: "object",
                        $ref: "#/components/schemas/getPersons",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Users"],
        description: "Crear nuevo usuario",
        operationId: "createUsers",
        parameters: [
          {
            // firstName: "x-access-token",
            name: "fisrtName",
            required: true,
            in: "header",
            type: "string",
            // description: "token of the session",
            description: "First name of the user",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3M2MzY2ZkYi1jYjlhLTRhMTEtOWIwYy1hMWVkYTQ3MThkYjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE3MzUyMDUsImV4cCI6MTY5MzI5MjgwNX0.hXCXWTVYhSWSgRdSFt0wBBHS-lmE4esdd-mjpNMr1S0",
          },
          {
            name: "lastName",
            required: true,
            in: "body",
            type: "string",
            description: "Last name of the user",
            example: "Petter",
          },
          {
            name: "userName",
            required: true,
            in: "body",
            type: "string",
            description: "User name of de user",
            example: "UserX",
          },
          {
            name: "email",
            required: true,
            in: "body",
            type: "string",
            description: "Email of the user",
            example: "user@example.com",
          },
          {
            name: "password",
            required: true,
            in: "body",
            type: "string",
            description: "Secret password of the user",
            example: 'abc123$',
          },
          {
            name: "age",
            required: true,
            in: "body",
            type: "number",
            description: "Age of the user",
            schema: {
                type: "integer",
                default: 0,
            },
          },
          {
            name: "phone",
            required: true,
            in: "body",
            type: "string",
            description: "Phone number of the user",
            example: '+12213456123',
          },
          {
            name: "userType",
            required: true,
            in: "body",
            type: "string",
            description: "The role of the user",
            example: 'administrator',
          },
          {
            name: "address",
            required: true,
            in: "body",
            type: "string",
            description: "Address of the user",
            schema: [
              {
                  name: 'street',
                  required: true,
                  in: "body",
                  type: "string",
                  description: "Street address of the user",
                  example: '123 Main St',
              },
              {
                name: 'city',
                required: true,
                in: "body",
                type: "string",
                description: "City address of the user",
                example: 'San Francisco',
            },
            {
                name: 'state',
                required: true,
                in: "body",
                type: "string",
                description: "State address of the user",
                example: 'CA',
            },
            {
                name: 'zip',
                required: true,
                in: "body",
                type: "number",
                description: "Zip address of the user",
                schema: {
                    type: 'integer',
                    default: 0,
                }
            },

          ],
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "aplication/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      description: "Related message with response status",
                      example: "Success",
                    },
                    user: {
                      type: "object",
                      $ref: "#/components/schemas/getUser",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    personsID: {
      get: {
        tags: ["Persons"],
        description: "Obtener detalles de un usuario",
        operationId: "getPerson",
        parameters: [
          {
            name: "_id",
            required: true,
            in: "param",
            type: "string",
            description: "person ID",
            example: "63bad1557bd860de62e144df",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "aplication/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      description: "Related message with response status",
                      example: "Success",
                    },
                    animals: {
                      type: "object",
                      $ref: "#/components/schemas/getPersons",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Persons"],
        description: "Eliminar personas",
        operationId: "deletePersons",
        parameters: [
          {
            name: "_id",
            required: true,
            in: "param",
            type: "string",
            description: "user ID",
            example: "63bad1557bd860de62e144df",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "aplication/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      description: "Related message with response status",
                      example: "Registro eliminado exitosamente",
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Persons"],
        description: "Actualizar persona",
        operationId: "upPerson",
        parameters: [
          {
            name: "_id",
            required: true,
            in: "param",
            type: "string",
            description: "person ID",
            example: "63bad1557bd860de62e144df",
          },
          {
            // name: "x-access-token",
            name: "firstName",
            required: true,
            in: "header",
            type: "string",
            // description: "token of the session",
            description: "First name of the user",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3M2MzY2ZkYi1jYjlhLTRhMTEtOWIwYy1hMWVkYTQ3MThkYjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE3MzUyMDUsImV4cCI6MTY5MzI5MjgwNX0.hXCXWTVYhSWSgRdSFt0wBBHS-lmE4esdd-mjpNMr1S0",
          },
          {
            name: "lastName",
            required: true,
            in: "body",
            type: "string",
            description: "Last name of the user",
            example: "Harry",
          },
          {
            name: "userName",
            required: true,
            in: "body",
            type: "string",
            description: "User name of de user",
            example: "UserX",
          },
          {
            name: "email",
            required: true,
            in: "body",
            type: "string",
            description: "Email of the user",
            example: "user@example.com",
          },
          {
            name: "password",
            required: true,
            in: "body",
            type: "string",
            description: "Secret password of the user",
            example: 'abc123$',
          },
          {
            name: "age",
            required: true,
            in: "body",
            type: "number",
            description: "Age of the user",
            schema: {
                type: "integer",
                default: 0,
            },
          },
          {
            name: "phone",
            required: true,
            in: "body",
            type: "string",
            description: "Phone number of the user",
            example: '+12213456123',
          },
          {
            name: "userType",
            required: true,
            in: "body",
            type: "string",
            description: "The role of the user",
            example: 'administrator',
          },
          {
            name: "address",
            required: true,
            in: "body",
            type: "string",
            description: "Address of the user",
            schema: [
              {
                  name: 'street',
                  required: true,
                  in: "body",
                  type: "string",
                  description: "Street address of the user",
                  example: '123 Main St',
              },
              {
                name: 'city',
                required: true,
                in: "body",
                type: "string",
                description: "City address of the user",
                example: 'San Francisco',
              },
              {
                name: 'state',
                required: true,
                in: "body",
                type: "string",
                description: "State address of the user",
                example: 'CA',
              },
              {
                name: 'zip',
                required: true,
                in: "body",
                type: "number",
                description: "Zip address of the user",
                schema: {
                    type: 'integer',
                    default: 0,
                }
              },
            ],
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "aplication/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      description: "Related message with response status",
                      example: "Success",
                    },
                    animal: {
                      type: "object",
                      $ref: "#/components/schemas/getUsers",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };