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
      // transitionshow只能有一个handle
      $this.off('transitionshow transitionhide').one('transitionshow',function(){
        if($this.hasClass(className)) {
          cb();
        }
      });
      if(!transitionEnd) {
        $this.addClass(className).show().trigger('transitionshow');
      }else if(!$this.hasClass(className)){
        $this.show().css('display');
        $this.addClass(className);
        $this.one(transitionEnd.end,function(){
          $this.trigger('transitionshow');
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
      // transitionhide只能有一个handle
      $this.off('transitionshow transitionhide').one('transitionhide',function(){
        if(!$this.hasClass(className)) {
          cb();
        }
      });
      if(!transitionEnd) {
        $this.removeClass(className).hide().trigger('transitionhide');
      }else if($this.hasClass(className)){
        $this.removeClass(className);
        $this.one(transitionEnd.end,function(){
          $this.trigger('transitionhide');
        })
      }
    });
  }
})(jQuery);