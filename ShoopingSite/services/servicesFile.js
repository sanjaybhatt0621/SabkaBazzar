export default class serviceFile
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