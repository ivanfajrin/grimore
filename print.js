const linkGrid = document.getElementById('link-grid');
const counterElement = document.getElementById('counter');
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const linkList = document.getElementById('linkList');
const pagination = document.getElementById('pagination'); // Elemen untuk navigasi pagination

const ITEMS_PER_PAGE = 60; // Jumlah item per halaman
let currentPage = 1; // Halaman aktif

// Urutkan tautan berdasarkan jumlah klik yang tersimpan
const sortedLinks = sortLinksByClicks();
const totalPages = Math.ceil(sortedLinks.length / ITEMS_PER_PAGE);
const gridItem = document.createElement('div');
gridItem.classList.add('grid-item');

gridItem.innerHTML = `<a href="${link.url}" target="_blank" style="background-color: ${link.color}; display: block; padding: 10px; border-radius: 5px;">${link.text}</a>`;

// Fungsi untuk merender grid berdasarkan halaman aktif
function renderGrid(page) {
    linkGrid.innerHTML = ''; // Hapus semua item sebelumnya
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = page * ITEMS_PER_PAGE;
    const paginatedLinks = sortedLinks.slice(start, end);

    paginatedLinks.forEach(link => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        
        gridItem.innerHTML = `<a href="${link.url}" target="_blank" style="background-color: ${link.color};">${link.text}</a>`;
        
        gridItem.querySelector('a').addEventListener('click', function() {
            incrementClickCount(link.text);
            updateSidebar(link);
        });

        linkGrid.appendChild(gridItem);
    });

    // Update counter
    counterElement.innerText = `Showing ${start + 1} to ${Math.min(end, sortedLinks.length)} of ${sortedLinks.length} links`;
    renderPagination();
}

// Fungsi untuk merender navigasi pagination
function renderPagination() {
    pagination.innerHTML = ''; // Hapus navigasi sebelumnya

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('page-btn');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }

        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderGrid(currentPage);
        });

        pagination.appendChild(pageButton);
    }
}

// Fungsi untuk melacak klik
function incrementClickCount(linkText) {
    const currentCount = getClickCount(linkText);
    localStorage.setItem(linkText, currentCount + 1);
}

// Mendapatkan jumlah klik dari localStorage
function getClickCount(linkText) {
    return parseInt(localStorage.getItem(linkText)) || 0;
}

// Update sidebar untuk menampilkan data klik dan deskripsi
function updateSidebar(clickedLink = null) {
    linkList.innerHTML = '';
    sortedLinks.forEach(link => {
        const listItem = document.createElement('li');
        const description = (link === clickedLink) ? `<p>${link.description}</p>` : '';
        listItem.innerHTML = `<span>${link.text}: ${getClickCount(link.text)} clicks</span>${description}`;
        linkList.appendChild(listItem);
    });
}

// Fungsi untuk mengurutkan tautan berdasarkan klik
function sortLinksByClicks() {
    return links.sort((a, b) => getClickCount(b.text) - getClickCount(a.text));
}

// Tampilkan sidebar saat tombol diklik
openSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    updateSidebar();
});

// Inisialisasi tampilan
renderGrid(currentPage);
updateSidebar();
