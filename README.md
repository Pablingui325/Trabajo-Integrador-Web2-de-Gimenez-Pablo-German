# PROYECTO “FOTAZA 2 -version 2 actualizada” PROGRAMACIÓN WEB II

Link del git:
Link del video:

Se necesita implementar una aplicación web que permita almacenar, ordenar, buscar, vender y
compartir fotografías en línea, a través de Internet.

La aplicación debe propiciar la generación de una comunidad de usuarios que puedan compartir
fotografías creadas por ellos mismos. La comunidad se debe regir por normas de comportamiento y
condiciones de uso que favorezcan la buena gestión de los contenidos.

Si bien las funcionabilidades de la aplicación no estarán limitadas, a continuación, se listan las
principales funcionabilidades que deberá contener la aplicación.

Funcionabilidades (Requerimientos mínimos):
1.- Sistema de autenticación de usuarios.
 Solo usuarios registrados en la aplicación pueden interactuar con la app (subir contenido,
comentar, votar, denunciar, etc)
 Usuarios anónimos solo pueden ver contenido público (imágenes sin Copyright).
2.- Gestor de contenidos (imágenes)
 Los usuarios pueden postear una publicación la cual tiene un título, descripción (opcional), 1 o
más imágenes y 1 o más etiquetas.
 Las imágenes de las publicaciones pueden ser denunciadas por los usuarios. Para denunciarlas
el usuario debe elegir un motivo de denuncia y hacer una descripción o justificación de la
denuncia. Una vez que la imagen ha recibido una denuncia, la publicación que la contiene no
puede ser modificada por el usuario. Cuando una imagen tiene más de 3 denuncias de diferentes
usuarios, el sistema coloca la publicación en la lista de trabajo del validador de contenidos
(perfil de la app). El validador de contenidos puede dar de baja la publicación o desestimar las
denuncias. Cuando un usuario llega a 3 publicaciones “bajadas” el sistema inactiva su cuenta.
 Las imágenes de las publicaciones pueden ser comentadas por cualquier usuario. En cualquier
momento el autor de la publicación puede cerrar los comentarios para la imagen. La imagen
mostrará los comentarios registrados hasta el cierre.
 Los comentarios (que no son del autor) también pueden ser denunciados. En estos casos el autor
puede ver de forma organizada las denuncias y si llega a corresponder podrá borrar el
comentario.
 Cada imagen publicada puede ser valorizada por los usuarios una sola vez. No puede valorizarla
el autor. Siempre debe mostrar la valorización promedio y la cantidad de valoraciones.
 Imágenes que estén bien valorizadas y con una cantidad de votos “considerable” deben tener
preferencia para mostrarse en la home de la aplicación. Debe considerarse también la
posibilidad de que puedan formar parte de la home imágenes que no estén en ese grupo para
que haya un balance. Uds deben definir el criterio para esta regla.
 Cuando se crea una publicación cada imagen debe tener o definir una licencia. Estas pueden ser
con copyrigth o sin copyrigth. En caso de estar protegidas con coyrigth la aplicación debe
permitir proteger la imagen con una marca de agua (la cual puede tener un texto personalizado
por el autor).
 Los usuarios pueden notificar al autor por medio de un botón “me interesa” el interés de
adquirir la imagen. En estos casos el sistema comparte el perfil del interesado con el autor y
pone a disposición una mensajería privada para que ambos se puedan contactar y llegar a un
acuerdo.

3.- Motor de búsqueda de contenidos.

La app debe permitir buscar/recuperar las imágenes/publicaciones a partir de un motor de
búsqueda potente y flexible. Se requiere implementar diferentes tipos de filtros/parámetros incluso que
puedan ser combinados entre si.

4.- Seguimiento de usuario (Followers)

Los usuarios podrán seguir a otros usuarios dentro de la plataforma para ver su contenido más
fácilmente.
 Un usuario puede seguir o dejar de seguir a otro usuario.
 Cada perfil debe mostrar:
o Cantidad de seguidores.
o Cantidad de usuarios seguidos.
 La aplicación debe contar con una sección “Publicaciones de usuarios que sigo”.
 Un usuario no puede seguirse a sí mismo.
 El sistema debe evitar seguir al mismo usuario más de una vez.

5.- Gestor de notificaciones

El sistema debe notificar a los usuarios cuando ocurre alguna interacción relevante con su contenido.
Eventos que generan notificaciones:
 Cuando alguien comenta una publicación.
 Cuando alguien valoriza una imagen.
 Cuando alguien marca “me interesa” en una imagen.
 Cuando alguien comienza a seguir al usuario.

Requerimientos:
 Cada usuario debe tener una sección “Notificaciones”.
 Las notificaciones deben indicar:
o tipo de evento
o usuario que generó la acción
o fecha
 Debe poder marcarse una notificación como leída.

6.- Gestión de colecciones o favoritos

Los usuarios podrán guardar publicaciones o imágenes en colecciones personales.
Requerimientos:
 Un usuario puede guardar una publicación como favorita.
 Los favoritos solo pueden ser vistos por el usuario.
 Un usuario puede crear colecciones (ej: “Paisajes”, “Ideas”, “Inspiración”).
 Una colección puede contener varias publicaciones.
 No se puede guardar la misma publicación dos veces en la misma colección.
