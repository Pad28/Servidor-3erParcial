### Variables de entorno a declarar en archio .env
- DATABASE_URL

### Comandos
- `npx prisma migrate dev --name init`: Migrar base de datos.

### Lista de eventos socket
- `LED_GET_ESTADO_[nombre del dispositivo]`: Pedir estado actual del dispositivo, responde en el evento `LED_SEND_ESTADO_[nombre del dispositivo]`.
- `LED_GET_INFO_[nombre del dispositivo]`: Pedir informacion del dispositivo desde la base de datos, envia la informacion en formato JSON, responde en el evento `LED_SEND_INFO_[nombre del dispositivo]`.
- `LED_SET_ESTADO_[nombre del dispositivo]`: Invierte el estado del dispositivo(true/false), el MQTT tiene que estar subscrito a un topic con el mismo nombre, como payload recibe uno de estos valores:
    - ENCENDIDO
    - APAGADO
    - ABIERTO
    - CERRADO
- `LED_GET_EVENTS_[nombre del dispositivo]`: Pedir el historial de eventos de un dispisitivo, responde en el evento `LED_SEND_EVENTS_[nombre del dispositivo]`.


### Lista de topics MQTT
- `LED_GET_ESTADO_[nombre del dispositivo]`: Pedir el estado del dispositivo a la base de datos, responde en el topic: `LED_SEND_ESTADO_MQTT_[nombre del dispositivo]`.
- `LED_SEND_ESTADO_[nombre del dispositivo]`: Enviar el estado actual del dispositivo a un WebSocket con el mismo nombre para el evento.
- `LED_GET_DB_[nombre del dispositivo]`: Pedir la informacion del dispositivo en formato JSON a la base de datos, responde en el topic: `LED_SEND_DB_MQTT_[nombre del dispositivo]`.
- `LED_CHANGE_DB`: Puede ser emitido desde MQTT para realizar un cambio en la base de datos, como payload se debe enviar un objeto JSON:
```
{
    "dispositivo": string; // Nombre del dispositio
    "columna": string; // Nombre de la columna que se va a cambiar
    "valor": string; // El nuevo valor que se le va a poner a la columna
    "tipo": "number" | "string" | "float" | "boolean"; // El tipo de valor que debe ser alguno de los que estan indicados
}
```
por ejemplo: 
```
{
     "dispositivo": "TINACO",
     "columna": "nivel_agua",
     "valor": "20.1",
     "tipo": "float"
}
```
Al final este emitira un evento de WebSocket llamado `LED_CHANGE_DB` que contendra la información actualizada de la base de datos, este puede ser escuchado desde la app movil.

