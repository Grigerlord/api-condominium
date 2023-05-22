module.exports = {
  animals: {
    get: {
      tags: ["Animals"],
      description: "Obtener lista de animales",
      operationId: "getAnimals",
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
                  animals: {
                    type: "array",
                    items: {
                      type: "object",
                      $ref: "#/components/schemas/getAnimals",
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
      tags: ["Animals"],
      description: "Crear nuevo animal",
      operationId: "createAnimals",
      parameters: [
        {
          name: "x-access-token",
          required: true,
          in: "header",
          type: "string",
          description: "token of the session",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3M2MzY2ZkYi1jYjlhLTRhMTEtOWIwYy1hMWVkYTQ3MThkYjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE3MzUyMDUsImV4cCI6MTY5MzI5MjgwNX0.hXCXWTVYhSWSgRdSFt0wBBHS-lmE4esdd-mjpNMr1S0",
        },
        {
          name: "name",
          required: true,
          in: "body",
          type: "string",
          description: "Name of the animal",
          example: "León",
        },
        {
          name: "family",
          required: true,
          in: "body",
          type: "string",
          description: "Family of the animal",
          example: "Felidae",
        },
        {
          name: "description",
          required: true,
          in: "body",
          type: "string",
          description: "description of the animal",
          example: "El león (Panthera leo) es un mamífero carnívoro de la familia de los félidos y una de las cinco especies del género Panthera. Los leones salvajes viven en poblaciones cada vez más dispersas y fragmentadas del África subsahariana (a excepción de las regiones selváticas de la costa del Atlántico y la cuenca del Congo) y una pequeña zona del noroeste de India (una población en peligro crítico en el parque nacional del Bosque de Gir y alrededores), habiendo desaparecido del resto de Asia del Sur, Asia Occidental, África del Norte y la península balcánica en tiempos históricos. ",
        },
        {
          name: "age",
          required: true,
          in: "body",
          type: "number",
          description: "age of the animal",
          schema: {
            type: "integer",
            default: 0,
          },
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
                    $ref: "#/components/schemas/getAnimals",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  animalsID: {
    get: {
      tags: ["Animals"],
      description: "Obtener detalles de un animal",
      operationId: "getAnimal",
      parameters: [
        {
          name: "_id",
          required: true,
          in: "param",
          type: "string",
          description: "animal ID",
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
                    $ref: "#/components/schemas/getAnimals",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Animals"],
      description: "Eliminar animal",
      operationId: "deleteAnimal",
      parameters: [
        {
          name: "_id",
          required: true,
          in: "param",
          type: "string",
          description: "animal ID",
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
      tags: ["Animals"],
      description: "Actualizar animal",
      operationId: "upAnimal",
      parameters: [
        {
          name: "_id",
          required: true,
          in: "param",
          type: "string",
          description: "animal ID",
          example: "63bad1557bd860de62e144df",
        },
        {
          name: "x-access-token",
          required: true,
          in: "header",
          type: "string",
          description: "token of the session",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3M2MzY2ZkYi1jYjlhLTRhMTEtOWIwYy1hMWVkYTQ3MThkYjIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE3MzUyMDUsImV4cCI6MTY5MzI5MjgwNX0.hXCXWTVYhSWSgRdSFt0wBBHS-lmE4esdd-mjpNMr1S0",
        },
        {
          name: "name",
          required: true,
          in: "body",
          type: "string",
          description: "Name of the animal",
          example: "León",
        },
        {
          name: "family",
          required: true,
          in: "body",
          type: "string",
          description: "Family of the animal",
          example: "Felidae",
        },
        {
          name: "description",
          required: true,
          in: "body",
          type: "string",
          description: "description of the animal",
          example: "El león (Panthera leo) es un mamífero carnívoro de la familia de los félidos y una de las cinco especies del género Panthera. Los leones salvajes viven en poblaciones cada vez más dispersas y fragmentadas del África subsahariana (a excepción de las regiones selváticas de la costa del Atlántico y la cuenca del Congo) y una pequeña zona del noroeste de India (una población en peligro crítico en el parque nacional del Bosque de Gir y alrededores), habiendo desaparecido del resto de Asia del Sur, Asia Occidental, África del Norte y la península balcánica en tiempos históricos. ",
        },
        {
          name: "age",
          required: true,
          in: "body",
          type: "number",
          description: "age of the animal",
          schema: {
            type: "integer",
            default: 0,
          },
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
                    $ref: "#/components/schemas/getAnimals",
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