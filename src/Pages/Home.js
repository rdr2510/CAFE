import Slider from '../Components/Communs/Carousel';
import Infos from '../Components/Home/Infos';
import Categories from '../Components/Categories/Categories';
import Foots from '../Components/Communs/Foots';
import Promotions from '../Components/Home/Promotions';

export default function Home(){
    return(
        <>
            <div style={{height: '100%'}}>
                <div style={{height: 'calc(100vh - 100px)', overflowY: 'scroll'}}>
                    <Slider/>
                    <Promotions />
                    <Categories />
                    <Infos />
                    <Foots />
                </div>
            </div>
        </>
    )
}