db = db.getSiblingDB('checkout-db');

db.createCollection('Products');
db.createCollection('Categories');

function normalize(it){
  it._id = it.id;
  delete it.id;
  return it;
}


print('\n\n\n======= Initiating database with provided JSON =======\n\n');
let menu = cat('/docker-entrypoint-initdb.d/sample-menu.json',true);
print('JSON imported successfully!')
print(menu);

menu = JSON.parse(menu);

db.Categories.insertMany(menu.categories.map(normalize));
print('\n* Categories registered successfully!\n');
db.Products.insertMany(menu.items.map(normalize));
print('\n* Products registered successfully!\n');

print('\n\n\n=======================================================\n\n');
