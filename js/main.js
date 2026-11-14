(function () {
  'use strict';

  var icons = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 20h16"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
  };

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var D;

  function escapeHTML(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }

  function socialsHTML() {
    return (D.socials || []).map(function (s) {
      return '<li><a href="' + escapeHTML(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' +
        escapeHTML(s.name) + '">' + (icons[s.icon] || icons.external) + '</a></li>';
    }).join('');
  }

  function renderHero() {
    $('hero-name').textContent = D.name;
    $('hero-tagline').textContent = D.tagline;
    $('nav-logo').textContent = D.initials;
    $('roles-sr').textContent = (D.roles || []).join(', ');
    var cv = $('cv-btn');
    cv.href = D.cvUrl;
    cv.setAttribute('download', '');
    cv.innerHTML = icons.download + 'Download CV';
    $('hero-socials').innerHTML = socialsHTML();
  }

  function renderAbout() {
    var html = '<div class="about__avatar reveal"><img src="' + escapeHTML(D.avatar) + '" alt="Portrait of ' + escapeHTML(D.name) + '" width="400" height="400"></div>' +
      '<div class="about__text reveal">' +
      (D.about || []).map(function (p) { return '<p>' + escapeHTML(p) + '</p>'; }).join('') +
      '<div class="stats">' +
      (D.stats || []).map(function (s) {
        return '<div class="stat"><span class="stat__value">' + escapeHTML(s.value) + '</span><span class="stat__label">' + escapeHTML(s.label) + '</span></div>';
      }).join('') + '</div></div>';
    $('about-content').innerHTML = html;
  }

  function renderSkills() {
    $('skills-content').innerHTML = (D.skills || []).map(function (cat) {
      return '<article class="card skill-card reveal"><h3>' + escapeHTML(cat.category) + '</h3><ul class="chips">' +
        cat.items.map(function (it, i) {
          var cls = i % 3 === 0 ? '' : ' chip--' + (i % 3);
          return '<li class="chip' + cls + '">' + escapeHTML(it) + '</li>';
        }).join('') + '</ul></article>';
    }).join('');
    // chip colour cycles per category
    var cards = $('skills-content').children;
    var palette = ['', 'chip--1', 'chip--2', ''];
    Array.prototype.forEach.call(cards, function (card, ci) {
      Array.prototype.forEach.call(card.querySelectorAll('.chip'), function (chip) {
        chip.className = 'chip' + (palette[ci % 4] ? ' ' + palette[ci % 4] : '');
      });
    });
  }

  function renderExperience() {
    $('experience-content').innerHTML = (D.experience || []).map(function (e) {
      return '<div class="timeline__item reveal"><h3 class="timeline__role">' + escapeHTML(e.role) + '</h3>' +
        '<span class="timeline__company">' + escapeHTML(e.company) + '</span>' +
        '<span class="timeline__period">' + escapeHTML(e.period) + '</span><ul>' +
        (e.points || []).map(function (p) { return '<li>' + escapeHTML(p) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
    $('education-content').innerHTML = (D.education || []).map(function (e) {
      return '<div class="timeline__item reveal"><h3 class="timeline__role">' + escapeHTML(e.degree) + '</h3>' +
        '<span class="timeline__company">' + escapeHTML(e.school) + '</span>' +
        '<span class="timeline__period">' + escapeHTML(e.period) + '</span></div>';
    }).join('');
  }

  function renderFilters() {
    var cats = [];
    (D.projects || []).forEach(function (p) { if (cats.indexOf(p.category) === -1) cats.push(p.category); });
    $('filters').innerHTML = ['All'].concat(cats).map(function (c, i) {
      return '<button type="button" class="filter-btn" data-filter="' + escapeHTML(c) + '" aria-pressed="' + (i === 0) + '">' + escapeHTML(c) + '</button>';
    }).join('');
  }

  function renderProjects() {
    $('projects-content').innerHTML = (D.projects || []).map(function (p) {
      var links = '';
      if (p.live) links += '<a href="' + escapeHTML(p.live) + '" target="_blank" rel="noopener noreferrer">Live ' + icons.external + '</a>';
      if (p.code) links += '<a href="' + escapeHTML(p.code) + '" target="_blank" rel="noopener noreferrer">Code ' + icons.code + '</a>';
      return '<article class="card project reveal" data-category="' + escapeHTML(p.category) + '">' +
        '<img class="project__img" src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.title) + '" loading="lazy" width="800" height="500">' +
        '<div class="project__body"><span class="project__cat">' + escapeHTML(p.category) + '</span>' +
        '<h3>' + escapeHTML(p.title) + '</h3><p>' + escapeHTML(p.description) + '</p>' +
        '<ul class="chips">' + (p.tech || []).map(function (t) { return '<li class="chip">' + escapeHTML(t) + '</li>'; }).join('') + '</ul>' +
        '<div class="project__links">' + links + '</div></div></article>';
    }).join('');
  }

  function renderContact() {
    var m = $('mail-btn');
    m.href = 'mailto:' + D.email;
    m.innerHTML = icons.mail + escapeHTML(D.email);
    $('contact-socials').innerHTML = socialsHTML();
  }

  function renderFooter() {
    var now = new Date();
    $('footer-text').textContent = '© ' + now.getFullYear() + ' ' + D.name + '. Built with HTML, CSS & JS.';
    var t = $('footer-date');
    t.textContent = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var dd = String(now.getDate()).padStart(2, '0');
    t.setAttribute('datetime', now.getFullYear() + '-' + mm + '-' + dd);
  }

  function initTypewriter(el, roles) {
    if (!el || !roles || !roles.length) return;
    if (reduceMotion) { el.textContent = roles[0]; return; }
    var r = 0, c = 0, deleting = false;
    function tick() {
      var word = roles[r];
      var delay;
      if (!deleting) {
        c++;
        el.textContent = word.slice(0, c);
        if (c === word.length) { deleting = true; delay = 1600; } else delay = 70;
      } else {
        c--;
        el.textContent = word.slice(0, c);
        if (c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; } else delay = 40;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  function initFilters() {
    var buttons = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.project');
    var status = $('filter-status');
    function apply(filter) {
      var n = 0;
      cards.forEach(function (card) {
        var show = filter === 'All' || card.getAttribute('data-category') === filter;
        if (show) {
          n++;
          if (card.hidden) {
            card.hidden = false;
            if (!reduceMotion) {
              card.classList.remove('is-entering');
              void card.offsetWidth;
              card.classList.add('is-entering');
            }
          }
        } else {
          card.hidden = true;
        }
      });
      status.textContent = 'Showing ' + n + ' project' + (n === 1 ? '' : 's');
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        apply(b.getAttribute('data-filter'));
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('is-visible');
        io.unobserve(el);
        if (el.style.transitionDelay) {
          setTimeout(function () { el.style.transitionDelay = ''; }, 1100);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (el) {
      var parent = el.parentElement;
      if (parent && parent.children.length > 1 && !el.matches('h2, h3, p, a, ul')) {
        var idx = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = Math.min(idx * 80, 400) + 'ms';
      }
      io.observe(el);
    });
  }

  function initNav() {
    var nav = $('nav'), toggle = $('nav-toggle'), menu = $('nav-menu');
    function close() { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); }
    });
    function onScroll() { nav.classList.toggle('nav--scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window) {
      var links = menu.querySelectorAll('a[href^="#"]');
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    D = window.PORTFOLIO;
    if (!D) {
      console.error('Portfolio data not found: make sure js/data.js is loaded before js/main.js and defines window.PORTFOLIO.');
      return;
    }
    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderFilters();
    renderProjects();
    renderContact();
    renderFooter();
    initTypewriter($('typewriter'), D.roles);
    initFilters();
    initNav();
    initReveal();
  });
})();
