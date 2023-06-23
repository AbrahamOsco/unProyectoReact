import { Sub } from "../../types";
import "./SForm.scss";

import React, { useState } from "react";
//en el useState vemos que inicializa en un bojeto que recibe un nick, submounth, avatar y descripcion
interface FormState {
  inputValues: Sub;
}

interface FormProps {
  onNewSub: (newSub: Sub) => void;
  //onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>;
}

const INITIAL_STATE = {
  nick: "",
  subMonths: 0,
  avatar: "",
  description: "",
};

// tambien podria ser :
//export const Form = ({onNewSub}: FormProps) => {... }
export const Form: React.FC<FormProps> = ({ onNewSub }) => {
  //me gustaria que el tipo de dato que ponemos dentro del useState(...)
  // sea el correcto como abajo hago un setInputValues podria cambiar
  // cosas y no se da cuenta.
  const [inputValues, setInputValues] =
    useState<FormState["inputValues"]>(INITIAL_STATE);

  //
  const handleSubmit = (eve: React.FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
    // onNewSub aca es todos los elmentos del array de subs + el que agregamos ahora
    //Este es el (callback (subs) => [...subs, inputValues]) que se le pasa como argumento al afucnion onNewSub.
    // Callback es una funcion ( este caso es una funcion flecha ) que se le pasa como argumentoa otra funcion ( OnNewSub)
    // en este caso la call back devuelve un array donde (al array de subs se le agrega el eleneto inputValues)
    // finalmente se asignan los nuevos subs con la funcion onNewSub().
    // con (...subs) estamos usando el operador spread para obtener todos los objetos Sub de nuestro array y luego
    // Luego como estamos dentro de [...subs, inputValues ] colocamos todos los objetos de tipo sub que ya estaban en subs, y
    // concadenamos con el inputValue (el nuevo objeto Sub) al ultimo y con operador [] creamos un nuevo array de la concatenacion de estos dos elementos.
    // la funcion (subs) => [...subs, inputValues]  define una funcion de argumento subs que devuelve un nuevo array que combina los elementos subs.
    // con el nuevo objeto de tipo Sub inputvalues. finalmente con la funcion onNewSub recibe el arrayDeSub y actualiza el arrays de subs original que esta
    // en App.tsx -> estos comentarios pasaron a App.tsx en la funcion handleNewSub.
    onNewSub(inputValues);
    setInputValues(INITIAL_STATE);
  };
  // se usa la propagacion de objetos y luego se usa el event target
  // donde solo el event.target.name que cambia se actuliza su valor
  // el resto queda igual.
  //Resumen: Aca basicamente va actualizando en el inputValues el campo que va cambiando
  // mentras el usuario teclea cambia inmediatamente, react vuelve a rendereizar esa componente
  // y lo muestra el valor actualizado en la interfaz de usuario.
  // en { ...inputValues, [event.target.name]: event.target.value } Aca basicamente se devuelve un objeto
  // ese objeto es la fusion de ...inputValues (operador spread)
  // que devuelve el array completo de inputValues-> [ nick:..., months:.., avatar:..., description:..., nick ]
  // Luego se usa la sintaxis de corchete [] (Computed Property Names) para asignar dinamicamente el valor event.target.name
  // una nueva propiedad al objeto por ej si en el campo "nick" escibimos una "k". En
  // event.target.name = "nick" y event.target.value = "k" asi que en este caso no creamos una nueva
  // propiedad si no que actualizamos el campo nick con el valor "k". Ademas con el operador ... y []
  // se crea el nuevo objeto que pisa el inputValues anterior con los nuevos valores ingresados. en los campos
  const handleCHange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const handleClickClear = () => {
    setInputValues(INITIAL_STATE);
  };

  //Ojo que los atributo name de los input/textArea,etc deben coincidir con las
  // propiedades de la interfaz Sub. Debido a que al capturar los cambios se asignaran correctamente
  // a las propiedades correspondientes a la interfaz Sub.
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} id="formS">
          <input
            onChange={handleCHange}
            value={inputValues.nick}
            type="text"
            name="nick"
            placeholder="nick"
          />
          <input
            onChange={handleCHange}
            value={inputValues.subMonths}
            type="text"
            name="subMonths"
            placeholder="subMonths"
          />
          <input
            onChange={handleCHange}
            value={inputValues.avatar}
            type="text"
            name="avatar"
            placeholder="avatar"
          />
          <textarea
            onChange={handleCHange}
            value={inputValues.description}
            name="description"
            placeholder="descripcion"
          />

          <button type="submit"> guardar nuevo suscriptor</button>
          <button onClick={handleClickClear} type="button">
            {" "}
            clear
          </button>
        </form>
      </div>
    </>
  );
};
