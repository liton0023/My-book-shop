import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSource from '../../Hooks/UseAxiosSource';


const AddBook = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure]= UseAxiosSource();

    const onSubmit = async (data) => {
      console.log(data)
      const formData = new FormData();
      formData.append('image', data.image[0]);
  
      try {
        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            key:import.meta.env.VITE_IMAGE_UPLOAD_TOKEN, // Replace with your ImgBB API key
          },
        });
  
        console.log('Image uploaded:', response.data);

        if(response.data.success){
                const imgUrl = response.data.data.display_url;
                console.log(imgUrl)
                const{name ,Book,category,Instoke,description,discountPrice,offer,regularPrice,stock,writer}=data;
                const newBook ={
                  name,
                  regularPrice:parseFloat(regularPrice),
                  category,
                  writer,
                  Book,Instoke,
                  description,offer,
                  discountPrice:parseFloat(discountPrice),stock,
                  imgUrl
                  }
                  axiosSecure.post('/books',newBook)
                      .then((data)=>{
                        console.log(data.data);
                        if(data.data.insertedId){
                          reset();
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Item added successfully",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }
            
                      })
                }
                
        // Handle the response as needed, e.g., update UI with the uploaded image URL
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle errors
      }
    };
    return (


      <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create A Book Listing
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            {...register("name", { required: true, maxLength: 120 })}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            {...register("description", { required: true ,maxLength: 1200})}
          />
          <input
            type='text'
            placeholder='WRITER'
            className='border p-3 rounded-lg'
            required
            {...register("writer", { required: true })}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='instock'
                className='w-5'
                {...register("Instoke", { required: true})}
              />
              <span>Stock</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                {...register("Book", { required: true })}
              />
              <span>Book</span>
            </div>
            <div className='flex gap-2'>
            <div className="form-control w-full">
           <label className="label">
              <span>Category</span>
            </label>
          <select
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              {/* TO DO */}
              <option>Funny</option>
              <option>English</option>
              <option>Science</option>
              <option>Lanaguge</option>
              <option>Country</option>
            </select>
          </div>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                {...register("offer")}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                className='p-3 border border-gray-300 rounded-lg'
                {...register("stock", { required: true })}
              />
              <p>Stocks</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                className='p-3 border border-gray-300 rounded-lg'
                {...register("regularPrice", { required: true})}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                  <span className='text-xs'>($ / month)</span>
              </div>
            </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  className='p-3 border border-gray-300 rounded-lg'
                  {...register("discountPrice", { required: true })}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                    <span className='text-xs'>($ / month)</span>
                </div>
              </div>
          </div>
          <div className="form-control w-full max-w-xs my-4">
          <label className="label">
           <span className="label-text">Product Image</span>
        </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="bg-[#D1A054] file-input file-input-bordered max-w-xs"
          />
        </div>
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg w-1/2 mx-auto uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
         
      </form>
    </main>
    );
};

export default AddBook;