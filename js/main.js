// Navigation
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  // Scroll effect
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
  
  // Scroll gradient overlay
  const scrollOverlay = document.getElementById('scroll-overlay');
  if (scrollOverlay) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateScrollOverlay() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollY / (documentHeight - windowHeight);
      
      // Show overlay when scrolled down and not at the very top
      if (scrollY > 100 && scrollPercentage < 0.95) {
        scrollOverlay.classList.add('active');
      } else {
        scrollOverlay.classList.remove('active');
      }
      
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollOverlay);
        ticking = true;
      }
    });
    
    // Initial check
    updateScrollOverlay();
  }
  
  // Floating Orbs Parallax Effect
  const floatingOrbs = document.querySelectorAll('.floating-orb');
  if (floatingOrbs.length > 0) {
    let tickingOrbs = false;
    
    // Store initial positions for float animation
    const orbPositions = {};
    const animationDelays = [0, 5, 10]; // Delays for each orb
    floatingOrbs.forEach((orb, index) => {
      orbPositions[index] = { x: 0, scale: 1 };
    });
    
    // Float animation (15s cycle)
    let startTime = Date.now();
    function updateFloatAnimation() {
      const currentTime = (Date.now() - startTime) / 1000; // Time in seconds
      
      floatingOrbs.forEach((orb, index) => {
        const delay = animationDelays[index] || 0;
        const time = (currentTime + delay) % 15; // 15 second cycle
        let x = 0, scale = 1;
        
        // 0-5s: Move right and scale up
        if (time < 5) {
          const progress = time / 5;
          x = progress * 30;
          scale = 1 + progress * 0.1;
        }
        // 5-10s: Move left and scale down
        else if (time < 10) {
          const progress = (time - 5) / 5;
          x = 30 - progress * 50; // 30 to -20
          scale = 1.1 - progress * 0.2; // 1.1 to 0.9
        }
        // 10-15s: Return to start
        else {
          const progress = (time - 10) / 5;
          x = -20 + progress * 20; // -20 to 0
          scale = 0.9 + progress * 0.1; // 0.9 to 1
        }
        
        orbPositions[index] = { x, scale };
      });
      requestAnimationFrame(updateFloatAnimation);
    }
    updateFloatAnimation();
    
    function updateOrbsParallax() {
      const scrollY = window.scrollY;
      
      floatingOrbs.forEach((orb, index) => {
        const speed = parseFloat(orb.getAttribute('data-speed')) || 0.3;
        const translateY = scrollY * speed;
        const { x, scale } = orbPositions[index];
        // Combine parallax (Y-axis) with float animation (X-axis and scale)
        orb.style.transform = `translate(${x}px, ${translateY}px) scale(${scale})`;
      });
      
      tickingOrbs = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!tickingOrbs) {
        window.requestAnimationFrame(updateOrbsParallax);
        tickingOrbs = true;
      }
    });
    
    // Initial update
    updateOrbsParallax();
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  // Smooth scroll for hash links with offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const navHeight = 80; // Fixed nav height + padding
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
        }
      }
    });
  });
  
  // Handle hash on page load
  if (window.location.hash) {
    setTimeout(function() {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        const navHeight = 80; // Fixed nav height + padding
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 500);
  }
});

