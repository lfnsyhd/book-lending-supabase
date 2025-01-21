/*
 Navicat Premium Dump SQL

 Source Server         : postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 170002 (170002)
 Source Host           : localhost:5432
 Source Catalog        : book_lending_db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170002 (170002)
 File Encoding         : 65001

 Date: 21/01/2025 17:55:02
*/


-- ----------------------------
-- Sequence structure for Books_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Books_id_seq";
CREATE SEQUENCE "public"."Books_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Lendings_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Lendings_id_seq";
CREATE SEQUENCE "public"."Lendings_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Books
-- ----------------------------
DROP TABLE IF EXISTS "public"."Books";
CREATE TABLE "public"."Books" (
  "id" int4 NOT NULL DEFAULT nextval('"Books_id_seq"'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "author" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "available" bool DEFAULT true,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of Books
-- ----------------------------
INSERT INTO "public"."Books" VALUES (2, 'Lorem ipsum dolor is amet - updated', 'John Doe', 't', '2025-01-20 19:05:39.789+07', '2025-01-21 13:40:42.889+07');
INSERT INTO "public"."Books" VALUES (3, 'Lorem ipsum dolor is amet - 2', 'John Doe - 2', 't', '2025-01-20 19:05:47.906+07', '2025-01-21 17:14:08.242+07');

-- ----------------------------
-- Table structure for Lendings
-- ----------------------------
DROP TABLE IF EXISTS "public"."Lendings";
CREATE TABLE "public"."Lendings" (
  "id" int4 NOT NULL DEFAULT nextval('"Lendings_id_seq"'::regclass),
  "returnDate" timestamptz(6),
  "dueDate" timestamptz(6) NOT NULL,
  "returned" bool DEFAULT false,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "bookId" int4 NOT NULL,
  "userId" int4 NOT NULL
)
;

-- ----------------------------
-- Records of Lendings
-- ----------------------------
INSERT INTO "public"."Lendings" VALUES (1, '2025-01-20 19:52:21.305+07', '2025-01-27 19:32:39.598+07', 't', '2025-01-20 19:32:39.601+07', '2025-01-20 19:52:21.305+07', 2, 7);
INSERT INTO "public"."Lendings" VALUES (2, '2025-01-21 13:27:39.159+07', '2025-01-27 19:54:31.3+07', 't', '2025-01-20 19:54:31.302+07', '2025-01-21 13:27:39.159+07', 3, 7);
INSERT INTO "public"."Lendings" VALUES (3, '2025-01-21 13:28:25.817+07', '2025-01-28 13:24:56.845+07', 't', '2025-01-21 13:24:56.856+07', '2025-01-21 13:28:25.817+07', 2, 10);
INSERT INTO "public"."Lendings" VALUES (4, '2025-01-21 13:39:32.626+07', '2025-01-28 13:28:28.612+07', 't', '2025-01-21 13:28:28.612+07', '2025-01-21 13:39:32.626+07', 2, 10);
INSERT INTO "public"."Lendings" VALUES (5, '2025-01-21 13:39:53.232+07', '2025-01-28 13:39:34.962+07', 't', '2025-01-21 13:39:34.962+07', '2025-01-21 13:39:53.232+07', 3, 10);
INSERT INTO "public"."Lendings" VALUES (6, '2025-01-21 13:40:42.892+07', '2025-01-28 13:39:58.771+07', 't', '2025-01-21 13:39:58.771+07', '2025-01-21 13:40:42.892+07', 2, 10);
INSERT INTO "public"."Lendings" VALUES (7, '2025-01-21 17:14:08.246+07', '2025-01-28 13:40:46.775+07', 't', '2025-01-21 13:40:46.775+07', '2025-01-21 17:14:08.246+07', 3, 10);

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS "public"."Users";
CREATE TABLE "public"."Users" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of Users
-- ----------------------------

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Books_id_seq"
OWNED BY "public"."Books"."id";
SELECT setval('"public"."Books_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Lendings_id_seq"
OWNED BY "public"."Lendings"."id";
SELECT setval('"public"."Lendings_id_seq"', 7, true);

-- ----------------------------
-- Primary Key structure for table Books
-- ----------------------------
ALTER TABLE "public"."Books" ADD CONSTRAINT "Books_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Lendings
-- ----------------------------
ALTER TABLE "public"."Lendings" ADD CONSTRAINT "Lendings_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
