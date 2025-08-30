"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/productSlice";
import Link from "next/link";
import Image from "next/image";
import noImg from "@/public/no-image.png";

export function Products() {
  const dispatch = useAppDispatch();
  const { list, error, status } = useAppSelector((state) => state.products);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [list]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container flex items-center justify-center">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-14">
        {list.map((p, index) => (
          <li
            key={p.id}
            // ref={(el) => (itemsRef.current[index] = el)}
            ref={(el: HTMLLIElement | null) => {
              itemsRef.current[index] = el;
            }}
            className="item flex flex-col items-center justify-center gap-2 shadow-lg p-2 rounded-2xl opacity-0 translate-x-10 transition-all duration-300 hover:scale-105"
            style={{
              transitionDelay: `${index * 30}ms`,
            }}
          >
            <Link href={`/products/${p.id}`}>
              <Image
                src={p.image}
                alt={p.title}
                width={300}
                height={300}
                priority
                placeholder="blur"
                blurDataURL={noImg.blurDataURL}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "300px",
                }}
              />
              <div className="italic text-xl mt-2 text-center">{p.title}</div>
              <div className="font-bold text-center text-red-600">
                {p.price} $
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
