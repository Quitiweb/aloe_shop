import React, {Fragment, useState} from 'react'
import LayoutOne from "../../layouts/LayoutOne";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";

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

    const [visible, setVisible] = useState(false);

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


                    <div className="col-1"></div>

                    <div className="col-10 mt-5">
                        <div className="row">
                            <div className="col-12 mt-2">
                                <input type="text" placeholder="Nombre" />
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="SKU" />
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Precio" />
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="% Descuento" />
                            </div>
                            
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Stock" />
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Categorías" />
                            </div>
                            <div className="col-6 mt-2">
                                <input type="text" placeholder="Etiquetas" />
                            </div>
                            <div className="col-4 mt-4">Sube una imagen de tu producto:</div>
                            <div className="col-8 mt-4">
                                <input style={{background: 'none', border: 'none'}}
                                        type="file" 
                                        accept="image/x-png,image/gif,image/jpeg" />
                            </div>

                            <div className="col-12">
                                <input type="text" placeholder="Descripción breve del producto"/>
                            </div>

                            <div className="col-12 mt-3">
                                <textarea name="" id="" cols="30" rows="10" placeholder="Descripción completa del producto">

                                </textarea>
                            </div>
                        </div>
                        <button className="btn-hover btn-admin mb-5">Añadir Producto</button>
                    </div>

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