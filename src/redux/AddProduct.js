import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '../redux/reduce/productReducer';
import { addProduct } from '../redux/actions';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({ title: "", price: "", description: "", image: "" });
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);//sirve para recoger todos los productos y asi tener acceso a ellos, se puede usar en cualquier pagina

  const handleAddProduct = () => {
    if (newProduct.title.trim() !== "") {
      dispatch(
        addProduct({
          id: products.length + 1,
          title: newProduct.title,
          price: newProduct.price,
          description: newProduct.description,
          image: newProduct.image,
        })
      );
      setNewProduct({ title: "", price: "", description: "", image: "" });
    }
  };

  // Retornamos la función handleAddProduct
  return handleAddProduct;
}

export default AddProduct;
