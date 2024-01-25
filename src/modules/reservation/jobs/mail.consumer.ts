import {Job, Queue} from "bull"
import {Processor, Process, InjectQueue} from "@nestjs/bull"
import { QUEUE_MAIL} from "../../../common/constants/queue.constants"
import {MailService} from "../../../providers/email/provider.service";
import {HotelRoomsService} from "../../hotel/services";

@Processor(QUEUE_MAIL)
export class MailConsumer {
    constructor(
        private readonly mailService: MailService
    ) {}

    @Process('sendEmailOnReservationCreated')
    async sendEmailOnReservationCreated(job: Job<unknown>) {
        console.log('JOB --> ', job);
        return this.mailService.send({
            to: '',
            subject: 'Thank you for you reservation.',
            body: `Hi there,\n\n Here will be some messages.`,
        })
    }
}