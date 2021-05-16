def get_days_list():
    month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for m, d in zip(month, days):
        print(f'{m} has {d} days')


get_days_list()


def get_days_tuple():
    month = ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    days = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
    for m, d in zip(month, days):
        print(f'{m} has {d} days')


get_days_tuple()


def get_days_dictionary():
    calendar = {
        'Jan': '31',
        'Feb': '28',
        'Mar': '31',
        'Apr': '30',
        'May': '31',
        'Jun': '30',
        'Jul': '31',
        'Aug': '31',
        'Sep': '30',
        'Oct': '31',
        'Nov': '30',
        'Dec': '31'
    }

    for month in calendar:
        print(f'{month} has {calendar.get(month)} days')


get_days_dictionary()


def get_days(month):
    calendar = {
        'Jan': '31',
        'Feb': '28',
        'Mar': '31',
        'Apr': '30',
        'May': '31',
        'Jun': '30',
        'Jul': '31',
        'Aug': '31',
        'Sep': '30',
        'Oct': '31',
        'Nov': '30',
        'Dec': '31'
    }
    return calendar.get(month)


print(get_days('May'))
