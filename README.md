
# Hearthstone Card Info App

Este proyecto es una aplicación de React que muestra información sobre cartas de Hearthstone. Utiliza microservicios para obtener datos de una API externa y almacenarlos en una caché Redis para un acceso más rápido.

## Arquitectura

El sistema consta de tres componentes principales:

1. **Microfrontend React**: Una interfaz de usuario para buscar y mostrar información sobre cartas de Hearthstone, basada en una arquitectura de microfrontends.
2. **Microservicio de Hearthstone**: Un servicio backend que consulta la API de Hearthstone para obtener datos de las cartas.
3. **Microservicio de Redis**: Un servicio backend que gestiona el almacenamiento en caché de los datos de las cartas.

## Requisitos

- Node.js
- npm o yarn
- Docker

## Instalación

Primero, clona el repositorio:

```bash
git clone https://github.com/elvisbrevi/redis_node_demo/
```

## Levanta los microservicios y microfrontends con docker compose
## Crea y ejecuta las imagenes
```bash
docker-compose up --build
```
## Solo ejecuta las imagenes
```bash
docker-compose up
```

## Levanta los microservicios y microfrontends individualmente de forma local
### Configurar y Ejecutar el Microservicio de Hearthstone

```bash
cd microservices
cd hearthstone-service
npm install
node hearthstone-service.js
```

### Configurar y Ejecutar el Microservicio de Redis

```bash
cd microservices
cd redis-service
npm install
node redis-service.js
```

### Configurar y Ejecutar el MicroFrontend del componente Card (remote)

```bash
cd microfrontends
cd card-component
npm install
npm run build
npm run serve
```

### Configurar y Ejecutar el MicroFrontend del App Card (host)

```bash
cd microfrontends
cd card-app
npm install
npm run build
npm run serve
```

## Uso

Abre tu navegador y ve a `http://localhost:5000/`. Ingresa el nombre de una carta de Hearthstone para buscar su información. La aplicación primero intentará obtener los datos de Redis y, si no están disponibles, los obtendrá de la API de Hearthstone y los almacenará en Redis durante 20 segundos.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, haz un fork del repositorio y envía un pull request con tus mejoras.

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.
