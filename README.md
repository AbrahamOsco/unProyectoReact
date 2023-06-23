# unProyectoReact
Instalamos: 
npm install
npm run build
npm instal react-bootstrap bootstrap
npm i bootstrap-icons
npm i node-sass
hacer " npm i node-sass " Te sale error?  HACE: npm install -> npm i sass y listo!!. 


1. No podes usar SCSS  si no tenes la depedencia sass -> ver arriba. 
1. cuando haces un id="pepe" -> en el scss es con #pepe si haces luego adentro podes hacer con .img1
1. Crear dos tipos de interfaces por un lado las interface de una logica de negocio y por otro lado interfaces de estado y tal.
1. types.d.ts -> la "d" de solo definiciones.
1. Interfaces de logica  separas y nunca lo dejes dentro de nuestros componentes.

###  ¿Como hacer enrutamiento en REACT-Typescript usando Next.js (estructura de archivos)?
El enrutamiento de rutas es el proceso de navegar entre diferentes paginas web. 
En particular el enrutamiento next.js se basa en la estructura de archivos dentro de la carpeta "pages"
Por ejemplo si de localhost:3000/soporte queres ir a localhost:3000/ticket al hacer click en un boton lo haces asi: 

// Importamentos el paquete para el ruteo en la pagina de soporte:
import { useRouter } from "next/router";

Dentro de la funcion donde esta el boton ej: 

const ProductBar = ({ product }: Props) => {
//Definimos el router
 const router = useRouter();

//definimos la funcion handler al hacer click del boton.
  const handleButtonClick = () => {
    router.push("/ticket"); // Entonces debemos tener en pages el archivo:  ticket.tsx 
 };

luego en return: ( ... 
		<button
          className="bg-blue-500 text-white px-6 py-3 rounded-md"
          onClick={handleButtonClick}>
          Entrar
        </button>)


En la pagina ticket usando el sgt formando: 
function Ticket() {
  return (
    <div>
      <h1> Ricardo my brother </h1>
    </div>
  );
}

export default Ticket;

