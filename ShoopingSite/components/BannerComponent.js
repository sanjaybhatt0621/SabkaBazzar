import ServicesFile from "../services/servicesFile";

export default class BannerComponent{
    constructor(parent){
        this.ServicesFile=new ServicesFile;
        this.parent=parent;
        this.render();
        
    }
    render(){
        let compare=function(a,b){
            if (a.order < b.order)
                return -1;
            if (a.order > b.order)
                return 1;
            return 0;
        }
        this.ServicesFile.getCategoryData().then((result)=>{
            let contentData=result;
            result.sort(compare);
            result.forEach(contentData => {

                let flag=`${contentData.enabled}`;
                if(flag=="true"){
                    let markup =
                    `
                    <div class="categoryBorder">
                    &nbsp;
                    </div>
                    
                        <section class="category ">
                        
                    <article class="menu-items">
                            <img src="${contentData.imageUrl}" alt="${contentData.key}"/>
                        </article>
                        <article class="description">
                            <h2>${contentData.name}</h2>
                            <p>${contentData.description}</p>
                            <a href="#/products/${contentData.id}">Explore  &nbsp;${contentData.key}</a>
                    </article>
                    </section>
                    `;

                    $(this.parent).append(markup);
                }
            });
        });
    }
}