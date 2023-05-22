// import { getAnimals } from "./schemas/animals";
import { requestErrors } from "./schemas/errors";
import { getPersons } from "./schemas/persons";

module.exports = {
  components: {
    schemas: {
      requestErrors,
      getPersons,
    },
  },
};