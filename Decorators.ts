import 'reflect-metadata'
export const METHOD_METADATA = 'method'
export const PATH_METADATA = 'path'

export const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
  }
}

export const Get = createMappingDecorator('GET');
export const Post = createMappingDecorator('POST');
