import { Queue } from "bull"
import { InjectQueue } from "@nestjs/bull"
import { OnEvent } from "@nestjs/event-emitter"
import { HotelRoomsService } from "../../../hotel/services"
import { MailService } from "../../../../providers/email/provider.service"

import {
    Logger,
    Injectable
} from "@nestjs/common"

import {
    ReservationCreatedEvent,
    EVENT_RESERVATION_CREATED,
} from "../reservationCreated.event"
import {QUEUE_MAIL} from "../../../../common/constants/queue.constants";

@Injectable()
export class ReservationCreatedListener {
    private readonly logger = new Logger(ReservationCreatedListener.name);

    constructor(
        private readonly mailService: MailService,
        private readonly hotelRoomsService: HotelRoomsService,
        @InjectQueue(QUEUE_MAIL) private readonly mailQueue: Queue
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
            `Send admin emails on reservations ${JSON.stringify(event)}.`,
        );

        // Add job
        this.mailQueue.add('sendEmailOnReservationCreated', {
            to: '',
            subject: 'Thank you for you reservation.',
            body: `Hi there,\n\n Here will be some messages.`,
        }).then(() => this.logger.debug('Job successfully queued.'))
    }
}
