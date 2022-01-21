db = db.getSiblingDB('checkout-db');

db.createCollection('Products');
db.createCollection('Categories');


const menu = JSON.parse(cat('/docker-entrypoint-initdb.d/sample-menu.json',true));

print('----------------ITEMS:')
print(menu)

db.Products.insertMany(menu.items);
db.Categories.insertMany(menu.categories);