import CartItemPage from './CartItemPage';
import Utils from '../services/Utils';

export default class CartComponent{
    constructor(parent){
        this.parent=parent;
        this.Utils  = new Utils();
        this.render();
    }
    render(){
        let markUp = `
        <div class= "cartBackground">
        <div class="overlay-content">
        <main class="cartContainer">
        <section class="cartHeader">
                <article class="cartInfo">
                    <h1 class="cartItemLabel">My Cart  &nbsp;</h1><h3 class="cartItemCount"></h3>
                </article>
                <article class="close">&times;</article>
            </section>
            <section class="cartItemContainer"></section>
        </main>
        <footer class="cartFooter">
        </footer>
        </div>
        </div>`;
        
        $(this.parent).html(markUp);
        $('.close').on('click',()=>{
            $('.cartBackground')[0].style.display ="none";
            history.back();
        });
        
        if(JSON.parse(sessionStorage.getItem("cartItems")) && JSON.parse(sessionStorage.getItem("cartItems")).length > 0){
            let bannerMarkup= 
                `<section class="discountBanner" role="banner">
                    <article class="discountLogo">
                        <img src="static/images/lowest-price.png" alt="">
                    </article>
                    <article class="discountBannerText">
                        You won't find it cheaper anywhere
                    </article>
                </section>`;
            let footerMarkup = 
                `<p>Promo code can be applied on payment page</p>
                <a class="showTotals" href="#"><span>Proceed to checkout</span>
                <span id="cartTotal"> </span></a>`;
            
            $(".cartContainer").append(bannerMarkup);
            $(".cartFooter").append(footerMarkup);
            new CartItemPage(".cartItemContainer");

        }
        else{
            let emptyMarkup=this.Utils.getEmptyCartMarkup();
            $(".cartItemContainer").replaceWith(emptyMarkup);
            let footerMarkup = this.Utils.getEmptyCartFooterMarkup();
            $(".cartFooter").html(footerMarkup);
        }
    }
}