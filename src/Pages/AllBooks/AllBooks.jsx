
import Card from '../Card/Card';
import Books from '../Hooks/Books';
const AllBooks = () => {
    const [book,]=Books();

    // console.log(book)
    return (
        <div className='grid md:grid-cols-3 mt-40 gap-8'>
      {
        book.map((item)=><Card key={item._id} item={item}></Card>)
      }
        </div>
    );
};

export default AllBooks;