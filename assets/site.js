/* Wisdom Is Currency: small site script. Menu toggle + one wheel draw-in. No dependencies. */
(function () {
  document.documentElement.classList.add('js');

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('.label').textContent = open ? 'Close' : 'Menu';
      menu.hidden = !open;
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  // The wheel draws itself once, the first time it scrolls into view
  var wheel = document.querySelector('.wheel-figure');
  if (wheel) {
    if (!('IntersectionObserver' in window)) {
      wheel.classList.add('is-drawn');
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            wheel.classList.add('is-drawn');
            io.disconnect();
          }
        });
      }, { threshold: 0.35 });
      io.observe(wheel);
    }
  }
})();
