let api = constants.api;

export default {
  logged: false,
  id: null,
  login (credentials, callback) {
    $.post(`${api}/users/login`, credentials)
    .then((response) => {
      if (response.status == 'ok') {
        this.logged = true;
        this.id = response.data.PlayerId;
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
    .then((response) => {
      if (response.status == 'ok') {
        this.logged = true;
        this.id = response.data.PlayerId;
      }
      callback(this.logged);
    });
  }
}