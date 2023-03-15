import React from 'react'

const Products = ({products}) => {
    console.log(products);

    return (
        <div>
            {
                products.map(product => {
                    return (<h1>{product.name}</h1>);
                })
            }
        </div>
  )
}

export default Products;