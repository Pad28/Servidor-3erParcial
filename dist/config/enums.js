"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events_change_db_mqtt = exports.Events_send_mqtt = exports.Events_get_db_mqtt = exports.Events_get_mqtt = exports.Dispositivos = void 0;
var Dispositivos;
(function (Dispositivos) {
    Dispositivos["PERCIANAS"] = "PERCIANAS";
    Dispositivos["ALARMA"] = "ALARMA";
    Dispositivos["ALARMABEBE"] = "ALARMABEBE";
    Dispositivos["PUERTAMASCOTA"] = "PUERTAMASCOTA";
    Dispositivos["TENDEDERO"] = "TENDEDERO";
    Dispositivos["JARDIN"] = "JARDIN";
    Dispositivos["LUZ"] = "LUZ";
    Dispositivos["ENERGIA"] = "ENERGIA";
    Dispositivos["DISPENSADORALIMENTOS"] = "DISPENSADORALIMENTOS";
    Dispositivos["AGUA"] = "AGUA";
    Dispositivos["TIMBRE"] = "TIMBRE";
    Dispositivos["TEMPERATURA"] = "TEMPERATURA";
    Dispositivos["TINACO"] = "TINACO";
    Dispositivos["CISTERNA"] = "CISTERNA";
    Dispositivos["PUERTA"] = "PUERTA";
    Dispositivos["ESCALERAS"] = "ESCALERAS";
    Dispositivos["REFRIGERADOR"] = "REFRIGERADOR";
    Dispositivos["DETECTORHUMO"] = "DETECTOR_HUMO";
    Dispositivos["DETECTORGAS"] = "DETECTOR_GAS";
})(Dispositivos || (exports.Dispositivos = Dispositivos = {}));
var Events_get_mqtt;
(function (Events_get_mqtt) {
    Events_get_mqtt["LED_GET_ESTADO_PERCIANAS"] = "GET_PERCIANAS";
    Events_get_mqtt["LED_GET_ESTADO_ALARMA"] = "GET_ALARMA";
    Events_get_mqtt["LED_GET_ESTADO_ALARMABEBE"] = "GET_ALARMABEBE";
    Events_get_mqtt["LED_GET_ESTADO_PUERTAMASCOTA"] = "GET_PUERTAMASCOTA";
    Events_get_mqtt["LED_GET_ESTADO_TENDEDERO"] = "GET_TENDEDERO";
    Events_get_mqtt["LED_GET_ESTADO_JARDIN"] = "GET_JARDIN";
    Events_get_mqtt["LED_GET_ESTADO_LUZ"] = "GET_LUZ";
    Events_get_mqtt["LED_GET_ESTADO_ENERGIA"] = "GET_ENERGIA";
    Events_get_mqtt["LED_GET_ESTADO_DISPENSADORALIMENTOS"] = "GET_DISPENSADORALIMENTOS";
    Events_get_mqtt["LED_GET_ESTADO_AGUA"] = "GET_AGUA";
    Events_get_mqtt["LED_GET_ESTADO_TIMBRE"] = "GET_TIMBRE";
    Events_get_mqtt["LED_GET_ESTADO_TEMPERATURA"] = "GET_TEMPERATURA";
    Events_get_mqtt["LED_GET_ESTADO_TINACO"] = "GET_TINACO";
    Events_get_mqtt["LED_GET_ESTADO_CISTERNA"] = "GET_CISTERNA";
    Events_get_mqtt["LED_GET_ESTADO_PUERTA"] = "GET_PUERTA";
    Events_get_mqtt["LED_GET_ESTADO_ESCALERAS"] = "GET_ESCALERAS";
    Events_get_mqtt["LED_GET_ESTADO_REFRIGERADOR"] = "GET_REFRIGERADOR";
    Events_get_mqtt["LED_GET_ESTADO_DETECTORHUMO"] = "GET_DETECTORHUMO";
    Events_get_mqtt["LED_GET_ESTADO_DETECTORGAS"] = "GET_DETECTORGAS";
})(Events_get_mqtt || (exports.Events_get_mqtt = Events_get_mqtt = {}));
var Events_get_db_mqtt;
(function (Events_get_db_mqtt) {
    Events_get_db_mqtt["LED_GET_DB_PERCIANAS"] = "GET_PERCIANAS";
    Events_get_db_mqtt["LED_GET_DB_ALARMA"] = "GET_ALARMA";
    Events_get_db_mqtt["LED_GET_DB_ALARMABEBE"] = "GET_ALARMABEBE";
    Events_get_db_mqtt["LED_GET_DB_PUERTAMASCOTA"] = "GET_PUERTAMASCOTA";
    Events_get_db_mqtt["LED_GET_DB_TENDEDERO"] = "GET_TENDEDERO";
    Events_get_db_mqtt["LED_GET_DB_JARDIN"] = "GET_JARDIN";
    Events_get_db_mqtt["LED_GET_DB_LUZ"] = "GET_LUZ";
    Events_get_db_mqtt["LED_GET_DB_ENERGIA"] = "GET_ENERGIA";
    Events_get_db_mqtt["LED_GET_DB_DISPENSADORALIMENTOS"] = "GET_DISPENSADORALIMENTOS";
    Events_get_db_mqtt["LED_GET_DB_AGUA"] = "GET_AGUA";
    Events_get_db_mqtt["LED_GET_DB_TIMBRE"] = "GET_TIMBRE";
    Events_get_db_mqtt["LED_GET_DB_TEMPERATURA"] = "GET_TEMPERATURA";
    Events_get_db_mqtt["LED_GET_DB_TINACO"] = "GET_TINACO";
    Events_get_db_mqtt["LED_GET_DB_CISTERNA"] = "GET_CISTERNA";
    Events_get_db_mqtt["LED_GET_DB_PUERTA"] = "GET_PUERTA";
    Events_get_db_mqtt["LED_GET_DB_ESCALERAS"] = "GET_ESCALERAS";
    Events_get_db_mqtt["LED_GET_DB_REFRIGERADOR"] = "GET_REFRIGERADOR";
    Events_get_db_mqtt["LED_GET_DB_DETECTORHUMO"] = "GET_DETECTORHUMO";
    Events_get_db_mqtt["LED_GET_DB_DETECTORGAS"] = "GET_DETECTORGAS";
})(Events_get_db_mqtt || (exports.Events_get_db_mqtt = Events_get_db_mqtt = {}));
var Events_send_mqtt;
(function (Events_send_mqtt) {
    Events_send_mqtt["LED_SEND_ESTADO_PERCIANAS"] = "SEND_PERCIANAS";
    Events_send_mqtt["LED_SEND_ESTADO_ALARMA"] = "SEND_ALARMA";
    Events_send_mqtt["LED_SEND_ESTADO_ALARMABEBE"] = "SEND_ALARMABEBE";
    Events_send_mqtt["LED_SEND_ESTADO_PUERTAMASCOTA"] = "SEND_PUERTAMASCOTA";
    Events_send_mqtt["LED_SEND_ESTADO_TENDEDERO"] = "SEND_TENDEDERO";
    Events_send_mqtt["LED_SEND_ESTADO_JARDIN"] = "SEND_JARDIN";
    Events_send_mqtt["LED_SEND_ESTADO_LUZ"] = "SEND_LUZ";
    Events_send_mqtt["LED_SEND_ESTADO_ENERGIA"] = "SEND_ENERGIA";
    Events_send_mqtt["LED_SEND_ESTADO_DISPENSADORALIMENTOS"] = "SEND_DISPENSADORALIMENTOS";
    Events_send_mqtt["LED_SEND_ESTADO_AGUA"] = "SEND_AGUA";
    Events_send_mqtt["LED_SEND_ESTADO_TIMBRE"] = "SEND_TIMBRE";
    Events_send_mqtt["LED_SEND_ESTADO_TEMPERATURA"] = "SEND_TEMPERATURA";
    Events_send_mqtt["LED_SEND_ESTADO_TINACO"] = "SEND_TINACO";
    Events_send_mqtt["LED_SEND_ESTADO_CISTERNA"] = "SEND_CISTERNA";
    Events_send_mqtt["LED_SEND_ESTADO_PUERTA"] = "SEND_PUERTA";
    Events_send_mqtt["LED_SEND_ESTADO_ESCALERAS"] = "SEND_ESCALERAS";
    Events_send_mqtt["LED_SEND_ESTADO_REFRIGERADOR"] = "SEND_REFRIGERADOR";
    Events_send_mqtt["LED_SEND_ESTADO_DETECTORHUMO"] = "SEND_DETECTORHUMO";
    Events_send_mqtt["LED_SEND_ESTADO_DETECTORGAS"] = "SEND_DETECTORGAS";
})(Events_send_mqtt || (exports.Events_send_mqtt = Events_send_mqtt = {}));
(function (Events_send_mqtt) {
    Events_send_mqtt["LED_SEND_DB_PERCIANAS"] = "SEND_PERCIANAS";
    Events_send_mqtt["LED_SEND_DB_ALARMA"] = "SEND_ALARMA";
    Events_send_mqtt["LED_SEND_DB_ALARMABEBE"] = "SEND_ALARMABEBE";
    Events_send_mqtt["LED_SEND_DB_PUERTAMASCOTA"] = "SEND_PUERTAMASCOTA";
    Events_send_mqtt["LED_SEND_DB_TENDEDERO"] = "SEND_TENDEDERO";
    Events_send_mqtt["LED_SEND_DB_JARDIN"] = "SEND_JARDIN";
    Events_send_mqtt["LED_SEND_DB_LUZ"] = "SEND_LUZ";
    Events_send_mqtt["LED_SEND_DB_ENERGIA"] = "SEND_ENERGIA";
    Events_send_mqtt["LED_SEND_DB_DISPENSADORALIMENTOS"] = "SEND_DISPENSADORALIMENTOS";
    Events_send_mqtt["LED_SEND_DB_AGUA"] = "SEND_AGUA";
    Events_send_mqtt["LED_SEND_DB_TIMBRE"] = "SEND_TIMBRE";
    Events_send_mqtt["LED_SEND_DB_TEMPERATURA"] = "SEND_TEMPERATURA";
    Events_send_mqtt["LED_SEND_DB_TINACO"] = "SEND_TINACO";
    Events_send_mqtt["LED_SEND_DB_CISTERNA"] = "SEND_CISTERNA";
    Events_send_mqtt["LED_SEND_DB_PUERTA"] = "SEND_PUERTA";
    Events_send_mqtt["LED_SEND_DB_ESCALERAS"] = "SEND_ESCALERAS";
    Events_send_mqtt["LED_SEND_DB_REFRIGERADOR"] = "SEND_REFRIGERADOR";
    Events_send_mqtt["LED_SEND_DB_DETECTORHUMO"] = "SEND_DETECTORHUMO";
    Events_send_mqtt["LED_SEND_DB_DETECTORGAS"] = "SEND_DETECTORGAS";
})(Events_send_mqtt || (exports.Events_send_mqtt = Events_send_mqtt = {}));
var Events_change_db_mqtt;
(function (Events_change_db_mqtt) {
    Events_change_db_mqtt["LED_CHANGE_DB"] = "LED_CHANGE_DB";
})(Events_change_db_mqtt || (exports.Events_change_db_mqtt = Events_change_db_mqtt = {}));
