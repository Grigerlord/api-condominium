module.exports = {
  requestErrors: {
    type: "object",
    properties: {
      msg: {
        type: "string",
        description: "Related message with response status",
        example: "Internal error to consult list",
      },
      errors: {
        type: "array",
        description: "Description of the error",
        example: ["Param is incorrect", "slug is required"],
      },
    },
  },
};