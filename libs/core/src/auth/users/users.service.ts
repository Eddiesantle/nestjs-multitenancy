import { PrismaService } from '@app/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateCommonUserDto } from './dtos/create-common-user.dto';
import { CreatePartnerUserDto } from './dtos/create-partner-user.dto';
import { UserRoles } from './user-roles';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) { }
  createPatnerUser(data: CreatePartnerUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.PARTNER]
      }
    }
    )
  }

  createCommonUser(data: CreateCommonUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: [UserRoles.USER]
      }
    }
    )
  }

  findOne(idOrEmail: number | string) {
    return this.prismaService.user.findFirst({
      where: {
        ...(typeof idOrEmail === 'number' ? { id: idOrEmail } : { email: idOrEmail })
      }
    })
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10)
  }
}
