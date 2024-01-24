import { UserEntity } from "./entities"
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

  ],
  exports: [

  ],
})
export class UserModule {}
