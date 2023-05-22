module.exports = {
    getUsers: {
      type: "object",
      properties: {
        _id: { type: "string", example: "63bad1557bd860de62e144df" },
        firstName: { type: String, default: "Synkyriarchía" },
        lastName: { type: String, default: "Archí" },
        userName: { type: String, default: "Diacheiristís" },
        email: { type: String, default: "synkyriarchía@archí.com" },
        password: { type: String, default: "Diacheiristís2023$" },
        age: { type: Number, default: 60 },
        phone: { type: String, default: "+099912348765" },
        userType: { type: String, default: "admin" },
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
        },
        createdAt: { type: String, default: "2023-01-08" },
        updatedAt: { type: String, default: "2023-01-08" },
      },
    },
  };