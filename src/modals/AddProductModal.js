import React, {useState} from "react";

const AddProductModal = ({addPoduct, closeModal})=> {
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: 0,
        description: "",
        
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewProduct((prevProduct)=> ({
            ...prevProduct,
            [name]:value,
        }));
    };

    const handleSubmit =(e) =>{
        e.preventDefault();
        AddProductModal(newProduct);
        closeModal();
    };

    const handleModalClick = (e) => {
        if(e.target.closeList.contains("modal-overlay")){
            closeModal();
        }
    };

    return(
        <div className="model-overlay" onClick={handleModalClick}>
            <div>
                <h2>Crear un nuevo producto</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title:
                        <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} required/>
                    </label>
                    <label>Price: 
                        <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required/>
                    </label>
                    <label>Description:
                        <textarea name="description" value={newProduct.description} onChange={handleInputChange} required/>
                    </label>
                    <label>Image URL:
                        <input type="text" name="title" value={newProduct.image} onChange={handleInputChange}/>
                    </label>

                    <button type="submit">Añadir</button>
                    <button type="" onClick={closeModal}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}
export default AddProductModal