// Template Preview Modal
function openPreview(template) {
  const modal = document.getElementById('preview-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalIframe = document.getElementById('modal-iframe');
  const modalLink = document.getElementById('modal-link');
  
  if (modal && modalTitle && modalIframe && modalLink) {
    modalTitle.textContent = (template.title || 'Template') + ' - Preview';
    modalIframe.src = template.demo || '';
    modalLink.href = template.demo || '#';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Make function available globally
window.openPreview = openPreview;

function closePreview() {
  const modal = document.getElementById('preview-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const modalIframe = document.getElementById('modal-iframe');
    if (modalIframe) {
      modalIframe.src = '';
    }
  }
}

// Make function available globally
window.closePreview = closePreview;

// Close modal on outside click
document.addEventListener('click', function(e) {
  const modal = document.getElementById('preview-modal');
  if (modal && e.target === modal) {
    closePreview();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePreview();
  }
});

// Load Templates
async function loadTemplates() {
  const container = document.getElementById('templates-container');
  const loading = document.getElementById('templates-loading');
  const error = document.getElementById('templates-error');
  
  let templates = null;
  
  // First, try to use embedded data (works without server)
  if (window.templatesData && Array.isArray(window.templatesData)) {
    templates = window.templatesData;
  } else {
    // Fallback: try to fetch from JSON file (requires server)
    try {
      let response = await fetch('data/templates.json').catch(() => null);
      if (!response || !response.ok) {
        response = await fetch('./data/templates.json');
      }
      
      if (response && response.ok) {
        templates = await response.json();
      }
    } catch (err) {
      console.error('Error loading templates:', err);
    }
  }
  
  if (loading) loading.style.display = 'none';
  
  if (templates && Array.isArray(templates) && templates.length > 0) {
    if (error) error.style.display = 'none';
    
    if (container) {
      container.innerHTML = '';
      templates.forEach((template, index) => {
        const card = createTemplateCard(template, index);
        container.appendChild(card);
      });
      container.style.display = 'grid';
    }
  } else {
    if (error) {
      error.style.display = 'block';
      error.querySelector('p').textContent = 'No templates available.';
    }
  }
}

function createTemplateCard(template, index) {
  const card = document.createElement('div');
  card.className = 'template-card';
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  
  setTimeout(() => {
    card.style.transition = 'all 0.6s';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 100);
  
  const priceBadge = template.type === 'paid' 
    ? `<span class="template-price paid">$${template.price}</span>`
    : `<span class="template-price free">FREE</span>`;
  
  const tags = template.tags.slice(0, 3).map(tag => 
    `<span class="template-tag">${tag}</span>`
  ).join('');
  
  // Escape template object for onclick
  const templateEscaped = JSON.stringify(template).replace(/"/g, '&quot;');
  
  card.innerHTML = `
    <div class="template-preview" onclick='openPreview(${templateEscaped})'>
      <iframe src="${template.demo}" loading="lazy" style="background: #000;"></iframe>
      <div class="template-preview-overlay">
        <span>Click to Preview</span>
      </div>
    </div>
    <div class="template-card-content">
      <div class="template-header">
        <h3 class="template-title text-gradient">${template.title}</h3>
        ${priceBadge}
      </div>
      <p class="template-short">${template.short}</p>
      <div class="template-tags">${tags}</div>
      <div class="template-actions">
        <button class="btn-small btn-preview" onclick='openPreview(${templateEscaped})'>Live Preview</button>
        <a href="${template.demo}" target="_blank" rel="noopener noreferrer" class="btn-small btn-link" title="Open in New Tab">🔗</a>
        <a href="template-detail.html?id=${template.id}" class="btn-small btn-details">Details</a>
        ${template.type === 'paid' ? `<a href="${template.buyLink}" target="_blank" rel="noopener noreferrer" class="btn-small btn-buy">Buy Now</a>` : ''}
      </div>
    </div>
  `;
  
  return card;
}

// Load Blog Posts
async function loadBlogPosts() {
  const container = document.getElementById('blog-container');
  const loading = document.getElementById('blog-loading');
  const error = document.getElementById('blog-error');
  
  let posts = null;
  
  // First, try to use embedded data (works without server)
  if (window.blogData && Array.isArray(window.blogData)) {
    posts = window.blogData;
  } else {
    // Fallback: try to fetch from JSON file (requires server)
    try {
      let response = await fetch('data/blog.json').catch(() => null);
      if (!response || !response.ok) {
        response = await fetch('./data/blog.json');
      }
      
      if (response && response.ok) {
        posts = await response.json();
      }
    } catch (err) {
      console.error('Error loading blog posts:', err);
    }
  }
  
  if (loading) loading.style.display = 'none';
  
  if (posts && Array.isArray(posts) && posts.length > 0) {
    if (error) error.style.display = 'none';
    
    if (container) {
      container.innerHTML = '';
      posts.forEach((post, index) => {
        const card = createBlogCard(post, index);
        container.appendChild(card);
      });
      container.style.display = 'grid';
    }
  } else {
    if (error) {
      error.style.display = 'block';
      error.querySelector('p').textContent = 'No blog posts available.';
    }
  }
}

function createBlogCard(post, index) {
  const card = document.createElement('article');
  card.className = 'blog-card';
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px)';
  
  setTimeout(() => {
    card.style.transition = 'all 0.6s';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 100);
  
  const firstWord = post.title.split(' ')[0];
  
  card.innerHTML = `
    <div class="blog-card-image">
      <span>${firstWord}</span>
    </div>
    <div class="blog-card-content">
      <div class="blog-card-date">${post.date}</div>
      <h2 class="blog-card-title text-gradient">${post.title}</h2>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <a href="blog-post.html?slug=${post.slug}" class="blog-card-link">Read More →</a>
    </div>
  `;
  
  return card;
}

// Load Blog Post
async function loadBlogPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  
  if (!slug) {
    window.location.href = 'blog.html';
    return;
  }
  
  const container = document.getElementById('blog-post-container');
  const loading = document.getElementById('blog-post-loading');
  const error = document.getElementById('blog-post-error');
  
  let posts = null;
  
  // First, try to use embedded data (works without server)
  if (window.blogData && Array.isArray(window.blogData)) {
    posts = window.blogData;
  } else {
    // Fallback: try to fetch from JSON file (requires server)
    try {
      let response = await fetch('data/blog.json').catch(() => null);
      if (!response || !response.ok) {
        response = await fetch('./data/blog.json');
      }
      
      if (response && response.ok) {
        posts = await response.json();
      }
    } catch (err) {
      console.error('Error loading blog post:', err);
    }
  }
  
  if (posts) {
    const post = posts.find(p => p.slug === slug);
    
    if (loading) loading.style.display = 'none';
    
    if (post && container) {
      if (error) error.style.display = 'none';
      container.innerHTML = `
        <a href="blog.html" class="blog-post-back">← Back to Blog</a>
        <div class="blog-post-date">${post.date}</div>
        <h1 class="blog-post-title text-gradient">${post.title}</h1>
        <div class="blog-post-tags">
          ${post.tags.map(tag => `<span class="blog-post-tag">${tag}</span>`).join('')}
        </div>
        <div class="blog-post-content">${post.content.replace(/\n/g, '<br>')}</div>
      `;
      container.style.display = 'block';
    } else {
      if (error) {
        error.style.display = 'block';
        error.querySelector('h1').textContent = 'Post Not Found';
      }
    }
  } else {
    if (loading) loading.style.display = 'none';
    if (error) {
      error.style.display = 'block';
      error.querySelector('h1').textContent = 'Failed to load post';
    }
  }
}

// Load Template Detail
async function loadTemplateDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  if (!id) {
    window.location.href = 'index.html';
    return;
  }
  
  const container = document.getElementById('template-detail-container');
  const loading = document.getElementById('template-detail-loading');
  const error = document.getElementById('template-detail-error');
  
  let templates = null;
  
  // First, try to use embedded data (works without server)
  if (window.templatesData && Array.isArray(window.templatesData)) {
    templates = window.templatesData;
  } else {
    // Fallback: try to fetch from JSON file (requires server)
    try {
      let response = await fetch('data/templates.json').catch(() => null);
      if (!response || !response.ok) {
        response = await fetch('./data/templates.json');
      }
      
      if (response && response.ok) {
        templates = await response.json();
      }
    } catch (err) {
      console.error('Error loading template detail:', err);
    }
  }
  
  if (templates) {
    const template = templates.find(t => t.id === id);
    
    if (loading) loading.style.display = 'none';
    
    if (template && container) {
      if (error) error.style.display = 'none';
      
      const priceSection = template.type === 'paid'
        ? `<div class="template-detail-price text-gradient">$${template.price}</div>
           <a href="${template.buyLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">Buy Now</a>`
        : `<div class="btn-primary" style="background: #22c55e;">FREE</div>`;
      
      container.innerHTML = `
        <a href="index.html" class="template-detail-back">← Back to Templates</a>
        <h1 class="template-detail-title text-gradient">${template.title}</h1>
        <p class="template-detail-description">${template.description}</p>
        <div class="template-detail-tags">
          ${template.tags.map(tag => `<span class="template-detail-tag">${tag}</span>`).join('')}
        </div>
        <div class="template-detail-actions">
          ${priceSection}
          <a href="${template.demo}" target="_blank" rel="noopener noreferrer" class="btn-secondary">Open in New Tab</a>
        </div>
        <div class="preview-section">
          <div class="preview-header">
            <h2 class="text-gradient">Live Preview</h2>
            <div class="preview-controls">
              <div class="preview-buttons">
                <button class="preview-btn active" data-view="desktop" onclick="changePreviewView('desktop')">Desktop</button>
                <button class="preview-btn" data-view="tablet" onclick="changePreviewView('tablet')">Tablet</button>
                <button class="preview-btn" data-view="mobile" onclick="changePreviewView('mobile')">Mobile</button>
              </div>
              <a href="${template.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 0.875rem; padding: 0.5rem 1rem;">
                🔗 Open in New Tab
              </a>
            </div>
          </div>
          <div class="preview-container">
            <div class="preview-frame-wrapper desktop" id="preview-wrapper">
              <iframe src="${template.demo}" class="preview-frame" title="${template.title} Preview" loading="lazy" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>
            </div>
          </div>
        </div>
      `;
      container.style.display = 'block';
    } else {
      if (error) {
        error.style.display = 'block';
        error.querySelector('h1').textContent = 'Template Not Found';
      }
    }
  } else {
    if (loading) loading.style.display = 'none';
    if (error) {
      error.style.display = 'block';
      error.querySelector('h1').textContent = 'Failed to load template';
    }
  }
}

function changePreviewView(view) {
  const wrapper = document.getElementById('preview-wrapper');
  const buttons = document.querySelectorAll('.preview-btn');
  
  if (wrapper) {
    wrapper.className = 'preview-frame-wrapper ' + view;
  }
  
  buttons.forEach(btn => {
    if (btn.dataset.view === view) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Contact Form
function handleContactSubmit(e) {
  e.preventDefault();
  const submitBtn = e.target.querySelector('.form-submit');
  const originalText = submitBtn.textContent;
  
  submitBtn.textContent = 'Message Sent!';
  submitBtn.style.background = '#22c55e';
  
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = '';
    e.target.reset();
  }, 3000);
}

// Make function available globally
window.handleContactSubmit = handleContactSubmit;

// Initialize based on page
document.addEventListener('DOMContentLoaded', function() {
  const path = window.location.pathname;
  
  if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
    loadTemplates();
  } else if (path.includes('blog.html')) {
    loadBlogPosts();
  } else if (path.includes('blog-post.html')) {
    loadBlogPost();
  } else if (path.includes('template-detail.html')) {
    loadTemplateDetail();
  } else if (path.includes('contact.html')) {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', handleContactSubmit);
    }
  }
});

// Theme Switcher
(function() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeMenu = document.getElementById('theme-menu');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const themeOptions = themeMenu ? themeMenu.querySelectorAll('.theme-option') : [];
  
  // Get saved theme or default
  function getSavedTheme() {
    return localStorage.getItem('theme') || 'dark';
  }
  
  // Apply theme
  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    updateThemeUI(theme);
    localStorage.setItem('theme', theme);
    updateActiveOption(theme);
  }
  
  // Update theme UI
  function updateThemeUI(theme) {
    const lightIcon = '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';
    const darkIcon = '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
    
    const texts = {
      light: 'Bright',
      dark: 'Dark'
    };
    
    if (themeIcon) themeIcon.innerHTML = theme === 'light' ? lightIcon : darkIcon;
    if (themeText) themeText.textContent = texts[theme] || texts.dark;
    
    // Update mobile UI
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    const themeTextMobile = document.getElementById('theme-text-mobile');
    if (themeIconMobile) themeIconMobile.innerHTML = theme === 'light' ? lightIcon : darkIcon;
    if (themeTextMobile) themeTextMobile.textContent = texts[theme] || texts.dark;
  }
  
  // Update active option
  function updateActiveOption(theme) {
    const allOptions = document.querySelectorAll('.theme-option');
    allOptions.forEach(option => {
      if (option.dataset.theme === theme) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
  
  // Toggle menu
  if (themeToggleBtn && themeMenu) {
    themeToggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      themeMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!themeToggleBtn.contains(e.target) && !themeMenu.contains(e.target)) {
        themeMenu.classList.remove('active');
      }
    });
    
    // Handle theme option clicks
    themeOptions.forEach(option => {
      option.addEventListener('click', function() {
        const theme = this.dataset.theme;
        applyTheme(theme);
        themeMenu.classList.remove('active');
      });
    });
    
    // Initialize theme
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
    
    // Mobile theme toggle
    const themeToggleBtnMobile = document.getElementById('theme-toggle-btn-mobile');
    const themeMenuMobile = document.getElementById('theme-menu-mobile');
    const themeOptionsMobile = themeMenuMobile ? themeMenuMobile.querySelectorAll('.theme-option') : [];
    
    if (themeToggleBtnMobile && themeMenuMobile) {
      themeToggleBtnMobile.addEventListener('click', function(e) {
        e.stopPropagation();
        themeMenuMobile.classList.toggle('active');
      });
      
      themeOptionsMobile.forEach(option => {
        option.addEventListener('click', function() {
          const theme = this.dataset.theme;
          applyTheme(theme);
          themeMenuMobile.classList.remove('active');
        });
      });
    }
  }
})();

