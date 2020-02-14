--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public."productGroup" DROP CONSTRAINT "productGroup_fk1";
ALTER TABLE ONLY public."productGroup" DROP CONSTRAINT "productGroup_fk0";
ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_fk0;
ALTER TABLE ONLY public."cartProduct" DROP CONSTRAINT "cartProduct_fk1";
ALTER TABLE ONLY public."cartProduct" DROP CONSTRAINT "cartProduct_fk0";
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pk;
ALTER TABLE ONLY public.type DROP CONSTRAINT type_pk;
ALTER TABLE ONLY public.product DROP CONSTRAINT product_pk;
ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pk;
ALTER TABLE public."user" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.type ALTER COLUMN "typeId" DROP DEFAULT;
ALTER TABLE public."productGroup" ALTER COLUMN "typeId" DROP DEFAULT;
ALTER TABLE public."productGroup" ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.product ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public."cartProduct" ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public."cartProduct" ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public.cart ALTER COLUMN "cartId" DROP DEFAULT;
DROP SEQUENCE public."user_userId_seq";
DROP TABLE public."user";
DROP SEQUENCE public."type_typeId_seq";
DROP TABLE public.type;
DROP SEQUENCE public."product_productId_seq";
DROP SEQUENCE public."productGroup_typeId_seq";
DROP SEQUENCE public."productGroup_productId_seq";
DROP TABLE public."productGroup";
DROP TABLE public.product;
DROP SEQUENCE public."cart_cartId_seq";
DROP SEQUENCE public."cartProduct_productId_seq";
DROP SEQUENCE public."cartProduct_cartId_seq";
DROP TABLE public."cartProduct";
DROP TABLE public.cart;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cart (
    "cartId" integer NOT NULL,
    "userId" integer,
    "sessionId" integer,
    status boolean,
    login boolean,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: cartProduct; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartProduct" (
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    size character varying(255) NOT NULL
);


--
-- Name: cartProduct_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartProduct_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartProduct_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartProduct_cartId_seq" OWNED BY public."cartProduct"."cartId";


--
-- Name: cartProduct_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartProduct_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartProduct_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartProduct_productId_seq" OWNED BY public."cartProduct"."productId";


--
-- Name: cart_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cart_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cart_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cart_cartId_seq" OWNED BY public.cart."cartId";


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
    "productId" integer NOT NULL,
    "productName" character varying(255) NOT NULL,
    price integer NOT NULL,
    description text NOT NULL,
    detail text NOT NULL,
    image1 character varying(255) NOT NULL,
    image2 character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: productGroup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."productGroup" (
    "productId" integer NOT NULL,
    "typeId" integer NOT NULL
);


--
-- Name: productGroup_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."productGroup_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: productGroup_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."productGroup_productId_seq" OWNED BY public."productGroup"."productId";


--
-- Name: productGroup_typeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."productGroup_typeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: productGroup_typeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."productGroup_typeId_seq" OWNED BY public."productGroup"."typeId";


--
-- Name: product_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."product_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."product_productId_seq" OWNED BY public.product."productId";


--
-- Name: type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.type (
    "typeId" integer NOT NULL,
    "typeName" character varying(255) NOT NULL
);


--
-- Name: type_typeId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."type_typeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: type_typeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."type_typeId_seq" OWNED BY public.type."typeId";


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    "userId" integer NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "userType" boolean NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: user_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user_userId_seq" OWNED BY public."user"."userId";


--
-- Name: cart cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart ALTER COLUMN "cartId" SET DEFAULT nextval('public."cart_cartId_seq"'::regclass);


--
-- Name: cartProduct cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartProduct" ALTER COLUMN "cartId" SET DEFAULT nextval('public."cartProduct_cartId_seq"'::regclass);


--
-- Name: cartProduct productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartProduct" ALTER COLUMN "productId" SET DEFAULT nextval('public."cartProduct_productId_seq"'::regclass);


--
-- Name: product productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product ALTER COLUMN "productId" SET DEFAULT nextval('public."product_productId_seq"'::regclass);


--
-- Name: productGroup productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productGroup" ALTER COLUMN "productId" SET DEFAULT nextval('public."productGroup_productId_seq"'::regclass);


--
-- Name: productGroup typeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productGroup" ALTER COLUMN "typeId" SET DEFAULT nextval('public."productGroup_typeId_seq"'::regclass);


--
-- Name: type typeId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type ALTER COLUMN "typeId" SET DEFAULT nextval('public."type_typeId_seq"'::regclass);


