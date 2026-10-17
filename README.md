# Evershine Car Care Center — Next.js website

The Evershine website, built with Next.js (App Router) and React (JavaScript). It has six pages:

| Page | Route |
| --- | --- |
| Home | `/` |
| About Us | `/about` |
| Services & Booking | `/services` |
| Our Work | `/work` |
| Branches | `/branches` (branch details, showroom photo and Saudi Arabia map with the Al Khobar pin) |
| Contact Us | `/contact` |

English and Arabic (right-to-left) are supported with the **EN | العربية** toggle in the header.

---

## 1. Requirements

- Windows 10 or 11
- **Node.js 20 LTS or newer** (Node 22 LTS is recommended). Node includes npm.
- Visual Studio Code (recommended, not required)

Python is **not** needed.

## 2. Extract the ZIP

1. Right-click `evershine-nextjs.zip` and choose **Extract All…**.
2. Choose a folder you can find easily, for example `Documents\evershine-nextjs`, and click **Extract**.
3. Open the extracted folder. You should see `package.json`, `app`, `components`, `lib` and `public`.

## 3. Open the folder in VS Code

1. Open VS Code.
2. Choose **File → Open Folder…**, select the `evershine-nextjs` folder and click **Select Folder**.
3. To open the built-in terminal, choose **Terminal → New Terminal**. It opens in the project folder.

## 4. Install Node.js (only if you do not have it)

1. Go to <https://nodejs.org> and download the **LTS** installer for Windows.
2. Run the installer and keep the default options.
3. Close and reopen VS Code (or the terminal) so the change takes effect.
4. Check the install. In the terminal, run:

   ```
   node -v
   npm -v
   ```

   Both should print a version number.

## 5. Install the project packages

In the terminal, run:

```
npm install
```

This downloads the packages listed in `package.json` into a `node_modules` folder. It takes a minute or two the first time.

## 6. Start the development server

```
npm run dev
```

Leave this terminal open while you work.

## 7. Open the website

Open a browser and go to:

**http://localhost:3000**

Use the menu to visit the other pages, or go directly to `/about`, `/services`, `/work`, `/contact`.

To stop the server, press **Ctrl + C** in the terminal.

## 8. Create a production build

```
npm run build
```

This checks and optimises the site into a `.next` folder. To run that production build locally:

```
npm run start
```

Then open **http://localhost:3000** again.

---

## Configuration — edit this file

All business details are in **`lib/config.js`**. Each setting has a comment. Before launch, check these values:

| Setting | Current value | What it does |
| --- | --- | --- |
| `whatsappNumber` | `966506860708` | WhatsApp number for Book Now, Message on WhatsApp, the booking form and the enquiry form. Format: country code + number, no `+` and no leading `0`. |
| `phoneDisplay` / `phoneTel` | `0506860708` / `+966506860708` | Phone shown on the Contact page. |
| `email` | empty | Email shown on the Contact page and footer. Empty = hidden. |
| `mapsUrl` / `mapsVerified` | Google Maps search / `false` | Directions link. Keep `mapsVerified: false` until the link is checked; then set `true`. |
| `social.instagram` | `https://www.instagram.com/evershine_car_care_center/` | Instagram icon in the footer. |
| `social.tiktok`, `snapchat`, `linkedin` | empty | Empty = icon shown dimmed and not clickable. |
| `paymentMethods` | six logos | Logos in the white footer strip (display only). Remove an entry to hide it. |
| `testimonials` | empty | Customer reviews. Only add verified reviews. Empty = hidden. |

**Please verify before launch:** the WhatsApp number, the phone number, the Instagram URL, the payment methods and the Maps link.

Other content:

- English text is written directly in the page files under `components/pages/` and `components/`.
- Arabic translations are in `lib/i18n-ar.js` (and `lib/i18n-extra.js`). Each key is the exact English text.
- Photos and logos are in `public/assets/images/`. Payment logos are in `public/assets/images/payments/`.
- Styles are in `app/globals.css`.

## How the booking works

1. The customer picks a car size (Small, Medium or Large) and one or more services. The summary updates, and the choice is kept when switching language.
2. The customer enters name, mobile (Saudi format, e.g. 05XXXXXXXX), car make/model and an optional message.
3. Sending opens WhatsApp with a pre-filled message that contains the car size, every selected service and the customer's details. The customer reviews it and presses send.

The website does **not** confirm bookings. There is no backend, no database and no payment processing. If `whatsappNumber` is empty, the form shows the details with a copy button instead.

---

## 9. Deploy to Vercel

Vercel is the simplest host for Next.js.

**Important:** Vercel's Hobby (free) plan is for personal, non-commercial use only. This business website needs the **Pro** plan (currently $20 per month) on Vercel. Alternatively, Node.js hosting such as Hostinger also runs Next.js. See the deployment notes in the audit report.

**Option A — from GitHub (recommended)**

1. Create a GitHub repository and upload the project files (without `node_modules` and `.next`).
2. Go to <https://vercel.com>, sign in and choose **Add New… → Project**.
3. Import the repository. The settings are detected automatically (framework: Next.js). Leave the defaults.
4. Click **Deploy**. When it finishes, Vercel gives you a live link.

**Option B — with the Vercel CLI**

```
npm install -g vercel
vercel
vercel --prod
```

Follow the prompts. The first `vercel` run asks you to log in and link the project.

After deploying, set `NEXT_PUBLIC_SITE_URL` in the Vercel project settings (**Settings → Environment Variables**) to your live address, for example `https://www.example.com`. This is used for social-sharing links.

---

## Troubleshooting

- **`npm` is not recognised:** Node.js is not installed or the terminal was opened before installing. Install Node.js (step 4) and reopen VS Code.
- **Port 3000 is in use:** another program is using it. Stop it, or run `npm run dev -- -p 3001` and open http://localhost:3001.
- **Page looks unstyled:** make sure the `public` and `app` folders were extracted in full.
- **Fonts look different:** the site loads Inter and Noto Sans Arabic from Google Fonts. If you are offline, the browser uses system fonts instead.
