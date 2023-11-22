from history_faker import *
from user_faker import *

# Constant
USER_COUNT = 10
BALANCE_LOW = 0
BALANCE_HIGH = 6969
HISTORY_COUNT = 100
PHP_USER_COUNT = 10
COST_LOW = 10
COST_HIGH = 200
DETAIL_LOW = 1
DETAIL_HIGH = 5
QUANTITY_LOW = 1
QUANTITY_HIGH = 5
PRICE_LOW = 0
PRICE_HIGH = 100

# Seeding
print("Seeding User Data Begin")
user_faker(USER_COUNT, BALANCE_LOW, BALANCE_HIGH)
print("Seeding User Data Finished")
print()

print("Seeding History Data Begin")
history_faker(HISTORY_COUNT
            , USER_COUNT
            , PHP_USER_COUNT
            , COST_LOW
            , COST_HIGH
            , DETAIL_LOW
            , DETAIL_HIGH
            , QUANTITY_LOW
            , QUANTITY_HIGH
            , PRICE_LOW
            , PRICE_HIGH)
print("Seeding History Data Finished")
print()
