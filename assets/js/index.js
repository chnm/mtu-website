// site-wide JS 
// --------------

// display a random image as background cover image 
const div = document.getElementById('cover-home');
// get images from the folder and assign as an object to include citation information 
const images = {
    '1': {
        'src': 'img/home/AerialViewCampus-1949-05-20.jpg',
        'citation': 'Old Dominion University Libraries',
        'caption': 'Aerial view of Norfolk Division of the College of William and Mary (later ODU), 1949'
    },
    '2': {
        'src': 'img/home/AerialViewCampus-1964-03-17-2.jpg',
        'citation': 'Old Dominion University Libraries',
        'caption': 'Aerial view of Old Dominion University campus, 1964'
    },
    '3': {
        'src': 'img/home/FXCI-AER-050-600_1960.png',
        'citation': 'Virginia Room, Fairfax County Public Library',
        'caption': 'Aerial view of Mason’s Fairfax campus, 1960'
    },
    '4': {
        'src': 'img/home/aerial2.png',
        'citation': 'Fairfax County',
        'caption': "Aerial view of Mason's Fairfax campus, 1972"
    },
    '5': {
        'src': 'img/home/IMG_0937_1970.png',
        'citation': 'Special Collections and Research Center, George Mason University',
        'caption': "Aerial view of Mason's Fairfax campus, 1970"
    },
    '6': {
        'src': 'img/home/fairfax1990.jpg',
        'citation': 'Fairfax County',
        'caption': "Aerial view of Mason's Fairfax campus, 1990"
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