const notification = {
  alert (text, type, icon) {
    var msg = '<i class="fa fa-fw fa-lg fa-'+ icon +'"></i> ' + text + '!';
    $('.alerts').notify({
      type: type,
      message: { html: msg },
      fadeOut: { enabled: true, delay: constants.notification.duration }
    }).show();
  },
  success (text) {
    this.alert(text, 'success', 'check-circle');
  },
  info (text) {
    this.alert(text, 'info', 'info-circle');
  },
  warning (text) {
    this.alert(text, 'warning', 'question-circle');
  },
  danger (text) {
    this.alert(text, 'danger', 'exclamation-triangle');
  }
};

export default notification;