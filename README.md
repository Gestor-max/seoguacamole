# SEO Guacamole Event - Frontend

A React + Tailwind CSS + TypeScript frontend for the SEO Guacamole event website. This is a production-ready, static frontend that can be deployed to any hosting platform.

## 🎯 Features

- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Vite** for fast builds and development
- **Multi-language support** (English, Spanish, Portuguese)
- **Responsive design** for all devices
- **Zero backend dependencies** - pure frontend

## 📋 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Hero.tsx
│   │   ├── Speakers.tsx
│   │   ├── Agenda.tsx
│   │   ├── Tickets.tsx
│   │   ├── Partners.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   └── LanguageContext.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
└── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Build Output

After running `npm run build`, the compiled files will be in the `dist/` folder:

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-*.js          # JavaScript bundles
│   └── index-*.css         # CSS bundles
└── ...
```

## 🌐 Deployment

### Option 1: Static Hosting (Recommended)
Upload the entire `dist/` folder to:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3 + CloudFront**
- **Any static hosting service**

### Option 2: Traditional Hosting
Copy the contents of `dist/` to your web server's public directory.

## 🎨 Customization

### Change Colors
Edit `client/src/index.css` to modify the color scheme.

### Update Content
Edit the `LanguageContext.tsx` file to update event details, speaker information, and translations.

### Add Components
Create new components in `client/src/components/` and import them in `App.tsx`.

## 🌍 Languages

The site supports three languages:
- **English** (en)
- **Spanish** (es)
- **Portuguese** (pt)

Switch languages using the language selector in the header.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is proprietary and confidential.

## 👥 Authors

- **Nestor Vazquez** - Event Organizer
- **SEO Guacamole Team**

## 📞 Support

For questions or issues, contact: hola@nestorvazquez.com

---

**Event Date:** February 26, 2026  
**Location:** Hotel Roma Conesa, Mexico City
