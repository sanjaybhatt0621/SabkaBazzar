import serviceFile from '../services/servicesFile';

export default class CategoriesComponent{
    constructor(parent){
        this.parent=parent;
        this.serviceFile=new serviceFile;
        this.render();
    }
    render(){
        this.serviceFile.getCategoryData().then((result)=>{
            result.forEach(categoryData => {
                let flag=`${categoryData.enabled}`;
                if(flag=="true"){
                    let markup =
                   `<ul>
                   <li class="init">
                   <a href = "#/products/${categoryData.id}">${categoryData.name}</a>
                   </li>
                   </ul>`;

                    $(this.parent).append(markup);
                }
            });
        });
    }
}