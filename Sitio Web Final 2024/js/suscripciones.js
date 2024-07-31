//se selecciona el elemento con id formulario y se guarda en Formulario.
const Formulario = document.querySelector ("#formulario"); 


//se añade un "listener" para el evento submit en el formulario para q se ejecute cuando se envie
Formulario.addEventListener("submit", (event) => {
    event.preventDefault();//para que no se envie de manera predeterminada

    //seleciona los id
    const input_nombreYapellido = document.querySelector('#input_nombre-apellido');
    const input_opciones = document.querySelector('#input_opciones');

    // se crea un objeto suscripcion y se le asignan los valores
    const suscripcion = {
        Nombre: input_nombreYapellido.value,
        Plan: input_opciones.value
    }
    // se manda solicitud POST a firebase
    fetch('https://music-d2b68-default-rtdb.firebaseio.com/suscripciones.json', {
        method: 'POST',
        headers: { //espeficia que es un contenido JSON
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(suscripcion)// convierte el obj suscripcion en cadena JSON
    })
        Formulario.reset();
    ;
    
});