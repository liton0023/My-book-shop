import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSource from '../../Hooks/UseAxiosSource';

// const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
const AddBook = () => {
    // console.log(img_hosting_token)
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure]=UseAxiosSource();
    // const img_hostion_url=`https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`

    const onSubmit =async (data) => {
      console.log(data);

      const formData = new FormData();
      formData.append('image',data.image[0]);
      const res = await fetch("http://localhost:5000/uploads", {
        method: "POST",
        body: formData,
      }).then((res) => res.json())
      .then((resImg)=>{
        if(resImg.success){
          const imageUrl= resImg.product.imageUrl;
          const{name ,price,category,wirter}=data;
          const newBook ={
            name,
            price:parseFloat(price),
            category,
            wirter,
            imageUrl
          };

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

          // console.log(newBook);
        }
      })

      };
    return (
        <div>
             <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-8">
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Racipe Name*</span>
          </label>
          <input
            {...register("name", { required: true, maxLength: 120 })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div className=" flex mb-8">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Category*</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option>Funny</option>
              <option>English</option>
              <option>Science</option>
              <option>Lanaguge</option>
              <option>Country</option>
            </select>
          </div>
          <div className="form-control w-full mx-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Racipe Deteails*</span>
          </label>
          <textarea
            {...register("wirter", { required: true })}
            className="textarea textarea-bordered h-48"
            placeholder="Bio"
          ></textarea>
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
        <input
          className="btn btn-sm bg-[#D1A054]"
          type="submit"
          value="Add Book"
        />
      </form>
    </div>
        </div>
    );
};

export default AddBook;