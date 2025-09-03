"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import {
  clearCurrent,
  fetchProductById,
  updateProduct,
} from "@/store/productSlice";

export function EditProduct({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { current, status } = useAppSelector((state) => state.products);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const numericId = Number(id);

  useEffect(() => {
    if (!isNaN(numericId)) {
      dispatch(fetchProductById(numericId));
      return () => {
        dispatch(clearCurrent());
      };
    }
  }, [numericId]);

  useEffect(() => {
    if (current) {
      setTitle(current.title);
    }
  }, [current]);

  if (isNaN(numericId)) {
    return <p>Invalid product ID</p>;
  }

  if (status === "loading" || !current) return <p>Loading...</p>;

  const handleSave = async () => {
    const res = await dispatch(
      updateProduct({ id: current.id, title })
    ).unwrap();
    console.log(res);
    router.push(`/products/${current.id}`);
  };

  return (
    <div>
      <label htmlFor="title">Product Title: </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSave}>SAVE</button>
    </div>
  );
}
