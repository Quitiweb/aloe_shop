import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

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
        {ejemplos.map(item => (
          <div key={item.id}>
            <h1>{item.titulo}</h1>
            <span>{item.descripcion}</span>
          </div>
        ))}
      </div>
  );
}

export default App;
