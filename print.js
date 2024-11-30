const linkGrid = document.getElementById('link-grid');
const counterElement = document.getElementById('counter');
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const linkList = document.getElementById('linkList');

// Urutkan tautan berdasarkan jumlah klik yang tersimpan
const sortedLinks = sortLinksByClicks();

// Set untuk melacak URL yang sudah ditambahkan
const urlSet = new Set();

// Tambahkan tautan ke grid
sortedLinks.forEach(link => {
    // Cek apakah URL sudah ada
    if (urlSet.has(link.url)) {
        alert(`Duplicate link found: ${link.text} (${link.url})`);
        return; // Jika ada duplikat, skip link ini
    }
    
    // Tambahkan URL ke Set
    urlSet.add(link.url);

    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    
    // Menggunakan warna dari objek link
    gridItem.innerHTML = `<a href="${link.url}" target="_blank" style="background-color: ${link.color};">${link.text}</a>`;
    
    // Event listener untuk melacak klik dan memperbarui sidebar dengan deskripsi
    gridItem.querySelector('a').addEventListener('click', function() {
        incrementClickCount(link.text);
        updateSidebar(link);
    });

    linkGrid.appendChild(gridItem);
});

// Update counter untuk menunjukkan jumlah tombol
counterElement.innerText = `Total Links: ${sortedLinks.length}`;

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

// Inisialisasi sidebar saat pertama kali dimuat
updateSidebar();
