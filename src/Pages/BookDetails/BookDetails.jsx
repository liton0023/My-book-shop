import { useContext, useEffect, useState } from "react";
import { FaBook, FaBookOpen, FaShare } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import useCart from "../Hooks/useCart";

const BookDetails = () => {

    SwiperCore.use([Navigation]);
    const[bookDetails,setBookDetails]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(false);
    const [copied, setCopied] = useState(false);

    const navigate =useNavigate();
    const location = useLocation();

    const {user}=useContext(AuthContext);
    const[,refetch] = useCart();

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
            // console.log(data);
            setBookDetails(data);
            setLoading(false);
            setError(false);


            }catch(err){
                setError(err)
                setLoading(false)
            }
        }
        fetchBook();
    },[params.id]);

    // console.log(bookDetails.imgUrl)
    // bookDetails.imgUrl.map((url)=>{
    //   console.log(url)
    // })


    const handleAddToCart =(item)=>{
        const {_id,name ,Book,category,Instoke,description,discountPrice,offer,regularPrice,stock,writer,imgUrl}=item;
        console.log(item)
        if(user && user.email){
          const orderItem ={menuItemId : _id,name:name,Book,category,Instoke,description,discountPrice,offer,regularPrice,stock,writer, email: user.email,imgUrl}
          fetch('http://localhost:5000/carts',{
            method: 'POST',
            headers:{
              "content-type":"application/json"
            },
            body: JSON.stringify(orderItem)
          })
          .then((res)=> res.json())
          .then((data)=>{
            // console.log(data);
            if(data.insertedId){
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Book Added Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
    
            }
          })
        }
        else {
          Swal.fire({
            title: "Pleace Login?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Log In",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login", { state: { from: location } });
            }
          });
        }
      }


    return (
        <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && (
          <p className='text-center my-7 text-2xl'>Something went wrong!</p>
        )}
        {bookDetails && !loading && !error && (
          <div>
            <Swiper  spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}>
              {bookDetails?.imgUrl.length >0 &&
               bookDetails?.imgUrl.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className='h-[550px]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
              <FaShare
                className='text-slate-500'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                Link copied!
              </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
              <p className='text-2xl font-semibold'>
                {bookDetails.name} - ${' '}
                {bookDetails.offer
                  ?bookDetails.discountPrice.toLocaleString('en-US')
                  :bookDetails.regularPrice.toLocaleString('en-US')}
                {/* {bookDetails.type === 'rent' && ' / month'} */}
              </p>
              <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                <FaBookOpen className='text-green-700' />
                {bookDetails.writer}
              </p>
              <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
               Regular Price : ${bookDetails.regularPrice}
                </p>
                {bookDetails.offer && (
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  Discount : ${+bookDetails.regularPrice - +bookDetails.discountPrice} OFF
                  </p>
                )}
              </div>
              <p className='text-slate-800'>
                <span className='font-semibold text-black'>Description - </span>
                {bookDetails.description}
              </p>
              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBook className='text-lg' />
                  {bookDetails.stock > 1
                    ? `${bookDetails.stock} Books Stock `
                    : `${bookDetails.stock} stock `}
                </li>
                {/* <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBath className='text-lg' />
                  {bookDetails.book > 1
                    ? `${bookDetails.book} books `
                    : `${bookDetails.book} book `}
                </li> */}
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBook className='text-lg' />
                  {bookDetails.stock ? 'InStock' : 'No Stock'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBookOpen className='text-lg' />
                  {bookDetails.category}
                </li>
              </ul>
              <div className="card-actions">
          <button
              onClick={() => handleAddToCart(bookDetails)}
              className="btn btn-outline uppercase border-0 border-b-4 mt-4"
            >
              ADD TO CART
            </button>
          </div>
       <form action="">
       <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
     <div>
     <button
              // onClick={() => handleAddToCart(bookDetails)}
              className="btn btn-outline uppercase border-0 border-b-4 mt-4"
            >
              Comment
            </button>
     </div>
       </form>
          <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">
    Delivered
  </div>
</div>

            </div>
          </div>
        )}
      </main>
    );
};

export default BookDetails;