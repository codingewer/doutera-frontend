import React, { useEffect } from 'react'
import"./productson.css"
import AdminSideBar from './AdminSideBar'
import './dealershiprequests.css'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProductsAsync, GetAllProducts } from '../Api/Products/ProductSlice';
import { Link } from 'react-router-dom';

function ProductsOn() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch (GetAllProducts())
  },[dispatch])
  const handleDelete  =   (id) => {
     dispatch(DeleteProductsAsync(id))
  }
  return (
    <div className='products-on'>
      <AdminSideBar/>
      <span className="requests-titles">Products</span>
    {
      products.map((product, i) => (
        <div key={i +1} className="product-on-card">
        <span className='product-on-index' >{i +1}</span>
        <span className='product-on-name'>{product.name}</span>
        <div className="product-on-btns">
          <Link  className='product-on-btn'
           to={`/admin-panel/update-product/${product.ID}`}
            style={{color:"blue"}} >Update</Link>
          <button className='product-on-btn'
           type='button' onClick={()=>handleDelete(product.ID)}
            style={{color:"red"}} >Delete</button>
        </div>
      </div>
      ))
    }
    </div>
  )
}

export default ProductsOn