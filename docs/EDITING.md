# Editing your portfolio

Everything on the site comes from one file: `src/content/site.yaml`.
When you commit a change to it on the `main` branch, GitHub rebuilds and publishes the site automatically. It usually takes about two minutes.

## How to edit on GitHub (no tools needed)

1. Open https://github.com/cheafver/cheafver.github.io/blob/main/src/content/site.yaml
2. Click the pencil icon ("Edit this file").
3. Change the text you want. Keep the indentation (spaces) exactly as it is.
4. Click **Commit changes…**, write a short note (for example "Add LinkedIn link"), and commit directly to `main`.
5. Open the **Actions** tab to watch the build. A green tick means the site is live with your change.

If the build fails, the Actions log tells you which line in `site.yaml` is wrong and why (for example a date written as `2024-05` instead of `May 2024`). The live site stays on the last good version until you fix it.

## Filling in the placeholders

These are empty (`""`) for now. While empty, they show a "Coming soon" label, or are hidden entirely if you turn on `hidePlaceholders` (see below).

| What | Key in `site.yaml` | What to put |
| --- | --- | --- |
| LinkedIn | `contact.linkedinUrl` | Your full profile URL, e.g. `https://www.linkedin.com/in/your-name` |
| Credly badges | `credlyUrl` under each certification | The badge URL, e.g. `https://www.credly.com/badges/...` |
| CV (PDF) | `cvUrl` | First upload the PDF to `public/cv/` (Add file, Upload files), then set `/cv/your-file.pdf` |
| Headshot | `profile.headshot` | Currently a generated **placeholder** (`/img/headshot-placeholder.webp`, captioned "Placeholder photo"). Upload your real square photo (400×400 WebP is ideal) to `public/img/`, then set `/img/your-file.webp` |

Dates always use the format `Mon YYYY`, for example `Aug 2026`.

## Settings

- `settings.noindex: true` keeps search engines from indexing the site. Leave it on while you collect feedback from colleagues. **Set it to `false` when you're ready to launch publicly** so headhunters can find you on Google.
- `settings.hidePlaceholders: false` shows "Coming soon" for empty links. Set it to `true` to hide empty CV, LinkedIn and Credly items completely. The Email button and the copy-email row are always shown.

## Things the build will refuse

The build fails if `noindex` is `false` while the headshot is still the placeholder, and if `headshot` or `cvUrl` points to a file that isn't in `public/`. It also fails if the output contains your plain email address, an Instagram link, or an external link without safe link settings. Your email is assembled in the browser so bots scraping the page can't read it.
