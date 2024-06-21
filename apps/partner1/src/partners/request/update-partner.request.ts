import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerRequest } from './create-partner.request';

export class UpdatePartnerRequest extends PartialType(CreatePartnerRequest) { }
