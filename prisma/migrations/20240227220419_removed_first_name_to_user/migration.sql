/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("active", "email", "emailVerified", "id", "image", "name", "password") SELECT "active", "email", "emailVerified", "id", "image", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
