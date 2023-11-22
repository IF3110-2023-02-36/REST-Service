from template_faker import *

def user_faker(USER_COUNT : int, BALANCE_LOW : int, BALANCE_HIGH : int):
    for i in range(USER_COUNT):
        user_sql = '''INSERT INTO User(username, name, email, password, saldo) 
                    VALUES(%s, %s, %s, %s, %s)'''
                
        name = faker.name()
        username = name + "-" + str(i)
        email = username + "@gmail.com"
        password = name
        saldo = randint(BALANCE_LOW, BALANCE_HIGH)
        
        user_val = (username, name, email, password, saldo)

        cursor.execute(user_sql, user_val)
        
    db.commit()
    print("Insertion success")
    
if __name__ == "__main__":
    USER_COUNT = 10
    BALANCE_LOW = 0
    BALANCE_HIGH = 6969
    user_faker(USER_COUNT, BALANCE_LOW, BALANCE_HIGH)