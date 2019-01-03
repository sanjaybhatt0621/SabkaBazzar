export default class  Utils{
    constructor(){
        
    }
    parseRequestURL(){

        let url = window.location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request;
    }
    addToCart(productData){
        let items=JSON.parse(sessionStorage.getItem("cartItems"));
        let item={};
        let qty=0;
        let itemCost = 0;
        let totalQty = 0;
        if(!items){
            items=[];
        }
        let found=false;
        for(let i=0;i<items.length;i++){
            if(items[i].id == productData.id){
                items[i].qty+=1;
                qty=items[i].qty;
                itemCost = qty * items[i].price;
                found =  true;
            }
            totalQty+=items[i].qty;
        }
        if(!found){
            item=productData;
            item.qty=1;
            itemCost = item.price;
            qty=1;
            totalQty+=1;
            items.push(item);
        }
        sessionStorage.setItem("cartItems",JSON.stringify(items));
        console.log('Adding : '+ productData.id +'and '+productData.category);
        return {'qty' : qty,
                'itemCost' : itemCost,
                'totalQty' : totalQty};
    }
    minusFromCart(productData){
        let items=JSON.parse(sessionStorage.getItem("cartItems"));
        let qty=0;
        let itemCost = 0;
        let last=false;
        let totalQty=0;

        if(!items){
            items=[];
        }
       
        for(let i=0;i<items.length;i++){
            totalQty +=items[i].qty;
            if(items[i].id == productData.id){
                items[i].qty-=1;
                totalQty -=1;
                
                qty=items[i].qty;
                if(items[i].qty == 0){
                    items.splice(i,1);
                    if(items.length == 0){
                        last=true;
                    }
                    itemCost=0;
                }else{
                    itemCost = qty * items[i].price;
                }
            }  
        }
        sessionStorage.setItem("cartItems",JSON.stringify(items));
        console.log('Adding : '+ productData.id +'and '+productData.category);
        return {'qty' : qty,
                'itemCost' : itemCost,
                'totalQty' : totalQty,
                'last' : last};
    }
    getEmptyCartMarkup(){
        let emptyMarkup=`
                <section class="cartEmpty">
                <p>No items in your cart</p>
                <p>Your favourite items are just a click away.
                </section>`;
        return emptyMarkup;
    }
    getEmptyCartFooterMarkup(){
        let footerMarkup = `<a class = "startShopping" href="#"><span>Start Shopping</span></a>`;
        return footerMarkup;
    }
    findTotalCost(){
        let items=JSON.parse(sessionStorage.getItem("cartItems"));
        let totalCost = 0;
        if(items){
            for(let i=0;i<items.length;i++){
                totalCost+=(items[i].qty* items[i].price);
            } 
        }
        return totalCost;
    }
}
