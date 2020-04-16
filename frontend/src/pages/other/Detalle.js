import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios'
const Detalle = (props) => {

    var [product, setProduct] = useState([]);
    var id = props.match.params.id;
    
    useEffect(() => {
        recargarVista()
    },[]) 

    var recargarVista = () => {
        axios.get('http://127.0.0.1:8000/api/' + id)
        .then(function (response) {
          
          console.log(response)
           setProduct(response.data)
          
        })
        .catch(function (error) {
          console.log(error);
        });        
    }

    return (
    <div>Pagina del producto {product.name}</div>
    )

}

export default Detalle;