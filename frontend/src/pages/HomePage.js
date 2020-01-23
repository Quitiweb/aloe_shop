import React, { useState, useEffect } from 'react';
import Banner from '../components/HomePage/Banner'
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Lineas from "../components/HomePage/Lineas";

export default function HomePage() {

const [ejemplos, setEjemplos] = useState([]);

    useEffect(() => {
        async function fetchData() {
             try {
                const res = await fetch('http://127.0.0.1:8000/api/');
                const ejemplos = await res.json();
                setEjemplos(ejemplos);
            } catch (e) {
              console.log(e);
            }
        }
        fetchData();
    }, []);


  return (
      <div>

        <Banner/>

        <Lineas/>
      <Grid container style={{position: 'absolute', marginBottom: '80px'}}>
            {ejemplos.map(item => (
          <Grid item xs={12} key={item.id} style={{position: 'relative', top: '20px'}}>
            <h1>{item.titulo}</h1>
            <span>{item.descripcion}</span>
          </Grid>
        ))}
      </Grid>
      </div>
  );
}