import { JsxElement } from "typescript";

interface Props {
  subs: Array<{
    nick: string;
    subMonths: number;
    avatar: string;
    description: string;
  }>;
  /*
  children:
  En interfaces el children se usa para pasar elementos hijos a un componente.
  ReactNode; Agregamos esto si queremos soportar children.
  con esto un componente acepta contenido entre sus etiquetas y podemos
  acceder a ese contenido
<unComponente>
  <h1>Título</h1>
  <p>Contenido del componente</p>
</unComponente>
    Vemos que h1 y p son elementos hijos del componente "unComponente".  
*/
}

//
//supuesto problema con esto es que acepta children (eso en versiones vieja ahora)
// es necesario explicitamente escribir que necesitamos children.
export const List: React.FC<Props> = ({ subs }) => {
  //al momento de hacer la funcion escribir return de antemano
  //y luego sacar los {} al lado del return no puede habar llaves IDIOTA !.
  const renderList = (): JSX.Element[] => {
    return subs.map((sub) => {
      return (
        <li key={sub.nick}>
          <img src={sub.avatar} alt={"avatar for " + sub.nick} />
          <h4>
            {sub.nick} (<small> {sub.subMonths} </small>)
          </h4>
          <p> {sub.description.substring(0, 100)} </p>
        </li>
      );
    });
  };

  return <ul> {renderList()} </ul>;
};
