# Omar Ahmed Portfolio (React + Vite + TypeScript)

Run these commands inside this folder (install Node.js LTS from nodejs.org first):
- `npm install` : download dependencies (once)
- `npm run dev` : run locally, open the address it prints
- `npm run build` : create the production site in `dist/`

Deploy: push this folder to GitHub, then import it on vercel.com or netlify.com (build command `npm run build`, output folder `dist`). Routing files are already included.

Edit content only in `src/data.ts` (contact links, projects, skills). To add a fifth project, copy one object in `projects`.
Replace images in `public/` (`omar.jpg`, `logo.png`, `best-members.jpg`) keeping the same names.

After you have a domain: add canonical/Open Graph URL tags in `index.html` and a sitemap, then add its line in `public/robots.txt`.
Not yet included: certificates, Atlantis experience, Codeforces, screenshots (by your choice or missing files).

Theme: light/dark toggle in the navbar (saved in the browser; first visit follows the system setting). Colors are CSS variables at the top of `src/styles.css`.
Fonts: Cairo (Arabic) is bundled through `@fontsource/cairo`, no external font requests.
