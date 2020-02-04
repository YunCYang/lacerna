CREATE TABLE "user" (
	"userId" serial NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"userType" bool NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "product" (
	"productId" serial NOT NULL,
	"productName" varchar(255) NOT NULL,
	"price" int NOT NULL,
	"description" TEXT NOT NULL,
	"detail" TEXT NOT NULL,
  "image1" varchar(255) NOT NULL,
  "image2" varchar(255) NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "product_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "type" (
	"typeId" serial NOT NULL,
	"typeName" varchar(255) NOT NULL,
	CONSTRAINT "type_pk" PRIMARY KEY ("typeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "productGroup" (
	"productId" serial NOT NULL,
	"typeId" serial NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cart" (
	"cartId" serial NOT NULL,
	"userId" int DEFAULT NULL,
  "sessionId" int,
	"status" bool,
  "login" bool,
	"createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cartProduct" (
	"cartId" serial NOT NULL,
	"productId" serial NOT NULL,
  "size" varchar(255) NOT NULL
) WITH (
  OIDS=FALSE
);






ALTER TABLE "productGroup" ADD CONSTRAINT "productGroup_fk0" FOREIGN KEY ("productId") REFERENCES "product"("productId");
ALTER TABLE "productGroup" ADD CONSTRAINT "productGroup_fk1" FOREIGN KEY ("typeId") REFERENCES "type"("typeId");

ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");

ALTER TABLE "cartProduct" ADD CONSTRAINT "cartProduct_fk0" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "cartProduct" ADD CONSTRAINT "cartProduct_fk1" FOREIGN KEY ("productId") REFERENCES "product"("productId");
