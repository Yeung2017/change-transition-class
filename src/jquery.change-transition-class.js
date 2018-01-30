/* eslint-disable */
+(function ($) {
  function transitionEnd() {
    var el = document.createElement('bootstrap');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }

    return false;
  }

  var transitionEnd = transitionEnd();

  $.fn.transitionClassToShow = function(className,callback){
    className = className || 'in';
    callback = callback || function(){};
    return $(this).each(function(){
      var $this = $(this);
      var cb = callback.bind(this);
      if(!transitionEnd) {
        $this.show();
        cb();
      }else if(!$this.hasClass(className)){
        $this.show().css('display');
        $this.addClass(className);
        $this.one(transitionEnd.end,function(){
          if($this.hasClass(className)) {
            cb();
          }
        })
      }
    });
  }

  $.fn.transitionClassToHide = function(className,callback) {
    className = className || 'in';
    callback = callback || function(){};
    return $(this).each(function(){
      var $this = $(this);
      var cb = callback.bind(this);
      if(!transitionEnd) {
        $this.hide();
        cb();
      }else if($this.hasClass(className)){
        $this.removeClass(className);
        $this.one(transitionEnd.end,function(){
          if(!$this.hasClass(className)) {
            cb();
          }
        })
      }
    });
  }
})(jQuery);