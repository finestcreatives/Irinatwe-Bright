const imageCollections = {
  sports: [
    'Sports1.jpeg',
    'Sp2.jpeg',
    'Sp3.jpeg',
    'Sp4.jpeg',
    'Sp5.jpeg',
    'Sp6.jpeg',
    'sp7.jpeg',
    'Sp8.jpeg'
  ],
  brand: [
    'lo1.jpeg',
    'lo2.jpeg',
    'lo3.jpeg',
    'lo4.jpeg',
    'lo5.jpeg',
    'lo6.jpeg',
    'lo7.jpeg'
  ],
  events: [
    'Eve1.jpeg',
    'Ev2.jpeg',
    'Eve3.jpeg',
    'Eve4.jpeg',
    'Eve5.jpeg',
    'eve6.jpeg',
    'Eve7.jpeg',
    'Eve8.jpeg',
    'Eve9.jpeg',
    'Eve10.jpeg',
    'Eve11.jpeg',
    'Eve12.jpeg',
    'Eve13.jpeg'
  ]
};

const IMAGE_VERSION = '20260407-2';

const categoryMeta = {
  sports: {
    label: 'Sports',
    basePath: '../Images/Sports/'
  },
  brand: {
    label: 'Brand Identity',
    basePath: '../Images/Brand%20Indentity/'
  },
  events: {
    label: 'Events',
    basePath: '../Images/Events/'
  }
};

function getPageItems(page) {
  if (page === 'all') {
    return [
      ...imageCollections.sports.map((file) => ({ key: 'sports', file })),
      ...imageCollections.brand.map((file) => ({ key: 'brand', file })),
      ...imageCollections.events.map((file) => ({ key: 'events', file }))
    ];
  }

  if (!imageCollections[page]) return [];
  return imageCollections[page].map((file) => ({ key: page, file }));
}

function buildCard({ key, file }, index) {
  const meta = categoryMeta[key];
  const card = document.createElement('article');
  card.className = 'gallery-card';

  const img = document.createElement('img');
  img.src = `${meta.basePath}${file}?v=${IMAGE_VERSION}`;
  img.alt = `${meta.label} work ${index + 1}`;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = 1200;
  img.height = 1500;
  img.addEventListener('load', () => {
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio < 0.85) img.classList.add('fit-portrait');
    else if (ratio > 1.2) img.classList.add('fit-landscape');
  });

  const overlay = document.createElement('div');
  overlay.className = 'gallery-overlay';

  const tag = document.createElement('p');
  tag.className = 'gallery-tag';
  tag.textContent = meta.label;

  overlay.appendChild(tag);
  card.appendChild(img);
  card.appendChild(overlay);

  return card;
}

const galleryRoot = document.getElementById('galleryRoot');
if (galleryRoot) {
  const page = galleryRoot.dataset.page || 'all';
  const items = getPageItems(page);

  items.forEach((item, idx) => {
    galleryRoot.appendChild(buildCard(item, idx));
  });
}
