import {OnEvent} from '@nestjs/event-emitter';
import {AppConfigService} from "../../../../config/app/config.service"
import {MailService} from "../../../../providers/email/provider.service"

import {
    Logger,
    Injectable
} from "@nestjs/common"

import {
    ReservationCreatedEvent,
    EVENT_RESERVATION_CREATED,
} from "../reservationCreated.event"

@Injectable()
export class ReservationCreatedListener {
    private readonly logger = new Logger(ReservationCreatedListener.name);

    constructor(
        private readonly mailService: MailService,
        private readonly appConfig: AppConfigService
    ) {
    }

    @OnEvent(EVENT_RESERVATION_CREATED)
    generateAdminNotificationsOnReservationCreated(event: ReservationCreatedEvent) {
        this.logger.debug(
            `Generate admins notifications on reservation created ${JSON.stringify(
                event,
            )}.`,
        );
    }

    @OnEvent(EVENT_RESERVATION_CREATED)
    sendEmailOnReservationCreated(event: ReservationCreatedEvent) {
        this.logger.debug(
            `Send admin emails on class created ${JSON.stringify(event)}.`,
        );

        // it must be done using the queue
        return this.mailService.send({
            to: '',
            subject: 'Thank you for you reservation.',
            body: `Hi there,\n\n Here will be some messages.`,
        })
    }
}
