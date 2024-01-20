import { useQuery } from '@tanstack/react-query';

const Books = () => {
    const {data: book=[],isLoading: loading,refetch}=useQuery({
        queryKey:['book'],
        queryFn: async()=>{
            try {
                const res = await fetch('http://localhost:5000/books');
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