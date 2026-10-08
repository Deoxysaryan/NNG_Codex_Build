/* No analytics vendor, cookies, lead database or automatic messages. */
(() => {
  'use strict';
  const form = document.querySelector('#enquiry-form');
  const nameInput = document.querySelector('#first-name');
  const area = document.querySelector('#area');
  const error = document.querySelector('#form-error');
  const ready = document.querySelector('#message-ready');
  const next = document.querySelector('#whatsapp-link');
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#landing-nav');
  const pageName = document.body.dataset.page || 'overview';
  let source = 'landing';
  const clean = (value, max = 80) => String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
  const interest = document.querySelector('#interest');
  const offerNames = ['Psychic Reader', 'Astrology', 'Numerology', 'Vastu', 'Personalised Hand Holding Program', 'Help choosing'];

  function closeMenu() {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open page menu');
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close page menu' : 'Open page menu');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) closeMenu();
    const trigger = event.target.closest('[data-offer], [data-area], [data-enquiry-source]');
    if (!trigger) return;
    const offer = trigger.dataset.offer;
    if (offerNames.includes(offer)) interest.value = offer;
    if (trigger.dataset.area) area.value = trigger.dataset.area;
    source = clean(trigger.dataset.enquirySource || (trigger.dataset.area ? 'concern' : 'landing'), 35);
    ready.hidden = true;
    error.hidden = true;
    next.href = 'https://wa.me/919205511101';
    // Integration point only. No personal data, no claim that a lead or booking happened.
    document.dispatchEvent(new CustomEvent('nng:enquiry-intent', { detail: { source, offer: offerNames.includes(offer) ? offer : null } }));
  });
  function resetMessage() { ready.hidden = true; error.hidden = true; next.href = 'https://wa.me/919205511101'; }
  form.addEventListener('input', resetMessage);
  form.addEventListener('change', resetMessage);
  function fail(message, input) {
    error.textContent = message;
    error.hidden = false;
    ready.hidden = true;
    input.focus();
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const selected = interest;
    if (!offerNames.includes(selected.value)) return fail('Please choose a service, hand holding or help choosing.', interest);
    const firstName = clean(nameInput.value, 60);
    if (!firstName || !/[\p{L}]/u.test(firstName)) return fail('Please enter your first name.', nameInput);
    const consent = form.querySelector('[name="consent"]');
    if (!consent.checked) return fail('Please agree before including your details in a WhatsApp enquiry.', consent);
    const message = [
      `Hello NNG team, my name is ${firstName}.`,
      `I am interested in: ${selected.value}.`,
      `I would like to discuss: ${area.value}.`,
      'Please help me understand the scope, format, duration, fees and availability before I decide.',
      `Enquiry source: Narayani ${pageName} landing page (${source}).`
    ].join('\n');
    next.href = `https://wa.me/919205511101?text=${encodeURIComponent(message)}`;
    error.hidden = true;
    ready.hidden = false;
    next.focus({ preventScroll: true });
    ready.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });

  const videos = {
    deepa: { title: 'Deepa’s experience', id: '1UYkU2iDhSzTj9R_ecnDAjL_5NdMmL5se', note: 'Client testimonial. The written quotation is translated from Hindi. Individual experiences are not guarantees.' },
    manish: { title: 'Manish’s experience', id: '1LZi0IWknj_vDINvaMf1n0OdIQHnZOGyp', note: 'Client testimonial. The written quotation is translated from Hindi. Individual experiences are not guarantees.' },
    puneet: { title: 'Puneet’s experience', id: '1kuLWPPJJ6taVMR19VpA1lUjv6MEMYExa', note: 'Puneet describes working in banking. No employer, banking division or senior job title is attributed to him.' }
  };
  const videoDialog = document.querySelector('#video-dialog');
  const privacyDialog = document.querySelector('#privacy-dialog');
  const stage = document.querySelector('#video-stage');
  let returnFocus = null;
  function openDialog(dialog, trigger) {
    closeMenu();
    document.querySelector('#hero-intro').pause();
    returnFocus = trigger;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('.dialog-close').focus();
  }
  function emptyPlayer() {
    stage.replaceChildren();
  }
  for (const dialog of [videoDialog, privacyDialog]) {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (dialog === videoDialog) emptyPlayer();
      document.body.classList.remove('dialog-open');
      returnFocus?.focus({ preventScroll: true });
    });
  }
  document.querySelectorAll('[data-video]').forEach(trigger => trigger.addEventListener('click', () => {
    const film = videos[trigger.dataset.video];
    emptyPlayer();
    document.querySelector('#video-title').textContent = film.title;
    document.querySelector('#video-note').textContent = film.note;
      const panel = document.createElement('div');
      panel.className = 'external-video';
      const description = document.createElement('p');
      description.textContent = 'This film is hosted on Google Drive. Loading it connects your browser to Google. You can also open the original in a new tab.';
      const load = document.createElement('button');
      load.className = 'button'; load.type = 'button'; load.textContent = 'Load the client video';
      const original = document.createElement('a');
      original.href = `https://drive.google.com/file/d/${film.id}/view`;
      original.target = '_blank'; original.rel = 'noopener noreferrer'; original.className = 'text-link'; original.textContent = 'Open original on Google Drive ↗';
      load.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.title = film.title;
        iframe.src = `https://drive.google.com/file/d/${film.id}/preview`;
        iframe.allow = 'fullscreen';
        iframe.setAttribute('allowfullscreen', '');
        iframe.referrerPolicy = 'no-referrer';
        stage.replaceChildren(iframe);
        videoDialog.querySelector('.dialog-close').focus();
      });
      panel.append(description, load, document.createElement('br'), original);
      stage.append(panel);
    openDialog(videoDialog, trigger);
  }));
  document.querySelector('[data-privacy]').addEventListener('click', event => openDialog(privacyDialog, event.currentTarget));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !document.querySelector('dialog[open]')) closeMenu();
  });
  const desktop = matchMedia('(min-width: 801px)');
  desktop.addEventListener('change', event => { if (event.matches) closeMenu(); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-seen'); observer.unobserve(entry.target);
      }
    }, { threshold: .25 });
    document.querySelectorAll('.method, .journey').forEach(element => observer.observe(element));
    const sticky = document.querySelector('.mobile-cta');
    let heroVisible = true, formVisible = false, footerVisible = false;
    const stickyObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target.classList.contains('hero-actions')) heroVisible = entry.isIntersecting;
        if (entry.target.classList.contains('enquiry-section')) formVisible = entry.isIntersecting;
        if (entry.target.classList.contains('footer')) footerVisible = entry.isIntersecting;
      }
      sticky.hidden = heroVisible || formVisible || footerVisible;
    }, { threshold: 0 });
    ['.hero-actions', '.enquiry-section', '.footer'].forEach(selector => stickyObserver.observe(document.querySelector(selector)));
  }
})();
