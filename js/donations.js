const copyButtons = document.querySelectorAll(".copy-btn");

async function copyWalletAddress(button) {
  const targetId = button.getAttribute("data-target");
  const text = document.getElementById(targetId).innerText;
  await navigator.clipboard.writeText(text);

  const original = button.innerText;
  button.innerText = "Copied ✓";
  setTimeout(() => {
    button.innerText = original;
  }, 1500);
}

copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => copyWalletAddress(btn));
});
