'use client';

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCurrent, deleteProduct, fetchProductById } from "@/store/productSlice";
import Image from "next/image";
import noImg from "@/public/no-image.png";
import { useRouter } from "next/navigation";

export function ProductDetail({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const { current, status, error } = useAppSelector(state => state.products);
    const router = useRouter()
    useEffect(() => {
        dispatch(fetchProductById(Number(id)));

        return () => {dispatch(clearCurrent())};

    }, [id, dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
    if (status === 'successed' && !current) return <p>No Result</p>
    if(!current) return
 
    const handleDelete = async () => {
      if (current?.id) {
        try {
          await dispatch(deleteProduct(current.id)).unwrap();
          router.push("/products");
        } catch (err) {
              console.error("Failed to delete product:", err);
        }
      }
    };

    
  return (
    <div className=" flex flex-col gap-4 justify-center items-center">
      <Image
        src={current && current.image ? current.image : noImg}
        alt={current.title}
        width={300}
        height={300}
        priority={false}
        placeholder={"blur"}
        blurDataURL={noImg.blurDataURL}
        quality={100}
      />
      <p className="italic text-xl mt-2 text-center">{current.title}</p>
      <p className="font-bold text-center text-red-600">{current.price} $</p>
      <button className=" w-44 h-12 rounded-2xl text-blue-400 border-solid border-2 border-blue-400 text-3xl cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-300" onClick={() => router.push(`${id}/edit`)}>edit</button>
      <button className=" w-44 h-12 rounded-2xl text-white text-3xl  bg-blue-400 cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-300" onClick={handleDelete}>delete</button>
    </div>
  );
}
