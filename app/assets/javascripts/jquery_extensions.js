jQuery.fn.extend({
  // call function when user is done typing
  doneTyping: function(f, doneTypingInterval) {
    // from http://stackoverflow.com/a/5926782/122594
    doneTypingInterval = doneTypingInterval || 1000;
    var typingTimer;

    this.keyup(function(){
      clearTimeout(typingTimer);
      typingTimer = setTimeout(f, doneTypingInterval);
    });
  }
});
