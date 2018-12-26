import ShoopingCartHomePage from '../components/ShoopingCartHomePage'

class MainComponent
{
    constructor()
    {
        this.Home = new ShoopingCartHomePage('.category');
    }
}
new MainComponent();