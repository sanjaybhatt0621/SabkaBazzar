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
        <input type="checkbox" id="filterDown"  style="display:none;">
                <aside class="leftSection">
                <section id = "productList"class="productMenu">
                        <select class="productChoices">
                            
                        </select>
                    </section>
                    <ul class="list-category">
                    </ul>
                </aside>
                <section class="rightSection"></section>
        </main>`;
        $(this.parent).html(markUp);
        new  CategoriesComponent(".leftSection ul");
        new ProductComponent(".rightSection",this.id);
        $('#productList').on('change',this.changeURL); 

        
    }
    changeURL(){
        let hashValue=$('#productList :selected').val();
        sessionStorage.selectedText=$('#productList :selected').text();
        window.location.href=hashValue;
        }
}