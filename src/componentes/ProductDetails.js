// ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products, addToCart }) => {
    const { productId } = useParams();
    const product = products.find(product => product.id === productId);

    if (!product) {
        return <div>No se encontró el producto.</div>;
    }

    const { id, image, title, price, description } = product;

    return (
        <div>
            <h2>Detalles del producto: {title}</h2>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p className='description'>{description}</p>
            <div className="price-container">
                <p className="price">${price}</p>
            </div>
            <button onClick={() => addToCart(id)}>Añadir al carrito</button>
        </div>
    );
};

export default ProductDetail;
