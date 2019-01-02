import SliderPage from './SliderPage'
import BannerComponent from './BannerComponent'


export default class HomePage
{
    constructor(parent,request)
    {
        this.parent = parent;
        this.request = request;
        this.render();
    }
   
     render()
        {
            let markUp = `<section class="slider"></section><section class="category-containner"></section>`;
            $(this.parent).html(markUp);
            this.carousel = new SliderPage(".slider");
            this.banner = new BannerComponent(".category-containner");
        }
    }    