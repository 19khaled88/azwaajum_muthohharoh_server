const Single = async ({ params }) => {

  const response = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const data = await response.json()

  return (
    <div className="p-10">
      <p>{data.title}</p>
      <p>{data.description}</p>
      <img src={`${data.image}`} alt="No Image" width="100px" height="100px" />
      <p>{data.price}</p>
      <p>{data.category}</p>
      <ul>
        {' '}
        Rating
        <li>{data.rating.rate}</li>
        <li>{data.rating.count}</li>
      </ul>
    </div>
  )
}

export default Single
