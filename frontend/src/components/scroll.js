window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');

  if (header) { // Check if the header exists
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  } else {
    console.error('Header element not found.');
  }
});
