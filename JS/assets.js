const movements = {
	a1: 8,
	b1: 7,
	c1: 6,
	d1: 5,
	e1: 4,
	f1: 3,
	g1: 2,
	h1: 1,
	a2: 16,
	b2: 15,
	c2: 14,
	d2: 13,
	e2: 12,
	f2: 11,
	g2: 10,
	h2: 9,
	a3: 24,
	b3: 23,
	c3: 22,
	d3: 21,
	e3: 20,
	f3: 19,
	g3: 18,
	h3: 17,
	a4: 32,
	b4: 31,
	c4: 30,
	d4: 29,
	e4: 28,
	f4: 27,
	g4: 26,
	h4: 25,
	a5: 40,
	b5: 39,
	c5: 38,
	d5: 37,
	e5: 36,
	f5: 35,
	g5: 34,
	h5: 33,
	a6: 48,
	b6: 47,
	c6: 46,
	d6: 45,
	e6: 44,
	f6: 43,
	g6: 42,
	h6: 41,
	a7: 56,
	b7: 55,
	c7: 54,
	d7: 53,
	e7: 52,
	f7: 51,
	g7: 50,
	h7: 49,
	a8: 64,
	b8: 63,
	c8: 62,
	d8: 61,
	e8: 60,
	f8: 59,
	g8: 58,
	h8: 57,
};

const pieces = {
	// 0:e_name  1:ar_name  2:ratings
	"♔": ["King", "الملك", 20],
	"♕": ["Queen", "الوزير", 12],
	"♖": ["Rook", "الطابية", 7],
	"♗": ["Bishob", "الفيل", 5],
	"♘": ["Horse", "الحصان", 3],
	"♙": ["Pawn", "العسكري", 1],
};

const fen_pieces = {
	k: "W♔",
	q: "W♕",
	r: "W♖",
	n: "W♘",
	b: "W♗",
	p: "W♙",
	K: "B♔",
	Q: "B♕",
	R: "B♖",
	N: "B♘",
	B: "B♗",
	P: "B♙",
};

const pieceNotation = {
	"w♔": "k",
	"w♕": "q",
	"w♖": "r",
	"w♘": "n",
	"w♗": "b",
	"w♙": "p",
	"b♔": "K",
	"b♕": "Q",
	"b♖": "R",
	"b♘": "N",
	"b♗": "B",
	"b♙": "P",
	"W♔": "k",
	"W♕": "q",
	"W♖": "r",
	"W♘": "n",
	"W♗": "b",
	"W♙": "p",
	"B♔": "K",
	"B♕": "Q",
	"B♖": "R",
	"B♘": "N",
	"B♗": "B",
	"B♙": "P",
	"   ": " "
};

const games = {
	start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
	rooks: "rrrrrrrr/8/8/8/8/8/8/8",
};