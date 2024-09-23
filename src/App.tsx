import React, {useEffect, useState} from "react";
import './App.css';
import Buscador from './componentes/Buscador.tsx';
import Ficha from './componentes/Ficha.tsx';
import Miniatura from './componentes/Miniatura.tsx';

interface Pelicula{
  pelicula:{
    Title: string,
    Year: string,
    imdbID: string,
    Type: string, 
    Poster: string
  }, 
  elegida: boolean,
  key: number
}
function App() {

  const[pelis, setPelis] = useState(Array(0));
  const[fav, setFav] = useState(Array(0));
  const [identPeli, setIdentPeli] = useState(0);
  const[identFav, setIdentFav] = useState(0);
  const [busca, setBusca] = useState(false);

  useEffect(()=>{
    setPelis([]);
    let barra = document.querySelector(".barra-busqueda") as HTMLInputElement;
    let text = barra.value;
    fetch(`https://www.omdbapi.com/?s=${text}&apikey=3af5df7b`)
    .then(response =>  response.json())
    .then(result => result.Search)
    .then(movie => {
    if(movie !== undefined)
      movie.map((res:Pelicula)=>{
        setPelis(pelis=> [...pelis, {pelicula:res, elegida: false, key: identPeli }]);
        setIdentPeli(identPeli => identPeli+1);
      });
    else
      setPelis(Array(0));

    if(text === "Barbie" || text ==="barbie"){
      document.body.style.background = "rgb(2,0,36)";
      document.body.style.background = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(231,144,214,1) 20%, rgba(163,86,143,1) 100%)";
      let titulo = document.querySelector(".app-titulo") as HTMLElement;
      titulo.style.color = "rgb(105, 8, 81)";
    }
    else{
      document.body.style.background = "rgb(2,0,36)";
      document.body.style.background = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(186,215,195,1) 35%, rgba(0,212,255,1) 100%)";
      let titulo = document.querySelector(".app-titulo") as HTMLElement;
      titulo.style.color = "#0a4f58";
    }})
    setBusca(false);
  }, [busca])

  function addPeli(peli : Pelicula){
    setFav([...fav, {pelicula : peli.pelicula, key: identFav}]);
    setIdentFav(identFav=> identFav+1);
    let pelis2 = pelis;
    setPelis(pelis2.map(p=>{
      if(p.pelicula === peli.pelicula)
          p.elegida = true;
    }));
    setPelis(pelis2);
  }

  function deleteMovie(peli: Pelicula){
    let pelis2 = pelis;
    setPelis(pelis2.map(p=>{
      if(p.pelicula === peli.pelicula)
          p.elegida = false;
    }));
    setPelis(pelis2);
    setFav(fav.filter(p=> p.key !== peli.key));
  }

  

  return (
    <div className="App">
      <h1 className = "app-titulo">¡ K n o w <br/> y o u r <br/>m o v i e ! </h1>
      <div className = "pantalla">
        <div>
          <Buscador onClickAlto = {()=> setBusca(true)}/>
            <div className = "parrilla">
              {pelis.length>0 ? 
              pelis.map((peli)=>{
                return <Ficha onAniadir={() =>addPeli(peli)} titulo = {peli.pelicula.Title} anio = {peli.pelicula.Year} enlace = {peli.pelicula.imdbID} poster = {peli.pelicula.Poster} elegida = {peli.elegida}/>
              })                
                : <p></p>
              }  
            </div> 
          </div>    
         
        <div>
            <h2>Mis Películas</h2>
            <div className = "favoritas">        
              {fav.map((fav)=>{
                return <Miniatura poster = {fav.pelicula.Poster} onEliminar={()=>deleteMovie(fav)}/>
              })}
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
