import serviceFile from '../services/servicesFile';

export default class CategoriesComponent{
    constructor(parent){
        this.parent=parent;
        this.serviceFile=new serviceFile;
        this.render();
    }
    render(){
                var count =0;
        this.serviceFile.getCategoryData().then((result)=>{
            result.forEach(categoryData => {
                count++;
                let flag=`${categoryData.enabled}`;
                if(flag=="true"){
                    let markup =
                    `
                    <li class="init">
                    <a href = "#/products/${categoryData.id}">${categoryData.name}</a>
                    </li>
                     `;
                    if(count>1)
                    {
                        markup=
                        `
                        <li>
                        <a href = "#/products/${categoryData.id}">${categoryData.name}</a>
                        </li>
                         `;  
                    }


                    $(this.parent).append(markup);
                }
            });
        });
    }
}