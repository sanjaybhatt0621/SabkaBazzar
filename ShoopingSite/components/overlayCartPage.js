import CartItemPage from './CartItemPage';

export default class overlayCartPage
{
    constructor(parent)
    {
        this.parent = parent;
        this.render();        
    }

    render()
    {
        let markUp
        =
        `<div class= "cartBackground">
            <div class="overlay-content">
                <span class="close">&times;</span>

                <main class="cart-wrapper">
                    <section class="count">
                        <h1>My Cart  &nbsp;</h1><span>(1 item)</span>
                    </section>
                    <section class="item-cart-containner">

                        
                    </section>
                    <section class="bottom-logo">
                        <article class="discount-logo">
                            <img src="static/images/lowest-price.png"/>
                        </article>
                        <span>
                            You won't find cheaper it anywhere
                        </span>
                    </section>
                 </main>   
                
                
                    <footer class="footerCart">
                    
                    <p>Promo code can be applied on payment page</p>
                        <a href="#"><span>Proceed to checkout</span><span>Rs. 187   ></span></a>
                    </footer>
                
            </div>
         </div>`;

        $(this.parent).html(markUp);

        $('.close').on('click' , () => 
        {
            $('.cartBackground')[0].style.display = "none";
            history.back();
        });

        new CartItemPage('.item-cart-containner'); //cart-item
    }
}
