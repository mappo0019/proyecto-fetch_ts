import '../css/Buscador.css'
import React from 'react';

interface Props{
    onClickAlto: React.MouseEventHandler<HTMLButtonElement>
}

const Buscador= (props: Props)=>{
    return (
        <div>
            <input className = "barra-busqueda" placeholder = "Introduzca un título (o parte de él)..."></input>
            <button className = "buscar" onClick = {props.onClickAlto}>🔎</button>
        </div>
    )
}

export default Buscador;