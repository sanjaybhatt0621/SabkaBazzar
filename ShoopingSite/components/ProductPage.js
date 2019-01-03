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
                <aside class="leftSection">
                <ul>
                </ul>
                </aside>
                <section class="rightSection"></section>
        </main>`;
        $(this.parent).html(markUp);
        new  CategoriesComponent(".leftSection ul");
        new ProductComponent(".rightSection",this.id);


        $("ul").on("click", ".init", function() {
            $(this).closest("ul").children('li:not(.init)').toggle();
        });

        var allOptions = $("ul").children('li:not(.init)');
        $("ul").on("click", "li:not(.init)", function() {
            allOptions.removeClass('selected');
            $(this).addClass('selected');
            $("ul").children('.init').html($(this).html());
            allOptions.toggle();
        });
    }
}