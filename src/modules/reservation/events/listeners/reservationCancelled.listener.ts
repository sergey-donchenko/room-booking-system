import {MailService} from "../../../../providers/email/provider.service";
import {AppConfigService} from "../../../../config/app/config.service";
import {OnEvent} from "@nestjs/event-emitter";

import {
    CacheStore,
    CACHE_MANAGER
} from "@nestjs/cache-manager"

import {
    Logger,
    Inject,
    Injectable
} from "@nestjs/common"

import {
    EVENT_RESERVATION_CANCELLED,
    ReservationCancelledEvent
} from "../reservationCancelled.event"

@Injectable()
export class ReservationCancelledListener {
    private readonly logger = new Logger(ReservationCancelledListener.name);

    constructor(
        private readonly mailService: MailService,
        private readonly appConfig: AppConfigService,
        @Inject(CACHE_MANAGER) protected readonly cacheManager: CacheStore
    ) {
    }

    @OnEvent(EVENT_RESERVATION_CANCELLED)
    generateAdminNotificationsOnReservationCreated(event: ReservationCancelledEvent) {
        this.logger.debug(
            `Generate admins notifications on reservation cancelled ${JSON.stringify(
                event,
            )}.`,
        );
    }

    @OnEvent(EVENT_RESERVATION_CANCELLED)
    clearCache(event: ReservationCancelledEvent) {
        this.logger.debug(
            `Clear related to the reservation cache ${JSON.stringify(event)}.`,
        );

    }
}