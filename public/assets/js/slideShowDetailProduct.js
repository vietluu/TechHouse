var imgFeature = document.querySelector('#img-feature');
var listImages = document.querySelectorAll('.img-product');
var btnPrev = document.querySelector('.prev');
var btnNext = document.querySelector('.next');
var currentIndex = 0;

function updatedImagebyIndex(index) {

    //remove active
    listImages.forEach(item => {
        item.classList.remove('active');
    });

    // doi anh 
    currentIndex = index;
    imgFeature.src = listImages[index].getAttribute('src');

    // set active
    listImages[index].classList.add('active');
}
function process() {
    const a = document.getElementById('img-feature').getAttribute('src');
    const g = document.getElementById('img-feature').getAttribute('alt');
    const b = document.getElementById('title_product').innerText;
    const c = document.querySelector('.color-choose input:checked').value;
    const d = document.querySelector('.cable-choose input:checked').value;
    const f = document.getElementById('money').innerText;
   
    window.location.href = `OderProcess.aspx?id=${g}&name=${b}&img=${a}&color=${c}&size=${d}&paid=${f}`;

    
}
listImages.forEach((imgElement, index) => {

    imgElement.addEventListener('click', e => {
        imgFeature.style.opacity = '0';

        setTimeout(() => {
            updatedImagebyIndex(index);
            imgFeature.style.opacity = '1';

        }, 50);

    });
});


btnPrev.addEventListener('click', () => {
    if (currentIndex == 0) {
        currentIndex = listImages.length - 1;
    } else {
        currentIndex--;
    }
    updatedImagebyIndex(currentIndex);
});


btnNext.addEventListener('click', () => {
    if (currentIndex == listImages.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    updatedImagebyIndex(currentIndex);

});
