import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import Comment from "../Comment/Comment";
import useCart from "../Hooks/useCart";

const BookDetails = () => {

    SwiperCore.use([Navigation]);
    const[bookDetails,setBookDetails]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(false);
    const [copied, setCopied] = useState(false);
    const[comments,setComments] = useState(null);
    const[currentUser,setCurrentUser] = useState(null);

    const navigate =useNavigate();
    const location = useLocation();
    const {user}=useContext(AuthContext);
    const[,refetch] = useCart();
    const params = useParams();

    const { register, handleSubmit, reset } = useForm();

    // get all users 

    useEffect(()=>{
      try{
        setLoading(true)
        fetch('https://books-server-2.onrender.com/users')
        .then((res)=> res.json())
        .then((data)=> {
         const userData= data;
         userData.forEach((users)=>{
          // console.log(user);
    
          if(user?.email === users?.email){
            setCurrentUser(users);
            setLoading(false);
          }  
         })
        })
      }
      catch(err){
        console.log(err)
      }
    },[])
 



   

    useEffect(()=>{
        const fetchBook=async()=>{
            try{
            setLoading(true);
            const res = await fetch(`https://books-server-2.onrender.com/books/${params.id}`)
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

    const onSubmit =(data)=>{
      console.log(data)
      // const{_id}=bookDetails;
      if(user && user.email){
        const comment = {bookId:params.id,userId:currentUser?._id,userName:currentUser?.name,photoURL:currentUser?.photoURL,comment:data?.comment};

        try {
          setLoading(true)
          axios.post('https://books-server-2.onrender.com/comment', comment)
            .then((response) => {
              console.log(response.data);
              if (response.data.insertedId) {
                alert('Comment Added Successfully');
              }
              setLoading(false)
              reset();
            })
            .catch((error) => {
              console.error('Error adding comment:', error);
            });
        } catch (error) {
          console.error('Error:', error);
        }

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

    // get comment

    useEffect(()=>{
      fetch('https://books-server-2.onrender.com/comment')
      .then((res)=> {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data)=>{
        // console.log(data)
        setComments(data);
       
      })
    },[])

    // console.log(comments)
const [bookcomment,setBookComment]= useState();

    useEffect(() => {
      if (Array.isArray(comments)) {
          const filteredComments = comments.filter(comment => comment.comment.bookId === bookDetails?._id);
          setBookComment(filteredComments);
      }
      
  }, [comments, params._id]);

  if (!Array.isArray(comments) || comments.length === 0) {
      return <div>No comments found for this book.</div>;
  }

// console.log(bookcomment)

    const handleAddToCart =(item)=>{
        const {_id,name ,Book,category,Instoke,description,discountPrice,offer,regularPrice,stock,writer,imgUrl}=item;
        // console.log(item)
        if(user && user.email){
       console.log(quentity)
          const orderItem ={menuItemId : _id,name:name,Book,category,Instoke,description,discountPrice,offer,regularPrice,stock,writer, email: user.email,imgUrl}
          console.log(orderItem)
          fetch('https://books-server-2.onrender.com/carts',{
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
          <form onSubmit={handleSubmit(onSubmit)}>
       <input
            type='text'
            placeholder='Add Your Comment'
            className='border p-3 rounded-lg'
            id='name'
            {...register("comment", { required: true})}
          />
     <div>
     <button className="btn btn-outline uppercase border-0 border-b-4 mt-4"
            >
          comment
            </button>
     </div>
       </form>
       { 
      bookcomment?.map((comment)=><Comment key={comment._id} comment={comment}></Comment>)
    }
            </div>

      </div>
        )}
 
      </main>
    );
};

export default BookDetails;