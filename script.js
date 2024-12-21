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


function openPopup(element) {
    const img = element.querySelector('img'); // Ambil gambar dari slide yang diklik
    const imageSrc = img ? img.src : ''; // Dapatkan src dari gambar
    document.getElementById("popup-image").src = imageSrc; // Set gambar di popup
    document.getElementById("popup").style.display = "flex"; // Tampilkan popup
}

function closePopup() {
    document.getElementById("popup").style.display = "none"; // Sembunyikan popup
}