--
-- Name: user userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN "userId" SET DEFAULT nextval('public."user_userId_seq"'::regclass);


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cart ("cartId", "userId", "sessionId", status, login, "createdAt") FROM stdin;
7	1	\N	\N	t	2020-02-04 17:29:29.890444-08
9	\N	0	\N	f	2020-02-10 17:40:10.908432-08
10	\N	0	\N	f	2020-02-10 17:51:53.314096-08
15	\N	0	\N	f	2020-02-10 18:49:40.481617-08
16	\N	0	\N	f	2020-02-11 11:38:06.387119-08
18	\N	0	\N	f	2020-02-11 11:39:32.940315-08
19	\N	0	\N	f	2020-02-11 11:39:32.967542-08
22	\N	0	\N	f	2020-02-11 11:43:39.610986-08
24	\N	0	\N	f	2020-02-11 11:45:00.738817-08
29	\N	0	\N	f	2020-02-11 15:32:10.749728-08
30	\N	0	\N	f	2020-02-12 11:19:28.668836-08
31	\N	0	\N	f	2020-02-12 11:19:28.684373-08
32	\N	0	\N	f	2020-02-12 13:27:31.304052-08
33	\N	0	\N	f	2020-02-12 13:27:31.342436-08
34	\N	0	\N	f	2020-02-12 13:27:31.343322-08
36	\N	0	\N	f	2020-02-12 13:30:13.048806-08
37	\N	0	\N	f	2020-02-12 13:30:13.078-08
38	\N	0	\N	f	2020-02-12 13:30:13.087975-08
40	\N	0	\N	f	2020-02-12 13:30:36.304306-08
41	\N	0	\N	f	2020-02-12 13:30:36.330547-08
42	\N	0	\N	f	2020-02-12 13:30:36.337165-08
44	\N	0	\N	f	2020-02-12 13:31:09.832258-08
46	\N	0	\N	f	2020-02-12 13:31:09.868174-08
45	\N	0	\N	f	2020-02-12 13:31:09.867844-08
48	\N	0	\N	f	2020-02-12 16:55:20.400121-08
51	\N	0	\N	f	2020-02-12 16:55:20.441516-08
49	\N	0	\N	f	2020-02-12 16:55:20.436762-08
53	\N	0	\N	f	2020-02-12 17:01:20.559518-08
54	\N	0	\N	f	2020-02-12 17:01:20.579232-08
55	\N	0	\N	f	2020-02-12 17:01:20.602884-08
57	\N	0	\N	f	2020-02-12 17:02:45.169943-08
58	\N	0	\N	f	2020-02-12 17:02:45.193648-08
59	\N	0	\N	f	2020-02-12 17:02:45.203224-08
61	\N	0	\N	f	2020-02-12 17:20:13.057271-08
62	\N	0	\N	f	2020-02-12 17:20:13.086313-08
63	\N	0	\N	f	2020-02-12 17:20:13.100017-08
67	\N	0	t	f	2020-02-12 20:30:06.290346-08
8	10	\N	t	t	2020-02-10 17:38:57.34045-08
69	10	\N	t	t	2020-02-12 21:02:46.587666-08
70	10	\N	\N	t	2020-02-12 21:03:01.180728-08
71	\N	0	t	f	2020-02-12 21:03:10.393194-08
72	\N	0	\N	f	2020-02-12 21:03:23.127187-08
73	\N	0	\N	f	2020-02-13 11:29:36.86434-08
74	\N	0	\N	f	2020-02-14 12:11:01.81022-08
\.


