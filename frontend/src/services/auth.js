let api = constants.api;

export default {
  logged: false,
  login (credentials, callback) {
    $.post(`${api}/users/login`, credentials)
    .then((response) => {
      this.logged = (response.status == 'ok');
      callback(this.logged);
    });
  },
  logout () {
    this.logged = false;
  },
  register (information, callback) {
    $.post(`${api}/users/register`, information)
    .then((response) => {
      this.logged = (response.status == 'ok');
      callback(this.logged);
    });
  },
  isLogged () {
    return this.logged;
  }
}