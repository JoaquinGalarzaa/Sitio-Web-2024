console.log("El archivo está importado");
const urlApi = "https://canciones-bf91.restdb.io/rest/playlists?apikey=669c23160af00e3f1a1227b4	";

appCanciones = {
    listarCancion: ()=>{
      //tomamos la referencia del contenedor donde se mostarran los cancions
      const contenedor=document.getElementById("contenedorCanciones");

      //creamos una variable vacia que contendrá todo el codigo HTML que vamos a insertar
      let contenidoHTML = ""; 

      //solicitud a la API usando fetch. La respuesta se convierte a formato JSON y se pasa a la función then.
      // se hace console.log de canciones
      fetch(urlApi).then(respuesta=>respuesta.json()).then(canciones=>{ 
          console.log(canciones);

          for (const cancion of canciones) { // para cada cancion de canciones se genera el siguiente bloqueHTML
              contenidoHTML += `
              <div class="canciones">
                  <img src="${cancion.portada_url}" class="img thumbnail"/>
                  <h4>${cancion.cancion}</h4>
                  Artista(s): ${cancion.artista}<br>
                  <button class="btn btn-primary-eliminar"><a id="eliminar" href="#" onclick="appCanciones.eliminarCancion('${cancion._id}','${cancion.cancion}')">Eliminar</a></button>
                  <button class="btn btn-primary-editar"><a href="#" onclick="appCanciones.editarCancion('${cancion._id}')"><img id="editar" src="../imgs/lapiz.png"></a></button>
              </div>
              `;
          };
          //se inserta el bloque de contenido generado en la variable contenedor.
          contenedor.innerHTML=contenidoHTML;
      })
    },
    //Este método elimina una canción específica tomando el id y nombre.
    eliminarCancion: (idAEliminar,nombreABorrar)=>{ 
      Swal.fire({//Muestra un cuadro de diálogo de confirmación.
          title: `Estás seguro que desea borrar la cancion "${nombreABorrar}"`,
          text: "No podrás revertir esta operación",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, quiero borrarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            //Si se confirma, se hace una solicitud DELETE a la API para eliminar la canción.
            //luego se actualiza la lista de canciones.
              const urlApi=`https://canciones-bf91.restdb.io/rest/playlists/${idAEliminar}?apikey=669c23160af00e3f1a1227b4`;
          fetch(urlApi, {
            method: 'DELETE'
            })
            .then(response => { //entonces se actualiza la lista de canciones
              console.log(response);
              return appCanciones.listarCancion();
            }).then(response =>{
              Swal.fire( // y se muestra una alerta que se elimino la cancion.
                'Eliminado!',
                `La cancion "${nombreABorrar}" fue borrada.`//se muestra el mensaje con el nombre
              )
            });
            }
        })
  },
    //Este método guarda una nueva canción.
    guardarCancion: ()=>{
      //Obtiene los valores de los campos del formulario.
      const txtId=document.getElementById("txtId");
      const txtCancion=document.getElementById("txtCancion");
      const txtArtista=document.getElementById("txtArtista");
      const txtPortada=document.getElementById("txtPortada");
      let urlApi=''; //inicializacion de URL
      let metodoHttp=''; //inicializacion de  Metodo Http
      if(txtId.value==''){ //si el valor de txtId es null se crea una cancion utilizando el metodo POST   
          urlApi="https://canciones-bf91.restdb.io/rest/playlists?apikey=669c23160af00e3f1a1227b4";
          metodoHttp='POST';
      }

      //el objeto cancionAGuardar contiene los datos extraidos del formulario
      const cancionAGuardar = { 
          "cancion": txtCancion.value,
          "artista": txtArtista.value,
          "portada_url": txtPortada.value,
      };
     
      // se envía una solicitud fetch la API para guardar la canción
      fetch(urlApi, {
          method: metodoHttp, // como la id esta vacia el metodo es POST
          headers: {
            'Content-Type': 'application/json' // se especifica que el contenido enviado es JSON
          },
          //body convierte el objeto cancionAGuardaren una cadena JSON para enviarlo en el cuerpo de la solicitud.
          body: JSON.stringify(cancionAGuardar) 
          })  
          //cuando la solicitud es exitosa se imprime en la respuesta
          .then(response => {
            console.log(response);
            window.location.href="playlist.html"; // y redirecciona a la misma pagina 
          });
  },
  //Este método obtiene los datos de una canción específica para editarlos
  //tiene como parametro el id de la cancion a editar
  editarCancion:(idCancionAEditar)=>{
    //URL para obtener los datos de la canción en especifico que se va a editar.
    const urlApi=`https://canciones-bf91.restdb.io/rest/playlists/${idCancionAEditar}?apikey=669c23160af00e3f1a1227b4`;
    //se hace la solicitud GET a la API y convierte los datos en obj JSON
    fetch(urlApi 
        ).then(res => res.json())
          //se establecen los valores correspondiente a cada campo del objeto cancion
          .then(cancion => {
            document.getElementById("txtId").value=cancion._id;
            document.getElementById("txtCancion").value=cancion.cancion;
            document.getElementById("txtArtista").value=cancion.artista;
            document.getElementById("txtPortada").value=cancion.portada_url;
            //ventanaEditar contiene el modal para la edición
            const ventanaEditar=document.getElementById("agregarEditarModal");
            let ventana = new bootstrap.Modal(ventanaEditar); //se crea otra instancia del modal de bootstrap
            ventana.show();//se muestra el modal en pantalla con los datos
          });
}
}
appCanciones.listarCancion();
