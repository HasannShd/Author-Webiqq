/* MANARA — editor dashboard. Everything persists in localStorage. */
(function () {
  'use strict';
  var S = window.MANARA;
  if (!S) return;
  var esc = S.esc, fmtDate = S.fmtDate, T = S.T, num = S.num;
  var PASS = 'manara', SESSION = 'manara_admin';
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- gate ---------- */
  function open() {
    $('gate').hidden = true;
    $('panel').hidden = false;
    $('logout').hidden = false;
    renderBooks();
    renderComments();
  }
  $('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if ($('pw').value === PASS) {
      try { sessionStorage.setItem(SESSION, '1'); } catch (err) {}
      open();
    } else {
      $('login-note').textContent = T('كلمة المرور غير صحيحة.', 'That password is not right.');
    }
  });
  $('logout').addEventListener('click', function () {
    try { sessionStorage.removeItem(SESSION); } catch (e) {}
    location.reload();
  });
  try { if (sessionStorage.getItem(SESSION) === '1') open(); } catch (e) {}

  document.querySelectorAll('.admin-tabs .chip').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var t = btn.getAttribute('data-tab');
      document.querySelectorAll('.admin-tabs .chip').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      $('tab-books').hidden = t !== 'books';
      $('tab-comments').hidden = t !== 'comments';
    });
  });

  /* ---------- books and chapters ---------- */
  function renderBooks() {
    var books = S.books();
    $('n-book').textContent = '(' + books.length + ')';
    $('admin-books').innerHTML = books.map(function (b) {
      return '<section class="admin-book">' +
        '<div class="row-item">' +
          '<img src="' + esc(b.cover) + '" alt="" width="120" height="80">' +
          '<div class="row-main">' +
            '<div class="meta"><span class="tag">' + esc(b.subjectLabel) + '</span>' +
            '<span>' + num(b.chapters.length) + ' ' + T('فصلًا', 'chapters') + '</span></div>' +
            '<h3>' + esc(b.title) + '</h3><p>' + esc(b.subtitle) + '</p>' +
          '</div>' +
          '<div class="row-actions">' +
            '<a class="btn btn-outline" href="index.html" target="_blank" rel="noopener">' + T('عرض', 'View') + '</a>' +
          '</div>' +
        '</div>' +
        '<ol class="admin-ch">' + b.chapters.map(function (c) {
          return '<li data-book="' + esc(b.id) + '" data-n="' + c.n + '">' +
            '<span class="ch-n">' + num(c.n) + '</span>' +
            '<span class="ch-t">' + esc(c.title) + '</span>' +
            '<span class="ch-s">' + num(c.sections.length) + ' ' + T('أقسام', 'sections') + '</span>' +
            '<span class="row-actions">' +
              '<a class="btn btn-outline" href="chapter.html?book=' + esc(b.id) + '&ch=' + c.n +
                '" target="_blank" rel="noopener">' + T('عرض', 'View') + '</a>' +
              '<button class="btn btn-outline" data-act="edit" type="button">' + T('تعديل', 'Edit') + '</button>' +
              '<button class="btn btn-outline danger" data-act="del" type="button">' + T('حذف', 'Delete') + '</button>' +
            '</span></li>';
        }).join('') + '</ol></section>';
    }).join('');
  }

  $('admin-books').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var li = btn.closest('li');
    var bookId = li.getAttribute('data-book'), n = parseInt(li.getAttribute('data-n'), 10);
    if (btn.getAttribute('data-act') === 'edit') { showEditor(bookId, n); return; }

    var books = S.books();
    var b = books.filter(function (x) { return x.id === bookId; })[0];
    var c = b.chapters.filter(function (x) { return x.n === n; })[0];
    if (!confirm(T('حذف الفصل «' + c.title + '»؟ ستُحذف معه مشاركاته.',
                   'Delete the chapter “' + c.title + '”? Its comments go too.'))) return;
    b.chapters = b.chapters.filter(function (x) { return x.n !== n; });
    b.chapters.forEach(function (x, i) { x.n = i + 1; });
    S.setBooks(books);
    S.setComments(S.comments().filter(function (x) { return !(x.book === bookId && x.ch === n); }));
    renderBooks(); renderComments();
  });

  /* ---------- chapter editor ---------- */
  var pick = $('ed-bookpick');
  S.books().forEach(function (b) {
    var o = document.createElement('option');
    o.value = b.id; o.textContent = b.title;
    pick.appendChild(o);
  });

  function showEditor(bookId, n) {
    var books = S.books();
    var b = books.filter(function (x) { return x.id === bookId; })[0] || books[0];
    var c = n ? b.chapters.filter(function (x) { return x.n === n; })[0] : null;
    $('editor-title').textContent = c ? T('تعديل الفصل', 'Edit chapter') : T('فصل جديد', 'New chapter');
    $('ed-book').value = c ? b.id : '';
    $('ed-n').value = c ? c.n : '';
    pick.value = b.id;
    pick.disabled = !!c;
    $('ed-title').value = c ? c.title : '';
    $('ed-intro').value = c ? c.intro.join('\n\n') : '';
    $('ed-sections').value = c ? c.sections.map(function (s) {
      return [(s.depth ? '  ' : '') + (s.label || ''), s.title].join(' | ');
    }).join('\n') : '';
    $('ed-note').textContent = '';
    $('editor').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function hideEditor() { $('editor').hidden = true; document.body.style.overflow = ''; }
  $('new-chapter').addEventListener('click', function () { showEditor(null, null); });
  $('editor-close').addEventListener('click', hideEditor);
  $('editor-cancel').addEventListener('click', hideEditor);
  $('editor').addEventListener('click', function (e) { if (e.target === $('editor')) hideEditor(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('editor').hidden) hideEditor(); });

  $('chapter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var books = S.books();
    var b = books.filter(function (x) { return x.id === pick.value; })[0];
    if (!b) return;
    var intro = $('ed-intro').value.split(/\n{2,}/).map(function (s) { return s.trim(); }).filter(Boolean);
    var existing = (b.chapters.filter(function (x) { return x.n === parseInt($('ed-n').value, 10); })[0] || {}).sections || [];
    var sections = $('ed-sections').value.split('\n').filter(function (s) { return s.trim(); })
      .map(function (line, i) {
        var parts = line.split('|');
        var was = existing[i] || {};
        // The book's text, figures and footnotes stay put; only the number,
        // the title and the indent come from the line.
        return { label: (parts[0] || '').trim(),
                 depth: /^\s/.test(line) ? 1 : 0,
                 title: (parts[1] || '').trim(), title_en: was.title_en || '',
                 body: was.body || [], notes: was.notes || [], images: was.images || [] };
      });
    var n = parseInt($('ed-n').value, 10);
    var was = b.chapters.filter(function (x) { return x.n === n; })[0] || {};
    var rec = { n: n || b.chapters.length + 1, title: $('ed-title').value.trim(),
                title_en: was.title_en || '', intro: intro,
                images: was.images || [], sections: sections };
    var i = b.chapters.findIndex(function (x) { return x.n === rec.n; });
    if (i >= 0) b.chapters[i] = rec; else b.chapters.push(rec);
    S.setBooks(books);
    hideEditor();
    renderBooks();
  });

  /* ---------- reader questions ---------- */
  function renderComments() {
    var books = S.books();
    var list = S.comments().slice().sort(function (x, y) { return (y.at || '').localeCompare(x.at || ''); });
    var pending = list.filter(function (c) { return !c.reply; }).length;
    $('n-com').textContent = '(' + list.length + (pending ? ' · ' + pending + T(' بلا ردّ', ' awaiting') : '') + ')';

    $('admin-comments').innerHTML = list.map(function (c) {
      var b = books.filter(function (x) { return x.id === c.book; })[0];
      var ch = b && b.chapters.filter(function (x) { return x.n === c.ch; })[0];
      return '<div class="row-item comment" data-id="' + esc(c.id) + '">' +
        '<div class="row-main">' +
          '<div class="meta"><b dir="auto">' + esc(c.name) + '</b><span class="dot">' + esc(fmtDate(c.at)) + '</span>' +
          (c.hidden ? '<span class="pill warn">' + T('مخفي', 'Hidden') + '</span>' : '') +
          (c.reply ? '' : '<span class="pill">' + T('بانتظار الردّ', 'Awaiting reply') + '</span>') + '</div>' +
          '<p class="cmt-on">' + T('على: ', 'On: ') + esc(b ? b.title : '—') + ' — ' +
            T('الفصل ', 'Chapter ') + num(c.ch) + (ch ? ' · ' + esc(ch.title) : '') + '</p>' +
          (c.quote ? '<blockquote class="cmt-quote" dir="auto">' + esc(c.quote) + '</blockquote>' : '') +
          '<p dir="auto">' + esc(c.text) + '</p>' +
          (c.reply ? '<div class="cmt-reply"><b>' + T('ردّك', 'Your reply') + '</b><p dir="auto">' +
            esc(c.reply) + '</p></div>' : '') +
          '<div class="reply-box" hidden>' +
            '<textarea placeholder="' + T('اكتب ردّك…', 'Write your reply…') + '">' + esc(c.reply || '') + '</textarea>' +
            '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">' +
              '<button class="btn btn-gold" data-act="save" type="button">' + T('نشر الردّ', 'Post reply') + '</button>' +
              '<button class="btn btn-outline" data-act="cancel" type="button">' + T('إلغاء', 'Cancel') + '</button></div>' +
          '</div>' +
        '</div>' +
        '<div class="row-actions">' +
          '<button class="btn btn-outline" data-act="reply" type="button">' +
            (c.reply ? T('تعديل الردّ', 'Edit reply') : T('ردّ', 'Reply')) + '</button>' +
          '<button class="btn btn-outline" data-act="hide" type="button">' +
            (c.hidden ? T('إظهار', 'Show') : T('إخفاء', 'Hide')) + '</button>' +
          '<button class="btn btn-outline danger" data-act="del" type="button">' + T('حذف', 'Delete') + '</button>' +
        '</div></div>';
    }).join('') || '<p style="color:var(--muted)">' + T('لا مشاركات بعد.', 'Nothing yet.') + '</p>';
  }

  $('admin-comments').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-act]');
    if (!btn) return;
    var row = btn.closest('.row-item'), id = row.getAttribute('data-id');
    var act = btn.getAttribute('data-act');
    var all = S.comments();
    var c = all.filter(function (x) { return x.id === id; })[0];
    if (!c) return;

    if (act === 'reply') { row.querySelector('.reply-box').hidden = false; row.querySelector('textarea').focus(); return; }
    if (act === 'cancel') { row.querySelector('.reply-box').hidden = true; return; }
    if (act === 'save') {
      c.reply = row.querySelector('textarea').value.trim();
      c.replyAt = new Date().toISOString();
    } else if (act === 'hide') {
      c.hidden = !c.hidden;
    } else if (act === 'del') {
      if (!confirm(T('حذف مشاركة ' + c.name + '؟', 'Delete the comment by ' + c.name + '?'))) return;
      all = all.filter(function (x) { return x.id !== id; });
    }
    S.setComments(all);
    renderComments();
  });

  document.addEventListener('manara:lang', function () {
    if (!$('panel').hidden) { renderBooks(); renderComments(); }
  });

  $('reset').addEventListener('click', function () {
    if (!confirm(T('إعادة الكتاب والمشاركات إلى النصّ المنشور؟ ستُفقد تعديلاتك.',
                   'Put the book and the comments back to the published text? Your edits are lost.'))) return;
    S.reset();
    renderBooks();
    renderComments();
  });
})();
