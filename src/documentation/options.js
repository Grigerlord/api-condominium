import { servers } from './servers';
import { tags } from './tags';
import Components from './components';
import Paths from "./paths";

const { components } = Components;
const { paths } = Paths;

module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: process.env.API_VERSION,
      title: "Condostart Documentation",
      description: "API Condostart Documentation for connection with client",
      contact: {
        name: "Group Three",
        url: "https://cesticom.com/",
      },
    },
    servers,
    tags,
    paths,
    components,
  },
  basePath: "/api",
  apis: ["./router"],
};