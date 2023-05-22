# **CONDOSTART** API

## Tech Stack

**Server:** 

- NodeJs: v18.13.0
- MongoDB: v5.0.6

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_HOST`

`API_PORT`

`API_VERSION`

`API_ENV`

`DDB_HOST`

`DDB_PORT`

`DDB_NAME`

`DDB_USER`

`DDB_PASSWORD`

## Install

* Clone this repository: `git clone git@gitlab.com:cesticom/nouplace/api.git`

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

## Development Server

Start the development server on http://localhost:9000

```bash
npm run start:dev
```

## Production

Build the application for production:

```bash
npm run build
```

* You must have MongoDB installed and create a 'nouplace' database

* You must execute the command `npm install`

## Used By

This project is used by the following companies:

- CESTICOM

## Authors

- [CESTICOM](https://cesticom.com/)