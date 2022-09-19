"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Decorators_1 = require("./Decorators");
let SomeClass = class SomeClass {
    someGetMethod() {
        return 'hello world';
    }
    somePostMethod() {
    }
};
__decorate([
    (0, Decorators_1.Get)('/a'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SomeClass.prototype, "someGetMethod", null);
__decorate([
    (0, Decorators_1.Post)('/b'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SomeClass.prototype, "somePostMethod", null);
SomeClass = __decorate([
    (0, Decorators_1.Controller)('/test')
], SomeClass);
function mapRoute(instance) {
    const prototype = Object.getPrototypeOf(instance);
    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
        .filter(item => !isConstructor(item) && isFunction(prototype[item]));
    return methodsNames.map(methodName => {
        const fn = prototype[methodName];
        // 取出定义的 metadata
        const route = Reflect.getMetadata(Decorators_1.PATH_METADATA, fn);
        const method = Reflect.getMetadata(Decorators_1.METHOD_METADATA, fn);
        return {
            route,
            method,
            fn,
            methodName
        };
    });
}
function isConstructor(name) {
    return name === 'constructor';
}
function isFunction(fun) {
    console.log(typeof fun === 'function');
    return typeof fun === 'function';
}
const prototype = Object.getPrototypeOf(new SomeClass());
console.log(typeof prototype['someGetMethod']);
console.log(Object.getOwnPropertyNames(prototype));
