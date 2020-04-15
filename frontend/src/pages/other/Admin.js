import React, {Fragment, useState} from 'react'
import LayoutOne from "../../layouts/LayoutOne";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import axios from 'axios';

const Admin = ({
    products,
    currency,
    addToCart,
    addToWishlist,
    addToCompare,
    cartItems,
    wishlistItems,
    compareItems,
    sliderClassName,
    spaceBottomClass
}) => {

    var onClickButton = () => {


        axios.post('http://127.0.0.1:8000/api/', {
            sku: '111',
            name: 'Producto de prueba',
            price: 1,
            discount: 5,
            new: false,
            rating: 0.0,
            saleCount: 0,
            category: 'na',
            tag: 'na',
            stock: 150,
            image: null,
            shortDescription: "na",
            fullDescription: "naaaaaaaaaaaaaa"
          })
          .then(function (response) {
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

                    <form className="col-12 col-lg-10" method="POST">
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
                                <input type="text" placeholder="% Descuento" id="form-decuento"/>
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
                                <input type="text" placeholder="Descripción breve del producto"id="form-"/>
                            </div>

                            <div className="col-12 mt-3">
                                <textarea name="" id="" cols="30" rows="10" placeholder="Descripción completa del producto">

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

const mapStateToProps = (state, ownProps) => {
    return {
      products: getProducts(
        state.productData.products,
        ownProps.category,
        ownProps.type,
        ownProps.limit
      ),
      currency: state.currencyData,
      cartItems: state.cartData,
      wishlistItems: state.wishlistData,
      compareItems: state.compareData
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      addToCart: (
        item,
        addToast,
        quantityCount,
        selectedProductColor,
        selectedProductSize
      ) => {
        dispatch(
          addToCart(
            item,
            addToast,
            quantityCount,
            selectedProductColor,
            selectedProductSize
          )
        );
      },
      addToWishlist: (item, addToast) => {
        dispatch(addToWishlist(item, addToast));
      },
      addToCompare: (item, addToast) => {
        dispatch(addToCompare(item, addToast));
      }
    };
  };


  export default connect(mapStateToProps, mapDispatchToProps)(Admin);