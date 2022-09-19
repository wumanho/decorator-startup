"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = exports.Controller = exports.PATH_METADATA = exports.METHOD_METADATA = void 0;
require("reflect-metadata");
exports.METHOD_METADATA = 'method';
exports.PATH_METADATA = 'path';
const Controller = (path) => {
    return target => {
        Reflect.defineMetadata(exports.PATH_METADATA, path, target);
    };
};
exports.Controller = Controller;
const createMappingDecorator = (method) => (path) => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(exports.PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(exports.METHOD_METADATA, method, descriptor.value);
    };
};
exports.Get = createMappingDecorator('GET');
exports.Post = createMappingDecorator('POST');
