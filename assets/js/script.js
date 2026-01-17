'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Wait for DOM to be fully loaded before initializing modals
document.addEventListener('DOMContentLoaded', function () {

  // Research modal functionality
  const researchItems = document.querySelectorAll("[data-research-item]");
  const researchModal = document.querySelector("[data-research-modal]");
  const researchModalCloseBtn = document.querySelector("[data-research-close-btn]");
  const researchOverlay = document.querySelector("[data-research-overlay]");

  // Research modal elements
  const researchModalImg = document.querySelector("[data-research-modal-img]");
  const researchModalTitle = document.querySelector("[data-research-modal-title]");
  const researchModalCategory = document.querySelector("[data-research-modal-category]");
  const researchModalDate = document.querySelector("[data-research-modal-date]");
  const researchModalText = document.querySelector("[data-research-modal-text]");

  // Research modal toggle function
  const researchModalFunc = function () {
    researchModal.classList.toggle("active");
    researchOverlay.classList.toggle("active");
  }

  // Add click event to all research detail buttons
  researchItems.forEach(item => {
    const btn = item.querySelector("[data-research-btn]");

    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Get data from the research item
        const img = item.querySelector("[data-research-img]");
        const title = item.querySelector("[data-research-title]");
        const category = item.querySelector("[data-research-category]");
        const date = item.querySelector("[data-research-date]");
        const details = item.querySelector("[data-research-details]");

        // Populate modal text
        researchModalTitle.innerHTML = title.innerHTML;
        researchModalCategory.innerHTML = category.innerHTML;
        researchModalDate.innerHTML = date.innerHTML;
        researchModalText.innerHTML = details.innerHTML;

        // Get fresh reference to image wrapper (query from modal each time)
        const modalContent = researchModal.querySelector('.modal-content');
        const modalImgWrapper = modalContent.querySelector('.modal-img-wrapper');

        // Check if there are multiple images
        const imagesAttr = details.getAttribute("data-images");

        if (imagesAttr) {
          // Multiple images - create carousel
          const images = imagesAttr.split(",").map(img => img.trim());

          // Create carousel HTML
          let carouselHTML = `
          <div class="modal-image-carousel">
            <div class="carousel-images" style="transform: translateX(0%);">
              ${images.map(imgSrc => `<img src="${imgSrc}" alt="Research image" style="width: 100%; height: auto; border-radius: 16px;">`).join('')}
            </div>
            ${images.length > 1 ? `
              <button class="carousel-btn prev" onclick="moveCarousel(-1, this)">
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <button class="carousel-btn next" onclick="moveCarousel(1, this)">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>
              <div class="carousel-indicators">
                ${images.map((_, idx) => `<div class="carousel-indicator ${idx === 0 ? 'active' : ''}" onclick="goToSlide(${idx}, this)"></div>`).join('')}
              </div>
            ` : ''}
          </div>
        `;

          modalImgWrapper.innerHTML = carouselHTML;
        } else {
          // Single image - use default
          modalImgWrapper.innerHTML = `
          <figure class="modal-avatar-box" style="width: 100%; max-width: 600px; margin: 0 auto;">
            <img src="${img.src}" alt="${img.alt}" style="width: 100%; height: auto; border-radius: 16px;" data-research-modal-img>
          </figure>
        `;
        }

        // Show modal
        researchModalFunc();
      });
    }
  });

  // Close research modal
  researchModalCloseBtn.addEventListener("click", researchModalFunc);
  researchOverlay.addEventListener("click", researchModalFunc);



  // Project modal functionality
  const projectItems = document.querySelectorAll("[data-project-item]");
  const projectModal = document.querySelector("[data-project-modal]");
  const projectModalCloseBtn = document.querySelector("[data-project-close-btn]");
  const projectOverlay = document.querySelector("[data-project-overlay]");

  // Project modal elements
  const projectModalImg = document.querySelector("[data-project-modal-img]");
  const projectModalTitle = document.querySelector("[data-project-modal-title]");
  const projectModalCategory = document.querySelector("[data-project-modal-category]");
  const projectModalDate = document.querySelector("[data-project-modal-date]");
  const projectModalText = document.querySelector("[data-project-modal-text]");

  // Project modal toggle function
  const projectModalFunc = function () {
    projectModal.classList.toggle("active");
    projectOverlay.classList.toggle("active");
  }

  // Add click event to all project detail buttons
  projectItems.forEach(item => {
    const btn = item.querySelector("[data-project-btn]");

    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Get data from the project item
        const img = item.querySelector("[data-project-img]");
        const title = item.querySelector("[data-project-title]");
        const category = item.querySelector("[data-project-category]");
        const date = item.querySelector("[data-project-date]");
        const details = item.querySelector("[data-project-details]");

        // Get fresh reference to modal (query from modal each time)
        const modalContent = projectModal.querySelector('.modal-content');
        const modalImgWrapper = modalContent.querySelector('.modal-img-wrapper');

        // Check if there are multiple images
        const imagesAttr = details.getAttribute("data-images");

        if (imagesAttr && modalImgWrapper) {
          // Multiple images - create carousel
          const images = imagesAttr.split(",").map(img => img.trim());

          let carouselHTML = `
          <div class="modal-image-carousel">
            <div class="carousel-images" style="transform: translateX(0%);">
              ${images.map(imgSrc => `<img src="${imgSrc}" alt="Project image" style="width: 100%; height: auto; border-radius: 16px;">`).join('')}
            </div>
            ${images.length > 1 ? `
              <button class="carousel-btn prev" onclick="moveCarousel(-1, this)">
                <ion-icon name="chevron-back-outline"></ion-icon>
              </button>
              <button class="carousel-btn next" onclick="moveCarousel(1, this)">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>
              <div class="carousel-indicators">
                ${images.map((_, idx) => `<div class="carousel-indicator ${idx === 0 ? 'active' : ''}" onclick="goToSlide(${idx}, this)"></div>`).join('')}
              </div>
            ` : ''}
          </div>
        `;

          modalImgWrapper.innerHTML = carouselHTML;
        } else {
          // Single image - use default
          if (modalImgWrapper) {
            modalImgWrapper.innerHTML = `
            <figure class="modal-avatar-box" style="width: 100%; max-width: 600px; margin: 0 auto;">
              <img src="${img.src}" alt="${img.alt}" style="width: 100%; height: auto; border-radius: 16px;">
            </figure>
          `;
          }
          // Fallback to old method if wrapper doesn't exist
          projectModalImg.src = img.src;
          projectModalImg.alt = img.alt;
        }

        // Populate modal text
        projectModalTitle.innerHTML = title.innerHTML;
        projectModalCategory.innerHTML = category.innerHTML;
        projectModalDate.innerHTML = date.innerHTML;
        projectModalText.innerHTML = details.innerHTML;

        // Show modal
        projectModalFunc();
      });
    }
  });

  // Close project modal
  projectModalCloseBtn.addEventListener("click", projectModalFunc);
  projectOverlay.addEventListener("click", projectModalFunc);

}); // End DOMContentLoaded


// Carousel control functions
let currentSlideIndex = 0;

function moveCarousel(direction, btn) {
  const carousel = btn.closest('.modal-image-carousel');
  const carouselImages = carousel.querySelector('.carousel-images');
  const images = carouselImages.querySelectorAll('img');
  const indicators = carousel.querySelectorAll('.carousel-indicator');

  currentSlideIndex += direction;

  if (currentSlideIndex < 0) {
    currentSlideIndex = images.length - 1;
  } else if (currentSlideIndex >= images.length) {
    currentSlideIndex = 0;
  }

  carouselImages.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  // Update indicators
  indicators.forEach((ind, idx) => {
    ind.classList.toggle('active', idx === currentSlideIndex);
  });
}

function goToSlide(index, indicator) {
  const carousel = indicator.closest('.modal-image-carousel');
  const carouselImages = carousel.querySelector('.carousel-images');
  const indicators = carousel.querySelectorAll('.carousel-indicator');

  currentSlideIndex = index;
  carouselImages.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  indicators.forEach((ind, idx) => {
    ind.classList.toggle('active', idx === currentSlideIndex);
  });
}