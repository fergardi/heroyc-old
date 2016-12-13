const constants = {
  dev: {
    quest: {
      cron: '0 * * * * *',
      deadline: 86400
    },
    location: {
      cron: '0 * * * * *',
      deadline: 900
    },
    database: {
      username: 'root',
      password: 'root',
      dbname: 'heroyc',
      host: 'localhost',
      dialect: 'mariadb',
      logging: false
    },
    paypal: {
      username: 'username',
      password: 'password',
      signature: 'signature',
      return: '/',
      cancel: '/',
      debug: true
    },
    sync: true,
    fixtures: true
  },
  production: {
    quest: {
      cron: '0 0 * * * *',
      deadline: 86400
    },
    location: {
      cron: '0 * * * * *',
      deadline: 900
    },
    database: {
      username: '',
      password: '',
      dbname: '',
      host: '',
      dialect: '',
      logging: false
    },
    paypal: {
      username: '',
      password: '',
      signature: '',
      return: '',
      cancel: '',
      debug: false
    },
    sync: true,
    fixtures: true
  }
};

var env = process.env.NODE_ENV || 'dev';

module.exports = constants[env];