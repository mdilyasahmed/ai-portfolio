# Sanam Kolia - Professional Portfolio Website

A modern, responsive, and interactive portfolio website built with HTML, CSS, and JavaScript. This portfolio showcases skills, projects, experience, and provides a contact form for potential clients or employers.

## ✨ Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Elements** - Hover effects, scroll animations, and smooth navigation
- **Sections Include:**
  - Hero section with call-to-action
  - About section with personal information
  - Skills showcase with progress bars
  - Projects portfolio with descriptions
  - Experience timeline
  - Contact form with social links
- **Performance Optimized** - Fast loading and smooth scrolling
- **Easy to Customize** - Well-organized code structure

## 🚀 Quick Start

### View Locally

1. **Download/Clone the files**
   - Ensure you have all three files: `index.html`, `styles.css`, and `script.js`
   - Keep them in the same folder

2. **Open in Browser**
   - Simply double-click on `index.html`
   - Or right-click and choose "Open with" your preferred browser

3. **Test Responsiveness**
   - Resize your browser window
   - Or use browser DevTools (F12) to test different device sizes

## 📝 Customization Guide

### Update Personal Information

1. **Hero Section** - Edit in `index.html`:
   ```html
   <h1 class="hero-title">Your Name</h1>
   <p class="hero-description">Your Title/Description</p>
   ```

2. **About Section** - Update your bio, email, location, and education

3. **Skills** - Modify skill cards and adjust progress bar widths:
   ```html
   <div class="skill-progress" style="width: 90%"></div>
   ```

4. **Projects** - Add your own projects with descriptions and tags

5. **Experience** - Update timeline with your work history

6. **Contact Information** - Update email, phone, location, and social media links

### Add Your Photo

Replace the placeholder with your photo:
```html
<!-- Replace this: -->
<div class="image-placeholder">
    <i class="fas fa-user"></i>
</div>

<!-- With this: -->
<img src="your-photo.jpg" alt="Sanam Kolia" style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover;">
```

### Add Project Images

Replace project placeholders with actual screenshots:
```html
<!-- Replace this: -->
<div class="project-placeholder">
    <i class="fas fa-laptop-code"></i>
</div>

<!-- With this: -->
<img src="project-screenshot.jpg" alt="Project Name" style="width: 100%; height: 100%; object-fit: cover;">
```

### Change Color Scheme

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;     /* Change to your preferred color */
    --secondary-color: #8b5cf6;   /* Change to your preferred color */
}
```

## 🌐 Deployment Options

### Option 1: GitHub Pages (FREE & Recommended)

1. **Create a GitHub Account** (if you don't have one)
   - Visit: https://github.com

2. **Create a New Repository**
   - Click "New" repository
   - Name it: `your-username.github.io` or any name you prefer
   - Make it public

3. **Upload Files**
   - Click "uploading an existing file"
   - Drag and drop: `index.html`, `styles.css`, `script.js`
   - Commit changes

4. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Select "main" branch
   - Save

5. **Access Your Website**
   - Your site will be live at: `https://your-username.github.io/`
   - Or: `https://your-username.github.io/repository-name/`

### Option 2: Netlify (FREE)

1. **Visit** https://www.netlify.com

2. **Sign Up** for a free account

3. **Drag & Drop Deployment**
   - Drag your portfolio folder to Netlify's deploy area
   - Your site will be live in seconds!

4. **Custom Domain** (Optional)
   - You can add a custom domain in settings

### Option 3: Vercel (FREE)

1. **Visit** https://vercel.com

2. **Sign Up** with GitHub

3. **Import Project**
   - Upload your files
   - Deploy instantly

4. **Get URL**
   - Receive a free `.vercel.app` domain

### Option 4: Traditional Web Hosting

1. **Get Hosting** (e.g., Bluehost, HostGator, GoDaddy)

2. **Upload via FTP/cPanel**
   - Upload all files to public_html or www directory

3. **Access via Domain**
   - Your site will be live at your domain

## 📧 Contact Form Setup

The current contact form shows an alert. To make it functional:

### Option 1: Use FormSubmit (FREE, No Backend Required)

1. Visit: https://formsubit.co
2. Replace form action in `index.html`:
```html
<form id="contactForm" action="https://formsubit.co/your-email@example.com" method="POST">
```

### Option 2: Use Formspree (FREE Tier Available)

1. Visit: https://formspree.io
2. Sign up and create a form
3. Add the endpoint to your form

### Option 3: Use EmailJS

1. Visit: https://www.emailjs.com
2. Set up email service
3. Update JavaScript with EmailJS code

### Option 4: Backend Integration

For a custom solution, integrate with:
- Node.js + Express + Nodemailer
- PHP mail function
- Python Flask/Django
- Firebase Functions

## 🛠️ Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 📱 Mobile Responsive

The portfolio automatically adapts to:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Interactivity and dynamic features
- **Font Awesome** - Icons
- **Google Fonts** - Poppins font family

## ⚡ Performance Tips

1. **Optimize Images**
   - Compress images before uploading
   - Use WebP format for better performance
   - Recommended size: < 200KB per image

2. **CDN Links**
   - Font Awesome and Google Fonts load from CDN
   - Very fast and reliable

3. **Minimal Dependencies**
   - No heavy frameworks
   - Fast loading time

## 🔧 Troubleshooting

### Issue: Styles not loading
- Ensure `styles.css` is in the same folder as `index.html`
- Check browser console for errors (F12)

### Issue: JavaScript not working
- Ensure `script.js` is in the same folder as `index.html`
- Check browser console for errors

### Issue: Icons not showing
- Check internet connection (Font Awesome loads from CDN)
- Or download Font Awesome locally

### Issue: Form not working
- Set up a form backend service (see Contact Form Setup)

## 📄 License

This portfolio template is free to use for personal and commercial projects. Feel free to customize it for your needs!

## 🤝 Support

If you need help customizing or deploying your portfolio:
- Check documentation above
- Search for tutorials on YouTube
- Ask questions in web development forums

## 🎯 Next Steps

1. ✅ Customize all content with your information
2. ✅ Add your photos and project screenshots
3. ✅ Update colors to match your brand
4. ✅ Set up contact form backend
5. ✅ Test on multiple devices
6. ✅ Deploy to hosting platform
7. ✅ Share your portfolio link!

## 📞 Connect

Once deployed, share your portfolio on:
- LinkedIn
- Twitter
- GitHub Profile
- Resume/CV
- Email signature
- Business cards

---

**Created for Sanam Kolia**  
*Last Updated: January 2026*

Good luck with your portfolio! 🚀
