const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuItems = document.querySelectorAll('.menu-item');

// Fungsi untuk membuka sidebar
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburgerBtn.classList.add('open'); // Animasi ikon hamburger menjadi 'X'
    // Reset dan pemicu animasi item menu
    menuItems.forEach(item => {
        item.style.animation = 'none';
        item.offsetHeight; /* Trigger reflow */
        item.style.animation = null;
    });
    // Penting: Mencegah scroll pada body saat sidebar terbuka
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup sidebar
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburgerBtn.classList.remove('open'); // Animasi ikon hamburger kembali ke semula
    // Penting: Mengizinkan scroll pada body kembali saat sidebar tertutup
    document.body.style.overflow = ''; // Mengembalikan ke default
}

// Event listener untuk tombol hamburger
hamburgerBtn.addEventListener('click', openSidebar);

// Event listener untuk tombol tutup di sidebar (ikon X)
closeBtn.addEventListener('click', closeSidebar);

// Event listener untuk menutup sidebar saat mengklik overlay
overlay.addEventListener('click', closeSidebar);

// Event listener untuk menutup sidebar saat mengklik item menu
menuItems.forEach(item => {
    item.addEventListener('click', closeSidebar);
});

// Pastikan sidebar tertutup dan scroll body diizinkan saat halaman dimuat (untuk kasus refresh)
window.onload = () => {
    closeSidebar();
    document.body.style.overflow = ''; // Pastikan scroll body diizinkan saat load
};

