-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_key" ON "Session"("session");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_session_fkey" FOREIGN KEY ("session") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
