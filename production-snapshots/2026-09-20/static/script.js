const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
  });
}

const cards = [...document.querySelectorAll('.academy-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
function applyFilter(filter) {
  cards.forEach(card => {
    const match = filter === 'all' || card.dataset.tags.split(' ').includes(filter);
    card.classList.toggle('hidden-card', !match);
  });
  document.querySelectorAll('.filter').forEach(button => button.classList.toggle('active', button.dataset.filter === filter));
  document.querySelector('#find')?.scrollIntoView({behavior: 'smooth'});
}
filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));

document.querySelectorAll('.save-button').forEach(button => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(saved));
  });
});

document.querySelectorAll('.map-pin').forEach(pin => {
  pin.addEventListener('click', () => {
    document.querySelectorAll('.map-pin').forEach(item => item.classList.remove('active'));
    pin.classList.add('active');
  });
});

document.querySelector('#show-more')?.addEventListener('click', event => {
  event.currentTarget.textContent = 'Six academies would load here from The Way app';
  event.currentTarget.disabled = true;
});
