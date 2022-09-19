import {Controller, Get, METHOD_METADATA, PATH_METADATA, Post} from './Decorators'

@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world';
  }

  @Post('/b')
  somePostMethod() {
  }
}

function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
    .filter(item => !isConstructor(item) && isFunction(prototype[item]))
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)
    return {
      route,
      method,
      fn,
      methodName
    }
  })
}

function isConstructor(name: string) {
  return name === 'constructor'
}

function isFunction(fun: Function) {
  return typeof fun === 'function'
}
