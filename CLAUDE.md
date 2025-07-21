# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional lead generation website for "Airco Installateur Limburg" - an HVAC business serving the Limburg region in the Netherlands. The site is optimized for local SEO and designed for conversion with multiple contact forms and call-to-action elements.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint TypeScript/React code
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Core Structure
- **React 19 + TypeScript** with Vite build tool
- **Tailwind CSS v3** for styling (downgraded from v4 for compatibility)
- **Framer Motion** for animations and transitions
- **EmailJS** for contact form submissions
- **Lazy loading** pattern with React.Suspense for performance

### Key Configuration Files
- `src/utils/constants.ts` - Central configuration for all business data
- `src/utils/emailjs.ts` - Email service integration and form handling
- `netlify.toml` - Deployment configuration with security headers

### Component Architecture
The app follows a sectioned single-page layout:
1. **HeroOptimized** - Landing section with typewriter effect and contact form
2. **ServicesOptimized** - Service offerings with embedded YouTube video
3. **WhyUs** - Benefits and unique selling points
4. **BrandLogos** - Partner brand showcase
5. **Products** - Product catalog with detailed modal views
6. **FAQ** - Frequently asked questions with schema markup
7. **Contact** - Main contact section

### Content Management
All business content is centralized in `src/utils/constants.ts`:
- `COMPANY_INFO` - Contact details, ratings, business information
- `BUSINESS_HOURS` - Operating hours for schema markup
- `SERVICES` - Service offerings and pricing
- `HERO_HEADLINES` - Rotating headlines for local SEO
- `SEO_LOCATIONS` - Target cities for optimization

### Email Integration
Contact forms use EmailJS with these environment variables:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID` 
- `VITE_EMAILJS_PUBLIC_KEY`

Forms automatically map service types to predefined messages and include location data for lead qualification.

### SEO Implementation
- Comprehensive structured data (HVACBusiness, Service, BreadcrumbList schemas)
- Local SEO optimization for Limburg region cities
- Google Search Console verification meta tag included
- OpenGraph and Twitter Cards for social sharing

### Performance Optimizations
- Code splitting with lazy imports
- Image optimization for 40+ product images
- Tailwind CSS purging for minimal bundle size
- Framer Motion animations are performance-optimized

### Deployment
Automated deployment to Netlify with:
- Build command: `npm run build`
- Publish directory: `dist`
- Node.js version: 18+
- Security headers configured in netlify.toml

## Important Notes

### Pricing Strategy
The site intentionally does not display product prices to encourage contact for quotes. Only maintenance pricing is shown (€11/month or €149 one-time).

### Business Hours
No 24/7 service - operates during standard business hours with office phone support only.

### Local Focus
All content and SEO is specifically targeted at the Limburg region with emphasis on major cities: Heerlen, Sittard, Maastricht, Roermond, Geleen, Kerkrade, Brunssum.

### Brand Integration
Supports major HVAC brands: Daikin, LG, Samsung, Mitsubishi Heavy Industries, Toshiba, Tosot.