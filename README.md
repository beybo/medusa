<p align="center">
  <img src="/src/assets/img/LogoMedusa.svg" width="300"/>
</p>

<h1 align="center">Medusa</h1>

Servidor para medusa alojado en [medusa-server](https://github.com/beybo/medusa-server)

Es necesario que definas las siguientes variables de entorno:

|Nombre|Valor|
|------|-----|
|VUE_APP_G_AUTH_ID|ID de autorización de la APP de Google|
|VUE_APP_MEDUSA_SERVER_URL|Url del servidor de medusa|
|VUE_APP_SENTRY_DSN|Url para la integración con Sentry, no es obligatorio.|

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
