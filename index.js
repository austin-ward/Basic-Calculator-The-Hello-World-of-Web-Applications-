const display = document.getElementById('display');

function appendToDisplay(input) {
  display.value += input;
}

function allclear() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function percentage() {
  if (display.value) {
    display.value = (parseFloat(display.value) / 100).toString();
  }
}

function toggleNegative() {
  if (display.value) {
    display.value = display.value.startsWith('-')
      ? display.value.slice(1)
      : '-' + display.value;
  }
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}

function handleKeyPress(event) {
  const key = event.key;

  const allowedKeys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '.', '=', 'Enter', 'Backspace', 'Escape', '%'
  ];

  if (!allowedKeys.includes(key)) {
    return;
  }

  switch (key) {
    case 'Enter':
    case '=':
      calculateResult();
      break;
    case 'Backspace':
      backspace();
      break;
    case 'Escape':
      allclear();
      break;
    case '%':
      percentage();
      break;
    default:
      appendToDisplay(key);
  }
}

document.addEventListener('keydown', handleKeyPress);

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeToggle.checked = savedTheme === 'dark';
} else {
  themeToggle.checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

themeToggle?.addEventListener('change', () => {
  const next = themeToggle.checked ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
