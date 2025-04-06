const openButton = document.getElementById('open-sidebar-button')
const closeButton = document.getElementById('close-sidebar-button')
const nav = document.getElementById('nav')
const overlay = document.getElementById('overlay')
const slideshowImg = document.getElementById('slideshowImg')
const slideshowDesc = document.getElementById('slideshowDesc')
const slideshowTitle = document.getElementById("slideshowTitle")
const dots = document.querySelectorAll('.dot')

const slideshows = ["media/slideshow-1.png","media/slideshow-2.jpg", "media/slideshow-3.jpg", "media/slideshow-4.jpg"]
const titles = ['Hunian Kontainer Minimalis dari PT. Gaoshi Building Material', 
                'Pilihan hunian masa kini:', 
                'Harga lebih terjangkau', 
                'Bahan bangunan berkualitas']
const descs = ['Solusi Rumah Modern, Praktis, dan Terjangkau ',
                'Praktis, Kokoh dan Estetis', 
                'Lebih hemat dibandingkan bangunan konvensional', 
                'Beragam macam tersedia']
                
const media = window.matchMedia("(max-width: 740px)")

media.addEventListener('change', (e) => updateNavbar(e))

function updateNavbar(e){
    const isMobile = e.matches;
    console.log(isMobile)
    if(isMobile){
        nav.setAttribute('inert','')
    }
    else{
        nav.removeAttribute('inert')
        overlay.style.display = 'none';
    }
}

function openSidebar(){
    nav.classList.add('show');
    openButton.setAttribute('aria-expanded', 'true');
    overlay.style.display = 'block';
    if (nav.classList.contains('show')){
        console.log('block')
        overlay.style.display = 'block';
    }
}

function closeSidebar(){
    nav.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
    overlay.style.display = 'none';
}

openButton.addEventListener('click', openSidebar);
closeButton.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
updateNavbar(media);

const currentPage = window.location.pathname;
const links = document.getElementsByTagName('a')
for (let link of links) {
    const linkPath = link.getAttribute('href');

    if (currentPage.includes(linkPath)) {
        link.style.color = "rgb(20, 93, 160)";
        link.style.borderBottom = "solid 5px black";
    }
}

let currentSlide = 0;
function updateSlideshow(){
    slideshowImg.classList.remove('visible');
    slideshowDesc.classList.remove('visible');
    slideshowTitle.classList.remove('visible');
    setTimeout(() =>{
        slideshowImg.src = slideshows[currentSlide];
        slideshowTitle.textContent = titles[currentSlide];
        slideshowDesc.textContent = descs[currentSlide];

        slideshowDesc.classList.add('visible');
        slideshowTitle.classList.add('visible');
        slideshowImg.classList.add('visible');

        currentSlide = (currentSlide+1) % slideshows.length;
    }, 1000);
}

dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
        const slideIndex = parseInt(event.target.getAttribute('data-slide'));
        currentSlide = slideIndex;
        updateSlideshow();
        if (currentSlide = slideIndex){
            dot.classList.add('visible');
        }else{
            dot.classList.remove('visible');
        }
    });
});

window.onload = () => {
    updateSlideshow();
    setInterval(updateSlideshow, 7000);
};