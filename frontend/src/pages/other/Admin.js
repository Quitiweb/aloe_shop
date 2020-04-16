import React, {Fragment, useEffect, useState} from 'react'
import LayoutOne from "../../layouts/LayoutOne";
import MetaTags from "react-meta-tags";
import axios from 'axios';

const Admin = ({
}) => {

    var [products, setProducts] = useState([]);

    
    useEffect(() => {
        recargarVista();
    },[]) 

    var recargarVista = () => {
        axios.get('http://127.0.0.1:8000/api')
        .then(function (response) {
          setProducts(response.data)
          console.log(response.data);
          products.map((producto)=>{  
              producto.id = producto.id.toString()
              producto.sku = producto.sku.toString()
              producto.image = [producto.image]
              producto.category = [producto.category]
              producto.tag = [producto.tag]
          }); 
          console.log(products)
          
        })
        .catch(function (error) {
          console.log(error);
        });        
    }
 
    var onClickButton = () => {

        console.log(document.getElementById('form-image').files[0])

        let form_data = new FormData();
        form_data.append('sku', document.getElementById('form-sku').value)
        form_data.append('name', document.getElementById('form-nombre').value)
        form_data.append('price', document.getElementById('form-precio').value)
        form_data.append('discount', document.getElementById('form-descuento').value)
        form_data.append('new', true)
        form_data.append('rating', 0.0)
        form_data.append('saleCount', 0)
        form_data.append('category', document.getElementById('form-categorias').value)
        form_data.append('tag', document.getElementById('form-etiquetas').value)
        form_data.append('stock', document.getElementById('form-stock').value)
        form_data.append('image', document.getElementById('form-image').files[0])
        form_data.append('shortDescription', document.getElementById('form-breve').value)
        form_data.append('fullDescription', document.getElementById('form-full').value)
        
        axios.post('http://127.0.0.1:8000/api/',form_data, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': 'multipart/form-data;'
            }
        })
          .then(function (response) {
            recargarVista();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return(
        <Fragment>
            <MetaTags>
                <title>aloeshop | admin</title>
                <meta
                name="description"
                content="Cart page of flone react minimalist eCommerce template."
                />
            </MetaTags>
        <LayoutOne headerTop="hidden">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <h1 style={{color: 'black'}}>Área de Adminitración</h1>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 mt-3">
                        <h4>Listado de productos</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">SKU</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((producto)=>{
                                return (
                                <tr key={producto}>
                                <th scope="row">{producto.id}</th>
                                <td>{producto.sku}</td>
                                <td>{producto.name}</td>
                                <td>{producto.price}</td>
                                </tr>                                 
                                )
                            })}
                              
                            </tbody>
                        </table>
                    </div>

                <div className="col-12 mt-5">
                    <h4>Añadir un producto</h4>
                </div>
                    <div className="col-1"></div>

                    <form className="col-12 col-lg-10" method="POST" encType="multipart/form-data">
                        <div className="row">
                            <div className="col-12 mt-2">
                                <input type="text" placeholder="Nombre" id="form-nombre"/>
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="SKU" id="form-sku"/>
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Precio" id="form-precio"/>
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="% Descuento" id="form-descuento"/>
                            </div>
                            
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Stock" id="form-stock"/>
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Categorías" id="form-categorias"/>
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Etiquetas" id="form-etiquetas"/>
                            </div>
                            <div className="col-4 mt-4">Sube una imagen de tu producto:</div>
                            <div className="col-8 mt-4">
                                <input style={{background: 'none', border: 'none'}}
                                        type="file" 
                                        accept="image/x-png,image/gif,image/jpeg" id="form-image"/>
                            </div>

                            <div className="col-12">
                                <input type="text" placeholder="Descripción breve del producto"id="form-breve"/>
                            </div>

                            <div className="col-12 mt-3">
                                <textarea name="" id="form-full" cols="30" rows="10" placeholder="Descripción completa del producto">

                                </textarea>
                            </div>
                        </div>
                        <button type="button" onClick={() => onClickButton()} className="btn-hover btn-admin mb-5">Añadir Producto</button>
                    </form>

                </div>

            </div>
        </LayoutOne>
        </Fragment>
    )
}



  export default Admin;