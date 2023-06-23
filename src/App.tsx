import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./App.scss";
import { Contador } from "./Componentes/Contador/Contador";
import { Form } from "./Componentes/Form/Form";
import { Sub, SubsResponsiveFromApi } from "./types";
import { List } from "./Componentes/List/list";

// recomendacion tener una interfaz donde cada propiedad sean los
// posibles estados de ese componente.

interface AppState {
  subs: Array<Sub>;
  newSubNumber: number;
}
// un array de objetos que entiendne el contrato de sub.

function App() {
  // <Array<Sub> > array de subs, o tambien  <Sub[]> como quieras.
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubNumber, setNewSubNumber] = useState<AppState["newSubNumber"]>(0);
  const divRef = useRef<HTMLDivElement>(null); //arranca con null el div.

  useEffect(() => {}, []);
  //Escucha otra manera en lguar de pasar setSubs pasar directamente el handle asi encapsular lo que vamos a hacer.
  // aca por testing en lugar de enviar las entrañas que usamos, le enviamos mas masticado, util con los customHooks.
  //Con el operador => se obtiene el valor de newSubNumber se realiza el calculo (n+1) y luego se
  // devuelve el valor que se asigna a newSubNumber.
  //Ademas los sub que devuelve el useState ya que son funciones asincronicas, no hay garantia
  // que el valor se actualize de inmediato.
  const handleNewSub = (newSub: Sub) => {
    setSubs((subs) => [...subs, newSub]);
    setNewSubNumber((n) => n + 1);
  };
  // Funciones como el set del useState, fetch, setTimeOut y setInterval son asincronicas.
  // El useEffect lo usamos para hacer operaciones al momento de detecar que se cambia un valor
  // (debido a que algunas funciones son asincronicas).
  // El useEffect se ejecuta una vez al inicio del componente,
  // se conoce como la ejecucion inicial o el montaje del componente.
  // Recordar que typescript realiza la validacion de tipos en tiempo de compilacion y no en tiempos
  // de ejecucion por lo que no valida aspectos dinamicos o dependintes de datos ingresados en tiempo
  // de ejecucion.

  useEffect(() => {
    // Metodo then  permite encadenar acciones y manipular resultados por ej de la promesa devuelta por fetch
    // Cada llamada a then recibe como argumento una funcion que se ejecutara cuando la promesa anterior.
    // se resuelva correctamente, esto permite processar datos de manera secuencial.
    // en el primer then tomamos toma la respuesta anterior de fetch la llamamos "res" y laburamos con esa.
    // de manera idem en el segundo then obtenemos el objeto devuelve por
    // el primer then lo llamos subs y laburamos con ese.
    // fetch devuelve una promesa que es un objeto jascript que representa la eventual finalizacion
    // (o falla) de una operacion asincronica y devuelve su resultado en el futuro.
    // Fetch devuelve una promesa que representa la respuesta HTTP a una solicitud.
    const fetchSubs = (): Promise<SubsResponsiveFromApi> => {
      return fetch(
        "https://abrahamosco.github.io/prueba.github.io/prueba2.html"
      ).then((res) => res.json());
    };

    //map metodo testeable lo podemos probar con diferentes objetos .
    // metodos separados que permiten hacer mejor testing.
    const mapFromApiToSub = (
      apiResponsive: SubsResponsiveFromApi
    ): Array<Sub> => {
      return apiResponsive.map((unSubFromApi) => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description,
        } = unSubFromApi; //mapeamos elementos arriba
        return {
          nick,
          description,
          avatar,
          subMonths,
        };
      });
    };
    fetchSubs().then((apiSubs) => {
      const subs = mapFromApiToSub(apiSubs);
      console.log(subs);
      setSubs(subs);
    });
  }, []);

  return (
    <>
      <div ref={divRef}>
        <Contador />
        <h1> Subs </h1>
        <List subs={subs} />
        <h1> new Subs: {newSubNumber} </h1>
        <Form onNewSub={handleNewSub} />
      </div>
    </>
  );
}

export default App;
/*
En resumen, useRef puede utilizarse tanto para establecer el enfoque en un elemento como
 para mantener una referencia a elementos mutables sin provocar una re-renderización innecesaria.
*/
