// site-wide JS 

// display a random image as background cover image 
const div = document.getElementById('cover-home');
// get images from the folder and assign as an object to include citation information 
const images = {
    '1': {
        'src': 'img/home/AerialViewCampus-1949-05-20.jpg',
        'citation': 'source',
        'caption': 'Aerial View of George Mason University'
    },
    '2': {
        'src': 'img/home/AerialViewCampus-1964-03-17-2.jpg',
        'citation': 'source',
        'caption': 'Aerial View of l;akdfj'
    },
    '1': {
        'src': 'img/home/FXCI-AER-050-600_1960.png',
        'citation': 'source',
        'caption': 'Aerial View of l;ajds f;laskdjf al;sdkfj '
    },
    '1': {
        'src': 'img/home/aerial2.png',
        'citation': 'source',
        'caption': 'Aerial View of l;kaj df;laskdfasdl;kfj '
    },
    '1': {
        'src': 'img/home/IMG_0937_1970.png',
        'citation': 'source',
        'caption': 'Aerial View of al;djf a;lkdsfj asdf'
    }
}

// get a random image from the images object
const randomImage = Object.keys(images)[Math.floor(Math.random() * Object.keys(images).length)];

// apply the random image and styles to the background-cover 
div.style.backgroundImage = `url(${images[randomImage].src})`;
div.style.backgroundSize = 'cover';
div.style.backgroundPosition = 'center';
div.style.backgroundRepeat = 'no-repeat';

// apply the caption and source to the .cover-citation div
const caption = document.getElementById('cover-citation');
caption.innerHTML = `${images[randomImage].caption}. Image courtesy of ${images[randomImage].citation}.`;
// caption.innerHTML = images[randomImage].caption;