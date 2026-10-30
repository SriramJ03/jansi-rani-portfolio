# E. Jansi Rani — Portfolio Website

Personal portfolio of **E. Jansi Rani, M.A., B.Ed.**, PG Assistant in Tamil at
Breeks Memorial Anglo-Indian Higher Secondary School, Ooty.

Built with React 19, Vite 7, Tailwind CSS 4 and Framer Motion 12.
Fonts are bundled with the site (no Google Fonts requests).

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # first time only
npm run dev      # opens a live preview at http://localhost:5173
```

## Publish it

```bash
npm run build    # creates the finished website in the dist/ folder
```

Upload the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages,
Cloudflare Pages or the school's web server). No server code is needed.

## Change the content

All text lives in **`src/data/portfolioData.js`**: profile, education, experience,
results, awards, gallery, interests and contact details. Edit it and the page updates.

| What | Where |
| --- | --- |
| Portrait and other photos | Put the file in `src/assets/images/`, then change the matching `import` line at the top of `portfolioData.js` |
| Certificates in the gallery | `gallery` list in `portfolioData.js` (each item has its own image, caption and description) |
| Downloadable CV | Replace `public/cv/E-Jansi-Rani-CV.pdf` (keep the same file name) |
| Hide date of birth / father's name | Set `showPersonalDetails = false` in `portfolioData.js` |
| Colours and fonts | `@theme` block at the top of `src/index.css` |
| Page title and search description | `index.html` |

## Contact details and the contact form

Email and phone are empty on purpose, so they show as "Shared on request".
Fill in `contact.email` and `contact.phone` in `portfolioData.js` only when
she is happy to make them public.

The form never claims a message was sent unless it really was:

1. **`contact.formEndpoint` set** (recommended): messages are delivered.
   Create a free form at [formspree.io](https://formspree.io), copy its URL
   (looks like `https://formspree.io/f/abcdwxyz`) and paste it in.
2. **Only `contact.email` set**: the visitor's email app opens with the message filled in.
3. **Neither set**: the form checks the message, then tells the visitor that online
   messages are not connected and to contact the school.

## Project structure

```
src/
  components/
    Navbar.jsx        sticky navbar, active section, mobile menu
    Hero.jsx          name, introduction, counters, portrait
    About.jsx         profile and teaching philosophy (Thirukkural 391)
    PersonalInfo.jsx  personal details
    Education.jsx     animated timeline
    Experience.jsx    current school + earlier positions
    Awards.jsx        awards and recognition (nav: Achievements)
    Gallery.jsx       certificate gallery with full-screen viewer
    Results.jsx       animated statistics (nav: Results)
    Interests.jsx     areas of interest
    Contact.jsx       contact details and form
    Footer.jsx
    Loader.jsx        opening screen
    ScrollProgress.jsx, ScrollToTop.jsx
    ui/               Button, Counter, Kolam, Reveal, SectionHeading
  data/portfolioData.js
  hooks/useActiveSection.js
  assets/images/      replaceable placeholder images
public/
  cv/E-Jansi-Rani-CV.pdf
  favicon.svg
```

## Accessibility

Visitors whose device is set to reduce motion get a still version of the site.
The site also includes keyboard focus outlines, a skip link and labelled form
fields, and its colour contrast meets WCAG AA for body text.
