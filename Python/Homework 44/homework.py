import random
# 1
name = 'Yossi Schechter'
address = '1 Main Street'
friends = ['Shlomo', 'Aaron', 'Pinchas', 'Sruly']

# 2
print(f'Me : {name} , at: {address}, friends:{friends}')

# 3
print(name[::3])

# 4
print(friends[-2][1:-2])

# 5
for each_num in range(1, 11, 1):
    for multiply in range(1, 10, 1):
        print(each_num*multiply)

# 6
guess_number = -1
random = random.randint(1, 101)

while guess_number != random:
    guess_number = int(input('Guess a number '))
    if guess_number == random:
        break
    else:
        greaterOrLess = 'Guess again , too low' if guess_number < random else 'Guess again , too high'
        print(greaterOrLess)

print('You got it')
