months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
months_dict = {month: str(i + 1) for i, month in enumerate(months)}

merchants_map = {
    # Groceries
    'Tian Tian Market': 'Groceries',
    'Sainsburys': 'Groceries',
    'M&S Simply Food': 'Groceries',
    'Marks & Spencer': 'Groceries',
    'Waitrose': 'Groceries',
    'Tesco': 'Groceries',
    'Asda': 'Groceries',
    'Lidl': 'Groceries',
    'Oseyo': 'Groceries',

    # Eating Out
    'Wasabi': 'Eating Out',
    'Nandos': 'Eating Out',
    'Mcdonalds': 'Eating Out',
    'Subway': 'Eating Out',
    'Chipotle': 'Eating Out',
    'Papa Johns': 'Eating Out',
    'Honest Burgers': 'Eating Out',
    'Gails': 'Eating Out',
    'Heytea': 'Eating Out',
    'Starbucks': 'Eating Out',
    'KFC': 'Eating Out',
    'Franco Manca': 'Eating Out',
    'Sushidog': 'Eating Out',
    'Dominos': 'Eating Out',

    # Transport
    'Oyster': 'Transport',
    'Trainline': 'Transport',
    'Avanti': 'Transport',
    'Uber': 'Transport',
    'Bee Network': 'Transport',

    # Shopping
    'Boots': 'Shopping',
    'Muji': 'Shopping',
    'Gymshark': 'Shopping',
    'Procook': 'Shopping',
    'Amazon': 'Shopping',

    # Subscriptions
    'Voxi': 'Subscriptions',
    'Spotify': 'Subscriptions',

    # Entertainment
    'Teamsport': 'Entertainment',

    # Other
    'UCL': 'Other'
}


categories = {
    'Transport': 'public transport, trains, buses, underground, ubers, taxis, metros, travel tickets',
    'Groceries': 'supermarkets, food shopping, fresh food, convenience store, corner shop',
    'Eating Out': 'restaurants, cafes, fast food, takeaway, dining, street food',
    'Entertainment': 'leisure activities, entertainment venue, attractions, cinema, bowling, events',
    'Shopping': 'retail stores, clothing shops, home goods, electronics, general shopping',
    'Subscriptions': 'gym membership, recurring payments, monthly services, mobile plans, music streaming, video streaming, digital subscriptions'
    # 'Other': 'miscellaneous, uncategorised, unknown merchants'
}