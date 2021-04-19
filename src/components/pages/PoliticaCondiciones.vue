<template>
    <div class="caja columna">

        <div v-if="modo==='politica'">
            <p><strong>POLÍTICA DE PRIVACIDAD</strong></p>
            <p>El presente Política de Privacidad establece los términos en que medusap usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta compañía está comprometida con la seguridad de los datos de sus usuarios.</p>
            <p><strong>Información que es recogida</strong></p>
            <p>Nuestro sitio web podrá recoger información personal por ejemplo: su dirección de correo electrónica.</p>
            <p><strong>Uso de la información recogida</strong></p>
            <p>Nuestro sitio web no recoge ningún tipo de información confidencial, solo el email de la cuenta con la que te registres.</p>
            <p><strong>Cookies</strong></p>
            <p>Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.</p>
            <p>Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente noticias. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.</p>
            <p><strong>Enlaces a Terceros</strong></p>
            <p>Este sitio web pudiera contener en laces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.</p>
            <p><strong>Control de su información personal</strong></p>
            <p>En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web.&nbsp; Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico. &nbsp;En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.</p>
            <p>Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.</p>
            <p>medusap Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.</p>

        </div>
        <div v-else>
            <h2>Términos de la Cuenta</h2>

            Para acceder y utilizar los Servicios, debe registrarse usando una cuenta de Google, por lo que no tiene que proporcionar ningún tipo de información extra. Medusapp puede rechazar su solicitud de Cuenta o cancelar una Cuenta existente por cualquier motivo, a nuestra entera discreción.
            Usted es responsable de toda actividad y contenido que realice con su cuenta en medusapp.

            Usted es responsable de su Cuenta. Recuerde que si viola estos términos podemos cancelar su servicio.

        </div>

        <router-link to="login" class="btn" replace>Volver al Inicio</router-link>

    </div>
</template>

<script>
export default {
    name: "PoliticaCondiciones",
    props:{
        modo:{
            type:String,
            default: "politica"
        }
    }
}
</script>

<style scoped lang="sass">
    .caja
      @include scroll-bar
      width: calc(100% - #{$margen * 4})
      max-width: 600px
      overflow-y: scroll
      text-align: justify
      text-justify: inter-word

    .btn
      display: block
      text-decoration: none
      margin-top: 20px


    @media (max-width: $mobile)
      .btn
        position: fixed
        bottom: 15px
        left: 50%
        transform: translateX(-50%)
</style>