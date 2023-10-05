/*
  Warnings:

  - You are about to drop the column `fullname` on the `user` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "fullname",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "birthday" VARCHAR(255),
ADD COLUMN     "firstname" VARCHAR(255) NOT NULL,
ADD COLUMN     "gender" VARCHAR(255),
ADD COLUMN     "lastname" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(255);
