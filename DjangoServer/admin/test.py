import jwt


def test():
    print('아녕하ㅔ요')
    print('???')
    a = jwt.encode({'id': 'asd'}, 'asd', algorithm='HS256')
    payload = jwt.decode(a, 'asd', algorithms='HS256')
    print(a)
    print(payload)

    return a


if __name__ == '__main__':
    test()