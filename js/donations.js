const copyButtons = document.querySelectorAll(".copy-btn");

async function copyWalletAddress(button) {
  const target = document.getElementById(button.dataset.target);
  if (!target) return;
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(target.textContent.trim());
    button.textContent = "Copied ✓";
  } catch {
    button.textContent = "Press Ctrl+C to copy";
    const range = document.createRange();
    range.selectNodeContents(target);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  setTimeout(() => (button.textContent = original), 1800);
}

copyButtons.forEach((btn) =>
  btn.addEventListener("click", () => copyWalletAddress(btn)),
);
