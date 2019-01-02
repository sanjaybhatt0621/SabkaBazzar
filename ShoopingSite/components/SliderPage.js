import ImageSliderPage from  './ImageSliderPage';
import servicesFile from '../services/servicesFile';

var self;

export default class SliderPage{
    constructor(parent){
        this.parent=parent;
        this.slideIndex=1;
        this.servicesFile = new servicesFile();
        this.render();
        self=this;
    }
    render(){
        this.servicesFile.getBannerData().then((result)=>{
        let markUp=`<div class="slideshow-container">
        
        <div id="carouselImage"></div>
       
            <a class="prev" id="prevButton">PREV</a>
            <a class="next" id="nextButton">NEXT</a>
            
            
        </div>
        <div class ="carouselDots">
            
        </div>
        `;
        $(this.parent).append(markUp);
        let c=1
        result.forEach(carouselImage => {

            new ImageSliderPage('#carouselImage', carouselImage);

            let dotMarkup=`<span class="dot" id="dot_${c}"></span>`;
            $('.carouselDots').append(dotMarkup);
            $('#dot_'+`${c}`).on('click',{"counter":c},self.currentSlide);
            c++;

        });
        this.showSlides(1);
        $('#prevButton').on('click',{"counter":-1},self.plusSlides);
        $('#nextButton').on('click',{"counter":1},self.plusSlides);
        
    });
    }

    // Next/previous controls
    
    plusSlides(n) {
        self.showSlides(self.slideIndex += n.data.counter);
        }
    // Thumbnail image controls
    currentSlide(n) {
        self.showSlides(self.slideIndex = n.data.counter);
    }

    showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {self.slideIndex = 1} 
        if (n < 1) {self.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[self.slideIndex-1].style.display = "block"; 
        dots[self.slideIndex-1].className += " active";
    }   
}