CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "records" (
	"id" serial NOT NULL,
	"date" DATE NOT NULL DEFAULT 'CURRENT_DATE',
	"description" TEXT NOT NULL,
	"value" integer NOT NULL,
	"type" TEXT NOT NULL,
	CONSTRAINT "records_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_records" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"record_id" integer NOT NULL,
	CONSTRAINT "users_records_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


ALTER TABLE "users_records" ADD CONSTRAINT "users_records_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_records" ADD CONSTRAINT "users_records_fk1" FOREIGN KEY ("record_id") REFERENCES "records"("id");