--
-- Data for Name: cartProduct; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartProduct" ("cartId", "productId", size) FROM stdin;
32	9	M
33	9	M
34	9	M
59	9	M
72	3	XS
72	3	XS
44	9	M
7	5	l
72	3	XS
10	2	M
15	9	L
15	8	S
15	8	S
15	8	S
15	9	XL
15	9	L
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	7	XS
15	9	XL
15	9	XL
15	9	XL
15	9	XL
15	9	XL
15	9	XL
16	6	XS
45	9	M
18	6	XS
19	6	XS
46	9	M
22	6	XL
24	6	M
36	9	M
37	9	M
38	9	M
40	9	M
41	9	M
42	9	M
29	9	L
29	9	L
29	9	L
29	9	L
29	9	L
29	9	L
30	8	S
72	4	XS
61	9	M
67	9	M
53	9	M
62	9	M
67	9	M
67	9	M
54	9	M
63	9	M
67	9	M
67	9	M
67	9	M
67	9	M
74	7	M
74	9	XS
74	9	XS
55	9	M
8	9	M
48	9	M
8	9	M
49	9	M
57	9	M
69	9	M
51	9	M
58	9	M
70	9	M
71	9	M
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.product ("productId", "productName", price, description, detail, image1, image2, "createdAt") FROM stdin;
1	Jagdhund Mountain Cape	35000	A cape that is both light-weight and waterproof, perfect for hiking and camping	This ultra-lightweight, mountain cape is an incredibly versatile article. It functions as a warming seat or blanket, shooting pad, or protection against wind and weather. It has two large internal pockets and a concealed button placket. It also has a classic turn-down collar with high-closing chin strap, and adjustable interior straps. Made from 95% new wool and 5% alpaca.	altach1	altach2	2020-02-03 22:07:58.159231-08
2	Harris Tweed Cape Coat	100000	Stylish and vintage mens"s cape coat in British design	In a luxuriously high quality Harris Tweed fabric, which is renowned for its excellency, with an Act of Parliament dictating that it can only be made of handwoven pure virgin wool in the Outer Hebrides. This avant garde coat has impeccable tailoring - with two sets of buttons so you can fasten the cape or just the body of the coat. Such a rare, heritage piece with Edwardian inspiration which creates a current and high fashion look yet has a timeless quality. Top half of the body is lined in an iridescent taffeta, the rest is left unlined to retain movement.	harrisTweed1	harrisTweed2	2020-02-03 22:07:58.159231-08
3	Double Breasted Wool Cape	80000	Victorian inspired mod style wool cape	An incredibly rare vintage mens cape / cloak from the 60s. So fashion forward for the sixties (even today), this cape was obviously inspired by the Victorian inspired creations by Carnaby Street labels at the time like Granny Takes a Trip and Lord John. In a quality black wool the double breasted buttons and patterned lining give a classic mod look. Double breasted fastening and Jacquard lining.	modWool1	modWool2	2020-02-03 22:07:58.159231-08
4	Vintage Caroline Cape Coat	22720	Lush green wool-blend cape coat in a classic 1950"s style	Features covered buttons and matching forest green luxurious satin lining, for an elegant and clean-cut silhouette, with a removable neck-tie that can be worn in a bow for a feminine touch or crossed over in a simple knot. This feature is set off by the wide Peter Pan style collar, adding a whimsical touch to the look. Sitting approximately just below the lower hip, her hem is slightly longer at the back adding to the full swing of this beautiful coat. This is the perfect transitional piece taking you from autumn with her front sleeve openings, right through to winter worn with arms inside the cape.	caroline1	caroline2	2020-02-03 22:07:58.159231-08
5	Clifton Wool Cape Coat	114000	Vintage double-breasted uniform and cape silhouette in a single design	Spread collar. Double-breasted silhouette. Crown-, and horse-embossed antiqued brass buttons. Two front waist flapped pockets and fully lined. The cape is made in Itally using 90% wool and 10% cashmere. The lining is 100% viscose.	cliftonWool1	cliftonWool2	2020-02-03 22:07:58.159231-08
6	Stripe Detail Wool Cape	91000	Minimalistic elegant stripe detail poncho	hrow on some charm with this Italian made stripe detail poncho. Crafted from flaxseed brown wool, this elegant poncho has a pointy handkerchief-like hem, frayed on the edges, and a striped lining that gives a peek of its charm on the folded front. Minimalism at its best. Featuring frayed edges, a handkerchief hem, an internal logo patch and a striped lining.	stripeWool1	stripeWool2	2020-02-03 22:07:58.159231-08
7	Harding Tonal Riding Cloak	54900	Wanderer-style riding cloak	This western style cloak makes for a perfect gift for the man or woman looking to extend their fashion footprint. It blocks out the wind, keeps you toasty, and looks as incredible as it feels. Riding Cloaks are individually handcrafted making each a unique creation. They are completely reversible with all natural materials. Our hooded Riding Cloaks are made from authentic wool, hand striped leather or lambskin trim and natural deer shed toggles. Coordinating saddle pads, in both English and Western styles, are available. Perfect for the arena, trail, grocery store, pub or music festivals.	hardingTonal1	hardingTonal2	2020-02-03 22:08:16.399805-08
8	Bolivian Uyuni Wool Poncho	27600	Andean tradition inspired unisex wool poncho	Named for a small town in Bolivia, home to the world"s largest salt flats, this poncho is stylin". For an informal occasion or simply to look original, this unisex 100% sheep"s wool poncho is ideal. The natural material is thick and warm, and its striped design is inspired by Andean traditions. Handmade in Bolivia.	uyuniWool1	uyuniWool2	2020-02-03 22:08:16.399805-08
9	Yakima Mineral Umber Camp Poncho	34900	Winter fashion meets moutain fashion in this camp poncho	Soft, warm, rain and wind resistant, these all natural wool Ponchos are perfect for camping, hiking, hanging out by the fire, in the back yard, collapsing after a climb, dancing at a festival or hanging out with friends ... in other words perfect for practically anywhere. The ponchos are trimmed in a 3.5 oz aniline leather that adds just the right amount of rugged elegance. 	yakimaMineral1	yakimaMineral2	2020-02-03 22:08:16.399805-08
\.


