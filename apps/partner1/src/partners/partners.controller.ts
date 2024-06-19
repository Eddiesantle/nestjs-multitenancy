import { AuthGuard } from '@app/core/auth/auth.guard';
import { PartnersService } from '@app/core/partners/partners.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePartnerRequest } from './request/create-partner.request';

@UseGuards(AuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) { }

  @Post()
  create(
    @Body() createPartnerRequest: CreatePartnerRequest,
    @Req() req: any) {
    return this.partnersService.create({
      ...createPartnerRequest,
      userId: req.user.id
    });
  }

  // Feito apenas por conveniência para listar os partners
  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.partnersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePartnerRequest: UpdatePartnerRequest) {
  //   return this.partnersService.update(+id, updatePartnerRequest);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.partnersService.remove(+id);
  // }
}
