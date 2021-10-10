import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { validate } from 'class-validator';
  import { plainToClass } from 'class-transformer';
  
  @Injectable()
  export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
      if (value instanceof Object && this.isEmpty(value)) {
        throw new HttpException(
          `Validation failed: No Body provided`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const { metatype } = metadata;
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
      const object = plainToClass(metatype, value);
      const errorsList = await validate(object);
      if (errorsList.length > 0) {
        const errors = [];
        console.log('error list', errorsList)

        for (const error of errorsList) {
          const errorsObject = error.constraints;
          console.log('error ', error)
          const { isNotEmpty } = errorsObject;
          if (isNotEmpty) {
            const parameter = isNotEmpty.split(' ')[0];
            errors.push({
              title: `The ${parameter} parameter is required.`,
              parameter: `${parameter}`,
            });
          }
        }
        if (errors.length > 0) {
          throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }
      }
      return value;
    }
  
    private toValidate(metatype): boolean {
      const types = [String, Boolean, Number, Array, Object];
      return !types.find(type => metatype === type);
    }
    private isEmpty(value: any) {
      if (Object.keys(value).length > 0) {
        return false;
      }
      return true;
    }
  }