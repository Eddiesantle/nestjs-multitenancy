// src/events/pipes/events-create-validation.pipe.ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateEventRequest } from './request/create-event.request';


@Injectable()
export class EventsCreateValidationPipe implements PipeTransform {
    async transform(value: CreateEventRequest, metadata: ArgumentMetadata) {
        const object = plainToClass(CreateEventRequest, value);

        console.log('EventsCreateValidationPipe -> transform -> value', value)

        const errors = await validate(object);

        if (errors.length > 0) {
            const errorMessage = this.buildErrorMessage(errors);
            throw new BadRequestException(errorMessage);
        }

        return object;
    }

    private buildErrorMessage(errors: any[]): string {
        const messages = errors.map(error => {
            const constraints = Object.values(error.constraints);
            return constraints.join('; ');
        });

        return messages.join('; ');
    }
}
