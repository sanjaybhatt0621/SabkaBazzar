/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class serviceFile
{
        constructor()
        {
            this.categoryURL = "http://localhost:5000/categories";
            this.bannerURL = "http://localhost:5000/banners";
            this.productURL = "http://localhost:5000/products";
            this.addtoCartURL = "http://localhost:5000/addToCart";
        }

        async getCategoryData()
        {
            try
            {
                const res = await fetch(this.categoryURL);
                return res.json();
            }
            catch(err)
            {
                console.log(err);
            }
        }

        async getBannerData()
        {
            try
            {
                const res = await fetch(this.bannerURL);
                return res.json();
            }
            catch(err)
            {
                console.log(err);
            }
        }

        async getProductData()
        {
            try
            {
                const res = await fetch(this.productURL);
                return res.json();
            }
            catch(err)
            {
                console.log(err);
            }
        }

        async getCartData()
        {
            try
            {
                const res = await fetch(this.addtoCartURL);
                return res.json();
            }
            catch(err)
            {
                console.log(err);
            }
        }

        
}
/* harmony export (immutable) */ __webpack_exports__["a"] = serviceFile;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class  Utils{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_overlayCartPage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_HomePage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ProductPage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_loginPage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_registerPage__ = __webpack_require__(13);
//import ShoopingCartHomePage from './components/ShoopingCartHomePage';







class MainComponent
{
    constructor()
    {
        this.utils = new __WEBPACK_IMPORTED_MODULE_1__services_Utils__["a" /* default */]();
        this.render();
        //new ShoopingCartHomePage('.category-containner');
    }

    render()
    {
        let routes = 
        {
            '/':__WEBPACK_IMPORTED_MODULE_2__components_HomePage__["a" /* default */],
            '/cart': __WEBPACK_IMPORTED_MODULE_0__components_overlayCartPage__["a" /* default */],
            '/products/:id':__WEBPACK_IMPORTED_MODULE_3__components_ProductPage__["a" /* default */],
            '/login': __WEBPACK_IMPORTED_MODULE_4__components_loginPage__["a" /* default */],
            '/register' : __WEBPACK_IMPORTED_MODULE_5__components_registerPage__["a" /* default */]
        }
        let router = () => 
        {
            const content = document.getElementsByClassName('.mainHome'); 


            
            let request = this.utils.parseRequestURL();
            let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
            let page = routes[parsedURL] ? routes[parsedURL] : Error404
            if(parsedURL == '/cart')
            {
                new page("#overlay",request);
            }
            else
            {
                new page(".mainHome",request);
            }
        }

        window.addEventListener('hashchange' , () => {router();});
        window.addEventListener('load',()=> {router();} );
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = MainComponent;

new MainComponent();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CartItemPage__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Utils__ = __webpack_require__(1);



class CartComponent{
    constructor(parent){
        this.parent=parent;
        this.Utils  = new __WEBPACK_IMPORTED_MODULE_1__services_Utils__["a" /* default */]();
        this.render();
    }
    render(){
        let markUp = `
        <div class= "cartBackground">
        <div class="overlay-content">
        <main class="cartContainer">
        <section class="cartHeader">
                <article class="cartInfo">
                    <span class="cartItemLabel">My Cart  &nbsp;</span><h3 class="cartItemCount"></h3>
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
                        <img src="static/images/lowest-price.png" alt="discountLogoImage">
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
            new __WEBPACK_IMPORTED_MODULE_0__CartItemPage__["a" /* default */](".cartItemContainer");

        }
        else{
            let emptyMarkup=this.Utils.getEmptyCartMarkup();
            $(".cartItemContainer").replaceWith(emptyMarkup);
            let footerMarkup = this.Utils.getEmptyCartFooterMarkup();
            $(".cartFooter").html(footerMarkup);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CartComponent;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Utils__ = __webpack_require__(1);



class CartItemComponent{
    constructor(parent){
        this.parent=parent;
        this.serviceFile=new __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__["a" /* default */]();
        this.Utils=new __WEBPACK_IMPORTED_MODULE_1__services_Utils__["a" /* default */]();
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
                            <img src="${productData.imageURL}" alt=""/>
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
/* harmony export (immutable) */ __webpack_exports__["a"] = CartItemComponent;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SliderPage__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BannerComponent__ = __webpack_require__(8);




class HomePage
{
    constructor(parent,request)
    {
        this.parent = parent;
        this.request = request;
        this.render();
    }
   
     render()
        {
            let markUp = `<section class="slider"></section><section class="category-containner"></section>`;
            $(this.parent).html(markUp);
            this.carousel = new __WEBPACK_IMPORTED_MODULE_0__SliderPage__["a" /* default */](".slider");
            this.banner = new __WEBPACK_IMPORTED_MODULE_1__BannerComponent__["a" /* default */](".category-containner");
        }
    }
/* harmony export (immutable) */ __webpack_exports__["a"] = HomePage;
    

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ImageSliderPage__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_servicesFile__ = __webpack_require__(0);



var self;

class SliderPage{
    constructor(parent){
        this.parent=parent;
        this.slideIndex=1;
        this.servicesFile = new __WEBPACK_IMPORTED_MODULE_1__services_servicesFile__["a" /* default */]();
        this.render();
        self=this;
    }
    render(){
        this.servicesFile.getBannerData().then((result)=>{
        let markUp=`<div class="slideshow-container">
        
        <div id="carouselImage"></div>
       
            <a class="prev" id="prevButton">PREV</a>
            <a class="next" id="nextButton">NEXT</a>
            
            
        </div>
        <div class ="carouselDots">
            
        </div>
        `;
        $(this.parent).append(markUp);
        let c=1
        result.forEach(carouselImage => {

            new __WEBPACK_IMPORTED_MODULE_0__ImageSliderPage__["a" /* default */]('#carouselImage', carouselImage);

            let dotMarkup=`<span class="dot" id="dot_${c}"></span>`;
            $('.carouselDots').append(dotMarkup);
            $('#dot_'+`${c}`).on('click',{"counter":c},self.currentSlide);
            c++;

        });
        this.showSlides(1);
        $('#prevButton').on('click',{"counter":-1},self.plusSlides);
        $('#nextButton').on('click',{"counter":1},self.plusSlides);
        
    });
    }

    // Next/previous controls
    
    plusSlides(n) {
        self.showSlides(self.slideIndex += n.data.counter);
        }
    // Thumbnail image controls
    currentSlide(n) {
        self.showSlides(self.slideIndex = n.data.counter);
    }

    showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {self.slideIndex = 1} 
        if (n < 1) {self.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[self.slideIndex-1].style.display = "block"; 
        dots[self.slideIndex-1].className += " active";
    }   
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SliderPage;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ImageSliderPage{
    constructor(parent,carouselSuggestion){
        this.imgUrl=carouselSuggestion.bannerImageUrl;
        this.imgAlt = carouselSuggestion.bannerImageAlt;
        this.parent=parent;
        this.render();
    }
    render(){
        let markup=`
        <div class="mySlides fade">
          
          
            <img src=${this.imgUrl} alt=${this.imgAlt} style="width:100%">
          
          
        </div>`;
        
        $(this.parent).append(markup);
        
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageSliderPage;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__ = __webpack_require__(0);


class BannerComponent{
    constructor(parent){
        this.ServicesFile=new __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__["a" /* default */];
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
/* harmony export (immutable) */ __webpack_exports__["a"] = BannerComponent;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__categoriesComponent__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProductComponent__ = __webpack_require__(11);



class ProductPage{
    constructor(parent,request){
        this.parent =parent;
        this.request = request;
        this.id= (this.request && this.request.id)?this.request.id : 0;
        this.render();
    }
    
    render(){
        let markUp=`<main class="mainProducts">
        <input type="checkbox" id="filterDown"  style="display:none;">
                <aside class="leftSection">
                <section id = "productList"class="productMenu">
                        <select class="productChoices">
                            
                        </select>
                    </section>
                    <ul class="list-category">
                    </ul>
                </aside>
                <section class="rightSection"></section>
        </main>`;
        $(this.parent).html(markUp);
        new  __WEBPACK_IMPORTED_MODULE_0__categoriesComponent__["a" /* default */](".leftSection ul");
        new __WEBPACK_IMPORTED_MODULE_1__ProductComponent__["a" /* default */](".rightSection",this.id);
        $('#productList').on('change',this.changeURL); 

        
    }
    changeURL(){
        let hashValue=$('#productList :selected').val();
        sessionStorage.selectedText=$('#productList :selected').text();
        window.location.href=hashValue;
        }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProductPage;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__ = __webpack_require__(0);


class CategoriesComponent{
    constructor(parent){
        this.parent=parent;
        this.serviceFile=new __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__["a" /* default */];
        this.render();
    }
    render(){
                var count =0;
                $(".productChoices").html(`<option value=""></option>`);
                $('#productList :selected').text(sessionStorage.selectedText); 

        this.serviceFile.getCategoryData().then((result)=>{
            result.forEach(categoryData => {
                count++;
                let flag=`${categoryData.enabled}`;
                if(flag=="true"){
                    let markup =
                    `
                    
                    
                    <li>
                        <a href = "#/products/${categoryData.id}">${categoryData.name}</a>
                    </li>
                    
                     `;
                     let optionMarkup =`<option class="categoryOptions" value ="#/products/${categoryData.id}">${categoryData.name}</option>`


                    $(this.parent).append(markup);
                    $(".productChoices").append(optionMarkup);
                }
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CategoriesComponent;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Utils__ = __webpack_require__(1);



class ProductComponent{
    constructor(parent,id){
        this.parent=parent;
        this.id = id;
        this.serviceFile=new __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__["a" /* default */];
        this.Utils = new __WEBPACK_IMPORTED_MODULE_1__services_Utils__["a" /* default */]();
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
                    <img src="${productData.imageURL}" alt="${productData.name}">
            </article>
            <article class="productRightMobile" id="add_${productData.id}">
                    <article class="productsDescription">
                    ${productData.description}
                    </article>
                    <article class="priceandBuySection">
                        <span class="mrp" >MRP Rs.${productData.price}</span>
                        <span ><a>Buy Now</a></span>
                    </article>
                    <article class="buyNowMobile" >
                        <a >Buy Now @ MRP Rs. <span>${productData.price}</span></a>
                       
                    </article>
            </article> 
        </section>        
    </section>
    </section>
        `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProductComponent;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class loginPage
{
    constructor(parent,request)
    {
        this.parent = parent;
        this.request = request;
        this.render();
    }

    render()
    {
        let markUp =
        `<main class="loginMain">

        <section class="leftLogin">
                <h1>Login</h1>
                <p>Get access to your Orders, Whislist and Recommendations</p>
        </section>
        
        <section class="rightLogin">
                <form action="/#" >
                    <article class="textfield">
                        <input type="email" class="inputText" id="username" required/>
                        <label for="username" class="floating-label">Email</label>
                        <div class="requirements">Must be a valid email address.</div>
                    </article>

                    <article class="textfield">
                        <input type="password" class="inputText" id="password" pattern="pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$"" required/>
                        <label for="password" class="floating-label" >Password</label>
                        <div class="requirements">Your password must be at least 6 characters as well as contain at least one character and one number.</div>
                    </article>

                   <article>
                       <input type="submit" value="Login" class="submit-button"/>
                   </article>


                </form>
        </section>
    
    </main>`;
    $(this.parent).html(markUp);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = loginPage;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class registerPage
{
    constructor(parent, request)
    {
        this.parent = parent;
        this.request = request;
        this.render();
    }

    render()
    {
        let markUp =
        `<main class="loginMain">
    
        <section class="leftLogin">
                <h1>Signup</h1>
                <p>We do not share your personal details with anyone.</p>
        </section>
        
        <section class="rightLogin">
                <form action="">
                    <article class="textfield">
                        <input type="text" id="firstName" class="inputText" required/>
                        <label for="firstName" class="floating-label">First Name</label>
                    </article>

                    <article class="textfield">
                        <input type="text" id="lastName" class="inputText" required/>
                        <label  for="lastName"  class="floating-label">Last Name</label>
                    </article>
                    
                    <article class="textfield">
                        <input type="text" id="email" class="inputText" required/>
                        <label  for="email" class="floating-label">Email</label>
                    </article>

                    <article class="textfield">
                        <input type="text"  id="password" class="inputText" required/>
                        <label for="password"  class="floating-label">Password</label>
                    </article>

                    <article class="textfield">
                        <input type="text" id="confirmPassword" class="inputText" required/>
                        <label for="confirmPassword"  class="floating-label">Confirm Password</label>
                    </article>

                   <article>
                       <a href="">Signup</a>
                   </article>


                </form>
        </section>
    
    </main>`;
        $(this.parent).html(markUp);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = registerPage;


/***/ })
/******/ ]);