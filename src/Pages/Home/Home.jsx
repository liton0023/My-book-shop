
import AllBooks from '../AllBooks/AllBooks';
import Slider from '../HomeSlider/Slider';

const Home = () => {
    return (
        <div className='mt-20 p-10'>
            {/* <Search></Search> */}
            <Slider></Slider>
           <AllBooks></AllBooks>
        </div>
    );
};

export default Home;