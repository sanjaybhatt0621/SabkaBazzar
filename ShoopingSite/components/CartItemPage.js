import serviceFile from '../services/servicesFile'
import Utils from '../services/Utils';

export default class CartItemComponent{
    constructor(parent){
        this.parent=parent;
        this.serviceFile=new serviceFile();
        this.Utils=new Utils();
        this.render();
    }
    render(){
        let cartTotal = 0;
        let totalQty = 0;
        let items=JSON.parse(sessionStorage.getItem("cartItems"));
        if(items && items.length > 0){
            for(let i=0; i<items.length;i++){
                let productData = items[i];
                let grandTotal =productData.qty * productData.price;
                cartTotal+=parseInt(grandTotal);
                totalQty += items[i].qty;

                let markUp=
                    `<section class="cartItem" id="cartItem_${productData.id}">
                        <article class="cartItemImage">
                            <img src="${productData.imageURL}"/>
                        </article>
                        <article class="cartItemText">
                            <h1>${productData.name}</h1>
                            <p>
                                <span class="leftCalc">  
                                    <span class="cartButton" id="cartMinus_${productData.id}">-</span>
                                    <span id="itemQty_${productData.id}">${productData.qty}</span>
                                    <span class="cartButton" id="cartAdd_${productData.id}">+</span>
                                        X  <span>Rs. ${productData.price}</span>
                                </span>   
                                <span class="rightCalc">    
                                <span class="grand-total" id="grandTotal_${productData.id}">Rs. ${grandTotal}</span>
                                </span>  
                            </p>
                        </article>
                    </section>`;
                $(this.parent).append(markUp);
                $("#cartTotal").html("Rs. "+cartTotal + ">");
                let addToCart=function(){
                    let newVal = this.Utils.addToCart(productData); 
                    $("#itemQty_"+`${productData.id}`).html(newVal.qty);
                    $("#grandTotal_"+`${productData.id}`).html('Rs. '+newVal.itemCost);
                    let megaTotal = this.Utils.findTotalCost();
                    $("#cartTotal").html("Rs. "+megaTotal + ">");
                    $(".cartItemCount").html(`(${newVal.totalQty} Items)`);
                    $(".mainHeaderQty").html(`${newVal.totalQty} Items`);
                }
                let boundFuncAdd=addToCart.bind(this);
                $('#cartAdd_'+`${productData.id}`).on('click',boundFuncAdd);

                let minusFromCart=function(){
                    let newVal = this.Utils.minusFromCart(productData);
                    if(newVal.qty>0){
                        $("#itemQty_"+`${productData.id}`).html(newVal.qty);
                        $("#grandTotal_"+`${productData.id}`).html('Rs. '+newVal.itemCost);
                        let megaTotal = this.Utils.findTotalCost();
                        $("#cartTotal").html("Rs. "+megaTotal + ">");
                    } 
                    else{
                        if(newVal.last){
                            let emptyMarkup=this.Utils.getEmptyCartMarkup();
                            $(".cartItemContainer").replaceWith(emptyMarkup);
                            $(".discountBanner").replaceWith('');
                            let footerMarkup = this.Utils.getEmptyCartFooterMarkup();
                            $(".cartFooter").html(footerMarkup);
                        }else{
                            $("#cartItem_"+`${productData.id}`).html('');
                        } 
                    }
                    $(".cartItemCount").html(`(${newVal.totalQty} Items)`);
                    $(".mainHeaderQty").html(`${newVal.totalQty} Items`);
                }
                let boundFuncMinus=minusFromCart.bind(this);
                $('#cartMinus_'+`${productData.id}`).on('click',boundFuncMinus);
            }
        }
        $(".cartItemCount").html(`(${totalQty} Items)`);
        $(".mainHeaderQty").html(`${totalQty} Items`);
    }
}