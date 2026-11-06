# Mark 4 IOP Treasurer: campaign site

A single-page site (plain HTML, CSS, JavaScript; no build step) ready for GitHub Pages.

## Publish it (about 5 minutes)

1. Create a free account at github.com if you don't have one.
2. Click **New repository**. Name it something short, like `iop-treasurer`. Keep it **Public**.
3. On the new repo page, click **uploading an existing file**. Open the unzipped folder, select **every file in it** (Ctrl+A on Windows, Cmd+A on Mac), and drag them onto the page, or click **choose your files** and select them all. There are no folders to deal with: all 18 files sit side by side, and `index.html` is one of them. Wait until every file has finished uploading, then click **Commit changes**.
4. Go to **Settings, then Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, pick **main** and **/ (root)**, and click **Save**.
5. Wait a minute or two. Your site will be at `https://YOUR-USERNAME.github.io/iop-treasurer/`.

To edit on GitHub: open the file in your repo, click the pencil icon, change it, click **Commit changes**. The live site updates in a minute or two.

## Things to fill in

| What | Where | Why |
|---|---|---|
| **Site address for link previews** | `index.html`, search for `YOUR-USERNAME` (2 places, near the top) | Makes the flyer image show when you text or post the link. Replace `YOUR-USERNAME` with your GitHub username. If your repository isn't called `iop-treasurer`, change that part of the address too |
| **Past treasurers' ideas** | `ideas.js` | See below |
| **Baking photos** | `index.html` (bottom gallery) | See below |

Your phone number and email are written directly in `index.html` (the "Your voice" section and the footer). Search for `217` or `markmcdonald@college.harvard.edu` if you ever need to change them.

## The idea wheel

The ideas section is one wheel. Visitors can click the arrows, click a dot, click a side card, swipe or drag, or use the left and right arrow keys. It loops around, and the cards follow the order listed in `ideas.js`.

Each card has a simple picture. Pick one with the `icon` line: `coins`, `briefcase`, `chart`, `book`, `clipboard`, `seedling`, `chat`, `calendar`, `house`, `food`, or `bulb`. Pictures on "carrying forward" cards sit on a dark panel; "new" cards sit on a lime one.

Put `*stars*` around a word in a title to highlight it, e.g. `"*Workable* budgets"`.

**Gold card.** Add `accent: "gold"` to any card in `ideas.js` and it turns gold (with a gold dot under the wheel), so it stands out in the mix. IOP food drops uses it. Any card can also have a `why:` line, shown as a "Why" row, for where the idea comes from (on food drops: "A favorite in housing communities that I want to expand to the IOP."). Give the `why` line to the card's `es:` and `fr:` blocks too.

## Adding the ideas from past treasurers

Open `ideas.js`. Each card is one block. Copy a `kind: "continuing"` block, paste it right after, and edit:

```js
{
  kind: "continuing",
  icon: "book",                                     // see the picture list above
  title: "Name of the idea",
  blurb: "One plain sentence about what it is.",
  mine: "What you would do to carry it forward.",
  baton: "Started under [Name], Treasurer 2024-25"   // optional; "" hides it
},
```

When you add the "Started under..." line (`baton`), add it to the card's `es:` and `fr:` blocks too ("Iniciada bajo...", "Lancée sous..."), or it will show in English for those visitors.

For a new idea, use `kind: "new"` with either `now` and `later` lines, or one `detail` line (as the IOP food drops card does).

Cards that are still worth double-checking with the past treasurer: **OneFund**, **Director's Internships**, **Workable budgets**, **The Funding Guide**. The descriptions are deliberately light so no words are put in anyone's mouth. Add details once you've talked.

**IOP food drops** is currently tagged as a *new* idea. If it is actually something a past treasurer started, change its `kind` to `"continuing"` and fill in `mine` and `baton` instead of `detail`.

## The baking gallery

The last section is a grid of polaroid-style photos (square pictures in a white frame, each tilted a little, with a handwritten caption). To add one: upload a square-cropped JPG (about 720 by 720 pixels is plenty) to your repo (**Add file**, then **Upload files**), then in `index.html` copy one `<figure>...</figure>` block inside the `.gallery` and change the file name, the `alt` text, and the caption.

## How the voting banner works

The strip at the very top is a scrolling "breaking news" ticker. It changes on its own (US Eastern):

- Before Nov 14: an **Important** tag, then one continuous message: "Voting opens Saturday, Nov 14 and closes 11:59 PM Sunday, Nov 15. Ballots arrive by email. Have your HUID ready. Vote Mark 4 IOP Treasurer."
- Nov 14 to 11:59 PM Nov 15: a **Live now** tag and a message that says voting is open now.
- After: an **Update** tag and a thank-you message.

Visitors can pause it with the small button at the right end, and it pauses when the mouse is over it. If someone has "reduce motion" turned on in their device settings, the ticker doesn't move and they see a plain sentence instead.

To change the ticker's wording, edit the `news.before.message`, `news.open.message` and `news.closed.message` lines in `i18n.js` (the English block at the top, then the Spanish and French blocks below it). The plain-sentence versions for "reduce motion" are the matching `.text` lines. The closing time comes from your voting-day email. The opening hour is assumed to be midnight; change `voteOpens` in `config.js` if it's different.

## Languages (English, Spanish, French)

The site is English first. A small **globe button** (EN / ES / FR) sits at the right end of the top bar. It opens a menu with English, Español and Français, and the whole page switches at once: headings, cards, the voting ticker, button labels and screen-reader text.

- **It remembers.** The visitor's choice is saved in their browser, so the site opens in the same language next time. The site does not guess from the browser's language; everyone starts in English.
- **Shareable links.** Add `?lang=es` or `?lang=fr` to the address to open straight into that language, e.g. `https://YOUR-USERNAME.github.io/iop-treasurer/?lang=es`. Handy for a Spanish-language GroupMe or a French-language club list.
- **Where the words live.** English is written in `index.html` (and in `ideas.js` for the idea cards). Spanish and French are in `i18n.js`, one block each, using the same key names. Each idea card in `ideas.js` has its own `es:` and `fr:` block.
- **Adding a new idea card.** Write the English as usual, then copy the `es:` and `fr:` blocks from a similar card and translate them. If you leave a field out, that card simply shows the English for that field, so nothing breaks.
- **Changing English wording.** If you edit an English sentence in `index.html`, update the matching key in `i18n.js` for Spanish and French too (the key name is the `data-i18n="..."` on that line), or the other languages will keep the old sentence.
- **Tone.** Spanish uses the friendly *tú*; French uses the polite *vous*. Names that should stay as they are (OneFund, Director's Internships, Global Affairs Program, All House Committee, HUID, the "Mark 4 IOP Treasurer" lockup) are left in English on purpose.
- **A native-speaker read.** The translations were written with care, but it's worth asking a Spanish and a French speaker to skim them before launch. Send corrections to whoever edits the file, or edit the lines in `i18n.js` directly.
- **Link previews.** The preview card shown when the link is texted or posted (the `og:` tags in `index.html`) stays in English.

## Notes

- **Fonts:** the headline font (Bebas Neue) and the handwritten baking captions (Caveat) load from Google Fonts. If they can't load, the headlines fall back to Impact and the captions to a system script font, so it still looks right.
- **Photo:** `mark.jpg` is cropped from your flyer. To swap in a better headshot, replace that file, keeping the name. Ideally use one at least 900 pixels wide with a plain dark green background.
- **Election rules:** check the IOP's election guidelines on campaign materials and online presence before you share the link.
