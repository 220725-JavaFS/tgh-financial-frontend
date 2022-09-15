export const environment = {
  production: true,
  // url of back end
  url: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
    // url of app
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Current-User': ''
  },
  withCredentials: true
};
