import sys

def read_dict():
    path = 'dataset/words.txt'
    je_dict = []
    with open(path) as f:
        for line in f.readlines():
            line = line.split("\t",1)
            line[1] = line[1].strip()     #delete \n at the end
            #modify word so that it can be searched correctly
            searchword = line[0].lower().replace('.',' ').replace(',',' ')
            line.insert(0,searchword)
            je_dict.append(line)
    return je_dict

def search_word(e_word, je_dict):

    n = len(je_dict)
    l_i = 0
    r_i = n
    count = 0
    while r_i-l_i > 0:
        m = (l_i+r_i)//2
        count += 1
        if count > 30:
            break
        if e_word == je_dict[m][0]:
            while m>0 and e_word == je_dict[m-1][0]:  #get the first index
                m -= 1
            return 1, m
        if e_word < je_dict[m][0]:
            r_i = m
        else:
            l_i = m+1
    return 0, m

def scroll(je_dict,m):

    print("commands:  n(next)  p(previous)  b(back)\n\n")
    while(1):
        for i in range (0,5):
            if len(je_dict[m+i][2])>70:
                preview = je_dict[m+i][2][:60]+" ..."
            else:
                preview = je_dict[m+i][2]
            print("%-15s %s" % (je_dict[m+i][1], preview))
        print("---\n>",end=" ")
        c = input()
        if c == 'n':
            m += 1
        elif c == 'p':
            m -= 1
        elif c == 'b' or '':
            break
        else:
            print("\033[1A"+"> invalid", end="")
            c = input()
            print("\033[1A\033[2K")
            print("\033[1A")
        print("\033[8A")
    return

if __name__ == "__main__":
    je_dict = read_dict()
    print("\n\nThis is English-Japanese Dictionary.")
    while(1):
        print("---")
        print("> English word entry: ",end="")
        e_word = input()
        if e_word == '':
            continue
        e_word.strip()
        flg, m = search_word(e_word, je_dict)
        scroll(je_dict,m)
