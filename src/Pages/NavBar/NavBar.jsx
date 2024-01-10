import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
const NavBar = () => {
const {user,logOut}=useContext(AuthContext);



  const handleLogOut=()=>{
    logOut()
    .then(()=>{ })
    .catch(error=>console.log(error))

}
const navOptions=<> 
<li><Link to='/'>HOME</Link></li>
<li><Link to='/menu'>MENU</Link></li>
<li><Link to='/order'>ORDER</Link></li>
<li>
 <Link to='/dashboard'>
 <button className="flex gap-2">
<FaShoppingCart></FaShoppingCart>
<span className="badge badge-secondary">0</span>
</button>
 </Link>
</li>

{
user?
<> 
<span>{user?.displayName}</span>
<button onClick={handleLogOut} className="btn btn-ghost">LOGOUT</button> </>:
<> <li><Link to='/login'>LOGIN</Link></li>
</>
}

</>
    return (
        <>
            <div className=" navbar fixed z-10 bg-opacity-30 max-w-screen-xl top-0 bg-black text-white">
  <div className="flex-1">
    <a className="btn btn-ghost text-3xl">BOOK SHOP</a>
    <ul className=' flex justify-center items-center mx-auto gap-20'>
      {navOptions}
    </ul>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default NavBar;