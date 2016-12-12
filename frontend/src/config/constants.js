const constants = {
  dev: {
    expiration: 900,
    notification: 3000,
    condition: 100,
    api: '//localhost:3000/api',
    socket: '//localhost:3000'
  },
  production: {
    expiration: 900,
    notification: 3000,
    condition: 50,
    api: 'https://www.heroyc.com/api',
    socket: 'https://www.heroyc.com/'
  }
};

// env
var env = process.env.NODE_ENV || 'dev';

export default constants[env];