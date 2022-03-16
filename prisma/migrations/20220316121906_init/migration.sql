-- CreateIndex
CREATE INDEX "Post_authorId_title_idx" ON "Post"("authorId", "title");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
