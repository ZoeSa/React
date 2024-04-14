import React from "react";
import useProducts from "../hook/useProduct";

const TablaProducts = () => {
    const {
        productos,
        editedProduct,
        deletedProduct,
        handleEdit,
        handleSave,
        handleInputChange,
    } = useProducts();

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.title}</td>
                            <td>{producto.price}</td>
                            <td>{producto.description}</td>
                            <td>
                                <button onClick={() => handleEdit(producto.id, producto.title, producto.price, producto.description)}>Edit</button>
                                <button onClick={() => deletedProduct(producto.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Add/Edit Product</h2>
                <form onSubmit={handleSave}>
                    <label>
                        Title:
                        <input type="text" name="title" value={editedProduct.title} onChange={handleInputChange} />
                    </label>
                    <label>
                        Price:
                        <input type="text" name="price" value={editedProduct.price} onChange={handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={editedProduct.description} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default TablaProducts;
