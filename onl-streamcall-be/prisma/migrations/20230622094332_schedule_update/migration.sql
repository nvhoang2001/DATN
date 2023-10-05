-- AlterTable
ALTER TABLE "room" ADD COLUMN     "end_time" TIMESTAMP(3),
ADD COLUMN     "invited_emails" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "status" VARCHAR(255) NOT NULL DEFAULT 'open',
ADD COLUMN     "type" VARCHAR(255) NOT NULL DEFAULT 'public';
