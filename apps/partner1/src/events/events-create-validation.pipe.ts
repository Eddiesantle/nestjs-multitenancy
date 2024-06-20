import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateEventRequest } from './request/create-event.request';

@Injectable()
export class EventsCreateValidationPipe implements PipeTransform {
    transform(value: CreateEventRequest, metadata: ArgumentMetadata) {
        const errors = [];

        // Validação do campo 'name'
        if (!value.name || typeof value.name !== 'string' || value.name.length > 255) {
            errors.push({
                field: 'name',
                message: 'Name is required, should be a string, and a maximum of 255 characters.',
            });
        }

        // Validação do campo 'description'
        if (!value.description || typeof value.description !== 'string' || value.description.length > 255) {
            errors.push({
                field: 'description',
                message: 'Description is required, should be a string, and a maximum of 255 characters.',
            });
        }

        // Validação do campo 'date'
        if (!value.date || !this.isValidISODate(value.date)) {
            errors.push({
                field: 'date',
                message: 'Date is required and should be in ISO8601 format.',
            });
        }

        // Validação do campo 'price'
        if (value.price === undefined || typeof value.price !== 'number' || value.price < 0) {
            errors.push({
                field: 'price',
                message: 'Price is required, should be a number, and should be 0 or greater.',
            });
        }

        if (errors.length > 0) {
            throw new HttpException({ statusCode: 422, message: 'Validation Failed', errors }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return value;
    }

    private isValidISODate(date: string): boolean {
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
        return isoDateRegex.test(date);
    }
}
