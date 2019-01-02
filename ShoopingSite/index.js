//import ShoopingCartHomePage from './components/ShoopingCartHomePage';
import overlayCartPage from './components/overlayCartPage';
import Utils from './services/Utils';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage'


export default class MainComponent
{
    constructor()
    {
        this.utils = new Utils();
        this.render();
        //new ShoopingCartHomePage('.category-containner');
    }

    render()
    {
        let routes = 
        {
            '/':HomePage,
            '/cart': overlayCartPage,
            '/products/:id':ProductPage

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
new MainComponent();