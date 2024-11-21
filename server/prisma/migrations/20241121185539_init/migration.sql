-- CreateTable
CREATE TABLE "Vaquinha" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Vaquinha_pkey" PRIMARY KEY ("id")
);
