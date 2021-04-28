/*VAR*/
const URLGETPUBLICACIONES = "https://jsonplaceholder.typicode.com/comments?postId=1";
const URLPOSTUSUARIOS = "https://jsonplaceholder.typicode.com/posts/1/comments";
const URLGETUSUARIOS = "https://jsonplaceholder.typicode.com/users";

/* FUN */
$(document).on("DOMContentLoaded",function(){
    $("#mensajeGenerado").append("<h2 id='mensaje'>Cargando...</h2>");
});

$(function(){
    $("#comentarios").hide();
    $("#usuarioGenerado").hide();
    $("#fPublicacion").toggle();

    $.get(URLGETPUBLICACIONES,callbackGetPublicaciones);
    $.get(URLGETUSUARIOS,callbackGetUsuarios);
    $("#usuarioGenerado").on("change",callbackEventSelect);
    $("#bPublicacion").on("click",callbackEventButton);
    $("#fPublicacion").on("submit",callbackEventForm);
});

function callbackGetPublicaciones(respuesta,estado){
    if(estado === "success"){
        for (const publicacion of respuesta) {
            $("#comentarios").append(`<div><h4>${publicacion.email}</h4><p>${publicacion.body}</p>
            </div>`);
        }
        $("#comentarios").fadeIn(3000);
        $("#mensajeGenerado").fadeOut(1000);
    }
}

function callbackGetUsuarios(respuesta){
    //EN LA RESPUESTA TENEMOS EL JSON DE USUARIOS Y PODEMOS ITERARLO
    for (const usuario of respuesta) {
        $("#usuarioGenerado").append(`<option value="${usuario.id}">${usuario.name}</option>`);
    }
    $("#usuarioGenerado").fadeIn(3000);
}

function callbackPostPublicacion(respuesta){
   $("#mensaje").text(`Publicamos: ${respuesta.title} - Autor Nº : ${respuesta.userId}`);
   $("#fPublicacion").toggle();
   $("#mensajeGenerado").fadeIn(1000).delay(3000).fadeOut(1000);
}

function callbackEventSelect(event){
    console.log(event.target.value);
}

function callbackEventForm(event){
    event.preventDefault();
    $.post(URLPOSTUSUARIOS,{title: event.target[0].value ,body:event.target[1].value, userId:event.target[2].value}, callbackPostPublicacion);

}

function callbackEventButton(event){
    $("#fPublicacion").toggle();
}