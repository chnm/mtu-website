// site-wide JS
// --------------

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('hidden');
  });
}

// display a random image as background cover image
const div = document.getElementById('cover-home');

if (div) {
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
          'caption': 'Aerial view of Mason\'s Fairfax campus, 1960'
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
}

// Lightbox keyboard accessibility
(function () {
  let openerLink = null;

  // Each thumbnail link: record opener and move focus into the lightbox after layout settles
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href.length > 1) {
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target && target.classList.contains('lightbox')) {
        link.addEventListener('click', () => {
          openerLink = link;
          requestAnimationFrame(() => target.focus());
        });
      }
    }
  });

  // Each lightbox close link: return focus to the opener after layout settles
  document.querySelectorAll('a.lightbox').forEach(lightbox => {
    lightbox.addEventListener('click', () => {
      if (openerLink) {
        const returnTo = openerLink;
        openerLink = null;
        requestAnimationFrame(() => returnTo.focus());
      }
    });
  });

  // Close on Escape and return focus to the thumbnail that opened the lightbox
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const active = document.querySelector('.lightbox:target');
      if (active) {
        const returnTo = openerLink;
        openerLink = null;
        window.location.hash = '';
        if (returnTo) requestAnimationFrame(() => returnTo.focus());
      }
    }
  });
})();
