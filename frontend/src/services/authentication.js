let api = constants.api;

const authentication = {
  logged: false,
  id: null,
  login (credentials, callback) {
    $.post(`${api}/users/login`, credentials)
    .then((user) => {
      if (user) {
        this.logged = true;
        this.id = user.PlayerId;
      }
      callback(this.logged);
    });
  },
  logout () {
    this.logged = false;
    this.id = null;
  },
  register (information, callback) {
    $.post(`${api}/users/register`, information)
    .then((user) => {
      if (user) {
        this.logged = true;
        this.id = user.PlayerId;
      }
      callback(this.logged);
    });
  }
}

export default authentication;