(function($) {
  $.fn.extend({
    // call function when user is done typing
    doneTyping: function(f, doneTypingInterval) {
      // from http://stackoverflow.com/a/5926782/122594
      doneTypingInterval = doneTypingInterval || 1000;
      var typingTimer;

      this.keyup(function(){
        var that = this;
        clearTimeout(typingTimer);
        typingTimer = setTimeout(f, doneTypingInterval);
      });
    },

    // retains focus and text cursor position in child input elements
    // it only works for children with a unique class attribute
    retainUserState: function(f) {
      // focused element
      var el = $(':focus', this);

      if (el.length) {
        var className = el.attr('class');
        var cursorPos = el.getCursorPosition();

        f();

        if (className) {
          el = $('.' + className, this);
          el.focus();
          el.setCursorPosition(cursorPos);
        }
      } else {
        f();
      }
    },

    // get text cursor position in input/textarea
    getCursorPosition: function() {
      // from http://stackoverflow.com/a/1909997/122594
      var pos = 0;
      var el = $(this).get(0);
      // IE Support
      if (document.selection) {
        el.focus();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
      }
      // Firefox support
      else if (el.selectionStart || el.selectionStart == '0')
        pos = el.selectionStart;

      return pos;
    },

    // set text cursor position in input/textarea
    setCursorPosition: function(pos) {
      // from http://stackoverflow.com/q/499126/122594
      if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
      } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }
  });
}(jQuery));
