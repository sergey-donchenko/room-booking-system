import {BullModule} from "@nestjs/bull"
import { Module, Global } from "@nestjs/common"
import { MailService } from "./provider.service"
import { MailjetEmailProviderService } from "./providers"
import { MailConfigModule } from "../../config/mail/config.module"
import {QUEUE_MAIL} from "../../common/constants/queue.constants";

@Global()
@Module({
    imports: [
        MailConfigModule,
        BullModule.registerQueue({
            name: QUEUE_MAIL
        })
    ],
    providers: [
        MailService,
        MailjetEmailProviderService
    ],
    exports: [MailService],
})
export class MailProviderModule {
}
