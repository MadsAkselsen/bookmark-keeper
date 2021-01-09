const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteURLEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('boomarks-container');

function openModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

function closeModal() {
  modal.classList.remove('show-modal');
}

modalShow.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) =>
  e.target === modal ? closeModal() : false
);
