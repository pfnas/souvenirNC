const pages = document.querySelectorAll('.page');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
let current = 0;

// Animation simple
function showPage(index) {
  pages.forEach((page, i) => {
    if (i < index) {
      page.style.transform = 'rotateY(-180deg)';
    } else {
      page.style.transform = 'rotateY(0deg)';
    }
  });
}

next.addEventListener('click', () => {
  if (current < pages.length) current++;
  showPage(current);
});

prev.addEventListener('click', () => {
  if (current > 0) current--;
  showPage(current);
});
