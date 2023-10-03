/* ***********************XMLHTTPREQUEEST************************ */
(() => {
  const xhr = new XMLHttpRequest(), //creando una variable del objeto
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment(); //para almacenar toda la informacion y despues hacer la incercion al dom

  //ahora para que el objeto funcione necesita dos cosas
  /* 
    1-la instancia
    2-un evento
    3-habrir la peticion
    4-enviar la peticion
     */

  xhr.addEventListener("readystatechange", (e) => {
    //esta validacion nos va a permitir que la funcion se ejecute cuando el readystate haya sido 4.
    if (xhr.readyState !== 4) return; //porque hasta que no este completada la peticion no vamos a empezar a manipular el dom.

    // console.log(xhr)
    if (xhr.status >= 200 && xhr.status < 300) {
      //el status es el codigo del servidor
      //  console.log("exito")
      // console.log(xhr.responseText) //aqui viene la respuesta
      //  $xhr.innerHTML=xhr.responseText//insertando la respuesta en el html
      /* OJO la respuesta hay que convertirla en un objeto javascript ya que viene en formato JSON */
      let $json = JSON.parse(xhr.responseText); //esto me va a convertir la respuesta en un objeto js.
      // console.log($json)

      $json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });

      $xhr.appendChild($fragment);
    } else {
      //  console.log("error")
      //traime lo que esta en la propiedad statustex y si esta vacio me pones que ocurrio un error.
      let message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error${xhr.status}:${message}`;
    }
  });

  //instruccion que va a abrir la peticion.open()
  //el primer parametro es el metodo por el cual vamos a comunicarnos
  //que es get porque vamos a acceder a traves de la url
  //el segundo parametro es el recuso, la url a la cual estamos haciendo la peticion.
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
  //xhr.open("GET","");

  //i finalmente el cuarto paso es enviar la peticion
  xhr.send();
})();

/* ***************************FETCH DE DATOS***************************** */

(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();
  /* este es un mecanismo que trabaja con promesas */
  //este metodo recibe dos parametros
  //el recurso al cual vamos hacer referencia en est caso es la url.
  // y un objeto con opciones.
  fetch("https://jsonplaceholder.typicode.com/users")
    /*  .then((res)=>{
    console.log(res);
    //la respuesta viene en el body pero el body es un ReadableStream hay que convertirlo en formato json
    //dependiendo de como estas recibiendo los datos de la api que consumas es que ejecutas el metodo json,text o blog.
    return res.ok ?res.json():Promise.reject(res)
   }) */

    .then((respuesta) =>
      respuesta.ok ? respuesta.json() : Promise.reject(respuesta)
    )
    .then((json) => {
      // console.log(json);

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetch.appendChild($fragment);
    })

    .catch((err) => {
      // console.log("estamos en el catch");
      let message = err.statusText || "Ocurrio un error";
      $fetch.innerHTML = `Error ${err.status}:${message}`;
    })
    .finally(() => {
      /*  console.log(
        "este contenido se va a ejecutar independientemente del resultado de la promesa fetch."
      ); */
    });
})();

/* ***************************FETCH DE DATOS CON ASYN AWAIt***************************** */
(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    //destro  de esta funcion asincrona va a estar la invocacion hacia la solicitud.
    try {
      let respuesta = await fetch("https://jsonplaceholder.typicode.com/users"), //espera la respuesta antes de ejcutar la sgte linea de codigo.
        json = await respuesta.json(); //espera a que lo conviertas antes de ejcutar la sguiente linea de còdigo.
      //console.log(respuesta,json);

      //manejando el error.
      //  if(!respuesta.ok)throw new Error("ocurrion un error al solicitar los datos")//este tipo de error solo recibe sms textuales.
      if (!respuesta.ok) throw { status: respuesta.status, statusText: respuesta.statusText };

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
        $fragment.appendChild($li);
      });

      $fetchAsync.appendChild($fragment);
    } catch (err) {
      let message = err.statusText || "Ocurrio un error";
      $fetchAsync.innerHTML = `Error ${err.status}:${message}`;
    } finally {
      console.log(
        "este contenido se va a ejecutar independientemente del resultado de la promesa fetch."
      );
    }
  }

  getData();
})();
