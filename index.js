document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const photos = document.querySelectorAll(".photo");
  const caption = document.querySelector(".caption");
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-img");
  const modalCaption = document.querySelector(".modal-caption");
  const modalClose = document.querySelector(".modal-close");

  // Add the missing sidebar functions
  window.openSidebar = function() {
    document.getElementById("nav").classList.add("show");
    document.getElementById("open-sidebar-button").setAttribute("aria-expanded", "true");
  };

  window.closeSidebar = function() {
    document.getElementById("nav").classList.remove("show");
    document.getElementById("open-sidebar-button").setAttribute("aria-expanded", "false");
  };

  // Slideshow functionality
  const slides = [
    {
      src: "media/slideshow-1.png",
      title: "Quality Building Materials",
      desc: "Providing the best construction solutions"
    },
    {
      src: "media/slideshow-2.jpg",
      title: "Container Homes",
      desc: "Modern, efficient living spaces"
    },
    {
      src: "media/slideshow-3.jpg",
      title: "Custom Solutions",
      desc: "Tailored to your specific needs"
    },
    {
      src: "media/slideshow-4.jpg",
      title: "Sustainable Options",
      desc: "Eco-friendly building choices"
    }
  ];

  let currentSlide = 0;
  const slideImg = document.getElementById("slideshowImg");
  const slideTitle = document.getElementById("slideshowTitle");
  const slideDesc = document.getElementById("slideshowDesc");
  const dots = document.querySelectorAll(".dot");

  function showSlide(index) {
    // Remove visible class from current elements
    slideImg.classList.remove("visible");
    slideTitle.classList.remove("visible");
    slideDesc.classList.remove("visible");
    
    // Update dot indicators
    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === index) {
        dot.classList.add("active");
      }
    });
    
    // Set timeout to allow fade out
    setTimeout(() => {
      // Update slide content
      slideImg.src = slides[index].src;
      slideTitle.textContent = slides[index].title;
      slideDesc.textContent = slides[index].desc;
      
      // Add visible class to fade in
      slideImg.classList.add("visible");
      slideTitle.classList.add("visible");
      slideDesc.classList.add("visible");
    }, 500);
  }

  // Initialize first slide
  if (slideImg && slideTitle && slideDesc) {
    showSlide(0);
    
    // Set up dot navigation
    dots.forEach((dot) => {
      dot.addEventListener("click", function() {
        const slideIndex = parseInt(this.getAttribute("data-slide"));
        currentSlide = slideIndex;
        showSlide(currentSlide);
      });
    });
    
    // Auto-rotate slides
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  let currentIndex = 0;

  function updateGallery(index) {
    if (!photos || photos.length === 0) return;
    
    photos.forEach((photo, i) => {
      photo.classList.remove("active");
      if (i === index) {
        photo.classList.add("active");
      }
    });
    
    if (caption) {
      const activePhoto = photos[index];
      caption.textContent = activePhoto.dataset.caption || "";
    }
    
    currentIndex = index;
  }

  if (photos && photos.length > 0) {
    photos.forEach((photo, index) => {
      photo.addEventListener("click", function () {
        updateGallery(index);
        if (modalImg) modalImg.src = this.src;
        if (modalCaption) modalCaption.textContent = this.dataset.caption || "";
        if (modal) modal.classList.add("open");
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      if (modal) modal.classList.remove("open");
    });
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  }

  // Optional: navigate with arrow keys
  document.addEventListener("keydown", function (e) {
    if (modal && !modal.classList.contains("open")) return;

    if (photos && photos.length > 0) {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % photos.length;
        updateGallery(currentIndex);
        if (modalImg) modalImg.src = photos[currentIndex].src;
        if (modalCaption) modalCaption.textContent = photos[currentIndex].dataset.caption || "";
      }

      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateGallery(currentIndex);
        if (modalImg) modalImg.src = photos[currentIndex].src;
        if (modalCaption) modalCaption.textContent = photos[currentIndex].dataset.caption || "";
      }
    }

    if (e.key === "Escape" && modal) {
      modal.classList.remove("open");
    }
  });

  if (photos && photos.length > 0) {
    updateGallery(currentIndex);
  }
});