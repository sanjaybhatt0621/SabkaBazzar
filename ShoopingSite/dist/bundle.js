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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_ShoopingCartHomePage__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_overlayCartPage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Utils__ = __webpack_require__(5);





class MainComponent
{
    constructor()
    {
        this.utils = new __WEBPACK_IMPORTED_MODULE_2__services_Utils__["a" /* default */]();
        this.render();
        //new ShoopingCartHomePage('.category-containner');
    }

    render()
    {
        let routes = 
        {
             '/':__WEBPACK_IMPORTED_MODULE_0__components_ShoopingCartHomePage__["a" /* default */],
            '/cart': __WEBPACK_IMPORTED_MODULE_1__components_overlayCartPage__["a" /* default */]
        }
        let router = () => 
        {
            const content = document.getElementsByClassName('.category-containner'); 


            
            let request = this.utils.parseRequestURL();
            let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? ':/id' : '') + (request.verb ? '/' + request.verb : '');
            let page = routes[parsedURL] ? routes[parsedURL] : Error404
            if(parsedURL == '/cart')
            {
                new page("#overlay",request);
            }
            else
            {
                new page(".category-containner",request);
            }
        }

        window.addEventListener('hashchange' , () => {router();});
        window.addEventListener('load',()=> {router();} );
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = MainComponent;

new MainComponent();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__ = __webpack_require__(2);


class ShoopingCartHomePage
{
    constructor(keyItem)
    {
       this.servicesFile = new __WEBPACK_IMPORTED_MODULE_0__services_servicesFile__["a" /* default */]();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ShoopingCartHomePage;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class serviceFile
{
        constructor()
        {
            this.categoryURL = "http://localhost:5000/categories";
            this.bannerURL = "http://localhost:3000/banners";
            this.productURL = "http://localhost:3000/products";
            this.addtoCartURL = "http://localhost:3000/addToCart";
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CartItemPage__ = __webpack_require__(4);


class overlayCartPage
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

        new __WEBPACK_IMPORTED_MODULE_0__CartItemPage__["a" /* default */]('.item-cart-containner'); //cart-item
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = overlayCartPage;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CartItemPage
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
    </section>
    

    
    `;
        $(this.parent).append(markUp);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CartItemPage;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Utils
{
    constructor()
    {

    }

    parseRequestURL()
    {
        let url = window.location.hash.slice(1).toLowerCase() || '/' ;
        let r = url.split("/");
        let request = 
        {
            resource : null,
            id : null,
            verb : null
        }

        request.resource = r[1]
        request.id = r[2]
        request.verb = r[3]

        return request;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;


/***/ })
/******/ ]);