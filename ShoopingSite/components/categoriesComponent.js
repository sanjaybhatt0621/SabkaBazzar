import serviceFile from '../services/servicesFile';

export default class CategoriesComponent{
    constructor(parent){
        this.parent=parent;
        this.serviceFile=new serviceFile;
        this.render();
    }
    render(){
                var count =0;
                $(".productChoices").html(`<option value=""></option>`);
                $('#productList :selected').text(sessionStorage.selectedText); 

        this.serviceFile.getCategoryData().then((result)=>{
            result.forEach(categoryData => {
                count++;
                let flag=`${categoryData.enabled}`;
                if(flag=="true"){
                    let markup =
                    `
                    
                    
                    <li>
                        <a href = "#/products/${categoryData.id}">${categoryData.name}</a>
                    </li>
                    
                     `;
                     let optionMarkup =`<option class="categoryOptions" value ="#/products/${categoryData.id}">${categoryData.name}</option>`


                    $(this.parent).append(markup);
                    $(".productChoices").append(optionMarkup);
                }
            });
        });
    }
}