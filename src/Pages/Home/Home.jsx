import React from 'react';
import Card from '../Card/Card';
import Search from '../Search/Search';

const Home = () => {
    return (
        <div className='mt-20 p-10'>
            <Search></Search>
            <Card></Card>
        </div>
    );
};

export default Home;