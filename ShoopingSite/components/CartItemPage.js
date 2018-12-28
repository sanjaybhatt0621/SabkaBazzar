export default class CartItemPage
{
    constructor(parent)
    {
        this.parent = parent;
        this.render();
    }

    render()
    {
        let markUp = `<section class="cart-item">
        <article class="item-img">
            <img src="images/products/fruit-n-veg/apple.jpg"/>
        </article>
        <article class="item-content">
            <h1>Apple - Washington,Regular,4 pcs</h1>
            <p>
                <span class="leftCalc">  
                    <span class="cartButton">-</span>
                    <span>1</span>
                    <span class="cartButton">+</span>
                        X  <span>Rs. 187</span>
                </span>   
                <span class="rightCalc">    
                <span class="grand-total">Rs.187</span>
                </span>  
            </p>
        </article>
    </section>    `;
        $(this.parent).append(markUp);
    }
}