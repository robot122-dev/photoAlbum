const modal = document.querySelector(".modal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

let currentImageIndex = 0; // Текущий индекс изображения
let images = []; // Массив изображений для модального окна

const photosContainer = document.getElementById('photos');

async function openModalByUrl(albumId, photoIndex) {
    const files = await fetchFilesByImageId(albumId);
    images = files;
    currentImageIndex = photoIndex;

    if (files[photoIndex]) {
        openModal(`${API_URL}/assets/${files[photoIndex].URL}`, `Фото ${photoIndex + 1} из ${files.length}`);
        window.history.pushState(null, null, `/album/${albumId}/${photoIndex}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParts = window.location.pathname.split('/');
    if (urlParts[1] === 'album' && urlParts.length === 3) {
        const albumId = urlParts[2];
        showAlbumPhotos(albumId);
    } else if (urlParts[1] === 'album' && urlParts.length === 4) {
        const albumId = urlParts[2];
        const photoIndex = parseInt(urlParts[3], 10);
        openModalByUrl(albumId, photoIndex);
    }
});

photosContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('photo-item')) {
        currentImageIndex = Array.from(photosContainer.children).indexOf(event.target);
        openModal(event.target.src, event.target.alt);
    }
});

function openModal(src, alt) {
    modal.style.display = "flex";
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.style.transition = 'opacity 0.5s ease';
    modalImg.src = src;
    captionText.innerHTML = alt;
    updateCaption();
}

function closeModal() {
    modal.style.display = "none";
}

document.querySelector(".close").onclick = closeModal;

document.getElementById("prevBtn").onclick = function() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        const urlParts = window.location.pathname.split('/');
        const albumId = urlParts[2];
        window.history.pushState(null, null, `/album/${albumId}/${currentImageIndex}`);
        openModalByUrl(albumId, currentImageIndex);
    }
};

document.getElementById("nextBtn").onclick = function() {
    const urlParts = window.location.pathname.split('/');
    const albumId = urlParts[2];
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        window.history.pushState(null, null, `/album/${albumId}/${currentImageIndex}`);
        openModalByUrl(albumId, currentImageIndex);
    }
};

function updateCaption() {
    captionText.innerHTML = `Фото ${currentImageIndex + 1} из ${images.length}`;
}

function setImages(imgArray) {
    images = imgArray;
}