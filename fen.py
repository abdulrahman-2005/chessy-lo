# board = ['init', ' W♖', ' W♘', ' W♗', ' W♕', '   ', '   ', '   ', ' W♖', ' W♙', '   ', '   ', '   ', '   ', '   ', ' W♙', ' W♙', '   ', '   ', '   ', ' w♙', ' w♔', ' w♗', ' w♘', '   ', '   ', ' w♙', ' w♙', '   ', '   ', ' w♙', '   ', '   ', '   ', '   ', '   ', '   ', ' w♙', ' b♙', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', ' B♙', ' B♙', ' B♙', ' B♙', ' B♙', '   ', ' B♙', ' B♙', ' B♖', ' B♘', ' B♗', ' B♕', ' B♔', ' B♗', ' B♘', ' B♖']
# pieceNotation = {
#     "w♔": "k",
#     "w♕": "q",
#     "w♖": "r",
#     "w♘": "n",
#     "w♗": "b",
#     "w♙": "p",
#     "b♔": "K",
#     "b♕": "Q",
#     "b♖": "R",
#     "b♘": "N",
#     "b♗": "B",
#     "b♙": "P",
# };

# new = [];
# for i in board:
#     if i == "init":
#         continue
#     if i == "   ":
#         new.append(i)
#     elif i != "":
#         new.append(i.lower().replace(" ", "").replace("*", ""))

# counter = 1 #to add \s to the fen
# empty = 0   #to add number of empty squares to the fen
# result = "" #to save the fen in
# e = "   "   #empty square

# for i in new:
#     if i == e:
#         empty += 1

#     elif (i != e and empty == 0):
#         result += pieceNotation[i]

#     if empty == 8:
#         result += str(empty)
#         empty = 0


#     if counter == 8:
#         counter = 0
#         result += "/"
#     counter += 1

# print(result)




def board_to_fen(board:list):
    empty = 0
    counter = 0
    fen = ""
    for i in board.__reversed__():
        if i == " ":
            empty += 1
        else:
            if empty > 0:
                fen += str(empty)
                fen += i
                empty = 0
            else:
                fen += i
        counter += 1
        if counter == 8:
            fen += "/"
            counter = 1
    return fen


def get_fen_pieces(board):
    """
    Read board and return piece locations in fen format.
    """
    ret = None
    cnt = 0  # counter for successive empty cell along the row
    save = []  # temp container
    
    board = board[::-1]  # reverse first

    for i, v in enumerate(board):
        if v == ' ':
            cnt += 1
            
            # sum up the successive empty cell and update save
            if cnt > 1:
                save[len(save)-1] = str(cnt)
            else:
                save.append(str(cnt))  # add
        else:
            save.append(v)  # add
            cnt = 0  # reset, there is no successive number

        if (i+1)%8 == 0:  # end of row
            save.append('/')
            cnt = 0
            
    ret = ''.join(save)  # convert list to string
    # print(ret)
    
    return ret

board = [
    'R', ' ', 'B', 'Q', 'K', 'B', ' ', 'R',
    'P', 'P', 'P', ' ', ' ', 'P', 'P', 'P',
    ' ', ' ', 'N', ' ', ' ', 'N', ' ', ' ',
    ' ', ' ', ' ', 'P', 'P', ' ', ' ', ' ',
    ' ', ' ', ' ', 'p', 'p', ' ', ' ', ' ',
    ' ', ' ', 'n', ' ', ' ', 'n', ' ', ' ',
    'p', 'p', 'p', ' ', ' ', 'p', 'p', 'p',
    'r', ' ', 'b', 'k', 'q', 'b', ' ', 'r'
]
test = get_fen_pieces(board)
exp = "r1bqkb1r/ppp2ppp/2n2n2/3pp3/3PP3/2N2N2/PPP2PPP/R1BKQB1R/"

if test == exp:
    print("done")
else:
    print("wrong")
print(exp)
print(test)