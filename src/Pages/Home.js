import Slider from '../Components/Communs/Carousel';
import Infos from '../Components/Home/Infos';
import Categories from '../Components/Categories/Categories';
import RecentsProducts from '../Components/Produits/ProduitsRecents';
import Foots from '../Components/Communs/Foots';

export default function Home(){
    return(
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 100px)', overflowY: 'scroll'}}>
                    <Slider/>
                    <Categories />
                    <RecentsProducts />
                    <Infos />
                    <Foots />
                </div>
            </div>
        </>
    )
}