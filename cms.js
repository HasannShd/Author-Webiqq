/* الفلك والقراء — the reading platform.
   The book itself is shipped in content.js, generated from the author's PDFs.
   Edits made in the dashboard live in localStorage, so the site runs with no
   backend; a production build swaps STORE for API calls. */
(function () {
  'use strict';

  var K_BOOKS = 'manara_books_v3', K_COM = 'manara_comments_v3', K_VER = 'manara_seed_version';

  /* Bump this whenever the shipped content changes. A browser that still holds
     an older copy in localStorage would otherwise keep showing it and never
     see the new chapters or PDFs. */
  var SEED_VERSION = '21';
  try {
    if (localStorage.getItem(K_VER) !== SEED_VERSION) {
      localStorage.removeItem(K_BOOKS);
      localStorage.removeItem(K_COM);
      localStorage.removeItem('manara_books_v2');
      localStorage.removeItem('manara_comments_v2');
      localStorage.setItem(K_VER, SEED_VERSION);
    }
  } catch (e) {}

  var BOOK = window.MANARA_BOOK || { front: null, chapters: [] };

  var SEED_BOOKS = [
    {
      id: 'falak',
      subject: 'falak',
      subjectLabel: 'الفلك', subjectLabel_en: 'Astronomy',
      title: 'اَلْفَلَكُ', title_en: 'Al-Falak — Astronomy',
      /* The cover's own wording. */
      subtitle: 'رحلة في أعماق الفضاء',
      subtitle_en: 'A journey into the depths of space',
      author: 'د. محمد قيصرون ميرزا', author_en: 'Dr. Mohammed Qaisaroun Mirza',
      year: '2026',
      cover: 'img/cover.jpg',
      front: BOOK.front,
      blurb: 'ثمانيةُ فصولٍ تبدأ بتعريفِ الكونِ ومكوّناتِه، وتمرُّ بتاريخِ الفلكِ عند القدماءِ والمسلمين، ' +
             'وبالأبراجِ وأساطيرِها، وبالضوءِ والتحليلِ الطيفيِّ، وبعصرِ التلسكوباتِ ورحلاتِ الفضاءِ، ' +
             'وتنتهي عند حوارٍ بين العقلِ والقلبِ.',
      blurb_en: 'Eight chapters: what the universe is made of, astronomy among the ancients and the ' +
                'Muslims, the constellations and their myths, light and the spectrum, the age of ' +
                'telescopes and of space flight, and finally a dialogue between mind and heart.',
      chapters: BOOK.chapters
    },
    {
      id: 'fizya',
      subject: 'fizya',
      subjectLabel: 'الفيزياء', subjectLabel_en: 'Physics',
      title: 'الفيزياء', title_en: 'Physics',
      subtitle: 'قوانينُ الطبيعةِ بلغةٍ مفهومة',
      subtitle_en: 'The laws of nature in plain language',
      author: 'د. محمد قيصرون ميرزا', author_en: 'Dr. Mohammed Qaisaroun Mirza',
      year: '2026',
      cover: 'img/science.svg',
      pending: true,
      blurb: 'كتابُ الفيزياء قيدُ الإعداد، وسيُنشرُ هنا مجّانًا مثلَ كتابِ الفلك.',
      blurb_en: 'The physics book is in preparation, and will be published here free, like the astronomy book.',
      chapters: []
    }
  ];

  var SEED_COMMENTS = [
    { id: 'c1', book: 'falak', ch: 1, name: 'ريم الحمادي',
      quote: 'وكُلَّما توصَّلنا إلى إجابةٍ، انفتحت أمامَنا أبوابٌ جديدةٌ من الأسئلةِ',
      text: 'هذه العبارة تلخّص الكتاب كلّه. هل تقصد أنّ العلم لا يكتمل أبدًا، أم أنّ الأسئلة نفسها تتغيّر؟',
      text_en: 'That line sums up the whole book. Do you mean science is never finished, or that the questions themselves change?',
      at: '2026-08-14T09:14:00Z',
      reply: 'الثاني. الأسئلة تتبدّل، وهذا هو التقدّم.',
      reply_en: 'The second. The questions shift, and that is what progress is.',
      replyAt: '2026-08-14T11:02:00Z', hidden: false },
    { id: 'c2', book: 'falak', ch: 2, name: 'Omar T.', quote: '',
      text: 'The section on Mariam al-Astrulabi was new to me. Are there other women in the period whose work survived?',
      at: '2026-08-15T17:40:00Z', reply: '', replyAt: '', hidden: false }
  ];

  /* ---------------- store ---------------- */
  function read(k, seed) {
    try { var raw = localStorage.getItem(k); if (raw) return JSON.parse(raw); } catch (e) {}
    return JSON.parse(JSON.stringify(seed));
  }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var STORE = {
    books: function () { return read(K_BOOKS, SEED_BOOKS); },
    comments: function () { return read(K_COM, SEED_COMMENTS); },
    setBooks: function (v) { write(K_BOOKS, v); },
    setComments: function (v) { write(K_COM, v); },
    reset: function () { try { localStorage.removeItem(K_BOOKS); localStorage.removeItem(K_COM); } catch (e) {} }
  };
  window.MANARA = STORE;

  function isAr() { return document.documentElement.lang !== 'en'; }
  function f(o, k) { return isAr() ? (o[k] || o[k + '_en'] || '') : (o[k + '_en'] || o[k] || ''); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function T(ar, en) { return isAr() ? ar : en; }
  function fmtDate(iso) {
    var d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString(isAr() ? 'ar' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  /* Numbering stays in Latin digits in both languages, by the author's request. */
  function num(n) { return String(n); }
  STORE.esc = esc; STORE.T = T; STORE.field = f; STORE.fmtDate = fmtDate; STORE.isAr = isAr; STORE.num = num;

  var params = new URLSearchParams(location.search);

  /* The book is written in Arabic. In English the interface translates and the
     titles carry an English rendering, but the author's own prose stays as he
     wrote it — so say that once, rather than pretending otherwise. */
  function arabicNote() {
    return isAr() ? '' :
      '<p class="lang-note">The book is written in Arabic. Section titles are given in English; ' +
      'the text below is the author’s own.</p>';
  }

  function anchor(label) { return 's-' + String(label || '').replace(/\./g, '-'); }

  function readable(paras) {
    if (!paras || !paras.length) return '';
    return '<div class="readable" lang="ar" dir="rtl">' +
      paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';
  }

  /* width and height are carried so the browser reserves the space before the
     image loads — without them the page grows as figures arrive and a jump to
     a section lands short. */
  function figures(list, alt) {
    if (!list || !list.length) return '';
    return '<div class="figs">' + list.map(function (im) {
      return '<img src="' + esc(im.src) + '" alt="' + esc(alt) + '"' +
        ' width="' + im.w + '" height="' + im.h + '" loading="lazy" decoding="async">';
    }).join('') + '</div>';
  }

  function footnotes(list) {
    if (!list || !list.length) return '';
    return '<div class="fnotes" lang="ar" dir="rtl">' +
      list.map(function (n) { return '<p>' + esc(n) + '</p>'; }).join('') + '</div>';
  }

  /* The book's own opening pages — the author's dedication, his two
     introductions and his foreword. Folded to begin with: a reader who came
     for the contents should not have to scroll past a thousand words first. */
  function frontMatter(fr) {
    if (!fr || !fr.sections || !fr.sections.length) return '';
    return '<div class="front">' +
      (fr.lead && fr.lead.length
        ? '<div class="front-lead readable" lang="ar" dir="rtl">' +
            fr.lead.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          '</div>' : '') +
      (fr.plate ? '<div class="figs front-plate"><img src="' + esc(fr.plate.src) +
        '" alt="" width="' + fr.plate.w + '" height="' + fr.plate.h +
        '" loading="lazy" decoding="async"></div>' : '') +
      fr.sections.map(function (x) {
        return '<section class="sec-block folded front-sec">' +
          '<h3 class="sec-h"><button class="sec-fold" type="button" aria-expanded="false">' +
            '<span class="sec-t">' + esc(f(x, 'title')) + '</span>' +
            '<span class="sec-open" aria-hidden="true"></span>' +
          '</button></h3>' +
          '<div class="sec-inner">' + readable(x.body) +
            (x.verse ? '<p class="front-verse ar">' + esc(x.verse) + '</p>' : '') +
          '</div></section>';
      }).join('') +
    '</div>';
  }

  /* ---------------- home: the books ---------------- */
  function renderHome() {
    var wrap = document.getElementById('books');
    if (!wrap) return;
    var books = STORE.books();
    var active = document.querySelector('.subject-btn[aria-pressed="true"]');
    var filter = active ? active.getAttribute('data-subject') : 'all';

    var tabs = document.getElementById('subjects');
    if (tabs && tabs.dataset.built !== document.documentElement.lang) {
      var keep = filter;
      tabs.dataset.built = document.documentElement.lang;
      tabs.innerHTML = '<button class="subject-btn" data-subject="all" aria-pressed="true">' +
        T('الكتابان', 'Both books') + '</button>' +
        books.map(function (b) {
          return '<button class="subject-btn" data-subject="' + esc(b.subject) + '" aria-pressed="false">' +
            esc(f(b, 'subjectLabel')) + '</button>';
        }).join('');
      tabs.querySelectorAll('.subject-btn').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x.getAttribute('data-subject') === keep));
      });
      if (!tabs.dataset.bound) {
        tabs.dataset.bound = '1';
        tabs.addEventListener('click', function (e) {
          var btn = e.target.closest('.subject-btn');
          if (!btn) return;
          tabs.querySelectorAll('.subject-btn').forEach(function (x) {
            x.setAttribute('aria-pressed', String(x === btn));
          });
          renderHome();
        });
      }
    }

    var shown = books.filter(function (b) { return filter === 'all' || b.subject === filter; });
    wrap.className = 'book-shelf' + (shown.length === 1 ? ' single' : '');
    wrap.innerHTML = shown.map(function (b) {
      var tops = (b.chapters || []).length;
      var parts = (b.chapters || []).reduce(function (t, c) { return t + c.sections.length; }, 0);
      return '<article class="vol reveal">' +
        '<div class="vol-head">' +
          '<img class="vol-cover" src="' + esc(b.cover) + '" alt="" width="600" height="800">' +
          '<div>' +
            '<span class="tag">' + esc(f(b, 'subjectLabel')) + '</span>' +
            '<h3>' + esc(f(b, 'title')) + '</h3>' +
            '<p class="vol-sub">' + esc(f(b, 'subtitle')) + '</p>' +
            '<p class="vol-blurb">' + esc(f(b, 'blurb')) + '</p>' +
            (b.pending
              ? '<p class="vol-free">' + T('قيدُ الإعداد', 'In preparation') + '</p>'
              : '<p class="vol-free">' + num(tops) + T(' فصلًا · ', ' chapters · ') + num(parts) +
                T(' قسمًا · مجّانًا للقراءة', ' sections · free to read') + '</p>') +
            (tops
              ? '<div class="vol-actions">' +
                  '<a class="btn btn-gold" href="chapter.html?book=' + esc(b.id) + '&ch=' +
                    b.chapters[0].n + '">' + T('ابدأ القراءة', 'Start reading') + '</a>' +
                '</div>' : '') +
          '</div>' +
        '</div>' +
        (b.front ? frontMatter(b.front) : '') +
        (tops ? '<div class="vol-chapters">' +
          '<h4>' + T('المحتويات', 'Contents') + '</h4>' +
          '<ol class="ch-list">' + b.chapters.map(function (c) {
            var to = 'chapter.html?book=' + esc(b.id) + '&ch=' + c.n;
            return '<li>' +
              '<a class="toc-ch" href="' + to + '">' +
                '<span class="ch-n">' + num(c.n) + '</span>' +
                '<span class="ch-t">' + esc(f(c, 'title')) + '</span>' +
                '<span class="ch-s">' + num(c.sections.length) + ' ' + T('قسمًا', 'sections') + '</span>' +
              '</a>' +
              '<ul class="toc-sec">' + c.sections.map(function (x) {
                return '<li' + (x.depth ? ' class="sub"' : '') + '>' +
                  '<a href="' + to + '#' + anchor(x.label) + '">' +
                    (x.label ? '<b>' + esc(x.label) + '</b>' : '') +
                    '<span>' + esc(x.title) + '</span>' +
                  '</a></li>';
              }).join('') + '</ul>' +
            '</li>';
          }).join('') + '</ol></div>' : '') +
      '</article>';
    }).join('');
    bindFolding();
    if (window.MANARA_REVEAL) window.MANARA_REVEAL();
  }

  /* ---------------- chapter reader ---------------- */
  var current = null;

  var K_FOLD = 'manara_folded';
  function foldedByDefault() { try { return localStorage.getItem(K_FOLD) === '1'; } catch (e) { return false; } }

  /* A section of the chapter: its heading, its text, its figures and its
     footnotes. The heading folds the section away, because a chapter of
     thirty-odd sections is a very long page to scroll past. */
  function sectionBlock(s, folded) {
    var h = s.depth ? 'h3' : 'h2';
    return '<section class="sec-block' + (s.depth ? ' sub' : '') + (folded ? ' folded' : '') +
        '" id="' + anchor(s.label) + '">' +
      '<' + h + ' class="sec-h">' +
        '<button class="sec-fold" type="button" aria-expanded="' + (folded ? 'false' : 'true') + '">' +
          (s.label ? '<span class="sec-n">' + esc(s.label) + '</span>' : '') +
          '<span class="sec-t">' + esc(s.title) + '</span>' +
          (isAr() || !s.title_en ? '' : '<span class="sec-term">' + esc(s.title_en) + '</span>') +
          '<span class="sec-open" aria-hidden="true"></span>' +
        '</button>' +
      '</' + h + '>' +
      '<div class="sec-inner">' +
        readable(s.body) +
        figures(s.images, f(s, 'title')) +
        footnotes(s.notes) +
      '</div></section>';
  }

  function chapterToc(c) {
    return '<aside class="ch-toc"><div class="toc">' +
      '<h4>' + T('محتويات الفصل', 'In this chapter') + '</h4>' +
      '<ol>' +
        (c.intro && c.intro.length
          ? '<li><a href="#ch-open">' + T('مقدّمة الفصل', 'The chapter opens') + '</a></li>' : '') +
        c.sections.map(function (x) {
          return '<li' + (x.depth ? ' class="sub"' : '') + '>' +
            '<a href="#' + anchor(x.label) + '">' +
              (x.label ? '<b>' + esc(x.label) + '</b> ' : '') + esc(x.title) + '</a></li>';
        }).join('') +
      '</ol></div></aside>';
  }

  function renderChapter() {
    var host = document.getElementById('chapter');
    if (!host) return;
    var books = STORE.books();
    var b = books.filter(function (x) { return x.id === params.get('book'); })[0] || books[0];
    if (!b.chapters.length) { host.innerHTML = '<p class="crumbs"><a href="index.html">' +
      T('الرئيسية', 'Home') + '</a></p><h1>' + esc(f(b, 'title')) + '</h1><p>' +
      T('هذا الكتاب قيدُ الإعداد.', 'This book is in preparation.') + '</p>'; return; }
    var n = parseInt(params.get('ch'), 10) || 1;
    var c = b.chapters.filter(function (x) { return x.n === n; })[0] || b.chapters[0];
    current = { book: b.id, ch: c.n };
    document.title = f(c, 'title') + ' — ' + f(b, 'title');

    var prev = b.chapters.filter(function (x) { return x.n === c.n - 1; })[0];
    var next = b.chapters.filter(function (x) { return x.n === c.n + 1; })[0];
    var fold = foldedByDefault();

    host.innerHTML =
      '<div class="read-shell">' +
        chapterToc(c) +
        '<article class="ch-body">' +
          '<p class="crumbs"><a href="index.html">' + T('الرئيسية', 'Home') + '</a> / ' +
            esc(f(b, 'title')) + ' / ' + T('الفصل ', 'Chapter ') + num(c.n) + '</p>' +
          '<p class="eyebrow" style="margin-top:18px">' + T('الفصل ', 'Chapter ') + num(c.n) + '</p>' +
          '<h1>' + esc(f(c, 'title')) + '</h1>' +
          '<p class="ch-book">' + esc(f(b, 'title')) + ' — ' + esc(f(b, 'author')) + '</p>' +
          arabicNote() +
          '<div class="ch-tools">' +
            '<p class="hl-hint">' + T('حدّد أيّ نصّ لتعلّق عليه أو تطرح سؤالًا حوله.',
                                      'Select any passage to comment on it or ask a question.') + '</p>' +
            '<button class="btn btn-outline" id="fold-all" type="button"></button>' +
          '</div>' +

          figures(c.images, f(c, 'title')) +

          (c.intro && c.intro.length
            ? sectionBlock({ label: '', depth: 0, title: T('مقدّمة الفصل', 'The chapter opens'),
                             body: c.intro, images: [], notes: [] }, fold)
                .replace('id="s-"', 'id="ch-open"')
            : '') +

          c.sections.map(function (x) { return sectionBlock(x, fold); }).join('') +

          '<nav class="ch-nav">' +
            (prev ? '<a class="btn btn-outline" href="chapter.html?book=' + esc(b.id) + '&ch=' + prev.n + '">' +
              T('السابق: ', 'Previous: ') + esc(f(prev, 'title')) + '</a>' : '<span></span>') +
            (next ? '<a class="btn btn-outline" href="chapter.html?book=' + esc(b.id) + '&ch=' + next.n + '">' +
              T('التالي: ', 'Next: ') + esc(f(next, 'title')) + '</a>' : '<span></span>') +
          '</nav>' +
        '</article>' +
      '</div>';

    bindHighlight();
    bindFolding();
    renderComments();
    spyChapter();
    openLinked();
    if (window.MANARA_REVEAL) window.MANARA_REVEAL();
  }

  /* Mark the section being read in the chapter contents. Bound here rather
     than in script.js, because the list only exists once this has run. */
  function spyChapter() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.ch-toc a'));
    if (!links.length) return;
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var el = document.getElementById(a.getAttribute('href').slice(1));
        if (!el) return;
        e.preventDefault();
        history.replaceState(null, '', a.getAttribute('href'));
        goTo(el);
      });
    });
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var mark = function () {
      var pos = window.scrollY + 160, at = 0;
      targets.forEach(function (el, i) { if (el && el.offsetTop <= pos) at = i; });
      links.forEach(function (a, i) { a.classList.toggle('active', i === at); });
    };
    mark();
    window.addEventListener('scroll', mark, { passive: true });
  }

  /* Folding. One heading folds its own section; the button at the top folds
     the lot, and that choice is remembered for the next chapter and visit. */
  function bindFolding() {
    var all = function () { return Array.prototype.slice.call(document.querySelectorAll('.sec-block')); };
    // Relabelled only where the fold-all button exists; the home page has none.
    var label = function () {};

    document.querySelectorAll('.sec-fold').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var block = btn.closest('.sec-block');
        setFold(block, !block.classList.contains('folded'));
        label();
      });
    });

    var btn = document.getElementById('fold-all');
    if (!btn) return;   // the home page folds its opening pages only
    // Anything folded means the button offers to open the lot — which is what
    // a reader expects after a link to one section has opened just that one.
    var anyFolded = function () {
      return all().some(function (x) { return x.classList.contains('folded'); });
    };
    label = function () {
      var expand = anyFolded();
      btn.textContent = expand ? T('فتح الأقسام', 'Expand all') : T('طيّ الأقسام', 'Collapse all');
      btn.setAttribute('aria-expanded', String(!expand));
    };
    btn.addEventListener('click', function () {
      var fold = !anyFolded();
      all().forEach(function (x) { setFold(x, fold); });
      try { localStorage.setItem(K_FOLD, fold ? '1' : '0'); } catch (e) {}
      label();
    });
    label();
  }

  function setFold(block, folded) {
    block.classList.toggle('folded', folded);
    var b = block.querySelector('.sec-fold');
    if (b) b.setAttribute('aria-expanded', String(!folded));
  }

  /* Jumping to a section waits for the webfont: the Arabic face reflows tens
     of thousands of pixels of text, and a jump made before it lands stops
     short of the heading. */
  function goTo(el) {
    setFold(el, false);
    // The chapter settles asynchronously — the Arabic webfont reflows the text
    // and figures load in — so the first jump can land short. Check back and
    // correct until the heading is where it should be.
    var jump = function (tries) {
      el.scrollIntoView({ block: 'start' });
      if (tries > 0) setTimeout(function () {
        if (Math.abs(el.getBoundingClientRect().top - 96) > 8) jump(tries - 1);
      }, 220);
    };
    var go = function () { jump(4); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    else setTimeout(go, 60);
  }

  /* A contents entry names one section; bring it into view. */
  function openLinked() {
    var id = (location.hash || '').slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (el) goTo(el);
  }

  /* ---------------- highlight to comment ---------------- */
  function bindHighlight() {
    var pop = document.getElementById('hl-pop');
    if (!pop) return;
    var inReadable = function (n) {
      var el = n && (n.nodeType === 1 ? n : n.parentNode);
      return !!(el && el.closest && el.closest('.readable'));
    };

    var hide = function () { pop.hidden = true; };

    document.addEventListener('selectionchange', function () {
      var sel = document.getSelection();
      if (!sel || sel.isCollapsed) { hide(); return; }
      if (!inReadable(sel.anchorNode)) { hide(); return; }
      var text = sel.toString().trim();
      if (text.length < 3) { hide(); return; }

      var rect = sel.getRangeAt(0).getBoundingClientRect();
      pop.hidden = false;
      pop.style.top = (rect.top + window.scrollY - pop.offsetHeight - 10) + 'px';
      pop.style.left = Math.max(12, rect.left + window.scrollX + rect.width / 2 - pop.offsetWidth / 2) + 'px';
      pop.dataset.quote = text.slice(0, 300);
    });

    pop.addEventListener('click', function () {
      var quote = pop.dataset.quote || '';
      var box = document.getElementById('quote-box');
      var input = document.getElementById('cm-quote');
      if (input) input.value = quote;
      if (box) {
        box.hidden = false;
        box.querySelector('q').textContent = quote;
      }
      hide();
      document.getSelection().removeAllRanges();
      var form = document.getElementById('comment-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { form.querySelector('#cm-text').focus(); }, 400);
      }
    });

    var clearBtn = document.getElementById('quote-clear');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      document.getElementById('cm-quote').value = '';
      document.getElementById('quote-box').hidden = true;
    });
  }

  /* ---------------- comments ---------------- */
  function renderComments() {
    var box = document.getElementById('comment-list');
    if (!box || !current) return;
    var list = STORE.comments().filter(function (c) {
      return c.book === current.book && c.ch === current.ch && !c.hidden;
    }).sort(function (x, y) { return (x.at || '').localeCompare(y.at || ''); });

    var count = document.getElementById('comment-count');
    if (count) count.textContent = isAr()
      ? num(list.length) + ' مشاركة'
      : list.length + (list.length === 1 ? ' entry' : ' entries');

    box.innerHTML = list.length ? list.map(function (c) {
      return '<article class="cmt">' +
        '<div class="cmt-head"><span class="cmt-avatar" aria-hidden="true">' +
          esc((c.name || '?').trim().charAt(0)) + '</span>' +
        '<div><b dir="auto">' + esc(c.name) + '</b><time>' + esc(fmtDate(c.at)) + '</time></div></div>' +
        (f(c, 'quote') ? '<blockquote class="cmt-quote" dir="auto">' + esc(f(c, 'quote')) + '</blockquote>' : '') +
        '<p dir="auto">' + esc(f(c, 'text')) + '</p>' +
        (f(c, 'reply') ? '<div class="cmt-reply"><b>' + T('ردّ المؤلّف', 'Reply from the author') +
          '</b><p dir="auto">' + esc(f(c, 'reply')) + '</p></div>' : '') +
        '</article>';
    }).join('') : '<p class="cmt-empty">' +
      T('لا مشاركات بعد على هذا الفصل. كن أوّل من يسأل.',
        'Nothing on this chapter yet. Be the first to ask.') + '</p>';
  }

  function bindCommentForm() {
    var form = document.getElementById('comment-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#cm-name').value.trim();
      var text = form.querySelector('#cm-text').value.trim();
      var quote = form.querySelector('#cm-quote').value.trim();
      var note = form.querySelector('.form-note');
      if (!name || !text) {
        if (note) {
          note.textContent = T('الرجاء إدخال الاسم والنصّ.', 'Please enter a name and a message.');
          note.classList.remove('ok');
        }
        return;
      }
      var all = STORE.comments();
      all.push({
        id: 'c' + Date.now(), book: current.book, ch: current.ch, name: name, text: text,
        quote: quote, at: new Date().toISOString(), reply: '', replyAt: '', hidden: false
      });
      STORE.setComments(all);
      form.reset();
      document.getElementById('quote-box').hidden = true;
      if (note) {
        note.textContent = T('نُشرت مشاركتك. يظهر ردّ المؤلّف هنا حين يُكتب.',
                             'Posted. The author’s reply will appear here.');
        note.classList.add('ok');
      }
      renderComments();
    });
  }

  function init() {
    renderHome();
    renderChapter();
    bindCommentForm();
    document.addEventListener('manara:lang', function () { renderHome(); renderChapter(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
