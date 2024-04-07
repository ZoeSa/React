//productRender.js
import React from 'react';
import Product from '../componentes/Product';
import '../css/product.css';

const ProductRender = ({ products, addToCart, handleProductClick, navigate }) => {
    const navigate = useNavigate();
    return (
    <div className="products">
      {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          category={product.category}
          image={product.image}
          rating={product.rating}
          addToCart={addToCart}
          handleProductClick={() => handleProductClick(product.id,)
                    navigate("/producto/:productId")
            }
        />
      ))}
    </div>
  );
};

export default ProductRender;