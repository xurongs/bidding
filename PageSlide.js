
function buildPageSlide(n) {
  var t = n('#pageslide'),
  i = !1,
  r;
  t.length == 0 && (t = n('<div />').attr('id', 'pageslide').css('display', 'none').appendTo(n('body')));
  n.fn.pageslide = function (t) {
    // var i = this;
    // i.click(function (i) {
    //   var r = n(this),
    //   u = n.extend({
    //     href: r.attr('href')
    //   }, t);
    //   i.preventDefault();
    //   n.pageslide(u)
    // })
  };
  n.fn.pageslide.defaults = {
    speed: 250,
    direction: 'left',
    modal: !1,
    iframe: !1,
    href: null,
    pageWidth: 580
  };
  n.pageslide = function (i) {
    var r = n.extend([], n.fn.pageslide.defaults, i);
    t.data(r);
    t.is(':visible') ? n.pageslide.close(function () {
      t.empty();
      n.pageslide.open()
    })  : (t.empty(), t.is(':hidden') && n.pageslide.open())
  };
  n.pageslide.open = function () {
    var f = t.data('href'),
    e = t.data('direction'),
    o = t.data('speed'),
    s = t.data('pageWidth'),
    r = s,
    u = {
    };
    if (!t.is(':visible') && !i) {
      i = !0;
      t.attr('data-url', f);
      t.html('<div class="hb-right-sidebar" style="width:' + r + 'px;"><h4 class="text-center"><img src="/Content/images/pageslide-loading.gif" /></h4></div>');
      t.css({
        width: r + 'px'
      });
      switch (e) {
        case 'left':
          t.css({
            left: 'auto',
            right: '-' + r + 'px'
          });
          u.right = '+=' + r;
          break;
        default:
          t.css({
            left: '-' + r + 'px',
            right: 'auto'
          });
          u.left = '+=' + r
      }
      t.show().animate(u, o, function () {
        i = !1;
        n.ajax({
          type: 'GET',
          url: f,
          success: function (i) {
            var u = n('<div />').html(i);
            u.find('.hb-right-sidebar').css({
              width: r + 'px'
            });
            t.html(u.html())
          },
          beforeSend: function () {
          }
        })
      })
    }
  };
  n.pageslide.close = function (t) {
    var r = n('#pageslide'),
    u = r.data('pageWidth'),
    o = r.data('speed'),
    e = {
    },
    f = {
    };
    if (!r.is(':hidden') && !i) {
      i = !0;
      switch (r.data('direction')) {
        case 'left':
          e['margin-left'] = '+=' + u;
          f.right = '-=' + u;
          break;
        default:
          e['margin-left'] = '-=' + u;
          f.left = '-=' + u
      }
      r.animate(f, o, function () {
        r.hide();
        i = !1;
        typeof t != 'undefined' && t()
      });
      typeof initPage != 'undefined' && initPage();
      r.off()
    }
  };
}
buildPageSlide(jQuery);
