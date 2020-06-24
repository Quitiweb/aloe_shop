import React, {Fragment, useEffect, useState} from 'react'
import LayoutOne from "../../layouts/LayoutOne";
import MetaTags from "react-meta-tags";
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from 'react-toast-notifications'

const Admin = ({
}) => {

    var history = useHistory();
    var [products, setProducts] = useState([]);
    var [categories, setCategories] = useState([]);
    var [token, setToken] = useState(localStorage.getItem('token'));
    var [visible, setVisible] = useState(false);

    const { addToast } = useToasts()
    const url = window.$BASE_URL;
    
    useEffect(() => {
        axios.get(url + '/api/is_admin', {
            headers: {
                Authorization: token
            }
        })
        .then(function (response) {
            setVisible(true)
            recargarVista(); // Si el usuario es admin, ya cargamos tanto productos.
            getCategories(); // Como categorias.
        }).catch(function (error) {
            history.push('/');
            console.log(error);
        });
    },[]) 


    var getCategories = () => {
        axios.get(url + '/api/categories', {
            headers: {
                Authorization: token
            }
        })
        .then(function (response) {
            console.log('CATEGORIAS' + response);
            setCategories(response.data)
        }).catch(function (error) {
            console.log(error);
        }); 
    }

    var recargarVista = () => {
        axios.get(url + '/api', {
            headers: {
                Authorization: token
            }
        })
        .then(function (response) {
          setProducts(response.data)
          products.map((producto)=>{  
              producto.id = producto.id.toString()
              producto.sku = producto.sku.toString()
              producto.image = [producto.image]
              producto.category = [producto.category]
              producto.tag = [producto.tag]
          }); 
        })
        .catch(function (error) {
          console.log(error);
        });        
    }
 
    var onClickButton = () => {
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
        
        axios.post(url + '/api/',form_data, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': 'multipart/form-data;'
            }
        })
          .then(function (response) {
            recargarVista();
            addToast('¡El producto ' + document.getElementById('form-nombre').value + ' se ha añadido con éxito!', 
                    { 
                        appearance: 'success', 
                        autoDismiss: true 
                    }
                )
          })
          .catch(function (error) {
            addToast('Ha ocurrido un error intentando añadir este producto', 
                    { 
                        appearance: 'error', 
                        autoDismiss: true 
                    }
                )
            
            console.log(error);
          });
    }

    var onClickRow = (id) => {
        history.push("/detalle/" + id);
    }

    var setTopCategory = (id, nombre) => {
        for(let category of categories) {
            let form_data = new FormData();
            form_data.append('id', category.id) 
            form_data.append('nombre', category.nombre) 
            form_data.append('activa', false) 

            axios.put(url + '/api/category/' + category.id + '/',form_data, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'multipart/form-data;'
                }
            })
            .then(function (response) {   
                let form_data = new FormData();
                form_data.append('id', id) 
                form_data.append('nombre', nombre) 
                form_data.append('activa', true) 

                axios.put(url + '/api/category/' + id + '/',form_data, {
                    headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': 'multipart/form-data;'
                    }
                })
                .then(function (response) {
                    getCategories();
                })
                .catch(function (error) {
                    console.log(error);
                });
            })
            .catch(function (error) {
                console.log(error);
            });    
        }

        categoryToast();

    }

    var emptyTopCategory = (id, nombre) => {
        for(let category of categories) {
            let form_data = new FormData();
            form_data.append('id', category.id) 
            form_data.append('nombre', category.nombre) 
            form_data.append('activa', false) 

            axios.put(url + '/api/category/' + category.id + '/',form_data, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'multipart/form-data;'
                }
            })
            .then(function (response) {   
                getCategories();
            })
            .catch(function (error) {
                console.log(error);
            });    
        }
        categoryToast();
    }


    function categoryToast() {
        return addToast('Categorías actualizadas con éxito', 
        { 
            appearance: 'success', 
            autoDismiss: true 
        }
    )
    }

    return(
        <Fragment>
            <MetaTags>
                <title>aloeshop | admin</title>
                <meta
                name="description"
                content="Admin."
                />
            </MetaTags>
        <LayoutOne headerTop="hidden">
            <div className="container" style={{ display: visible ? 'block' : 'none' }}>
                <div className="row">
                    <div className="col-12">
                    <h1 style={{color: 'black'}}>Área de Adminitración</h1>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 mt-3">
                        <h4>Listado de productos</h4>
                        <table className="table">
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
                                <tr key={producto.id} style={{ cursor: 'pointer' }} onClick={() => onClickRow(producto.id)}>
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

                    <div className="row mt-5 col-12">
                    <div className="col-12 col-md-6 offset-sm-3">
                        <h4>Listado de categorias</h4>
                        <p>Solo podrás tener una categoría que se destaque en la página principal. Si quieres
                            que no se destaque ninguna en especial, pulsa <a style={{ color: 'blue' }} onClick={ () => emptyTopCategory() }>aquí</a>.
                        </p>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Categoría principal</th>
                                </tr>
                            </thead>
                            <tbody>
                            {categories.map((category)=>{
                                return (
                                <tr key={category.id}>
                                    <td>{category.nombre}</td>
                                    <td>{category.activa ? 
                                        <i class="fa fa-check fa-2x" aria-hidden="true" style={{ color: '#1b926c', cursor: 'pointer' }}></i> 
                                        : 
                                        <button onClick={() => setTopCategory(category.id, category.nombre)}>Hacer principal</button>
                                        }
                                    </td>
                                </tr>                                 
                                )
                            })}
                              
                            </tbody>
                        </table>
                    </div>

                </div>
            </div> 
        </div>
    </LayoutOne>
</Fragment>
    )
}



  export default Admin;