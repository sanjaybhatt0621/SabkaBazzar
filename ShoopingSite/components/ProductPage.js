import CategoriesComponent  from './categoriesComponent';
import ProductComponent from './ProductComponent';

export default class ProductPage{
    constructor(parent,request){
        this.parent =parent;
        this.request = request;
        this.id= (this.request && this.request.id)?this.request.id : 0;
        this.render();
    }
    
    render(){
        let markUp=`<main class="mainProducts">
                <aside class="leftSection"></aside>
                <section class="rightSection"></section>
        </main>`;
        $(this.parent).html(markUp);
        new  CategoriesComponent(".leftSection");
        new ProductComponent(".rightSection",this.id);
    }
}