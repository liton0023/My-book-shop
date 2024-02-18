
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Books from '../../Hooks/Books';
import UseAxiosSource from '../../Hooks/UseAxiosSource';

const UpdateBook = () => {
    const { register, handleSubmit, reset } = useForm();
    const{id}=useParams();
    // console.log(id);
    const[axiosSecure]=UseAxiosSource();
    const [book,loading,refetch] = Books();
    const navigate = useNavigate();

    const item = book.find((item)=>item._id === id)
    // console.log(item._id)
    const onSubmit =(data)=>{
        console.log(data)
        const { name, price, category, wirter } = data;

        const updateItem = {
            _id: id,
            name: name,
            price: parseFloat(price),
            category: category,
            wirter: wirter,
            imgUrl: item.imgUrl,
          };

          axiosSecure.put(`books/${item?._id}`,updateItem)
          .then((res)=>{
          console.log(res)
            if (res.data.modifiedCount > 0) {   
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Book updated successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                reset();
                navigate("/dashboard/managebook");
                refetch();   
              }
          })
    }

    return (
        <div className="w-full text-center">
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
          <div className=" my-8">
            <input
              type="submit"
              className="btn w-2/3 bg-[#D1A054]"
              value="UPDATE ITEM"
            />
          </div>
        </form>
      </div>
    );
};

export default UpdateBook;