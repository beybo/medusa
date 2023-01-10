<p align="center">
  <img src="/src/assets/img/LogoMedusa.svg" width="300"/>
</p>

<h1 align="center">Medusa</h1>

Servidor para medusa alojado en [medusa-server](https://github.com/jorrhe/medusa-server).

Es necesario definir las siguientes variables de entorno:

|Nombre|Valor|
|------|-----|
|VUE_APP_G_AUTH_ID|ID de autorización de la APP de Google|
|VUE_APP_MEDUSA_SERVER_URL|Url del servidor de medusa|
|VUE_APP_SENTRY_DSN|Url para la integración con Sentry, no es obligatorio.|

## Instalar todas las dependencias

```
yarn install
```

### Compila y lanza un servidor de desarrollo

```
yarn serve
```

### Compila y minimiza para producción

```
yarn build
```
