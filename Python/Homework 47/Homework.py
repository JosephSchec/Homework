class Vehichle:
    def __init__(self, color='not', speed=0):
        self._color = color
        self._speed = speed

    def go(self, speed):
        self._speed = speed
        print(f'Now going at speed {self._speed}')

    def __str__(self):
        return f'This vehicle is {self._color} colored and is going {self._speed} speed'


class Plane(Vehichle):
    def go(self, speed):
        self._speed = speed
        print(f'Now flying at speed {speed}')


v1 = Vehichle('Green')
print(v1)
v1.go(30)
print(v1)


p1 = Plane('Silver', 0)
print(p1)
p1.go(200)
print(p1)

p2 = Plane()
print(p2)


def is_fizz_buzz(num):
    if(num % 15 == 0):
        return'FizzBuzz'
    elif num % 3 == 0:
        return'Fizz'
    elif num % 5 == 0:
        return'Buzz'
    else:
        return num


print(*[is_fizz_buzz(i) for i in range(1, 100)], sep=' \n')
