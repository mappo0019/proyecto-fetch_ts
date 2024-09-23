import '../css/Ficha.css'
import React from 'react'

interface Props{
    poster: string,
    onAniadir:React.MouseEventHandler<HTMLInputElement>,
    elegida: string;
    titulo:string,
    anio:string,
    enlace:string

}

const Ficha = (props:Props)=>{

    return(
        <div className = "ficha">
            <input type="image" src ={props.poster}  className = "aniadir" onClick= {props.onAniadir}></input>
            <p className = {props.elegida ? "elegida" : "no-elegida"}>✨</p>
            <h1 className = "titulo"> {props.titulo}</h1>
            <h2 className = "year"> {props.anio} </h2>
            <p className = "pagina"> Enlace a IMDB <a href= {`https://www.imdb.com/title/${props.enlace}`}>aquí. </a></p>

        </div>
    )
}

export default Ficha