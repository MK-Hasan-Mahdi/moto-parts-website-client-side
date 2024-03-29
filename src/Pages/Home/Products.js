import React, { useEffect, useState } from 'react';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://peaceful-dusk-44249.herokuapp.com/product')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (

        <div className=''>
            <div className='mid-container my-28 lg:px-40 '>
                <div className='text-center'>

                    <h3 className='text-4xl mt-16 mb-8 text-center font-bold'>Parts We Manufacture</h3>
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12'>
                    {
                        products.slice(0, 6).map(product => <Product
                            key={product._id}
                            product={product}
                        ></Product>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Products;