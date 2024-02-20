
import AllBooks from '../AllBooks/AllBooks';
import Search from '../Search/Search';

const Home = () => {
    return (
        <div className='mt-20 p-10'>
            <Search></Search>
           <AllBooks></AllBooks>
        </div>
    );
};

export default Home;