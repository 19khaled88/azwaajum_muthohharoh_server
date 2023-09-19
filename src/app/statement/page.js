'use client'
import {useRouter} from 'next/navigation'
import { useEffect } from 'react';
const Statement = async () => {
  const {push} = useRouter()
  const response = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 5 },
  });
  const data = await response.json();

  const handleSingle = (id) => {
    push(`/statement/${id}`)
  };

  const showData = (data) => {
    let array = [];
    data.forEach((element, index) => {
      array.push(
        <div key={index}>
          <p>{element.category}</p>
          <p>{element.description}</p>
          <img
            src={`${element.image}`}
            alt="No Image"
            width="100px"
            height="100px"
          />
          <p>{element.price}</p>
          <button onClick={()=>handleSingle(element.id)}>Go to product</button>
        </div>
      );
    });
    return array;
  };

  return (
    <div className=" pl-5 pr-5 pt-5">
      <div className="grid grid-cols-6">{showData(data)}</div>
    </div>
  );
};

export default Statement;
