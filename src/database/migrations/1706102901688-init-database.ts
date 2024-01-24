import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1706102901688 implements MigrationInterface {
    name = 'Migrations1706102901688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "fullname" character varying, "address" character varying, "phone" character varying, "status" integer DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotel_rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "status" integer DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hotelId" uuid, CONSTRAINT "PK_1d226a170f53beff6c64f10c3ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP NOT NULL DEFAULT now(), "status" integer DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roomId" uuid, "userId" uuid, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "stars" integer DEFAULT '3', "address" character varying, "status" integer DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "hotel_rooms" ADD CONSTRAINT "FK_a10b91436965811dd2e1c402511" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14" FOREIGN KEY ("roomId") REFERENCES "hotel_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_73fa8fb7243b56914e00f8a0b14"`);
        await queryRunner.query(`ALTER TABLE "hotel_rooms" DROP CONSTRAINT "FK_a10b91436965811dd2e1c402511"`);
        await queryRunner.query(`DROP TABLE "hotels"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
        await queryRunner.query(`DROP TABLE "hotel_rooms"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
