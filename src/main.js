/* ============================================================
   Kekulawala Advertising — front-end behaviour
   ============================================================ */
import './styles/base.css';
import './styles/sections.css';
import './styles/responsive.css';

/* ---------- Data ---------- */
const services = [
  {
    icon: '<path d="M4 21V10l8-6 8 6v11h-6v-7h-4v7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    title: 'Outdoor Advertising',
    desc: 'High-impact highway hoardings, shop front boards, pylons and pole signs engineered for sun, rain and wind.',
    tags: ['Hoardings', 'Pylon Signs', 'Shop Boards'],
  },
  {
    icon: '<path d="M6 9V4h12v5M6 18h12M8 9v9m8-9v9M4 9h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    title: 'Digital Printing',
    desc: 'Vivid large-format flex, vinyl, sticker and banner printing with UV-stable inks for lasting colour.',
    tags: ['Flex Banners', 'Vinyl', 'Stickers'],
  },
  {
    icon: '<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5M9 12h.01M15 12h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    title: 'Laser Cutting & Engraving',
    desc: 'Precision-cut acrylic, wood and metal letters, nameplates and decorative panels with flawless frosted edges.',
    tags: ['Acrylic Letters', 'Nameplates', 'CNC Work'],
  },
  {
    icon: '<path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2 2m-7 7-2 2m11 0-2-2m-7-7-2-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    title: '3D & LED Signage',
    desc: 'Channel letters, halo-lit logos, neon and light boxes that turn your storefront into a nighttime landmark.',
    tags: ['Channel Letters', 'Halo Lit', 'Light Boxes'],
  },
  {
    icon: '<path d="M3 13l2-6h14l2 6v5H3zM7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    title: 'Vehicle Branding',
    desc: 'Full and partial vinyl wraps for cars, vans, buses and three-wheelers — mobile billboards that drive sales.',
    tags: ['Full Wraps', 'Fleet Graphics', 'Magnets'],
  },
  {
    icon: '<path d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    title: 'Exhibition & Display',
    desc: 'Trade-show stalls, backlit backdrops, roll-up stands and counters designed to draw crowds to your brand.',
    tags: ['Stalls', 'Roll-up Banners', 'Backdrops'],
  },
];

const projects = [
  {
    img: '/projects/project-illuminated-signage.jpg',
    cat: 'signage',
    tag: '3D & LED Signage',
    title: 'Illuminated Channel-Letter Storefront',
    desc: 'Halo-lit acrylic channel letters on a charcoal facade, installed for a premium retail brand after dusk.',
  },
  {
    img: '/projects/project-billboard.jpg',
    cat: 'outdoor',
    tag: 'Outdoor Advertising',
    title: 'Highway Billboard at Golden Hour',
    desc: 'A steel-structure flex hoarding with flood lighting, printed and mounted beside a major expressway.',
  },
  {
    img: '/projects/project-vehicle-wrap.jpg',
    cat: 'branding',
    tag: 'Vehicle Branding',
    title: 'Full-Body Tuk-Tuk Vinyl Wrap',
    desc: 'A glossy colour-wave wrap with feather motifs turning a daily rider into a moving advertisement.',
  },
  {
    img: '/projects/project-exhibition-booth.jpg',
    cat: 'exhibition',
    tag: 'Exhibition & Display',
    title: 'Backlit Trade-Show Exhibition Booth',
    desc: 'A complete stall package — light-box backdrop, roll-ups and an LED-edge reception counter.',
  },
  {
    img: '/projects/project-acrylic-sign.jpg',
    cat: 'signage',
    tag: '3D & LED Signage',
    title: 'Laser-Cut Acrylic Reception Sign',
    desc: 'Crystal-clear acrylic lettering with brushed-gold detailing on a navy corporate feature wall.',
  },
  {
    img: '/projects/project-pylon-sign.jpg',
    cat: 'outdoor',
    tag: 'Outdoor Advertising',
    title: 'Illuminated Pylon Monument Sign',
    desc: 'A freestanding aluminum-and-acrylic pylon glowing over a commercial plaza at night.',
  },
  {
    img: '/projects/project-laser-engraving.jpg',
    cat: 'fabrication',
    tag: 'Laser Fabrication',
    title: 'Laser Cutting & Engraving Studio Work',
    desc: 'In-house CO₂ laser work on acrylic sheets — engraved plates and precision-cut signage components.',
  },
];

const testimonials = [
  {
    initials: 'RF',
    name: 'Ruwan Fernando',
    role: 'Owner, Fernando Hardware, Kurunegala',
    text: 'Our new illuminated shop board completely changed how customers spot us at night. The team handled design, permits and installation without a single hassle.',
  },
  {
    initials: 'AP',
    name: 'Ayesha Perera',
    role: 'Marketing Manager, Colombo',
    text: 'We have used Kekulawala for exhibition stalls across the island for years. Their print quality and on-time delivery are simply the most reliable we have found.',
  },
  {
    initials: 'NJ',
    name: 'Nuwan Jayasinghe',
    role: 'Director, Jayasinghe Group',
    text: 'The pylon sign they built for our plaza survived two monsoons looking brand new. True craftsmanship backed by friendly, honest service since 1982.',
  },
];

