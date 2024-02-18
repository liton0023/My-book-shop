import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider/AuthProvider';
import useCart from '../Hooks/useCart';
const NavBar = () => {
const {user,logOut}=useContext(AuthContext);
// console.log(user)
const [cart] =useCart();


  const handleLogOut=()=>{
    logOut()
    .then(()=>{ })
    .catch(error=>console.log(error))

}
const navOptions=<> 
<li><Link to='/'>HOME</Link></li>
<li><Link to='/books'>BOOKS</Link></li>
<li><Link to='/mycart'>ORDER</Link></li>
<li>
 <Link to='/dashboard'>
 <button className="flex gap-2">
<FaShoppingCart></FaShoppingCart>
<span className="badge badge-secondary">+{cart.length}</span>
</button>
 </Link>
</li>

{
user?
<> 
<span>{user?.displayName}</span>
<button onClick={handleLogOut} className="btn text-xl btn-ghost">LOGOUT</button> </>:
<> <li><Link to='/login'>LOGIN</Link></li>
</>
}

</>
    return (
      <>
      <div className="navbar sticky w-full z-10 bg-opacity-30 max-w-screen-xl top-0 bg-black text-white">
<div className="navbar-start">
<div className="dropdown">
<label  tabIndex={0} className="btn btn-ghost lg:hidden">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
</label>
<ul tabIndex={0} className="menu bg-[#e0a853]  menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
 {navOptions}
</ul>
</div>
<a className="btn btn-ghost normal-case text-xl">BOOK SHOP</a>
</div>
<div className="navbar-center hidden lg:flex">
<ul className="menu menu-horizontal text-xl gap-10 px-1">
{navOptions}
</ul>
</div>
<div className="navbar-end">
<div className="flex-none">
     <div className="dropdown dropdown-end">
       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
         <div className="w-10 rounded-full">
           <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
         </div>
       </div>
     </div>
   </div>
</div>
</div>
  </>

    );
};

export default NavBar;