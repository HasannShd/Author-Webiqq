/* MANARA — Arabic-first bilingual layer.
   The markup is authored in English; Arabic is the default rendering and is
   applied before first paint. The toggle switches back to the source strings. */
(function () {
  'use strict';

  var AR = {
    /* ---- chrome ---- */
    "Skip to content": "تخطَّ إلى المحتوى",
    "Home": "الرئيسية",
    "About": "عن المؤلّف",
    "About the author": "عن المؤلّف",
    "Contact": "تواصل",
    "Editor login": "لوحة التحرير",
    "Open menu": "افتح القائمة",
    "Primary": "التنقل الرئيسي",
    "Read": "اقرأ",
    "The books": "الكتابان",
    "Astronomy": "الفلك",
    "Physics": "الفيزياء",
    "The author": "المؤلّف",
    "Read about the author": "اقرأ عن المؤلّف",
    "Write to him": "اكتب إليه",
    "Twenty years of teaching physics, then a book written to answer the questions his students asked every single year and never found plainly answered anywhere. It is published free, and the physics book is on its way.":
      "عشرون عامًا في تدريس الفيزياء، ثمّ كتابٌ كُتب للإجابة عن الأسئلة التي كان طلبته يطرحونها كلّ عام ولا يجدون لها جوابًا صريحًا. وقد نُشر مجانًا، وكتابُ الفيزياء في الطريق.",
    "Contact": "تواصل",
    "Write to the author": "اكتب إلى المؤلّف",
    "Rights and translation": "الحقوق والترجمة",
    "Based in": "المقرّ",
    "Dr. Mohammed Qaisaroun Mirza": "د. محمد قيصرون ميرزا",
    "الفلك والقراء": "الفلك والقراء",
    "The astronomy book in full, free to read and free to download, with a place for readers to ask about any passage.":
      "كتابُ الفلك كاملًا، مجانًا للقراءة والتحميل، وفيه مكانٌ للقارئ ليسأل عن أيّ فقرة.",
    "Bahrain": "البحرين",
    
    "In preparation": "قيدُ الإعداد",
    "Download the whole book (PDF)": "تحميل الكتاب كاملًا (PDF)",
    "Cover, dedication and introduction": "الغلاف والإهداء والمقدّمة",
    "Chapter cover and introduction (PDF)": "غلاف الفصل ومقدّمته (PDF)",
    "Open this section (PDF)": "فتح هذا القسم (PDF)",
    "The chapter opens": "مقدّمة الفصل",
    "This book is in preparation.": "هذا الكتاب قيدُ الإعداد.",
    "The text of this section is in the attached PDF.": "نصّ هذا القسم في ملفّ الـPDF المرفق.",

    /* ---- home ---- */
    "The astronomy book in full — eight chapters, from what the universe is made of to a dialogue between mind and heart — written for the curious reader rather than the specialist. Free to read, free to download, and open to your questions on any passage.":
      "كتابُ الفلك كاملًا — ثمانيةُ فصولٍ، من مكوّنات الكونِ إلى حوارٍ بين العقلِ والقلبِ — كُتب للقارئ الفضوليّ لا للمتخصّص. مجانًا للقراءة، ومجانًا للتحميل، ومفتوحٌ لأسئلتك على أيّ فقرة.",
    "Both books": "الكتابان",
    "How to read here": "كيف تقرأ هنا",
    "Ask about any sentence.": "اسأل عن أيّ جملة.",
    "Open a chapter, select any passage, and attach a question or a comment to that exact line. The author reads every one and replies underneath it.":
      "افتح فصلًا، وحدّد أيّ فقرة، وألحق بها سؤالًا أو تعليقًا على ذلك السطر بعينه. يقرأ المؤلّف كلّ مشاركة ويردّ تحتها.",
    "Open the first chapter": "افتح الفصل الأوّل",
    "Pick a book, then a chapter": "اختر كتابًا ثمّ فصلًا",
    "Read the chapter opening, then open a section":
      "اقرأ مقدّمة الفصل ثمّ افتح قسمًا",
    "Highlight a passage to question it": "حدّد فقرةً لتسأل عنها",
    "The author replies under your note": "يردّ المؤلّف تحت مشاركتك",

    /* ---- chapter ---- */
    "Comments and questions": "التعليقات والأسئلة",
    "Discussion": "النقاش",
    "Add a comment or a question": "أضف تعليقًا أو سؤالًا",
    "On this passage": "على هذه الفقرة",
    "Remove": "إزالة",
    "Your name": "الاسم",
    "Full name": "الاسم الكامل",
    "Email (not published)": "البريد الإلكتروني (لا يُنشر)",
    "Your comment or question": "تعليقك أو سؤالك",
    "Disagreement is welcome. Rudeness is not.": "الاختلاف مُرحَّب به، أما الإساءة فلا.",
    "Post": "انشر",
    "The author reads and replies to every one.": "يقرأ المؤلّف كلّ مشاركة ويردّ عليها.",

    /* ---- about ---- */
    "A physicist by training and a teacher by habit, writing about the sky for readers who were never given the chance to study it.":
      "فيزيائيٌّ بالتكوين ومعلّمٌ بالعادة، يكتب عن السماء لقرّاءٍ لم تُتَح لهم دراستها.",
    "Biography": "سيرة",
    "Physicist · Author · Teacher": "فيزيائيّ · مؤلّف · معلّم",
    "Dr. Mohammed Qaisaroun Mirza has spent his working life between the lecture hall and the telescope. He taught physics for over two decades before turning to writing, convinced that the most interesting questions in science are the ones a non-specialist can still understand if someone takes the trouble to explain them properly.":
      "أمضى د. محمد قيصرون ميرزا حياته العمليّة بين قاعة المحاضرات والمرصد. درّس الفيزياء أكثر من عقدين قبل أن يتفرّغ للكتابة، مقتنعًا بأنّ أطرف أسئلة العلم هي تلك التي يفهمها غير المتخصّص إن تكبّد أحدهم عناء شرحها كما ينبغي.",
    "The astronomy book came out of that conviction, and a physics book is following it. Neither assumes prior study; neither talks down. They are published free because, in his words, a question about the sky should not have a price on it.":
      "من هذه القناعة وُلد كتابُ الفلك، ويتبعه كتابُ الفيزياء. لا يفترض أيٌّ منهما دراسةً سابقة، ولا يتنازل أيٌّ منهما إلى التبسيط المخلّ. وقد نُشرا مجانًا لأنّ السؤال عن السماء — على حدّ قوله — لا ينبغي أن يكون له ثمن.",
    "“I am not trying to make hard things easy. I am trying to make them worth the effort.”":
      "«لا أحاول أن أجعل الصعب سهلًا، بل أن أجعله يستحقّ الجهد.»",
    "Sections": "قسمًا",
    "Chapters": "فصلًا",
    "20+": "+٢٠",
    "Years teaching": "عامًا في التدريس",
    "History": "المسيرة",
    "The path to the books": "الطريق إلى الكتاب",
    "Begins teaching physics": "بداية تدريس الفيزياء",
    "Twenty years of lectures, and the same handful of questions asked every single year by students who had never been told the answer plainly.":
      "عشرون عامًا من المحاضرات، وحفنة الأسئلة نفسها تتكرّر كلّ عام على ألسنة طلبةٍ لم يسمعوا الجواب صريحًا قطّ.",
    "The public lectures": "المحاضرات العامّة",
    "A series of evening talks on astronomy for a general audience, which filled the room and then filled it again.":
      "سلسلة أمسياتٍ في الفلك لجمهورٍ عامّ، ملأت القاعة ثمّ ملأتها ثانيةً.",
    "Starts writing": "بداية الكتابة",
    "The lecture notes become a manuscript, rewritten three times to remove everything that assumed prior study.":
      "تحوّلت مذكّرات المحاضرات إلى مخطوطة، أُعيدت كتابتها ثلاث مرّات لحذف كلّ ما يفترض دراسةً سابقة.",
    "The astronomy book published, free":
      "صدور كتاب الفلك مجانًا",
    "Eight chapters, free to read and free to download, with a comment thread on every one of them. The physics book is in preparation.":
      "ثمانيةُ فصولٍ، مجانًا للقراءة والتحميل، ومع مساحة نقاشٍ في كلٍّ منها. وكتابُ الفيزياء قيدُ الإعداد.",
    "Read the books": "اقرأ الكتاب",
    "Get in touch": "تواصل معنا",

    /* ---- contact ---- */
    "Every message is read by the author.": "كلّ رسالة يقرأها المؤلّف.",
    "Questions about the books, requests to reprint or translate, and invitations to speak all arrive in the same inbox.":
      "الأسئلة عن الكتابين، وطلبات إعادة النشر أو الترجمة، ودعوات المحاضرات، تصل كلّها إلى البريد نفسه.",
    "Rights, reprints and translation": "الحقوق وإعادة النشر والترجمة",
    "Replies": "الردّ",
    "Usually within two to three days": "عادةً خلال يومين إلى ثلاثة",
    "Send a message": "أرسل رسالة",
    "Write to the author": "اكتب إلى المؤلّف",
    "Email address": "البريد الإلكتروني",
    "What is this about?": "موضوع الرسالة",
    "A question about the books": "سؤال عن الكتابين",
    "Rights, translation & permissions": "الحقوق والترجمة والأذونات",
    "Speaking & events": "المحاضرات والفعاليات",
    "A correction": "تصويب",
    "Something else": "شيء آخر",
    "Message": "الرسالة",
    "If your question is about a specific passage, quoting it helps.": "إن كان سؤالك عن فقرة بعينها، فاقتباسها يساعد.",
    "Send message": "أرسل الرسالة",
    "Your message is prepared for the author’s inbox.": "تُعَدُّ رسالتك لبريد المؤلّف.",
    "Thank you — your message has been prepared for the author’s inbox.": "شكرًا لك — أُعِدَّت رسالتك لبريد المؤلّف.",
    "Before you write": "قبل أن تكتب",
    "Questions we answer most": "أكثر الأسئلة تكرارًا",
    "Are the books really free?": "هل الكتابان مجانيّان فعلًا؟",
    "Yes. Both books are readable in full on this site and downloadable as PDF, with no account and no payment.":
      "نعم. الكتابان يُقرآن كاملَين على هذا الموقع ويُحمَّلان بصيغة PDF، بلا حساب وبلا دفع.",
    "Can I quote or translate a chapter?": "هل يمكنني اقتباس فصل أو ترجمته؟",
    "For non-commercial use, yes, with attribution and a link. Commercial reprints and translations are handled case by case.":
      "للاستخدام غير التجاريّ نعم، مع نسبة النصّ ورابطٍ إليه. أمّا إعادة النشر والترجمة التجاريّة فتُدرس حالةً بحالة.",
    "Will the author answer my question?": "هل سيجيب المؤلّف عن سؤالي؟",
    "He reads every comment on every chapter and replies to them himself. Expect a few days rather than a few hours.":
      "يقرأ كلّ مشاركة في كلّ فصل ويردّ عليها بنفسه. توقّع أيّامًا قليلة لا ساعات.",
    "Is there a printed edition?": "هل هناك طبعة ورقيّة؟",
    "Both books exist in print. Write to the address above for availability.":
      "الكتابان موجودان مطبوعَين. اكتب إلى العنوان أعلاه للاستفسار عن التوفّر.",

    /* ---- editor dashboard ---- */
    "Editor Dashboard": "لوحة التحرير",
    "Editor dashboard": "لوحة التحرير",
    "View site": "عرض الموقع",
    "Log out": "خروج",
    "Sign in": "دخول",
    "Password": "كلمة المرور",
    "The password is": "كلمة المرور",
    "Books and questions": "الكتب والأسئلة",
    "Edit the books and their chapters, and answer readers. Every change shows on the site straight away.":
      "حرّر الكتب وفصولها، وأجب القرّاء. كلّ تغيير يظهر مباشرةً في الموقع.",
    "Books": "الكتب",
    "Questions": "الأسئلة",
    "Content": "إدارة المحتوى",
    "+ New chapter": "+ فصل جديد",
    "Engagement": "المشاركة",
    "Reader questions": "أسئلة القرّاء",
    "Published text": "النصّ المنشور",
    "Restore the book": "إعادة الكتاب",
    "Your edits are saved in this browser. This puts the published text of the book back as it was written.":
      "تُحفظ البيانات في هذا المتصفح فقط. اضغط لإعادة المحتوى الأصلي.",
    "Restore the published text": "إعادة النصّ المنشور",
    "Chapter": "الفصل",
    "Close": "إغلاق",
    "Book": "الكتاب",
    "Chapter title": "عنوان الفصل",
    "Introduction — one paragraph per blank line": "المقدّمة — فقرة لكلّ سطر فارغ",
    "Save": "حفظ",
    "Cancel": "إلغاء"
  };

  var ATTRS = ['placeholder', 'aria-label', 'title', 'data-sent', 'alt'];
  var EN_STORE = new WeakMap();
  var ATTR_STORE = new WeakMap();
  var KEY = 'manara-lang';

  function textNodes(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE') return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var out = [], n;
    while ((n = w.nextNode())) out.push(n);
    return out;
  }

  function apply(lang) {
    var toAr = lang === 'ar';
    textNodes(document.body).forEach(function (node) {
      if (!EN_STORE.has(node)) EN_STORE.set(node, node.nodeValue);
      var en = EN_STORE.get(node);
      var ar = AR[en.trim()];
      node.nodeValue = toAr && ar ? en.replace(en.trim(), ar) : en;
    });
    document.querySelectorAll('*').forEach(function (el) {
      ATTRS.forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        var store = ATTR_STORE.get(el);
        if (!store) { store = {}; ATTR_STORE.set(el, store); }
        if (store[a] === undefined) store[a] = el.getAttribute(a);
        var en = store[a];
        var ar = AR[en.trim()];
        el.setAttribute(a, toAr && ar ? ar : en);
      });
    });
    document.documentElement.lang = toAr ? 'ar' : 'en';
    document.documentElement.dir = toAr ? 'rtl' : 'ltr';
    document.querySelectorAll('.lang').forEach(function (b) {
      b.textContent = toAr ? 'EN' : 'ع';
      b.setAttribute('aria-label', toAr ? 'Switch to English' : 'التبديل إلى العربية');
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('manara:lang', { detail: lang }));
  }

  function init() {
    var saved;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    try { apply(saved === 'en' ? 'en' : 'ar'); } catch (e) {}
    document.documentElement.classList.add('i18n-ready');
    document.querySelectorAll('.lang').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(document.documentElement.lang === 'ar' ? 'en' : 'ar');
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  // Never leave the page hidden if anything above throws.
  setTimeout(function () { document.documentElement.classList.add('i18n-ready'); }, 1500);
})();
