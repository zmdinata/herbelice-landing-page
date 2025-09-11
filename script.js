document.addEventListener('DOMContentLoaded', () => {
    // === KODE EFEK NAVBAR ===
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Jika scroll lebih dari 50px
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // === KODE SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // === KODE SLIDER KATALOG (SUDAH DIPINDAHKAN KE DALAM) ===
    const slider = document.querySelector('.catalog-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    const catalogItems = document.querySelectorAll('.catalog-item');

    // Pastikan elemen slider ada sebelum menjalankan kodenya
    if (slider) {
        let currentIndex = 0;
        let itemsPerPage = calculateItemsPerPage();
        let totalPages = Math.ceil(catalogItems.length / itemsPerPage);

        function calculateItemsPerPage() {
            if (window.innerWidth <= 600) {
                return 1;
            } else if (window.innerWidth <= 900) {
                return 2;
            } else {
                return 3;
            }
        }

        function updateSliderConfig() {
            const newItemsPerPage = calculateItemsPerPage();
            if (newItemsPerPage !== itemsPerPage) {
                itemsPerPage = newItemsPerPage;
                totalPages = Math.ceil(catalogItems.length / itemsPerPage);
                currentIndex = 0;
                updateSlider();
                createDots();
            }
        }

        window.addEventListener('resize', updateSliderConfig);

        function createDots() {
            sliderDotsContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === currentIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
                sliderDotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            const offset = -currentIndex * 100; // Menggunakan logika yang sudah diperbaiki
            slider.style.transform = `translateX(${offset}%)`;

            document.querySelectorAll('.dot').forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalPages - 1;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < totalPages - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });

        createDots();
        updateSlider();
    }
// Pastikan hanya ada satu penutup kurung kurawal dan kurung di paling akhir
});