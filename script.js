// Inisialisasi Swiper untuk setiap item portfolio
document.addEventListener("DOMContentLoaded", function() {
    var swipers = document.querySelectorAll('.swiper-container');
    swipers.forEach(function(swiperElement) {
        new Swiper(swiperElement, {
            loop: true,
            navigation: {
                nextEl: swiperElement.querySelector('.swiper-button-next'),
                prevEl: swiperElement.querySelector('.swiper-button-prev'),
            },
    
                delay: 5000, // Ganti dengan delay sesuai kebutuhan
        
        });
    });
});