# الفلك والقراء — Dr. Mohammed Qaisaroun Mirza

A reading platform for Dr. Mohammed Qaisaroun Mirza's astronomy book, published free to read and
free to download, with a place for readers to ask about any passage. A physics book follows.

## The site

Four pages plus the editor dashboard, all static — plain HTML, CSS and vanilla JavaScript, no
build step and no backend.

| File | What it is |
| --- | --- |
| `index.html` | Quranic verse, the author's name, a subject switch, then the books with their full chapter lists |
| `chapter.html` | A chapter: the opening as web text, the author's numbered sections nested one level deep with their figures and PDFs, and the discussion thread |
| `about.html` | The author and the path to the books |
| `contact.html` | Contact form and the questions readers ask most |
| `admin.html` | Editor dashboard, password `manara` |

Arabic loads by default with a full RTL layout. The header **EN** button switches the whole
site, dashboard included, and the choice persists in `localStorage`.

## Reading and commenting

Chapter text is web text rather than an embedded PDF, because text selection is what makes
highlight-to-comment possible at all. A reader selects any passage, attaches a question to that
exact line, and the quote is stored with the comment and shown above it — in the thread and in
the dashboard. The author's own PDFs stay alongside as downloads, per section and per chapter,
under `pdf/`, section by section, with the whole 282-page book as `pdf/full-book.pdf`.

## Content

`content.js` is the whole astronomy book — 8 chapters, 120 sections, 300 paragraphs and 112
figures — generated from the 130 PDFs the author supplied. It is generated output: edit the
book by re-running the builder, or through the dashboard, not by hand.

Extracting the Arabic needed care. `get_text()` gets two things wrong on these files: a line's
trailing diacritic is emitted first and arrives detached, and every lam-alef ligature comes out
reversed, turning لا into ال — which no text rule can undo, because ال is also the definite
article. Both are unambiguous in the glyph geometry, so each line is rebuilt from the character
boxes: ordered right-to-left by each glyph's right edge, with the ligature's zero-width alef put
back after its lam. The extractor runs over the author's source folder and is kept with it, not
here — this repository holds its output.

The physics book is listed but empty, marked as in preparation, until his files arrive. The
site's own imagery is locally generated SVG in `img/`; the book's figures are lifted out of the
PDFs into `img/book/`. The palette is Liver Chestnut / Almond Light / Morning Blue / Arsenic.

## How the data works

`cms.js` holds the books and renders the site, `admin.js` drives the dashboard, and
`window.MANARA` is the only thing that touches storage — swapping it for API calls is all a
backed version needs.

Books and comments live in `localStorage` so the dashboard can save without a server. The seed
carries a `SEED_VERSION`; bump it in `cms.js` whenever the shipped content changes, or a
browser that has visited before will keep serving its own stored copy and never see the new
chapters.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `/`.

## Deployment

Static, no build command. Deploy this directory as the project root on Vercel or Cloudflare
Pages. `vercel.json` and `_headers` carry the same headers for each host.

The site is currently closed to search engines: `robots.txt` disallows everything and both
header files send `X-Robots-Tag: noindex`. Clear all three when the author wants the book
found.
