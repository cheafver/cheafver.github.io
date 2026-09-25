(() => {
  // Email: assembled at runtime so the full address never sits in the HTML.
  const src = document.querySelector('[data-u][data-d]');
  if (src) {
    const addr = `${src.dataset.u}@${src.dataset.d}`;
    document.querySelectorAll('.js-mail').forEach((el) => (el.href = `mailto:${addr}`));
    const out = document.getElementById('email-text');
    const btn = document.getElementById('copy-btn');
    if (out && btn) {
      out.textContent = addr;
      const lbl = btn.querySelector('.lbl'), status = document.getElementById('copy-status');
      btn.hidden = false;
      let busy = false;
      const flash = (text, aria, ms) => {
        busy = true; lbl.textContent = text; btn.setAttribute('aria-label', aria);
        setTimeout(() => { lbl.textContent = 'Copy'; btn.setAttribute('aria-label', 'Copy email address'); status.textContent = ''; busy = false; }, ms);
      };
      btn.addEventListener('click', async () => {
        if (busy) return;
        try {
          await navigator.clipboard.writeText(addr);
          status.textContent = 'Email address copied';
          flash('Copied', 'Email address copied', 2000);
        } catch {
          const r = document.createRange(); r.selectNodeContents(out);
          const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
          const mac = /Mac|iPhone|iPad/.test(navigator.platform);
          status.textContent = 'Address selected. Press your copy shortcut.';
          flash(mac ? 'Press ⌘C' : 'Press Ctrl+C', 'Press copy shortcut', 3000);
        }
      });
    }
  }
  // Mobile menu: Esc, link click and outside click close it; focus returns to the toggle.
  const tog = document.querySelector('.menu-btn'), menu = document.getElementById('mobile-menu');
  if (!tog || !menu) return;
  const setOpen = (open, refocus) => {
    menu.hidden = !open; tog.setAttribute('aria-expanded', String(open));
    tog.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) menu.querySelector('a').focus(); else if (refocus) tog.focus();
  };
  tog.addEventListener('click', () => setOpen(menu.hidden, true));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false, false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setOpen(false, true); });
  document.addEventListener('click', (e) => { if (!menu.hidden && !menu.contains(e.target) && !tog.contains(e.target)) setOpen(false, false); });
})();
