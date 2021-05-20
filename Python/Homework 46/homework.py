from random import randint as rand
# 1


class Die:
    def __init__(self, sides):
        self._sides = sides

    def roll(self):
        return rand(1, self._sides)


twelve_sides = Die(12)
print(twelve_sides.roll())

# 2


class Six_Sided_Die(Die):
    def __init__(self):
        super().__init__(6)


six_sides = Six_Sided_Die()

print(six_sides.roll())


# 3


def sort(l: list) -> list:
    for i in range(len(l)):
        for j in range(i+1, len(l)):
            if l[i] > l[j]:
                smallest = l[j]
                l[j] = l[i]
                l[i] = smallest
    return l


mylist = [1, 9, 6, 3, 86, 17]


print(sort(mylist))
