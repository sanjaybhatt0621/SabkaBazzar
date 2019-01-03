import serviceFile from '../services/servicesFile';
import Utils from '../services/Utils';

export default class ProductComponent{
    constructor(parent,id){
        this.parent=parent;
        this.id = id;
        this.serviceFile=new serviceFile;
        this.Utils = new Utils();
        this.render();
    }
    render(){
        const context={context:this};

        $(this.parent).html('');
        this.serviceFile.getProductData(this.id).then((result)=>{
            result.forEach(productData => {
                //const context={context:productData};
                let markup = this.returnMarkup(productData);
                if(this.id!=0 && this.id==productData.category){
                    $(this.parent).append(markup);
                }else if(this.id==0){
                    $(this.parent).append(markup);
                }
                let addToCart=function(){
                    let newVal=this.context.Utils.addToCart(productData); 
                    $(".cartItemCount").html(`(${newVal.totalQty} Items)`);
                    $(".mainHeaderQty").html(`${newVal.totalQty} Items`)
                }
                let boundFunc=addToCart.bind(context);
                $('#add_'+`${productData.id}`).on('click',boundFunc);
            });
        });
        
    }
    returnMarkup(productData){
        return ` <section class="itemSection">
        <section class="itemWrapperDiv">
        <h1>${productData.name}</h1>
        <section class="descContainner">
            <article class="productsDiv">
                    <img src="${productData.imageURL}">
            </article>
            <article class="productRightMobile">
                    <article class="productsDescription">
                    ${productData.description}
                    </article>
                    <article class="priceandBuySection">
                        <span class="mrp" >MRP Rs.${productData.price}</span>
                        <span id="add_${productData.id}"><a>Buy Now</a></span>
                    </article>
                    <article class="buyNowMobile">
                        <a href="#" >Buy Now @ MRP Rs. <span>${productData.price}</span></a>
                       
                    </article>
            </article> 
        </section>        
    </section>
    </section>
        `;
    }
}