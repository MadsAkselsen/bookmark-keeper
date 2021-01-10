const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteURLEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

function openModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

function closeModal() {
  modal.classList.remove('show-modal');
}

// Modal event listener
modalShow.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) =>
  e.target === modal ? closeModal() : false
);

// Validate form
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }

  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address');
    return false;
  }

  // Valid (if all the above tests have been passed)
  return true;
}

// Handle data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteURLEl.value;
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }

  // if validate function returns false
  if (!validate(nameValue, urlValue)) {
    return false; // stop this function from adding bookmark
  }

  const bookmark = { title: nameValue, url: urlValue };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  loadBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// Delete bookmark
function deleteBookmark(url) {
  let filteredBookmarks = bookmarks.filter((bookmark) => {
    return bookmark.url !== url;
  });
  bookmarks = filteredBookmarks;
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  loadBookmarks();
}

// Build bookmarks DOM
function buildBookmarks() {
  // Remove all bookmarks
  bookmarksContainer.textContent = '';
  // Build items
  bookmarks.forEach((bookmark) => {
    const { title, url } = bookmark;

    // Item
    const item = document.createElement('div');
    item.classList.add('item');

    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

    // Favicon / Link container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');

    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute('alt', 'Favicon');

    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = title;

    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

function loadBookmarks() {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    bookmarks = [{ title: 'Jacinto Design', url: 'https://jacinto.design' }];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// on app start
loadBookmarks();
