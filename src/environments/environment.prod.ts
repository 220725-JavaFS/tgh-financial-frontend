export const environment = {
  production: true,
  // url of back end
  url: 'http://ec2-44-204-84-170.compute-1.amazonaws.com:8083/',
  headers: {
    'Content-Type': 'application/json',
    // url of app
    'Access-Control-Allow-Origin': 'http://ec2-35-88-77-72.us-west-2.compute.amazonaws.com:80/',
    'Current-User': ''
  },
  withCredentials: true
};
