-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 100
);
INSERT INTO "new_Ingredient" ("id", "name") SELECT "id", "name" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
