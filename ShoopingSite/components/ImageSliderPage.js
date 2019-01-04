export default class ImageSliderPage{
    constructor(parent,carouselSuggestion){
        this.imgUrl=carouselSuggestion.bannerImageUrl;
        this.imgAlt = carouselSuggestion.bannerImageAlt;
        this.parent=parent;
        this.render();
    }
    render(){
        let markup=`
        <div class="mySlides fade">
          
          
            <img src=${this.imgUrl} alt=${this.imgAlt} style="width:100%">
          
          
        </div>`;
        
        $(this.parent).append(markup);
        
    }
}