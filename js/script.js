document.getElementById('year').textContent = new Date().getFullYear();

  // Close mobile menu after clicking a navigation link
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('nav');
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });