import React from 'react';

const Card = ({item}) => {

  // console.log(item.name);
  const {name,imgUrl,price,wirter}=item;

  const handleAddToCart =(item)=>{
    console.log(item)
  }

    return (
      <div>
      <div className="card w-96 my-4 mx-auto h-[541px] bg-base-100 shadow-xl">
        <figure>
          <img src={imgUrl} alt="" className="rounded-xl" />
        </figure>
        <p className="absolute right-0 mr-4 mt-4 w-1/6 px-4 bg-slate-900 text-white">
          ${price}
        </p>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{wirter}</p>
          <div className="card-actions">
            <button
              onClick={() => handleAddToCart(item)}
              className="btn btn-outline uppercase border-0 border-b-4 mt-4"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Card;