'use client';

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { createProduct } from "@/store/productSlice";

export  function NewProductForm() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

     const res = await dispatch(createProduct({...product, price: parseFloat(product.price)})).unwrap()
      router.push('/products')
    }
  

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value;
      setProduct({ ...product, [e.target.name]: e.target.value.trim() });
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label >Product Title: </label>
        <input
          name="title"
          type="text"
          value={product.title}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Product Price: </label>
        <input
          name="price"
          type="text"
          value={product.price}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label >Product Description: </label>
        <input
          name="description"
          type="text"
          value={product.description}
          onChange={changeHandler}
        />
      </div>
      <div> 
        <label >Product Category: </label>
        <input
          name="category"
          type="text"
          value={product.category}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Product Image: </label>
        <input
          name="image"
          type="text"
          value={product.image}
          onChange={changeHandler}
        />
      </div>
      <button>CREATE</button>
    </form>
  );
}
