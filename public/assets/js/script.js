window.onload = () => {

    const menu = document.querySelector('.nav-menu');
    const menu_mobile = document.querySelector('.mobile-menu');
    const sub = document.getElementsByClassName('dropdown');
    var click = true;
    var check = true;


    //menu dropdown
    menu.addEventListener('click', function () {
        if (click) {
            menu_mobile.setAttribute('style', 'display:block;')
            click = !click;

        }
        else {
            menu_mobile.setAttribute('style', 'display:none;')
            click = !click;

        }
    });
    for (var x of sub) {
        x.addEventListener('click', function (x) {
            const nextSibling = this.nextElementSibling;
            const child = this.childNodes;
            if (check) {
                nextSibling.setAttribute('style', 'display:block;');
                console.log(child);
                child[0].setAttribute('style', 'transform: rotate(90deg);')
                check = !check;
            }
            else {
                nextSibling.setAttribute('style', 'display:none;')
                child[0].setAttribute('style', 'transform: rotate(0deg);')
                check = !check;
            }
        });
    }

    //slideShow
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        setTimeout(showSlides, 4000);
    }
  
}

