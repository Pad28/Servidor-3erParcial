"use strict";
// export enum Events_get {
//     LED_GET_ESTADO_TENDEDERO = "LED_GET_ESTADO_TENDEDERO",
//     LED_GET_ESTADO_JARDIN = "LED_GET_ESTADO_JARDIN",
//     LED_GET_ESTADO_TIMBRE = "LED_GET_ESTADO_TIMBRE",
//     LED_GET_ESTADO_TEMPERATURA = "LED_GET_ESTADO_TEMPERATURA",
//     LED_GET_ESTADO_TINACO = "LED_GET_ESTADO_TINACO",
//     LED_GET_ESTADO_NIVEL_BOMBA_AGUA = "LED_GET_ESTADO_AGUA",
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events_send_mqtt = exports.Events_get_mqtt = exports.Dispositivos = void 0;
// export enum Events_send {
//     LED_SEND_ESTADO_TENDEDERO = "LED_SEND_ESTADO_TENDEDERO",
//     LED_SEND_ESTADO_JARDIN = "LED_SEND_ESTADO_JARDIN",
//     LED_SEND_ESTADO_TIMBRE = "LED_SEND_ESTADO_TIMBRE",
//     LED_SEND_ESTADO_TEMPERATURA = "LED_SEND_ESTADO_TEMPERATURA",
//     LED_SEND_ESTADO_TINACO = "LED_SEND_ESTADO_TINACO",
//     LED_SEND_ESTADO_NIVEL_BOMBA_AGUA = "LED_SEND_ESTADO_NIVEL_BOMBA_AGUA",
// }
// export enum Events_set {
//     LED_SET_ESTADO_TENDEDERO = "LED_SET_ESTADO_TENDEDERO",
//     LED_SET_ESTADO_JARDIN = "LED_SET_ESTADO_JARDIN",
//     LED_SET_ESTADO_TIMBRE = "LED_SET_ESTADO_TIMBRE",
//     LED_SET_ESTADO_TEMPERATURA = "LED_SET_ESTADO_TEMPERATURA",
//     LED_SET_ESTADO_TINACO = "LED_SET_ESTADO_TINACO",
//     LED_SET_ESTADO_NIVEL_BOMBA_AGUA = "LED_SET_ESTADO_NIVEL_BOMBA_AGUA",
// }
var Dispositivos;
(function (Dispositivos) {
    Dispositivos["PERCIANAS"] = "PERCIANAS";
    Dispositivos["ALARMA"] = "ALARMA";
    Dispositivos["ALARMA_BEBE"] = "ALARMA_BEBE";
    Dispositivos["PUERTA_MASCOTA"] = "PUERTA_MASCOTA";
    Dispositivos["TENDEDERO"] = "TENDEDERO";
    Dispositivos["JARDIN"] = "JARDIN";
    Dispositivos["LUZ"] = "LUZ";
    Dispositivos["ENERGIA"] = "ENERGIA";
    Dispositivos["DISPENSADOR_ALIMENTOS"] = "DISPENSADOR_ALIMENTOS";
    Dispositivos["AGUA"] = "AGUA";
    Dispositivos["TIMBRE"] = "TIMBRE";
    Dispositivos["TEMPERATURA"] = "TEMPERATURA";
    Dispositivos["TINACO"] = "TINACO";
    Dispositivos["CISTERNA"] = "CISTERNA";
    Dispositivos["PUERTA"] = "PUERTA";
    Dispositivos["ESCALERAS"] = "ESCALERAS";
    Dispositivos["REFRIGERADOR"] = "REFRIGERADOR";
    Dispositivos["DETECTOR_HUMO"] = "DETECTOR_HUMO";
    Dispositivos["DETECTOR_GAS"] = "DETECTOR_GAS";
})(Dispositivos || (exports.Dispositivos = Dispositivos = {}));
var Events_get_mqtt;
(function (Events_get_mqtt) {
    Events_get_mqtt["GET_PERCIANAS"] = "GET_PERCIANAS";
    Events_get_mqtt["GET_ALARMA"] = "GET_ALARMA";
    Events_get_mqtt["GET_ALARMA_BEBE"] = "GET_ALARMA_BEBE";
    Events_get_mqtt["GET_PUERTA_MASCOTA"] = "GET_PUERTA_MASCOTA";
    Events_get_mqtt["GET_TENDEDERO"] = "GET_TENDEDERO";
    Events_get_mqtt["GET_JARDIN"] = "GET_JARDIN";
    Events_get_mqtt["GET_LUZ"] = "GET_LUZ";
    Events_get_mqtt["GET_ENERGIA"] = "GET_ENERGIA";
    Events_get_mqtt["GET_DISPENSADOR_ALIMENTOS"] = "GET_DISPENSADOR_ALIMENTOS";
    Events_get_mqtt["GET_AGUA"] = "GET_AGUA";
    Events_get_mqtt["GET_TIMBRE"] = "GET_TIMBRE";
    Events_get_mqtt["GET_TEMPERATURA"] = "GET_TEMPERATURA";
    Events_get_mqtt["GET_TINACO"] = "GET_TINACO";
    Events_get_mqtt["GET_CISTERNA"] = "GET_CISTERNA";
    Events_get_mqtt["GET_PUERTA"] = "GET_PUERTA";
    Events_get_mqtt["GET_ESCALERAS"] = "GET_ESCALERAS";
    Events_get_mqtt["GET_REFRIGERADOR"] = "GET_REFRIGERADOR";
    Events_get_mqtt["GET_DETECTOR_HUMO"] = "GET_DETECTOR_HUMO";
    Events_get_mqtt["GET_DETECTOR_GAS"] = "GET_DETECTOR_GAS";
})(Events_get_mqtt || (exports.Events_get_mqtt = Events_get_mqtt = {}));
var Events_send_mqtt;
(function (Events_send_mqtt) {
    Events_send_mqtt["SEND_PERCIANAS"] = "SEND_PERCIANAS";
    Events_send_mqtt["SEND_ALARMA"] = "SEND_ALARMA";
    Events_send_mqtt["SEND_ALARMA_BEBE"] = "SEND_ALARMA_BEBE";
    Events_send_mqtt["SEND_PUERTA_MASCOTA"] = "SEND_PUERTA_MASCOTA";
    Events_send_mqtt["SEND_TENDEDERO"] = "SEND_TENDEDERO";
    Events_send_mqtt["SEND_JARDIN"] = "SEND_JARDIN";
    Events_send_mqtt["SEND_LUZ"] = "SEND_LUZ";
    Events_send_mqtt["SEND_ENERGIA"] = "SEND_ENERGIA";
    Events_send_mqtt["SEND_DISPENSADOR_ALIMENTOS"] = "SEND_DISPENSADOR_ALIMENTOS";
    Events_send_mqtt["SEND_AGUA"] = "SEND_AGUA";
    Events_send_mqtt["SEND_TIMBRE"] = "SEND_TIMBRE";
    Events_send_mqtt["SEND_TEMPERATURA"] = "SEND_TEMPERATURA";
    Events_send_mqtt["SEND_TINACO"] = "SEND_TINACO";
    Events_send_mqtt["SEND_CISTERNA"] = "SEND_CISTERNA";
    Events_send_mqtt["SEND_PUERTA"] = "SEND_PUERTA";
    Events_send_mqtt["SEND_ESCALERAS"] = "SEND_ESCALERAS";
    Events_send_mqtt["SEND_REFRIGERADOR"] = "SEND_REFRIGERADOR";
    Events_send_mqtt["SEND_DETECTOR_HUMO"] = "SEND_DETECTOR_HUMO";
    Events_send_mqtt["SEND_DETECTOR_GAS"] = "SEND_DETECTOR_GAS";
})(Events_send_mqtt || (exports.Events_send_mqtt = Events_send_mqtt = {}));
