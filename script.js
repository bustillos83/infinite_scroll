const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "YLUdmhtUeOMkS06DwdS_uhqxtnSow5nXHA7Fe7yPsu4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}
//Helper function to set attributes on DOM element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for Links and Photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //Run function for each object in photoArray
  photosArray.forEach((photo) => {
    //create <a> to link to Unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //put <img> inside <a> then put bnoth inside the imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
//Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch error
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    // ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