/* ---------- Render services ---------- */
const servicesGrid = document.getElementById('servicesGrid');
servicesGrid.innerHTML = services
  .map(
    (s, i) => `
  <article class="service-card reveal" data-delay="${(i % 3) + 1}">
    <span class="service-card__num">0${i + 1}</span>
    <div class="service-card__icon">
      <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${s.icon}</svg>
    </div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <div class="service-card__tags">${s.tags.map((t) => `<span>${t}</span>`).join('')}</div>
  </article>`
  )
  .join('');

/* ---------- Render projects ---------- */
const projectsGrid = document.getElementById('projectsGrid');
projectsGrid.innerHTML = projects
  .map(
    (p, i) => `
  <article class="project-card reveal" data-delay="${(i % 3) + 1}" data-index="${i}" tabindex="0" role="button"
    aria-label="Open project: ${p.title}">
    <img class="project-card__img" src="${p.img}" alt="${p.title} — Kekulawala Advertising project" loading="lazy" />
    <span class="project-card__zoom">
      <svg class="ic" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </span>
    <div class="project-card__overlay">
      <span class="project-card__tag">${p.tag}</span>
      <h3 class="project-card__title">${p.title}</h3>
      <p class="project-card__desc">${p.desc}</p>
    </div>
  </article>`
  )
  .join('');

/* ---------- Render testimonials ---------- */
document.getElementById('testimonialsGrid').innerHTML = testimonials
  .map(
    (t, i) => `
  <article class="testimonial reveal" data-delay="${(i % 3) + 1}">
    <div class="testimonial__stars" aria-label="5 out of 5 stars">★★★★★</div>
    <blockquote>“${t.text}”</blockquote>
    <div class="testimonial__person">
      <span class="testimonial__avatar" aria-hidden="true">${t.initials}</span>
      <div>
        <strong>${t.name}</strong>
        <span>${t.role}</span>
      </div>
    </div>
  </article>`
  )
  .join('');

/* ---------- Sticky header state ---------- */
const header = document.getElementById('header');
const toTop = document.getElementById('toTop');
const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 24);
  toTop.classList.toggle('is-visible', y > 600);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Mobile navigation ---------- */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
});
nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  })
);

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- Animated counters ---------- */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

/* ---------- Active nav link on scroll ---------- */
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav__link')];
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => activeObserver.observe(s));

/* ---------- Service card pointer glow ---------- */
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

/* ---------- Portfolio filtering ---------- */
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const projectCards = [...document.querySelectorAll('.project-card')];
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === 'all' || projects[Number(card.dataset.index)].cat === filter;
      card.classList.toggle('is-hidden', !match);
      if (match) {
        card.classList.remove('is-visible');
        requestAnimationFrame(() => card.classList.add('is-visible'));
      }
    });
  });
});

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');
const lbTag = document.getElementById('lbTag');
let currentIndex = 0;

const visibleProjects = () =>
  projectCards.filter((c) => !c.classList.contains('is-hidden')).map((c) => Number(c.dataset.index));

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}
function renderLightbox() {
  const p = projects[currentIndex];
  lbImage.src = p.img;
  lbImage.alt = `${p.title} — full preview`;
  lbTitle.textContent = p.title;
  lbDesc.textContent = p.desc;
  lbTag.textContent = p.tag;
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}
function stepLightbox(dir) {
  const visible = visibleProjects();
  const pos = visible.indexOf(currentIndex);
  const next = visible[(pos + dir + visible.length) % visible.length];
  currentIndex = next;
  renderLightbox();
}

projectCards.forEach((card) => {
  card.addEventListener('click', () => openLightbox(Number(card.dataset.index)));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(Number(card.dataset.index));
    }
  });
});
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => stepLightbox(-1));
document.getElementById('lbNext').addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

/* ---------- Quote form validation + mailto hand-off ---------- */
const form = document.getElementById('quoteForm');
const success = document.getElementById('formSuccess');
const setError = (id, message) => {
  const field = document.getElementById(id);
  const group = field.closest('.form-group');
  const error = group.querySelector('.form-error');
  group.classList.toggle('has-error', Boolean(message));
  error.textContent = message || '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();
  let valid = true;

  if (name.length < 2) { setError('fName', 'Please enter your full name.'); valid = false; } else setError('fName', '');
  if (!/^[0-9+\s-]{9,15}$/.test(phone)) { setError('fPhone', 'Enter a valid contact number.'); valid = false; } else setError('fPhone', '');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('fEmail', 'Enter a valid email address or leave blank.'); valid = false; } else setError('fEmail', '');
  if (!service) { setError('fService', 'Please choose a service.'); valid = false; } else setError('fService', '');
  if (message.length < 10) { setError('fMessage', 'Tell us a little more (at least 10 characters).'); valid = false; } else setError('fMessage', '');
  if (!valid) return;

  const subject = encodeURIComponent(`Quote Request — ${service} (${name})`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email || '—'}\nService: ${service}\n\nProject details:\n${message}`
  );
  window.location.href = `mailto:kekulawala.advertising@gmail.com?subject=${subject}&body=${body}`;
  success.hidden = false;
  form.querySelectorAll('input, select, textarea').forEach((el) => (el.value = ''));
  setTimeout(() => { success.hidden = true; }, 9000);
});

/* Clear error as the user types */
form.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('input', () => setError(field.id, ''));
});

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
