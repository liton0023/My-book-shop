import { useQuery } from '@tanstack/react-query';

const Books = () => {
    const {data: book=[],isLoading: loading,refetch}=useQuery({
        queryKey:['book'],
        queryFn: async()=>{
            try {
                const res = await fetch('https://books-server-2.onrender.com/books');
                return res.json()
            } catch (error) {
                console.error('Error fetching books:', error);
                throw error;
            }
        },
    })
    // console.log(book)
    return [book,loading,refetch]
};

export default Books;