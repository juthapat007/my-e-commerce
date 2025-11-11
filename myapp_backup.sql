--
-- PostgreSQL database dump
--

\restrict 4ajI1xPvSfTIx72kJiBmtfWt2bCOBdKnDkKVeKXOkVnIxwwXFJC8mbJeFUOHYlC

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.ar_internal_metadata OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    category_id integer,
    price numeric(10,2) NOT NULL,
    currency character varying(3) DEFAULT 'THB'::character varying,
    stock integer DEFAULT 0,
    description text,
    brand character varying(100),
    image_url character varying(500),
    image_alt character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying,
    email character varying,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description, created_at) FROM stdin;
1	อิเล็กทรอนิกส์	\N	2025-11-11 12:29:47.58461
2	คอมพิวเตอร์	\N	2025-11-11 12:29:47.58461
3	รองเท้า	\N	2025-11-11 12:29:47.58461
4	เสื้อผ้า	\N	2025-11-11 12:29:47.58461
5	นาฬิกาและเครื่องประดับ	\N	2025-11-11 12:29:47.58461
6	อาหารและเครื่องดื่ม	\N	2025-11-11 12:29:47.58461
7	กระเป๋าและสัมภาระ	\N	2025-11-11 12:29:47.58461
8	กล้องและอุปกรณ์ถ่ายภาพ	\N	2025-11-11 12:29:47.58461
9	เครื่องใช้ไฟฟ้า	\N	2025-11-11 12:29:47.58461
10	สุขภาพและความงาม	\N	2025-11-11 12:29:47.58461
11	เกมและของเล่น	\N	2025-11-11 12:29:47.58461
12	กีฬาและนันทนาการ	\N	2025-11-11 12:29:47.58461
13	อุปกรณ์คอมพิวเตอร์	\N	2025-11-11 12:29:47.58461
14	แว่นตาและอุปกรณ์	\N	2025-11-11 12:29:47.58461
15	เฟอร์นิเจอร์	\N	2025-11-11 12:29:47.58461
16	หนังสือ	\N	2025-11-11 12:29:47.58461
17	ของใช้ในบ้าน	\N	2025-11-11 12:29:47.58461
18	ของใช้ในครัว	\N	2025-11-11 12:29:47.58461
19	เครื่องดนตรี	\N	2025-11-11 12:29:47.58461
20	รถยนต์และมอเตอร์ไซค์	\N	2025-11-11 12:29:47.58461
21	เครื่องมือ	\N	2025-11-11 12:29:47.58461
22	อุปกรณ์เขียน	\N	2025-11-11 12:29:47.58461
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, category_id, price, currency, stock, description, brand, image_url, image_alt, created_at, updated_at) FROM stdin;
1	iPhone 15 Pro	1	42900.00	THB	25	มือถือ Apple รุ่นล่าสุด กล้อง 48MP ชิป A17 Pro	Apple	https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop	iPhone 15 Pro สีดำ	2025-11-11 12:29:56.631704	2025-11-11 12:29:56.631704
2	Samsung Galaxy S24	1	35900.00	THB	30	สมาร์ทโฟน Android หน้าจอ Dynamic AMOLED 6.1 นิ้ว	Samsung	https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop	Samsung Galaxy S24	2025-11-11 12:29:56.631704	2025-11-11 12:29:56.631704
3	รองเท้าผ้าใบ Nike Air Max	3	4200.00	THB	60	รองเท้าวิ่ง เทคโนโลยี Air Cushioning พื้นรองรับแรงกระแทก	Nike	https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop	Nike Air Max รองเท้าผ้าใบ	2025-11-11 12:29:56.631704	2025-11-11 12:29:56.631704
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schema_migrations (version) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, created_at, updated_at) FROM stdin;
1	Sofia	sof2025@example.com	2025-11-10 20:05:20.956688	2025-11-10 20:05:20.956688
3	Mira	MiraHunt@gmail.com	2025-11-11 12:16:20.143053	2025-11-11 12:16:20.143053
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 22, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 4ajI1xPvSfTIx72kJiBmtfWt2bCOBdKnDkKVeKXOkVnIxwwXFJC8mbJeFUOHYlC

