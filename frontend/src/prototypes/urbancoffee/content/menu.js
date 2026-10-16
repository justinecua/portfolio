// Shared by every design prototype.
// Item names + descriptions for Pigeon Matcha and the kitchen come from Urban's own posts.
// Coffee items and ALL prices are placeholders — confirm with the client.
export const menu = [
  {
    key: 'coffee',
    label: 'Coffee',
    items: [
      { name: 'Spanish Latte', note: 'Espresso, condensed milk, fresh milk', price: 165, tag: 'Bestseller' },
      { name: 'Iced Americano', note: 'Double shot of the house roast over ice', price: 130 },
      { name: 'Sea Salt Latte', note: 'Salted cream cap, slow-poured', price: 175 },
      { name: 'Flat White', note: 'Ristretto, velvet microfoam', price: 150 },
      { name: 'Café Mocha', note: 'Dark chocolate, espresso, milk', price: 170 },
    ],
  },
  {
    key: 'matcha',
    label: 'Pigeon Matcha',
    items: [
      { name: 'Soar', alt: 'Hisho', note: 'Deep umami and natural sweetness unfold into an exceptionally smooth, lingering finish.', price: 180 },
      { name: 'Glide', alt: 'Kakku', note: 'Rich umami and gentle sweetness come together in a smooth, well-rounded cup.', price: 170 },
      { name: 'Perch', alt: 'Hayasume', note: 'Fresh green notes with a bold matcha character and a clean, lingering finish.', price: 165 },
      { name: 'Harbor', alt: 'Minato', note: 'Matcha crowned with light sea salt foam, bringing out its natural sweetness and umami.', price: 185 },
      { name: 'Haven', alt: 'Ikoi', note: 'Matcha with banana Biscoff pudding.', price: 195, tag: 'New' },
      { name: 'Ube Cheese Pudding', note: 'Matcha with ube and cheese pudding.', price: 195 },
      { name: 'Strawberry Matcha', note: 'Matcha with strawberry purée.', price: 185 },
    ],
  },
  {
    key: 'kitchen',
    label: 'Kitchen',
    items: [
      { name: 'Teriyaki Chicken Bowl', note: 'Crispy glazed chicken, kewpie, sesame, pickles, snap peas', price: 245, tag: 'Bestseller' },
      { name: 'Katsu Chicken Donburi', note: 'Panko-fried chicken, egg, onions, Japanese rice', price: 255 },
      { name: 'Honey Sriracha Salmon', note: 'Salmon, soft egg, nori, pickled onion, rice', price: 325, tag: 'New' },
      { name: 'Caesar Salad', note: 'Romaine, chicken, house croutons, caesar dressing', price: 235 },
      { name: 'Urban Breakfast', note: 'Crispy dried fish, house-made sausage, fried egg, fresh fruit, rice', price: 265 },
      { name: 'Crispy Chicken & Fries', note: 'Seasoned fries, creamy dipping sauce', price: 245 },
    ],
  },
  {
    key: 'sweets',
    label: 'Sweets',
    items: [
      { name: 'Biscoff French Toast', note: 'Caramelised banana, Biscoff, ice cream, walnuts', price: 225 },
      { name: 'Chocolate Cake', note: 'Rich and creamy, by the slice', price: 165 },
    ],
  },
]
