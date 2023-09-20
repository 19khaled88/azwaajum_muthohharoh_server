'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../button/page'

const Statement = () => {
  const [pds, setPds] = useState([])
  const [loading, setLoading] = useState(true)
  const {push} = useRouter()
  
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products')
      const data =await res.json()
      setPds(data)
      setLoading(false)
    }
    getProducts()
  }, [])
  
  const showProduct=(data)=>{
    let array =[]
    data.map((product,index)=>(
      array.push(
        <div key={index}>
          <img src={`${product.image}`} alt='no Image' width='150px' height='150px'/>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <button className='bg-orange-600 pl-3 pr-3 pt-2 pb-2 rounded' onClick={()=>push(`/statement/${product.id}`)}>Details</button>
          <Button text='click me' onClick={()=>console.log('Button clicked')} style={"bg-red-500"}/>
        </div>
      )
    ))
    return array
  }
  if(loading){
    return <div>Loading.....</div>
  }
  return <div className='grid grid-cols-5 pl-5 pr-5 pt-5 gap-4'>
    {showProduct(pds)}
  </div>
}

export default Statement
