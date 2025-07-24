// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// CTA button smooth scroll
document.querySelector('.cta-button')?.addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.querySelector('#projects');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// Header scroll effect + scroll progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;

  const header = document.getElementById('header');
  const scrollIndicator = document.getElementById('scrollIndicator');

  if (header) {
    header.classList.toggle('scrolled', scrollTop > 100);
  }
  if (scrollIndicator) {
    scrollIndicator.style.width = `${scrolled}%`;
  }
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.nav-link');
  let currentId = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      currentId = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
});

// Reveal-on-scroll using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.project-card, .skill-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenu?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Hover effect on skill cards
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-5px) scale(1.02)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
  });
});

// Tech tag click feedback
document.querySelectorAll('.tech-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    tag.style.transform = 'scale(0.95)';
    setTimeout(() => {
      tag.style.transform = 'scale(1)';
    }, 150);
  });
});

// Optional subtitle typing effect
window.addEventListener('DOMContentLoaded', () => {
  const subtitle = document.querySelector('.hero p');
  const originalText = subtitle?.textContent || '';
  subtitle.textContent = '';
  let index = 0;

  function typeWriter() {
    if (index < originalText.length) {
      subtitle.textContent += originalText.charAt(index);
      index++;
      setTimeout(typeWriter, 50);
    }
  }

  // Uncomment to enable subtitle typing
  // setTimeout(typeWriter, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const rate = window.scrollY * -0.5;
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Scroll reveal fallback for other sections
function revealSections() {
  const reveals = document.querySelectorAll('.about-content, .projects-grid, .skills-grid');

  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;
    if (revealTop < windowHeight - 150) {
      section.classList.add('animate');
    }
  });
}
window.addEventListener('scroll', revealSections);

// Inject animation CSS
const revealCSS = `
  .about-content, .projects-grid, .skills-grid {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
  }
  .about-content.animate, .projects-grid.animate, .skills-grid.animate {
    opacity: 1;
    transform: translateY(0);
  }
`;
const styleEl = document.createElement('style');
styleEl.textContent = revealCSS;
document.head.appendChild(styleEl);
