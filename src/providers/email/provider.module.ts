import { Module, Global } from "@nestjs/common"
import { MailService } from "./provider.service"
import { MailjetEmailProviderService } from "./providers"
import { MailConfigModule } from "../../config/mail/config.module"

@Global()
@Module({
    imports: [MailConfigModule],
    providers: [
        MailService,
        MailjetEmailProviderService
    ],
    exports: [MailService],
})
export class MailProviderModule {
}
