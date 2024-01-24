import { UserEntity } from "./entities"
import { UsersService } from "./services"
import { UserController } from "./controllers"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Module, forwardRef } from "@nestjs/common"

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  controllers: [ UserController ],
  providers: [
    UsersService
  ],
  exports: [
    UsersService
  ],
})
export class UserModule {}