--
-- Data for Name: productGroup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."productGroup" ("productId", "typeId") FROM stdin;
1	1
1	2
1	3
1	6
2	1
2	3
2	7
3	1
3	3
3	7
4	2
4	3
5	2
5	3
5	7
6	2
6	3
6	5
7	1
7	2
7	4
7	6
8	1
8	2
8	3
8	5
9	1
9	2
9	3
9	5
9	6
\.


--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.type ("typeId", "typeName") FROM stdin;
1	Men
2	Women
3	Cape
4	Cloak
5	Poncho
6	Outdoor
7	Vintage
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" ("userId", "firstName", "lastName", email, password, "userType", "createdAt") FROM stdin;
1	Brandon	Bryndon	brandon@gmail.com	testPassword123	f	2020-02-03 22:09:01.851744-08
6	Brad	Rad	a	$2b$11$CrGftASEFDZY8Eu2a1izOOc2D0XoJ.iEUE1vYSdJieDHh4KJFVKFC	f	2020-02-04 18:17:30.802202-08
7	Brad	Rad	a@a	$2b$11$5dgxj/63PQdR/qkmbIT6vuHpiYVWtLQHT0n81NclKWDPANNBjVq6O	f	2020-02-04 18:17:52.001602-08
8	Brad	Rad	brad@gmail.com	$2b$11$gm2sMKod7OFXGo7gF2hxb.Ff38521wSfUHuIsFgbJJ0/YoiwprUHe	f	2020-02-04 18:18:45.471277-08
9	Braydon	Bradson	Braydon@gmail.com	$2b$11$TNFG5Rjq/MQ9v/3eBEMkbOWr/9FfNX44vFkV8QUELO4kUjWP9cLUa	f	2020-02-10 12:45:56.454696-08
10	Bradin	Bradson	Bradin@gmail.com	$2b$11$QrL2YFVRuHQomTJXGo6pXe/W8442WR8Ha9GmSB.zkn4wlCiyEB/I2	f	2020-02-10 12:47:21.325367-08
11	Bradin	Bradson	Bradin2@gmail.com	$2b$11$iuS28Ry7tLVTA1D8dv7Q3OWTRH6c4Sqaeto8ezNaC/LxbBKBgEJeu	f	2020-02-10 13:15:39.6103-08
\.


--
-- Name: cartProduct_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartProduct_cartId_seq"', 1, false);


--
-- Name: cartProduct_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartProduct_productId_seq"', 1, false);


--
-- Name: cart_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cart_cartId_seq"', 74, true);


--
-- Name: productGroup_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."productGroup_productId_seq"', 1, false);


--
-- Name: productGroup_typeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."productGroup_typeId_seq"', 1, false);


--
-- Name: product_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."product_productId_seq"', 9, true);


--
-- Name: type_typeId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."type_typeId_seq"', 7, true);


--
-- Name: user_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user_userId_seq"', 11, true);


--
-- Name: cart cart_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pk PRIMARY KEY ("cartId");


--
-- Name: product product_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pk PRIMARY KEY ("productId");


--
-- Name: type type_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pk PRIMARY KEY ("typeId");


--
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY ("userId");


--
-- Name: cartProduct cartProduct_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartProduct"
    ADD CONSTRAINT "cartProduct_fk0" FOREIGN KEY ("cartId") REFERENCES public.cart("cartId");


--
-- Name: cartProduct cartProduct_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartProduct"
    ADD CONSTRAINT "cartProduct_fk1" FOREIGN KEY ("productId") REFERENCES public.product("productId");


--
-- Name: cart cart_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_fk0 FOREIGN KEY ("userId") REFERENCES public."user"("userId");


--
-- Name: productGroup productGroup_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productGroup"
    ADD CONSTRAINT "productGroup_fk0" FOREIGN KEY ("productId") REFERENCES public.product("productId");


--
-- Name: productGroup productGroup_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."productGroup"
    ADD CONSTRAINT "productGroup_fk1" FOREIGN KEY ("typeId") REFERENCES public.type("typeId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

