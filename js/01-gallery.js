import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector(".gallery");
const imgMarkup = createGallery(galleryItems)

galleryRef.addEventListener("click", zoomClick);
galleryRef.insertAdjacentHTML("beforeend", imgMarkup);

function createGallery(gallerItems) {
    return gallerItems
        .map(({ preview, original, description }) => {
            return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </div>
            `;
        })
        .join(" ");
}

function zoomClick(event) {
    const imgCheck = event.target.classList.contains("gallery__image");

    if (!imgCheck) {
        return;
    }

    zoomer(event);
};


function zoomer(event) {
    event.preventDefault();
    const zoomImg = event.target.dataset.source;
    const inicial = basicLightbox.create(
        `
        <img src="${zoomImg}" width="1280">
        `,
        {
            onclose: () => {
                window.removeEventListener("keydown", closeZoom);
            },
        }
    );
    window.addEventListener("keydown", closeZoom);
    
    inicial.show();
    
    function closeZoom(event) {
        console.log(event.code);
        if (event.code = "Escape") {
            inicial.close();
        }
    }
}
