// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        navMenu.classList.toggle('active');
        // Ensure menu slides in/out properly in preview mode
        if (navMenu.classList.contains('active')) {
            // Get current styles and update left position with !important
            const currentStyles = navMenu.style.cssText || '';
            // Remove existing left property if present
            const updatedStyles = currentStyles.replace(/left:\s*[^;]+;?/gi, '');
            navMenu.style.cssText = updatedStyles + ' left: 0 !important;';
        } else {
            // Get current styles and update left position with !important
            const currentStyles = navMenu.style.cssText || '';
            // Remove existing left property if present
            const updatedStyles = currentStyles.replace(/left:\s*[^;]+;?/gi, '');
            navMenu.style.cssText = updatedStyles + ' left: -100% !important;';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // Get current styles and update left position with !important
            const currentStyles = navMenu.style.cssText || '';
            const updatedStyles = currentStyles.replace(/left:\s*[^;]+;?/gi, '');
            navMenu.style.cssText = updatedStyles + ' left: -100% !important;';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target) &&
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            // Get current styles and update left position with !important
            const currentStyles = navMenu.style.cssText || '';
            const updatedStyles = currentStyles.replace(/left:\s*[^;]+;?/gi, '');
            navMenu.style.cssText = updatedStyles + ' left: -100% !important;';
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Modal
const modal = document.getElementById('projectModal');
const projectCards = document.querySelectorAll('.project-card');
const modalClose = document.querySelector('.modal-close');

// Project data
const projectData = {
    1: {
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform designed with user experience in mind. Features include seamless checkout process, product filtering, and responsive design that works perfectly on all devices.',
        tag: 'Web Design'
    },
    2: {
        title: 'Mobile App UI',
        description: 'Clean and intuitive mobile interface design for a fitness tracking app. Focus on usability and visual hierarchy to guide users through their fitness journey.',
        tag: 'UI/UX'
    },
    3: {
        title: 'Brand Identity',
        description: 'Complete brand redesign for a tech startup. Includes logo design, color palette, typography, and brand guidelines to ensure consistent application across all touchpoints.',
        tag: 'Branding'
    },
    4: {
        title: 'Dashboard Design',
        description: 'Analytics dashboard with comprehensive data visualization. Designed to help users understand complex data through intuitive charts and interactive elements.',
        tag: 'Web Design'
    },
    5: {
        title: 'Landing Page',
        description: 'High-converting landing page design for a SaaS product. Optimized for conversions with clear value proposition and strategic call-to-action placement.',
        tag: 'Web Design'
    },
    6: {
        title: 'Icon Set',
        description: 'Custom icon library designed for a mobile application. Consistent style and visual language across 100+ icons to enhance user experience.',
        tag: 'UI/UX'
    }
};

// Open modal on project card click
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalTags').innerHTML = `<span class="project-tag">${project.tag}</span>`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
        const message = document.getElementById('message').value.trim();
        
        clearErrors();
        let isValid = true;
        
        if (!name) {
            showError('nameError', 'Name is required');
            document.getElementById('name').classList.add('error');
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('emailError', 'Email is required');
            document.getElementById('email').classList.add('error');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            document.getElementById('email').classList.add('error');
            isValid = false;
        }
        
        if (subject && !subject) {
            showError('subjectError', 'Subject is required');
            document.getElementById('subject').classList.add('error');
            isValid = false;
        }
        
        if (!message) {
            showError('messageError', 'Message is required');
            document.getElementById('message').classList.add('error');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            document.getElementById('message').classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            clearErrors();
        }
    });
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorId = input.id + 'Error';
            const errorEl = document.getElementById(errorId);
            if (errorEl) errorEl.textContent = '';
        });
    });
}

function showError(errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
}

// Responsive Preview Toolbar
const previewButtons = document.querySelectorAll('.preview-btn');
const previewClose = document.getElementById('previewClose');
const html = document.documentElement;
const body = document.body;
const previewWrapper = document.getElementById('preview-wrapper');

if (previewButtons.length > 0) {
    previewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            previewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const width = btn.getAttribute('data-width');
            
            // Remove all device classes
            html.classList.remove('preview-tablet', 'preview-mobile', 'preview-desktop');
            
            if (width === '100%') {
                html.classList.add('preview-desktop');
                if (previewWrapper) {
                    previewWrapper.style.width = '100%';
                    previewWrapper.style.maxWidth = 'none';
                    previewWrapper.style.margin = '0 auto';
                    previewWrapper.style.border = 'none';
                    previewWrapper.style.boxShadow = 'none';
                }
                removePreviewStyles();
            } else if (width === '768px') {
                html.classList.add('preview-tablet');
                const tabletWidth = 768;
                if (previewWrapper) {
                    previewWrapper.style.width = tabletWidth + 'px';
                    previewWrapper.style.maxWidth = tabletWidth + 'px';
                    previewWrapper.style.margin = '0 auto';
                    previewWrapper.style.border = '2px solid var(--border)';
                    previewWrapper.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.1)';
                }
                applyTabletStyles();
            } else if (width === '480px') {
                html.classList.add('preview-mobile');
                const mobileWidth = 480;
                if (previewWrapper) {
                    previewWrapper.style.width = mobileWidth + 'px';
                    previewWrapper.style.maxWidth = mobileWidth + 'px';
                    previewWrapper.style.margin = '0 auto';
                    previewWrapper.style.border = '2px solid var(--border)';
                    previewWrapper.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.1)';
                }
                applyMobileStyles();
            }
        });
    });
    
    if (previewClose) {
        previewClose.addEventListener('click', () => {
            // Hide the preview toolbar completely
            const responsivePreview = document.getElementById('responsivePreview');
            if (responsivePreview) {
                responsivePreview.style.display = 'none';
            }
        });
    }
}

// Function to apply tablet styles
function applyTabletStyles() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navToggle) navToggle.style.display = 'flex';
    if (navMenu) {
        navMenu.style.position = 'fixed';
        navMenu.style.top = '70px';
        navMenu.style.left = '-100%';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'rgba(255, 255, 255, 0.95)';
        navMenu.style.width = '100%';
        navMenu.style.padding = '2rem';
        navMenu.style.borderTop = '1px solid var(--border)';
        navMenu.style.transition = 'left 0.3s ease';
    }
}

// Function to apply mobile styles
function applyMobileStyles() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navToggle) navToggle.style.display = 'flex';
    if (navMenu) {
        navMenu.style.position = 'fixed';
        navMenu.style.top = '70px';
        navMenu.style.left = '-100%';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'rgba(255, 255, 255, 0.95)';
        navMenu.style.width = '100%';
        navMenu.style.padding = '2rem';
        navMenu.style.borderTop = '1px solid var(--border)';
        navMenu.style.transition = 'left 0.3s ease';
    }
}

// Function to remove preview styles
function removePreviewStyles() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navToggle) navToggle.style.display = '';
    if (navMenu) {
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.flexDirection = '';
        navMenu.style.background = '';
        navMenu.style.width = '';
        navMenu.style.padding = '';
        navMenu.style.borderTop = '';
        navMenu.style.transition = '';
    }
}

