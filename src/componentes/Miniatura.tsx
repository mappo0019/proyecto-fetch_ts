import '../css/Miniatura.css'
import React from 'react';

interface Props{
    onEliminar: React.MouseEventHandler<HTMLAnchorElement>,
    poster: string
}

const Miniatura = (props:Props) =>{
    return(
        <a className = "poster-boton" onClick = {props.onEliminar}><img className = "poster-mini" src = {props.poster}/></a>
    );
}

export default Miniatura