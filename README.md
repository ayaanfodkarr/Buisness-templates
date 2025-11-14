# TemplateHub - Pure HTML/CSS/JavaScript Website

A clean, pure HTML/CSS/JavaScript website for TemplateHub - no frameworks, no build tools, just simple static files.

## 📁 Structure

```
website/
├── index.html              # Homepage
├── blog.html               # Blog listing page
├── blog-post.html          # Individual blog post page
├── contact.html            # Contact form page
├── template-detail.html     # Template detail page
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # All JavaScript functionality
├── data/
│   ├── templates.json      # Template data
│   └── blog.json           # Blog posts data
├── templates/              # Template previews (HTML files)
└── README.md               # This file
```

## 🚀 How to Use

### Option 1: Open Directly
Simply open `index.html` in your web browser. All pages work as static HTML files.

### Option 2: Local Server (Recommended)
For best results, use a local server:

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📄 Pages

- **index.html** - Homepage with template grid and bundle CTA
- **blog.html** - Blog posts listing
- **blog-post.html** - Individual blog post (uses ?slug= parameter)
- **contact.html** - Contact form
- **template-detail.html** - Template detail page (uses ?id= parameter)

## 🎨 Features

- ✅ Pure HTML/CSS/JavaScript - No frameworks
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Template preview modal
- ✅ Mobile-friendly navigation
- ✅ Dynamic content loading from JSON
- ✅ All templates included

## 📝 Data Files

- `data/templates.json` - Contains all template information
- `data/blog.json` - Contains all blog posts

## 🔧 Customization

1. **Styles**: Edit `css/style.css`
2. **Functionality**: Edit `js/main.js`
3. **Content**: Edit the JSON files in `data/`
4. **Templates**: Add/remove templates in `templates/` folder

## 🌐 Deployment

This is a pure static website. You can deploy it to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service
- Any web server

Just upload all files to your hosting service!

## 🔄 Converting to Web App Later

When you're ready to add web app features:
1. Add `manifest.json` for PWA
2. Add service worker for offline support
3. Add app icons
4. Configure install prompts

The website structure will remain the same - just add PWA features on top!

## 📦 What's Included

- 6 Premium Templates
- Responsive navigation
- Template preview system
- Blog system
- Contact form
- Bundle deal section
- Footer with links

All ready to use, no build process needed!

