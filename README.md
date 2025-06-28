# Airco Installateur Limburg

Professionele leadgen website voor airco installatie, onderhoud en service in heel Limburg.

## 🚀 Deployment naar Netlify

### Stap 1: Environment Variables
Voeg de volgende environment variables toe in Netlify:

```
VITE_EMAILJS_SERVICE_ID=service_1rruujp
VITE_EMAILJS_TEMPLATE_ID=template_rkcpzhg
VITE_EMAILJS_PUBLIC_KEY=sjJ8kK6U9wFjY0zX9
```

### Stap 2: Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18.x of hoger

### Stap 3: Deploy
1. Push naar GitHub
2. Verbind met Netlify
3. Deploy!

## 📦 Lokaal Ontwikkelen

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build

# Preview productie build
npm run preview
```

## 🎨 Features

- **Responsive Design** - Geoptimaliseerd voor alle apparaten
- **SEO Geoptimaliseerd** - Voor lokale zoekresultaten in Limburg
- **Contact Formulieren** - Direct gekoppeld aan EmailJS
- **Performance** - Lazy loading en code splitting
- **Typewriter Effect** - Dynamische hero headlines
- **YouTube Integratie** - Embedded service video

## 📝 Content Updates

### Prijzen aanpassen
Bewerk `src/utils/constants.ts`:
- Onderhoudsprijzen in `SERVICES.maintenance`

### Openingstijden
Bewerk `src/utils/constants.ts`:
- `BUSINESS_HOURS` object

### Contact Info
Bewerk `src/utils/constants.ts`:
- `COMPANY_INFO` object

## ⚡ Performance

- Lighthouse score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

## 🔧 Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- EmailJS
- Lucide Icons