document.addEventListener('DOMContentLoaded', () => {
    // Sembunyikan Preloader setelah halaman dimuat
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        });
    }

    // Fungsionalitas Toggle Mode Gelap/Terang
    const toggleModeButton = document.querySelector('.toggle-mode');
    if (toggleModeButton) {
        toggleModeButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
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
    const mobileHeaderNav = document.querySelector('.mobile-header-nav'); // Target menu mobile

    if (menuToggleButton && mobileHeaderNav) {
        menuToggleButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah klik menyebar ke document
            mobileHeaderNav.classList.toggle('active');
            if (mobileHeaderNav.classList.contains('active')) {
                // Tambahkan event listener ke document untuk menutup menu jika klik di luar
                document.addEventListener('click', closeMenuOutside);
            } else {
                document.removeEventListener('click', closeMenuOutside);
            }
        });

        function closeMenuOutside(event) {
            // Jika klik bukan pada tombol menu dan bukan di dalam menu itu sendiri
            if (!menuToggleButton.contains(event.target) && !mobileHeaderNav.contains(event.target)) {
                mobileHeaderNav.classList.remove('active');
                document.removeEventListener('click', closeMenuOutside);
            }
        }

        // Tutup menu saat item navigasi diklik
        mobileHeaderNav.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                mobileHeaderNav.classList.remove('active');
            });
        });
    }

    // Menandai item navigasi aktif (untuk desktop dan mobile)
    const currentPath = window.location.pathname.split('/').pop();
    const allNavItems = document.querySelectorAll('.desktop-nav .nav-item, .mobile-header-nav .nav-item');

    allNavItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        item.classList.remove('active'); // Hapus aktif dari semua dulu
        if (currentPath === '' && itemHref === 'index.html') {
            item.classList.add('active');
        } else if (itemHref === currentPath) {
            item.classList.add('active');
        }
    });


    // Fungsionalitas Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
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
            if (window.pageYOffset > 200) {
                scrollTopButton.classList.add('show');
            } else {
                scrollTopButton.classList.remove('show');
            }
        });
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Fungsionalitas FAQ Accordion
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
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const phoneNumber = '6285810073341';
            const prefilledMessage = `Halo Bentley Hosting,\nSaya ingin bertanya tentang layanan Anda.\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`;
            const encodedMessage = encodeURIComponent(prefilledMessage);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            this.reset();
        });
    }

    // Fungsionalitas Transisi Halaman
    const internalLinks = document.querySelectorAll('a[href^="./"], a[href$=".html"]');
    internalLinks.forEach(link => {
        if (link.hash) return;
        if (link.hostname !== window.location.hostname && link.target !== '_blank') return;
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const destination = this.href;
            document.body.classList.add('page-transition-out');
            setTimeout(() => {
                window.location.href = destination;
            }, 400);
        });
    });

    // Tambahkan kelas transisi masuk saat halaman dimuat
    document.body.classList.add('page-transition-in');
});

