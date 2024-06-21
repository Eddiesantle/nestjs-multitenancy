// src/events/pipes/events-create-validation.pipe.ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateEventRequest } from './request/update-event.request';


@Injectable()
export class EventsUptadeValidationPipe implements PipeTransform {
    async transform(value: UpdateEventRequest, metadata: ArgumentMetadata) {
        const object = plainToClass(UpdateEventRequest, value);

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
