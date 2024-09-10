const API_URL = 'http://localhost:8055'; // URL вашего Directus API
const API_TOKEN = 'NSwQ4UDfwpeXERSvMWYyZ34HdHk3FVyb'; // Ваш токен

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_URL}/items/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
async function fetchFilesByImageId(imageId) {
  try {
    const response = await fetch(`${API_URL}/items/files?filter[images_id][_eq]=${imageId}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Fetch files error:', error);
  }
}
async function fetchImages() {
  try {
    const imagesData = await fetchData('images');
    if (imagesData) {
      const images = await Promise.all(imagesData.map(async image => {
        const files = await fetchFilesByImageId(image.id);
        const firstFile = files[0];
        const fileQty = image.file_ids.length;
        return {
          id: image.id,
          url: firstFile ? `${API_URL}/assets/${firstFile.URL}?height=300&quality=85&format=webp&fit=cover` : '',
          title: image.title,
          fileQty
        };
      }));
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = images.map(image => `
                    <a href="/album/${image.id}">
                        ${image.url ? `<img src="${image.url}" alt="Image ${image.id}">` : ''}
                        <p class="gallery__item-title">${image.title} - ${image.fileQty} фото</p>
                    </a>
            `).join('');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
function goBack() {
  document.getElementById('album-photos').style.display = 'none';
  document.getElementById('gallery').style.display = 'flex';
  window.history.pushState(null, null, '/');
}
async function showAlbumPhotos(albumId) {
  const files = await fetchFilesByImageId(albumId);
  images = files;
  const photosContainer = document.getElementById('photos');
  photosContainer.innerHTML = files.map((file, index) => `
        <a href="/album/${albumId}/${index}" onclick="openModalByUrl(${albumId}, ${index}); return false;">
            <img src="${API_URL}/assets/${file.URL}?format=webp&fit=cover" class="photo-item" alt="Image ${index}">
        </a>
    `).join('');
  document.getElementById('gallery').style.display = 'none';
  document.getElementById('album-photos').style.display = 'block';
  window.history.pushState(null, null, `/album/${albumId}`);
}
window.onpopstate = function (event) {
  const urlParts = window.location.pathname.split('/');
  if (urlParts[1] === 'album' && urlParts.length === 3) {
    const albumId = urlParts[2];
    showAlbumPhotos(albumId);
  } else if (urlParts[1] === 'album' && urlParts.length === 4) {
    const albumId = urlParts[2];
    const photoIndex = parseInt(urlParts[3], 10);
    openModalByUrl(albumId, photoIndex);
  } else {
    goBack();
  }
};
document.getElementById('back-button').addEventListener('click', () => {
  document.getElementById('album-photos').style.display = 'none';
  document.getElementById('gallery').style.display = 'flex';
});

// Запуск функции для получения изображений
fetchImages();

    
// login - albom.fine@reboot.com
// password - albom123
// token - NSwQ4UDfwpeXERSvMWYyZ34HdHk3FVyb
// admintoken- CRsVB42ncGyUri4hVLTF0vYR_1Np1ebL