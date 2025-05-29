document.addEventListener('DOMContentLoaded', () => {
    // Sembunyikan Preloader setelah halaman dimuat
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden'); // Menambahkan kelas hidden untuk fade out
        setTimeout(() => {
            preloader.style.display = 'none'; // Sembunyikan sepenuhnya setelah transisi
        }, 500); // Sesuaikan dengan durasi transisi CSS preloader
    }

    // Fungsionalitas Toggle Mode Gelap/Terang
    const toggleModeButton = document.querySelector('.toggle-mode');
    if (toggleModeButton) {
        toggleModeButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            // Simpan preferensi mode di localStorage
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Muat preferensi mode dari localStorage saat halaman dimuat
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    // Fungsionalitas Toggle Menu Hamburger (untuk mobile)
    const menuToggleButton = document.querySelector('.menu-toggle');
    const bottomNav = document.querySelector('.bottom-nav');

    if (menuToggleButton && bottomNav) {
        menuToggleButton.addEventListener('click', () => {
            bottomNav.classList.toggle('active');
        });

        // Tutup menu saat item navigasi diklik (hanya jika menu aktif)
        bottomNav.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (bottomNav.classList.contains('active')) {
                    bottomNav.classList.remove('active');
                }
            });
        });
    }

    // Menandai item navigasi aktif di footer
    const currentPath = window.location.pathname.split('/').pop(); // Mendapatkan nama file HTML saat ini
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        // Logika untuk menandai item aktif
        if (currentPath === '' && itemHref === 'index.html') { // Untuk kasus root domain/index.html
            item.classList.add('active');
        } else if (itemHref === currentPath) {
            item.classList.add('active');
        }
    });

    // Fungsionalitas Scroll Reveal (Animasi saat elemen muncul di viewport)
    const revealElements = document.querySelectorAll('.reveal-item');

    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat, aktifkan
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Hentikan observasi setelah diaktifkan
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Fungsionalitas Scroll to Top Button
    const scrollTopButton = document.getElementById('scroll-to-top');

    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) { // Tampilkan tombol setelah menggulir 200px
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        });

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Gulir dengan animasi halus
            });
        });
    }

    // Fungsionalitas FAQ Accordion (hanya untuk faq.html)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Fungsionalitas Kirim Form ke WhatsApp
    const whatsappContactForm = document.getElementById('whatsapp-contact-form');
    if (whatsappContactForm) {
        whatsappContactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah form submit default

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Nomor WhatsApp Anda
            const phoneNumber = '6285810073341'; // Ganti dengan nomor WhatsApp Anda

            // Pesan yang akan diisi otomatis di WhatsApp
            const prefilledMessage = `Halo Bentley Hosting,\nSaya ingin bertanya tentang layanan Anda.\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`;

            // Encode pesan agar aman untuk URL
            const encodedMessage = encodeURIComponent(prefilledMessage);

            // Buat URL WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Buka WhatsApp di tab baru
            window.open(whatsappUrl, '_blank');

            // Opsional: Reset form setelah dikirim
            this.reset();
        });
    }

    // Fungsionalitas Transisi Halaman
    const internalLinks = document.querySelectorAll('a[href^="./"], a[href$=".html"]'); // Pilih tautan internal

    internalLinks.forEach(link => {
        // Abaikan tautan ke bagian dalam halaman yang sama (#anchor)
        if (link.hash) return;

        // Abaikan tautan ke luar website atau target="_blank"
        if (link.hostname !== window.location.hostname && link.target !== '_blank') return;

        link.addEventListener('click', function(event) {
            event.preventDefault(); // Mencegah navigasi default

            const destination = this.href;

            document.body.classList.add('page-transition-out'); // Tambahkan kelas transisi keluar

            // Navigasi setelah animasi selesai (sesuaikan durasi dengan CSS)
            setTimeout(() => {
                window.location.href = destination;
            }, 400); // Durasi harus sama atau sedikit lebih lama dari transisi CSS
        });
    });

    // Tambahkan kelas transisi masuk saat halaman dimuat
    document.body.classList.add('page-transition-in');
});

