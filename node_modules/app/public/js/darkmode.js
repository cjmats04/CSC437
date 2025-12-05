
// - Listens for a checkbox with id="dark-mode-toggle" and dispatches a
//   CustomEvent 'darkmode:toggle' with detail { enabled: boolean } when changed.
// - Adds a body-level listener that toggles the 'dark-mode' class on <body>.
// - Persists preference to localStorage and initializes state on load.

const STORAGE_KEY = 'concertfinder:darkMode';

function dispatchToggle(enabled) {
  const ev = new CustomEvent('darkmode:toggle', {
    detail: { enabled },
    bubbles: true,
    composed: true,
  });
  document.body.dispatchEvent(ev);
}

function initToggle() {
  const checkbox = document.getElementById('dark-mode-toggle');
  // body-level listener: apply class when the custom event is fired
  document.body.addEventListener('darkmode:toggle', (e) => {
    const enabled = !!(e && e.detail && e.detail.enabled);
    document.body.classList.toggle('dark-mode', enabled);
  });

  // initialize from storage if present
  const saved = localStorage.getItem(STORAGE_KEY);
  const savedEnabled = saved === 'true';

  if (checkbox) {
    // set initial state
    if (saved !== null) checkbox.checked = savedEnabled;

    // notify initial state so CSS can apply right away
    dispatchToggle(checkbox.checked);

    checkbox.addEventListener('change', (evt) => {
      const enabled = !!evt.target.checked;
      // persist
      try {
        localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
      } catch (err) {
        // ignore storage errors
      }
      // dispatch custom event
      dispatchToggle(enabled);
    });
  } else {
    // No checkbox on this page; if we have saved preference, apply it
    if (saved !== null) {
      dispatchToggle(savedEnabled);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initToggle);
} else {
  initToggle();
}

export {};
