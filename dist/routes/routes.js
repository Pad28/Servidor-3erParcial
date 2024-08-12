"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        return router;
    }
}
exports.AppRoutes = AppRoutes;
