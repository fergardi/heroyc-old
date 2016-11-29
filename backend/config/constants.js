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
    sync: true,
    fixtures: true
  }
};

module.exports = constants;