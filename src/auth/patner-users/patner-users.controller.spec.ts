import { Test, TestingModule } from '@nestjs/testing';
import { PatnerUsersController } from './patner-users.controller';

describe('PatnerUsersController', () => {
  let controller: PatnerUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatnerUsersController],
    }).compile();

    controller = module.get<PatnerUsersController>(PatnerUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
