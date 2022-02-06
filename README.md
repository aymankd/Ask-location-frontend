# About

This project was created by ReactJs and uses a microservice of authentification 'Keycloak'

## Set up Keycloak

- connect to your keycloak admin .
- create a Realm
- 1. create a Client named 'api-demo' with client Protocol 'openid-connect' and acces type 'public'
  2. or you can change the name of the client and then u generate the config file and replace the config file "public/keyloak.json"

## Set up the back end Server

- go to "src/services/HttpService" and change baseURL to the URL of the backEnd
- for the back end repository

# Run the Project

### `npm i`

### `npm start`
