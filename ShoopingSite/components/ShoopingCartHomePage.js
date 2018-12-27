import servicesFile from '../services/servicesFile'

export default class ShoopingCartHomePage
{
    constructor(keyItem)
    {
       this.servicesFile = new servicesFile();
        this.keyItem = keyItem;
        this.render();
    }

    render()
    {
        let self;
        this.servicesFile.getCategoryData().then((result) => 
        {
            let contentData = result;
            result.forEach(contentData =>
                {
                    self = {context : contentData};
                    let flag = `${contentData.enabled}`;
                    if(flag=="true")
                    {
                        let markup = 
                        `
                        <section class="category ">
                        <article class="menu-items">
                                <img src="${contentData.imageUrl}"/>
                            </article>
                            <article class="description">
                                <h2>${contentData.name}</h2>
                                <p>${contentData.description}</p>
                                <a href="">${contentData.key}</a>
                        </article>
                        </section>`;

                        $(this.keyItem).append(markup);
                    }
                });
        });
    }
}