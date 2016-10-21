var notification = {
  alert: function(text, type, icon) {
    var msg = '<i class="fa fa-fw fa-lg fa-'+ icon +'"></i> ' + text;
    $('.alerts').notify({
      type: type,
      message: { html: msg },
      fadeOut: { enabled: true, delay: constants.notification.duration }
    }).show();
  },
  success: function(text) {
    this.alert(text, 'success', 'check-circle');
  },
  info: function(text) {
    this.alert(text, 'info', 'info-circle');
  },
  warning: function(text) {
    this.alert(text, 'warning', 'question-circle');
  },
  danger: function(text) {
    this.alert(text, 'danger', 'exclamation-triangle');
  }
};