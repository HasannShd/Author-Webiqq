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
  var SEED_VERSION = '16';
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
      subtitle: 'رحلة في عالم الفضاء — من الأساطير إلى أسرار الكون',
      subtitle_en: 'A journey through space — from the myths to the secrets of the universe',
      author: 'د. محمد قيصرون ميرزا', author_en: 'Dr. Mohammed Qaisaroun Mirza',
      year: '2026',
      cover: 'img/cover.jpg',
      pdf: 'pdf/full-book.pdf',
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
      pdf: '',
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

  function readable(paras) {
    if (!paras || !paras.length) return '';
    return '<div class="readable" lang="ar" dir="rtl">' +
      paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';
  }

  function figures(list, alt) {
    if (!list || !list.length) return '';
    return '<div class="figs">' + list.map(function (src) {
      return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async">';
    }).join('') + '</div>';
  }

  function footnotes(list) {
    if (!list || !list.length) return '';
    return '<div class="fnotes" lang="ar" dir="rtl">' +
      list.map(function (n) { return '<p>' + esc(n) + '</p>'; }).join('') + '</div>';
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
                T(' قسمًا · مجّانًا للتحميل', ' sections · free to download') + '</p>') +
            (b.pdf
              ? '<div class="vol-actions">' +
                  '<a class="btn btn-gold" href="' + esc(b.pdf) + '" download>' +
                    T('تحميل الكتاب كاملًا (PDF)', 'Download the whole book (PDF)') + '</a>' +
                  (b.front && b.front.pdf
                    ? '<a class="btn btn-outline" href="' + esc(b.front.pdf) + '" target="_blank" rel="noopener">' +
                      T('الغلاف والإهداء والمقدّمة', 'Cover, dedication and introduction') + '</a>' : '') +
                '</div>' : '') +
          '</div>' +
        '</div>' +
        (tops ? '<div class="vol-chapters">' +
          '<h4>' + T('الفصول', 'Chapters') + '</h4>' +
          '<ol class="ch-list">' + b.chapters.map(function (c) {
            return '<li><a href="chapter.html?book=' + esc(b.id) + '&ch=' + c.n + '">' +
              '<span class="ch-n">' + num(c.n) + '</span>' +
              '<span class="ch-t">' + esc(f(c, 'title')) + '</span>' +
              '<span class="ch-s">' + num(c.sections.length) + ' ' + T('قسمًا', 'sections') + '</span>' +
              '</a></li>';
          }).join('') + '</ol></div>' : '') +
      '</article>';
    }).join('');
    if (window.MANARA_REVEAL) window.MANARA_REVEAL();
  }

  /* ---------------- chapter reader ---------------- */
  var current = null;

  function sectionBody(s) {
    return '<div class="sec-body">' +
      (s.body && s.body.length
        ? readable(s.body)
        : '<p class="sec-pending">' + T('نصّ هذا القسم في ملفّ الـPDF المرفق.',
                                        'The text of this section is in the attached PDF.') + '</p>') +
      figures(s.images, f(s, 'title')) +
      footnotes(s.notes) +
      (s.pdf ? '<a class="btn btn-outline" href="' + esc(s.pdf) + '" target="_blank" rel="noopener">' +
         T('فتح هذا القسم (PDF)', 'Open this section (PDF)') + '</a>' : '') +
      '</div>';
  }

  function sectionCard(s, open) {
    return '<details class="sec"' + (open ? ' open' : '') + '>' +
      '<summary>' +
        (s.label ? '<span class="sec-n">' + esc(s.label) + '</span>' : '') +
        '<span class="sec-t">' + esc(s.title) + '</span>' +
        (isAr() || !s.title_en ? '' : '<span class="sec-term">' + esc(s.title_en) + '</span>') +
        '<span class="sec-open" aria-hidden="true"></span>' +
      '</summary>' + sectionBody(s) + '</details>';
  }

  /* The author nests his sections one level deep; a sub-section renders inside
     the top-level section it belongs to. */
  function nest(sections) {
    var out = [];
    sections.forEach(function (s) {
      if (s.depth && out.length) out[out.length - 1].subs.push(s);
      else out.push({ top: s, subs: [] });
    });
    return out;
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

    host.innerHTML =
      '<p class="crumbs"><a href="index.html">' + T('الرئيسية', 'Home') + '</a> / ' +
        esc(f(b, 'title')) + ' / ' + T('الفصل ', 'Chapter ') + num(c.n) + '</p>' +
      '<p class="eyebrow" style="margin-top:18px">' + T('الفصل ', 'Chapter ') + num(c.n) + '</p>' +
      '<h1>' + esc(f(c, 'title')) + '</h1>' +
      '<p class="ch-book">' + esc(f(b, 'title')) + ' — ' + esc(f(b, 'author')) + '</p>' +
      arabicNote() +

      '<div class="ch-intro">' +
        figures(c.images, f(c, 'title')) +
        (c.intro && c.intro.length ? '<h2>' + T('مقدّمة الفصل', 'The chapter opens') + '</h2>' + readable(c.intro) : '') +
        '<div class="ch-tools">' +
          '<p class="hl-hint">' + T('حدّد أيّ نصّ لتعلّق عليه أو تطرح سؤالًا حوله.',
                                    'Select any passage to comment on it or ask a question.') + '</p>' +
          (c.introPdf ? '<a class="btn btn-outline" href="' + esc(c.introPdf) + '" target="_blank" rel="noopener">' +
            T('غلاف الفصل ومقدّمته (PDF)', 'Chapter cover and introduction (PDF)') + '</a>' : '') +
          (b.pdf ? '<a class="btn btn-gold" href="' + esc(b.pdf) + '" download>' +
            T('تحميل الكتاب كاملًا (PDF)', 'Download the whole book (PDF)') + '</a>' : '') +
        '</div>' +
      '</div>' +

      '<div class="ch-sections">' +
        '<h2>' + T('الأقسام', 'Sections') + '</h2>' +
        '<div class="sec-list">' + nest(c.sections).map(function (grp, gi) {
          return '<details class="sec"' + (gi === 0 ? ' open' : '') + '>' +
            '<summary>' +
              (grp.top.label ? '<span class="sec-n">' + esc(grp.top.label) + '</span>' : '') +
              '<span class="sec-t">' + esc(grp.top.title) + '</span>' +
              (isAr() || !grp.top.title_en ? '' : '<span class="sec-term">' + esc(grp.top.title_en) + '</span>') +
              (grp.subs.length ? '<span class="sec-c">' + num(grp.subs.length) + '</span>' : '') +
              '<span class="sec-open" aria-hidden="true"></span>' +
            '</summary>' +
            sectionBody(grp.top) +
            (grp.subs.length ? '<div class="sub-list">' + grp.subs.map(function (s) {
              return sectionCard(s, false);
            }).join('') + '</div>' : '') +
            '</details>';
        }).join('') + '</div>' +
      '</div>' +

      '<nav class="ch-nav">' +
        (prev ? '<a class="btn btn-outline" href="chapter.html?book=' + esc(b.id) + '&ch=' + prev.n + '">' +
          T('السابق: ', 'Previous: ') + esc(f(prev, 'title')) + '</a>' : '<span></span>') +
        (next ? '<a class="btn btn-outline" href="chapter.html?book=' + esc(b.id) + '&ch=' + next.n + '">' +
          T('التالي: ', 'Next: ') + esc(f(next, 'title')) + '</a>' : '<span></span>') +
      '</nav>';

    bindHighlight();
    renderComments();
    if (window.MANARA_REVEAL) window.MANARA_REVEAL();
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
