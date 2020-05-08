import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios'
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
const Detalle = (props) => {

    var [product, setProduct] = useState([]);
    var id = props.match.params.id;

    var productEdit = product;
    const url = window.$BASE_URL;
    
    useEffect(() => {
        recargarVista()
    },[]) 

    var recargarVista = () => {
        axios.get(url + '/api/' + id)
        .then(function (response) {
          
          console.log(response)
           setProduct(response.data)
          
        })
        .catch(function (error) {
          console.log(error);
        });        
    }

    var onClickButton = () => {

         let form_data = new FormData();
         form_data.append('name', product.name) 
        form_data.append('sku', document.getElementById('form-sku').value)
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

        axios.put(url + '/api/' + id + '/',form_data, {
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


    return (
        <Fragment>
            <MetaTags>
                <title>aloeshop | { product.name }</title>
                <meta
                name="description"
                content="Product detail"
                />
            </MetaTags>
            <LayoutOne headerTop="visible">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="col-12">
                                <h1>{ product.name }</h1>
                            </div>

                            <div className="col-12">
                                <img src={product.image} alt="" style={{ maxWidth: 300 }}/>
                                <h4>Ref: { product.sku }</h4>
                                <h2>{ product.price }€</h2>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="card mb-5">
                                
                                <ul style={{ padding: 15}}>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>SKU:</b> <input style={{width: 'inherit', background: 'white', border: '2px solid #788968'}} type="text" id="form-sku" placeholder={productEdit.sku} /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>Precio:</b> <input style={{width: 'inherit', background: 'white', border: '2px solid #788968'}} type="text" id="form-precio" placeholder={ productEdit.price } /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>Descuento:</b> <input style={{width: 'inherit', background: 'white', border: '2px solid #788968'}} type="text" id="form-descuento" /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>¿Es nuevo?</b> <input style={{width: 'inherit', background: 'white', border: '2px solid #788968'}} type="checkbox" id="form-nuevo" defaultChecked={ productEdit.new} /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>Categorías:</b> <input style={{width: 'inherit', background: 'white', border: '2px solid #788968'}} type="text" id="form-categorias" placeholder={ productEdit.category } /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>Etiquetas:</b> <input style={{width: 'inherit', background: 'white', border: '2px solid #788968'}} type="text" id="form-etiquetas" placeholder={ productEdit.tag } /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>Stock Disponible:</b> <input style={{width: 'inherit', background: 'white', border: '2px solid #788968'}} type="text" id="form-stock" placeholder={ productEdit.stock } /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 140 }}>Imagen:</b> <input style={{width: 'inherit', background: 'white', border: 'none'}} type="file" id="form-image" /></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left', width: 150 }}>Descripción breve:</b> <br/> <textarea className="textDetalle" rows="5" style={{width: 500, background: 'white', border: '2px solid #788968'}} type="text" id="form-breve" placeholder={ productEdit.shortDescription }></textarea></li>
                                    <li style={{ marginTop: 10 }}> <b style={{ float: 'left' }}>Descripción extendida:</b>  <br/> <textarea className="textDetalle" rows="15" style={{width: 500, background: 'white', border: '2px solid #788968'}} type="text" id="form-full" placeholder={ productEdit.fullDescription }></textarea></li>
                                </ul>
                                <button class="btn-admin" style={{width: '50%', marginLeft: '25%', marginBottom: 50}} onClick={() => onClickButton()}>Modificar producto</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
            
        </Fragment>
    )

}

export default Detalle;