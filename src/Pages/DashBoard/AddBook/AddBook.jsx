import 'firebase/storage';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../Provider/AuthProvider/AuthProvider';
import { app } from '../../../../firebase.config';
import UseAxiosSource from '../../Hooks/UseAxiosSource';

const AddBook = () => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({  imageUrls: []});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [axiosSecure]= UseAxiosSource();
  const navigate = useNavigate();

  const {user}= useContext(AuthContext);

    const handleImageSubmit = () => {
      if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
  
        for (let i = 0; i < files.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
          .then((urls) => {
            setFormData({
              ...formData,
              imageUrls: formData.imageUrls.concat(urls),
            });
            setImageUploadError(false);
            setUploading(false);
          })
          .catch((err) => {
            setImageUploadError('Image upload failed (2 mb max per image)',err);
            setUploading(false);
          });
      } else {
        setImageUploadError('You can only upload 6 images per listing');
        setUploading(false);
      }
    };
  
    const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
              console.log(downloadURL);
            });
          }
        );
      });
    };
  
    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    };
  



    const onSubmit = async (data) => {
 
      try {

        if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');

        if (+data.regularPrice < +data.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
  
        // const formData = new FormData();
        // formData.append('image',data.image[0]);

        // const response = await axios.post('https://api.imgbb.com/1/upload', {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   params: {
        //     key:import.meta.env.VITE_IMAGE_UPLOAD_TOKEN, // Replace with your ImgBB API key
        //   },
        // });

        // console.log('Images uploaded:', response.data.data.image);

               const imgUrl=  formData.imageUrls;

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
                  imgUrl,
                  userRef: user._id
                  }
                  axiosSecure.post('/books',newBook)
                      .then((data)=>{
                        // console.log(data.data);
                        if(data.data.insertedId){
                          reset();
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Item added successfully",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          navigate('/')
                        }
            
                      })
                
        // Handle the response as needed, e.g., update UI with the uploaded image URL
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle errors
      }

      // console.log(images)



      // console.log(formData)
  
   
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
                  <span className='text-xs'>($ / perbook)</span>
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
                    <span className='text-xs'>($ / perbook)</span>
                </div>
              </div>
          </div>

          <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
        </div> 
      </form>
    </main>
    );
};

export default AddBook;