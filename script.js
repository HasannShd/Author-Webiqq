/* MANARA — shared interactions. site build, no backend. */
(function () {
  'use strict';

  /* Mobile menu */
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.MANARA_REVEAL = function () {
        document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
      };
      window.MANARA_REVEAL();
    } else {
      // Re-queried each pass so anything the CMS injects later still animates in,
      // and position-based because fast scrolling can outrun an observer.
      var seen = 0;
      var sweep = function () {
        var limit = window.innerHeight - 30;
        document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
          if (el.getBoundingClientRect().top < limit) {
            el.style.transitionDelay = Math.min(seen++ % 4, 3) * 70 + 'ms';
            el.classList.add('in');
          }
        });
      };
      window.MANARA_REVEAL = sweep;
      sweep();
      window.addEventListener('scroll', sweep, { passive: true });
      window.addEventListener('resize', sweep);
    }
  }

  document.querySelectorAll('form[data-sent]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) {
        note.textContent = form.getAttribute('data-sent');
        note.classList.add('ok');
      }
      form.reset();
    });
  });

  /* Reading progress */
  var bar = document.querySelector('.progress');
  var article = document.querySelector('.prose');
  if (bar && article) {
    var update = function () {
      var top = article.getBoundingClientRect().top + window.scrollY;
      var span = article.offsetHeight - window.innerHeight * 0.4;
      var pct = ((window.scrollY - top) / (span > 0 ? span : 1)) * 100;
      bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* Table of contents scroll-spy */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length) {
    var headings = tocLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    var spy = function () {
      var pos = window.scrollY + 140;
      var current = 0;
      headings.forEach(function (h, i) { if (h.offsetTop <= pos) current = i; });
      tocLinks.forEach(function (a, i) { a.classList.toggle('active', i === current); });
    };
    spy();
    window.addEventListener('scroll', spy, { passive: true });
  }

  /* Share buttons */
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var kind = btn.getAttribute('data-share');
      var url = window.location.href;
      var title = document.title;
      if (kind === 'copy') {
        var done = function () {
          var was = btn.textContent;
          btn.textContent = 'Link copied';
          setTimeout(function () { btn.textContent = was; }, 1800);
        };
        if (navigator.clipboard) { navigator.clipboard.writeText(url).then(done, done); } else { done(); }
        return;
      }
      if (kind === 'native' && navigator.share) { navigator.share({ title: title, url: url }); return; }
      var map = {
        x: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title),
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
        linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url),
        native: 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url)
      };
      if (map[kind]) window.open(map[kind], '_blank', 'noopener,noreferrer');
    });
  });

  /* Book category filter */
  var chips = document.querySelectorAll('.chip[data-filter]');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var val = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        document.querySelectorAll('[data-cat]').forEach(function (row) {
          row.classList.toggle('hidden', val !== 'all' && row.getAttribute('data-cat') !== val);
        });
      });
    });
  }
})();
