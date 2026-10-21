(() => {
  const $ = (selector) => document.querySelector(selector);
  const form = $('#tool-form');
  const input = $('#tool-input');
  const tileResult = $('#result');
  const status = $('#status');
  const download = $('#download');
  const submit = $('#submit-btn');
  const requestLine = $('#request-line');
  const snippet = $('#snippet');
  const copyButton = $('#copy');
  const tabs = [...document.querySelectorAll('.tab')];

  let activeTab = 'curl';
  let countdownTimer = null;

  const currentOption = () => form.elements.variant?.value || 'standard';
  const rawValue = () => input.value.trim() || 'hello-world';
  const path = () => `/api/action?query=${encodeURIComponent(rawValue())}&variant=${currentOption()}`;
  const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

  // Ready-to-copy code snippets for diverse developer contexts
  const snippets = {
    curl: (full) => `curl -X POST "${full}" \\\n  -H "Accept: application/json"`,
    url: (full) => full,
    javascript: (full) => `const res = await fetch("${full}");\nconst data = await res.json();`,
    python: (full) => `import requests\n\nres = requests.get("${full}")\ndata = res.json()`,
  };

  function renderSnippets() {
    const fullUrl = location.origin + path();
    requestLine.textContent = `GET ${path()}`;
    const formatter = snippets[activeTab] || snippets.curl;
    snippet.textContent = formatter(fullUrl);
  }

  function setStatus(message, bad = false) {
    status.textContent = message;
    status.classList.toggle('bad', bad);
  }

  function showResult(text) {
    tileResult.textContent = text;
    tileResult.classList.remove('stale');
    tileResult.classList.remove('fresh');
    void tileResult.offsetWidth; // Trigger reflow for CSS animation
    tileResult.classList.add('fresh');
  }

  function startCountdown(seconds) {
    clearInterval(countdownTimer);
    let left = seconds;
    const tick = () => {
      if (left <= 0) {
        clearInterval(countdownTimer);
        submit.disabled = false;
        submit.textContent = 'Run action';
        setStatus('Ready when you are.');
        return;
      }
      submit.disabled = true;
      submit.textContent = `Try again in ${left}s`;
      setStatus(`Rate limit reached. You can run another in ${left} seconds.`, true);
      left -= 1;
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  async function handleAction(event) {
    event.preventDefault();
    const val = input.value.trim();
    if (!val) {
      setStatus('Please enter an input value first.', true);
      input.focus();
      return;
    }

    submit.disabled = true;
    setStatus('Processing your request…');

    try {
      // In a real implementation, call: const response = await fetch(path());
      // For this static demo template, simulate response:
      await new Promise((resolve) => setTimeout(resolve, 400));
      showResult(`Output for: ${val} (${currentOption()})`);
      setStatus('Done. Result ready to inspect.');
    } catch {
      setStatus('Could not reach the service. Please try again.', true);
    } finally {
      submit.disabled = false;
    }
  }

  form.addEventListener('submit', handleAction);

  form.addEventListener('input', () => {
    renderSnippets();
    tileResult.classList.add('stale');
    if (!submit.disabled) setStatus('Press Run action to update result.');
  });

  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab;
      tabs.forEach((other) => other.setAttribute('aria-selected', String(other === tab)));
      renderSnippets();
    }),
  );

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(snippet.textContent);
      copyButton.textContent = 'Copied';
    } catch {
      copyButton.textContent = 'Press Ctrl+C to copy';
      const range = document.createRange();
      range.selectNodeContents(snippet);
      getSelection().removeAllRanges();
      getSelection().addRange(range);
    }
    setTimeout(() => (copyButton.textContent = 'Copy'), 1800);
  });

  if (download) {
    download.addEventListener('click', async () => {
      const textToCopy = tileResult.textContent?.trim() || '';
      try {
        await navigator.clipboard.writeText(textToCopy);
        download.textContent = 'Copied';
      } catch {
        download.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => (download.textContent = 'Copy output'), 1800);
    });
  }

  document.querySelectorAll('a[href="#try"]').forEach((link) =>
    link.addEventListener('click', () => setTimeout(() => input.focus({ preventScroll: true }), 400)),
  );

  renderSnippets();
})();
