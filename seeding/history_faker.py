from template_faker import *

def history_detail_faker(HISTORY_ID : int, DETAIL_COUNT : int, QUANTITY_LOW : int, QUANTITY_HIGH : int, PRICE_LOW : int, PRICE_HIGH : int):
    for i in range(DETAIL_COUNT):
        history_detail_sql = '''INSERT INTO HistoryDetail(history_id, product_name, quantity, price) 
                                VALUES(%s, %s, %s, %s)'''

        history_id = HISTORY_ID
        product_name = faker.name()
        quantity = randint(QUANTITY_LOW, QUANTITY_HIGH)
        price = randint(PRICE_LOW, PRICE_HIGH)
        
        history_detail_val = (history_id, product_name, quantity, price)

        cursor.execute(history_detail_sql, history_detail_val)

def history_faker(HISTORY_COUNT : int, USER_LIMIT : int, PHP_USER_LIMIT : int, COST_LOW : int, COST_HIGH : int, DETAIL_LOW : int, DETAIL_HIGH : int, QUANTITY_LOW : int, QUANTITY_HIGH : int, PRICE_LOW : int, PRICE_HIGH : int):
    # Get data from database
    select_users = '''SELECT id 
                        FROM User
                        ORDER BY rand()
                        LIMIT ''' + str(USER_LIMIT)
    cursor.execute(select_users)
    users = cursor.fetchall()

    select_phpusers = '''SELECT id, name
                        FROM users
                        ORDER BY rand()
                        LIMIT ''' + str(PHP_USER_LIMIT)
    phpcursor.execute(select_phpusers)
    phpusers = phpcursor.fetchall()

    print("Data retrieval success")

    for i in range(HISTORY_COUNT):
        history_sql = '''INSERT INTO History(user_id, alamat_tujuan, id_penerima, nama_penerima, biaya_pengiriman, rating) 
                            VALUES(%s, %s, %s, %s, %s, %s)'''

        user_index = randint(0, USER_LIMIT - 1)
        php_user_index = randint(0, PHP_USER_LIMIT - 1)

        user_id = users[user_index][0]
        alamat_tujuan = faker.address()
        id_penerima = phpusers[php_user_index][0]
        nama_penerima = phpusers[php_user_index][1]
        biaya_pengiriman = randint(COST_LOW, COST_HIGH)
        rating = randint(0, 5)
        
        history_val = (user_id, alamat_tujuan, id_penerima, nama_penerima, biaya_pengiriman, rating)

        cursor.execute(history_sql, history_val)
        
        history_id = cursor.lastrowid
        history_detail_count = randint(DETAIL_LOW, DETAIL_HIGH)
        
        history_detail_faker(history_id, history_detail_count, QUANTITY_LOW, QUANTITY_HIGH, PRICE_LOW, PRICE_HIGH)
        
    db.commit()
    print("Insertion success")

if __name__ == "__main__":
    # Constant
    HISTORY_COUNT = 100
    USER_LIMIT = 10
    PHP_USER_LIMIT = 10
    COST_LOW = 10
    COST_HIGH = 200
    DETAIL_LOW = 1
    DETAIL_HIGH = 5
    QUANTITY_LOW = 1
    QUANTITY_HIGH = 5
    PRICE_LOW = 0
    PRICE_HIGH = 100
    history_faker(HISTORY_COUNT
                , USER_LIMIT
                , PHP_USER_LIMIT
                , COST_LOW
                , COST_HIGH
                , DETAIL_LOW
                , DETAIL_HIGH
                , QUANTITY_LOW
                , QUANTITY_HIGH
                , PRICE_LOW
                , PRICE_HIGH)
