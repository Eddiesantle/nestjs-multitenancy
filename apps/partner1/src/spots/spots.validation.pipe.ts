import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateSpotRequest } from './request/create-spot.request';

@Injectable()
export class SpotsValidationPipe implements PipeTransform {
    transform(value: CreateSpotRequest, metadata: ArgumentMetadata) {
        const errors = [];

        console.log('value.name', value.name)
        // Validação do campo 'name'
        if (!value.name || typeof value.name !== 'string' || value.name.length > 255) {
            errors.push({
                field: 'name',
                message: 'Name is required, should be a string, and a maximum of 255 characters.',
            });
        }

        if (errors.length > 0) {
            throw new HttpException(
                { statusCode: 422, message: 'Validation Failed', errors },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        return value;
    }
}
