import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BookDetails = () => {

    SwiperCore.use([Navigation]);
    const[bookDetails,setBookDetails]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);

    const params = useParams();

    useEffect(()=>{
        const fetchBook=async()=>{
            try{

            setLoading(true);
            const res = await fetch(`http://localhost:5000/books/${params.id}`)
            const data = await res.json();
            if (data.success === false) {
                setError(true);
                setLoading(false);
                return;
              }

            //   console.log(data);

            setBookDetails(data);
            setLoading(false);
            setError(false);


            }catch(err){
                setError(err)
                setLoading(false)
            }
        }
        fetchBook();
    },[params.id])


    return (
       <main>
        {loading && <p className="text-center my-7 text-2xl">Loading....</p> }
        {error &&(
         <p className="text-ceter my-7 text-2xl">Something went wrong!!</p>
        )}
{bookDetails && !loading && !error && (
    <div>
            <Swiper navigation >
                {bookDetails.imgUrl.map((url)=>(
                    <SwiperSlide key={url}>
                        <div
                        className="h-[550px]"
                        style={{
                            background:`url(${url}) center no-repeat`,
                            backgroundSize:' cover',
                        }}
                        >
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
)}
        
       </main>
    );
};

export default BookDetails;