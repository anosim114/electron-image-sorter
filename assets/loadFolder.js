const fs = require('fs');

const wrapper = document.getElementById('wrapper');

let cwd = ''; // current working directory

function loadFolder(path) {
  cwd = path;
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    loadImages(files);
  });
}

function loadImages(images) {
  wrapper.innerHTML = '';
  for (let i = 1; i < images.length; i++) {
    const imgbox = document.createElement('span');
    const img = document.createElement('img');
    const button = document.createElement('button');
    const buttonImage = document.createElement('img');

    imgbox.classList.add('d-imgbox');    
    img.classList.add('d-image');
    buttonImage.classList.add('d-img-menu');

    img.src = `${cwd}/${images[i]}`;
    buttonImage.src = 'assets/img/del.svg';

    button.appendChild(buttonImage);
    imgbox.appendChild(button);
    imgbox.appendChild(img);
    wrapper.appendChild(imgbox);
    // if (i === 25) return;
  }
}

wrapper.addEventListener('click', e => {
  if (e.target.classList.contains('d-img-menu')) {

    let imgSrc = e.target.parentElement.nextElementSibling.src;
    imgSrc = imgSrc.slice(7);
    const parent = e.target.parentElement.parentElement;
    parent.remove();
    // return;
    fs.unlink(imgSrc, err => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('deleted');
    });
  }
});
