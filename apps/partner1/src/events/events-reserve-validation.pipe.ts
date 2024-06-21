
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ReserveSpotRequest } from './request/reserve-spot.request';

@Injectable()
export class EventsReserveValidationPipe implements PipeTransform {
    transform(value: ReserveSpotRequest, metadata: ArgumentMetadata) {
        this.validate(value);
        return value;
    }

    private validate(value: any) {

        if (!value.spots || !Array.isArray(value.spots) || value.spots.length === 0) {
            throw new BadRequestException('Spots must be a non-empty array of strings.');
        }

        if (!value.ticket_kind || (value.ticket_kind !== 'full' && value.ticket_kind !== 'half')) {
            throw new BadRequestException('Ticket kind must be either "full" or "half".');
        }
    }


}
