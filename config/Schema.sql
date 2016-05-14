CREATE TABLE absence (
    "bool_Justify" boolean DEFAULT false NOT NULL,
    "id_Absence" integer NOT NULL,
    "id_Course" integer NOT NULL,
    "id_Student" integer NOT NULL
);


CREATE SEQUENCE "absence_id_Absence_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE administrator (
    name text NOT NULL,
    nickname text NOT NULL,
    email text NOT NULL,
    "id_Administrator" integer NOT NULL,
    "id_User" integer
);


CREATE SEQUENCE "administrator_id_Administrator_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "administrator_id_Administrator_seq" OWNED BY administrator."id_Administrator";


CREATE TABLE course (
    entitled text NOT NULL,
    "date_Course" date NOT NULL,
    "start_Time" time without time zone NOT NULL,
    "end_Time" time without time zone NOT NULL,
    "bool_Roll" boolean DEFAULT false NOT NULL,
    "id_Course" integer NOT NULL,
    "id_Teacher" integer NOT NULL
);

CREATE SEQUENCE "course_id_Course_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "course_id_Course_seq" OWNED BY course."id_Course";

CREATE TABLE late (
    "bool_Justify" boolean DEFAULT false NOT NULL,
    "id_Late" integer NOT NULL,
    "id_Course" integer NOT NULL,
    "id_Student" integer NOT NULL
);

CREATE SEQUENCE "late_id_Late_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "late_id_Late_seq" OWNED BY late."id_Late";


CREATE TABLE student (
    name text COLLATE pg_catalog."fr_FR.utf8" NOT NULL,
    nickname text COLLATE pg_catalog."fr_FR.utf8" NOT NULL,
    sex text NOT NULL,
    "numTel" text,
    email text NOT NULL,
    address text NOT NULL,
    birthday date NOT NULL,
    "group" integer NOT NULL,
    "id_Student" integer NOT NULL,
    "id_User" integer,
    CONSTRAINT cc_group CHECK (("group" = ANY (ARRAY[1, 2]))),
    CONSTRAINT cc_sex CHECK ((sex = ANY (ARRAY['homme'::text, 'femme'::text])))
);


CREATE SEQUENCE "student_id_Student_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "student_id_Student_seq" OWNED BY student."id_Student";


CREATE TABLE teacher (
    name text NOT NULL,
    nickname text NOT NULL,
    email text NOT NULL,
    "id_Teacher" integer NOT NULL,
    "id_User" integer
);


CREATE SEQUENCE "teacher_id_Teacher_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "teacher_id_Teacher_seq" OWNED BY teacher."id_Teacher";


CREATE TABLE "user" (
    username text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    "id_User" integer NOT NULL,
    CONSTRAINT cc_role CHECK ((role = ANY (ARRAY['student'::text, 'teacher'::text, 'administrator'::text])))
);

CREATE SEQUENCE "user_id_User_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "user_id_User_seq" OWNED BY "user"."id_User";

ALTER TABLE ONLY absence ALTER COLUMN "id_Absence" SET DEFAULT nextval('"absence_id_Absence_seq"'::regclass);



ALTER TABLE ONLY administrator ALTER COLUMN "id_Administrator" SET DEFAULT nextval('"administrator_id_Administrator_seq"'::regclass);
ALTER TABLE ONLY course ALTER COLUMN "id_Course" SET DEFAULT nextval('"course_id_Course_seq"'::regclass);
ALTER TABLE ONLY late ALTER COLUMN "id_Late" SET DEFAULT nextval('"late_id_Late_seq"'::regclass);
ALTER TABLE ONLY student ALTER COLUMN "id_Student" SET DEFAULT nextval('"student_id_Student_seq"'::regclass);
ALTER TABLE ONLY teacher ALTER COLUMN "id_Teacher" SET DEFAULT nextval('"teacher_id_Teacher_seq"'::regclass);
ALTER TABLE ONLY "user" ALTER COLUMN "id_User" SET DEFAULT nextval('"user_id_User_seq"'::regclass);
ALTER TABLE ONLY student
    ADD CONSTRAINT cu_email UNIQUE (email);
ALTER TABLE ONLY "user"
    ADD CONSTRAINT cu_username UNIQUE (username);
ALTER TABLE ONLY absence
    ADD CONSTRAINT "pk_id_Absence" PRIMARY KEY ("id_Absence");
ALTER TABLE ONLY administrator
    ADD CONSTRAINT "pk_id_Administrator" PRIMARY KEY ("id_Administrator");
ALTER TABLE ONLY course
    ADD CONSTRAINT "pk_id_Course" PRIMARY KEY ("id_Course");
ALTER TABLE ONLY late
    ADD CONSTRAINT "pk_id_Late" PRIMARY KEY ("id_Late");
ALTER TABLE ONLY student
    ADD CONSTRAINT "pk_id_Student" PRIMARY KEY ("id_Student");
ALTER TABLE ONLY teacher
    ADD CONSTRAINT "pk_id_Teacher" PRIMARY KEY ("id_Teacher");
ALTER TABLE ONLY "user"
    ADD CONSTRAINT "pk_id_User" PRIMARY KEY ("id_User");
ALTER TABLE ONLY absence
    ADD CONSTRAINT "fk_id_Course" FOREIGN KEY ("id_Course") REFERENCES course("id_Course");
ALTER TABLE ONLY late
    ADD CONSTRAINT "fk_id_Course" FOREIGN KEY ("id_Course") REFERENCES course("id_Course");
ALTER TABLE ONLY late
    ADD CONSTRAINT "fk_id_Student" FOREIGN KEY ("id_Student") REFERENCES student("id_Student") ON DELETE CASCADE;
ALTER TABLE ONLY absence
    ADD CONSTRAINT "fk_id_Student" FOREIGN KEY ("id_Student") REFERENCES student("id_Student") ON DELETE CASCADE;
ALTER TABLE ONLY course
    ADD CONSTRAINT "fk_id_Teacher" FOREIGN KEY ("id_Teacher") REFERENCES teacher("id_Teacher");
ALTER TABLE ONLY administrator
    ADD CONSTRAINT "fk_id_User" FOREIGN KEY ("id_User") REFERENCES "user"("id_User");
ALTER TABLE ONLY student
    ADD CONSTRAINT "fk_id_User" FOREIGN KEY ("id_User") REFERENCES "user"("id_User");
ALTER TABLE ONLY teacher
    ADD CONSTRAINT "fk_id_User" FOREIGN KEY ("id_User") REFERENCES "user"("id_User");
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
