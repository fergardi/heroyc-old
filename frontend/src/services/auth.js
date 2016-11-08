let api = '//localhost:3000/api';

export default {
  logged: false,
  login: function(credentials, callback) {
    var that = this;
    $.post(`${api}/users/login`, credentials)
    .then(function(response){
      that.logged = (response.status == 'ok');
      callback(that.logged);
    });
  },
  logout: function() {
    this.logged = false;
  },
  isLogged: function() {
    return this.logged;
  }
}