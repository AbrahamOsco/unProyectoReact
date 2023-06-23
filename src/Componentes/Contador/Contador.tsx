import { useEffect, useState } from "react";

interface contadorProps {}
// Hook useSate funciones especiales que nos permite controlar el estado de un componente funcional.
// [variable, funcionParaSetearElValor]
export function Contador(props: contadorProps): JSX.Element {
  const [count, setCount] = useState(0);

  //useEffect nos permite hacer efectos secundarios como una peticiona un backend a la hora de cargar este
  // componente
  useEffect(() => {
    document.title = "Haz hecho click " + count + " veces";
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  // modifica el DOM (titulo de la pagina en este caso)
  // En caso de que count cambie se ejecuta denuevo todo el useEffect putamadre ! .

  //segundo argumento van los diferentes valores al pendiente de nuestro usserEffect.
  //useEffect nos permite manipular el DOM (elementos de la pagina web.).
  // Debes pasarle la funcion y no invocarla idiota !!! .
  return (
    <>
      <div>
        <p> Haz hecho click {count} veces</p>
        <button onClick={handleClick}>
          <h2> Haz click aca ! </h2>
        </button>
      </div>
    </>
  );
}
