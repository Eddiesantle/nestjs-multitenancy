import { TicketKind } from "@prisma/client";
import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";

export class ReserveSpotRequest {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    spots: string[]; //ex: [A1, A2]

    @IsNotEmpty()
    @IsString()
    @IsIn(['full', 'half'])
    ticket_kind: TicketKind
    email: string
}