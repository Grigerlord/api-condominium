// import Animals from './path/animals';
import { persons, personsID } from './path/persons';

module.exports = {
  paths: {
    // "/api/animals/:_id": Animals.animalsID,
    // "/api/animals": Animals.animals,
    "/api/persons/:_id": personsID,
    "/api/persons": persons,
  },
};