-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "questions" TEXT NOT NULL,
    "workTitle" TEXT NOT NULL,
    "workMeta" TEXT NOT NULL,
    "workQuote" TEXT NOT NULL,
    "workDesc" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL DEFAULT '익명',
    "question" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_slug_key" ON "Artist"("slug");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
