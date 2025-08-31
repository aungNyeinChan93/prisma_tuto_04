/*
  Warnings:

  - The primary key for the `tests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_tests" ("id", "name") SELECT "id", "name" FROM "tests";
DROP TABLE "tests";
ALTER TABLE "new_tests" RENAME TO "tests";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
