import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'https://aaad01.avans.nl:8000', // URL van je Keycloak-server
  realm: 'Bp5',             // Naam van je realm
  clientId: 'ClientBp5',         // Naam van je client
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
