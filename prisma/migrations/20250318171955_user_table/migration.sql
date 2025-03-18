-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_domain_key" ON "user"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
