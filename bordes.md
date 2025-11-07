Entonces el truco fue usar:

* `width: 100vw` para ocupar todo el ancho del viewport
* `margin-left: calc(-50vw + 50%)` para eliminar los espacios laterales
* Sin usar `!important` para no afectar otros componentes
