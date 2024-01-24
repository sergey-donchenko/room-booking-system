import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706129018158 implements MigrationInterface {
    name = 'Migrations1706129018158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "Reservation_By_Room_And_Status" ON "reservations" ("roomId", "status", "startDate") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."Reservation_By_Room_And_Status"`);
    }

}
