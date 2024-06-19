import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PartnersService } from './partners.service';

@UseGuards(AuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) { }

  @Post()
  create(
    @Body() createPartnerDto: CreatePartnerDto,
    @Req() req: any) {
    return this.partnersService.create({
      ...createPartnerDto,
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
  // update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
  //   return this.partnersService.update(+id, updatePartnerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.partnersService.remove(+id);
  // }
}
