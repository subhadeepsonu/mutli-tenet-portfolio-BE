-- AlterTable
CREATE SEQUENCE projects_index_seq;
ALTER TABLE "Projects" ALTER COLUMN "index" SET DEFAULT nextval('projects_index_seq');
ALTER SEQUENCE projects_index_seq OWNED BY "Projects"."index";
