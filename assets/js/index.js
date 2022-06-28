// site-wide JS 

// display a random image as background cover image 
const div = document.getElementById('cover-home');
const images = ['img/home/AerialViewCampus-1949-05-20.jpg', 
                'img/home/AerialViewCampus-1964-03-17-2.jpg',
                'img/home/FXCI-AER-050-600_1960.png',
                'img/home/aerial2.png',
                'img/home/IMG_0937_1970.png'
                ];

// get a random image from the array
const randomImage = images[Math.floor(Math.random() * images.length)];

// apply the random image and styles to the background-cover 
div.style.backgroundImage = `url(${randomImage})`;
div.style.backgroundSize = 'cover';
div.style.backgroundPosition = 'center';
div.style.backgroundRepeat = 'no-repeat';