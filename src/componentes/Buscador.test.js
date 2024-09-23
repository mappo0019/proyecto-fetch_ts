import React from "react";
import "@testing-library/jest-dom"
import renderer from 'react-test-renderer';
import Buscador from "./Buscador";
import Miniatura from "./Miniatura";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


test('renders content', ()=>{
    const propiedades ={
        onClickAlto(){
            return "Hola!";
        }
    }

    const component = renderer.create(<Buscador props = {propiedades} />);

    expect(component).toBeTruthy();

    expect(propiedades.onClickAlto()).toBe("Hola!");  
});

/**
 * 
 * @jest-environment jsdom
 */
test("No more peli", ()=>{

    const propiedades ={
       poster: "https://img.welt.de/img/testgpr/seo/mobile159542357/2122501577-ci102l-w1024/7-jpg.jpg",
       deleteMovie(){
        this.var =  "pulsado";
       },

        var: null

    }

    render(
        <Miniatura  propiedadesposter = {propiedades.poster} onEliminar={propiedades.deleteMovie} />   
    );

    const miniatura = screen.getByRole("button", {class: "poster-boton"});
    
    expect(propiedades.var).toBeFalsy();

    userEvent.click(miniatura);

    expect(propiedades.var).toBe("pulsado");

})