import type { Category, Restaurant, MenuItem } from '@/types';

export const categories: Category[] = [
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'italian', name: 'Italian', icon: '🍕' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'healthy', name: 'Healthy', icon: '🥗' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Spice Garden',
    cuisine: 'North Indian',
    image: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    deliveryTime: '30-40 min',
    priceForTwo: 450,
    location: 'Koramangala, Bangalore',
    categories: ['indian'],
  },
  {
    id: 'r2',
    name: 'Pizza Italia',
    cuisine: 'Italian',
    image: 'https://images.pexels.com/photos/31596394/pexels-photo-31596394.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    deliveryTime: '25-35 min',
    priceForTwo: 600,
    location: 'Indiranagar, Bangalore',
    categories: ['italian'],
  },
  {
    id: 'r3',
    name: 'Burger Bros',
    cuisine: 'American',
    image: 'https://images.pexels.com/photos/34407059/pexels-photo-34407059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.3,
    deliveryTime: '20-30 min',
    priceForTwo: 350,
    location: 'HSR Layout, Bangalore',
    categories: ['burgers'],
  },
  {
    id: 'r4',
    name: 'Dragon Wok',
    cuisine: 'Chinese',
    image: 'https://images.pexels.com/photos/5339076/pexels-photo-5339076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.4,
    deliveryTime: '35-45 min',
    priceForTwo: 500,
    location: 'Whitefield, Bangalore',
    categories: ['chinese'],
  },
  {
    id: 'r5',
    name: 'Green Bowl',
    cuisine: 'Healthy',
    image: 'https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    deliveryTime: '20-30 min',
    priceForTwo: 400,
    location: 'Jayanagar, Bangalore',
    categories: ['healthy'],
  },
  {
    id: 'r6',
    name: 'Sweet Tooth',
    cuisine: 'Desserts',
    image: 'https://images.pexels.com/photos/39240989/pexels-photo-39240989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    deliveryTime: '15-25 min',
    priceForTwo: 300,
    location: 'MG Road, Bangalore',
    categories: ['desserts'],
  },
  {
    id: 'r7',
    name: 'Biryani House',
    cuisine: 'Hyderabadi',
    image: 'https://images.pexels.com/photos/12669168/pexels-photo-12669168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    deliveryTime: '30-45 min',
    priceForTwo: 500,
    location: 'BTM Layout, Bangalore',
    categories: ['indian'],
  },
  {
    id: 'r8',
    name: 'Dosa Junction',
    cuisine: 'South Indian',
    image: 'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    deliveryTime: '20-30 min',
    priceForTwo: 250,
    location: 'Malleshwaram, Bangalore',
    categories: ['indian'],
  },
];

export const menuItems: MenuItem[] = [
  // Spice Garden (r1) — North Indian
  { id: 'm1', name: 'Butter Paneer', description: 'Cottage cheese cubes in a rich tomato-butter gravy', price: 240, image: 'https://images.pexels.com/photos/33430559/pexels-photo-33430559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Mains', isVeg: true, isPopular: true, rating: 4.6, restaurantId: 'r1' },
  { id: 'm2', name: 'Dal Makhani', description: 'Slow-cooked black lentils in a creamy gravy', price: 180, image: 'https://images.pexels.com/photos/37420999/pexels-photo-37420999.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Mains', isVeg: true, isPopular: false, rating: 4.3, restaurantId: 'r1' },
  { id: 'm3', name: 'Paneer Tikka', description: 'Grilled cottage cheese skewers with bell peppers', price: 220, image: 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Starters', isVeg: true, isPopular: true, rating: 4.7, restaurantId: 'r1' },
  { id: 'm4', name: 'Garlic Naan', description: 'Soft flatbread brushed with garlic and butter', price: 50, image: 'https://images.pexels.com/photos/17223838/pexels-photo-17223838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Breads', isVeg: true, isPopular: false, rating: 4.4, restaurantId: 'r1' },
  { id: 'm5', name: 'Chicken Butter Masala', description: 'Tandoori chicken in a velvety tomato gravy', price: 280, image: 'https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Mains', isVeg: false, isPopular: true, rating: 4.5, restaurantId: 'r1' },

  // Pizza Italia (r2) — Italian
  { id: 'm6', name: 'Margherita Pizza', description: 'Fresh basil, mozzarella, and tomato sauce', price: 299, image: 'https://images.pexels.com/photos/31596394/pexels-photo-31596394.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Pizzas', isVeg: true, isPopular: true, rating: 4.8, restaurantId: 'r2' },
  { id: 'm7', name: 'Marinara Pizza', description: 'Tomato, garlic, oregano, and olive oil', price: 260, image: 'https://images.pexels.com/photos/19260730/pexels-photo-19260730.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Pizzas', isVeg: true, isPopular: false, rating: 4.3, restaurantId: 'r2' },
  { id: 'm8', name: 'Spaghetti Carbonara', description: 'Pasta with creamy bacon, egg, and parmesan', price: 320, image: 'https://images.pexels.com/photos/546945/pexels-photo-546945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Pasta', isVeg: false, isPopular: true, rating: 4.6, restaurantId: 'r2' },
  { id: 'm9', name: 'Creamy Herb Pasta', description: 'Penne in a smooth herb cream sauce', price: 280, image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Pasta', isVeg: true, isPopular: false, rating: 4.2, restaurantId: 'r2' },
  { id: 'm10', name: 'Spaghetti Bolognese', description: 'Slow-simmered meat sauce with fresh herbs', price: 340, image: 'https://images.pexels.com/photos/31637792/pexels-photo-31637792.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Pasta', isVeg: false, isPopular: true, rating: 4.5, restaurantId: 'r2' },

  // Burger Bros (r3) — American
  { id: 'm11', name: 'Crispy Chicken Burger', description: 'Fried chicken patty with lettuce and mayo', price: 190, image: 'https://images.pexels.com/photos/34407059/pexels-photo-34407059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Burgers', isVeg: false, isPopular: true, rating: 4.4, restaurantId: 'r3' },
  { id: 'm12', name: 'Double Cheeseburger', description: 'Two beef patties, double cheese, pickles', price: 250, image: 'https://images.pexels.com/photos/29481861/pexels-photo-29481861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Burgers', isVeg: false, isPopular: true, rating: 4.6, restaurantId: 'r3' },
  { id: 'm13', name: 'Cheeseburger Combo', description: 'Classic cheeseburger with fries and a drink', price: 320, image: 'https://images.pexels.com/photos/4109233/pexels-photo-4109233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Combos', isVeg: false, isPopular: true, rating: 4.5, restaurantId: 'r3' },
  { id: 'm14', name: 'Loaded Fries', description: 'Fries topped with cheese sauce and jalapeños', price: 120, image: 'https://images.pexels.com/photos/11519277/pexels-photo-11519277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Sides', isVeg: true, isPopular: false, rating: 4.2, restaurantId: 'r3' },

  // Dragon Wok (r4) — Chinese
  { id: 'm15', name: 'Jajangmyeon', description: 'Noodles in a savory black bean sauce', price: 210, image: 'https://images.pexels.com/photos/5339076/pexels-photo-5339076.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Noodles', isVeg: false, isPopular: true, rating: 4.4, restaurantId: 'r4' },
  { id: 'm16', name: 'Chilli Garlic Noodles', description: 'Spicy noodles with garlic and vegetables', price: 180, image: 'https://images.pexels.com/photos/37488682/pexels-photo-37488682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Noodles', isVeg: true, isPopular: true, rating: 4.5, restaurantId: 'r4' },
  { id: 'm17', name: 'Vegetable Hakka Noodles', description: 'Stir-fried noodles with crunchy vegetables', price: 160, image: 'https://images.pexels.com/photos/27238149/pexels-photo-27238149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Noodles', isVeg: true, isPopular: false, rating: 4.1, restaurantId: 'r4' },
  { id: 'm18', name: 'Schezwan Noodles', description: 'Fiery schezwan sauce with noodles and veggies', price: 190, image: 'https://images.pexels.com/photos/30676160/pexels-photo-30676160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Noodles', isVeg: true, isPopular: true, rating: 4.3, restaurantId: 'r4' },

  // Green Bowl (r5) — Healthy
  { id: 'm19', name: 'Grilled Chicken Salad', description: 'Fresh greens with grilled chicken and vinaigrette', price: 230, image: 'https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Salads', isVeg: false, isPopular: true, rating: 4.6, restaurantId: 'r5' },
  { id: 'm20', name: 'Falafel Salad', description: 'Crispy falafel with fresh veggies and tomato', price: 200, image: 'https://images.pexels.com/photos/4958946/pexels-photo-4958946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Salads', isVeg: true, isPopular: false, rating: 4.3, restaurantId: 'r5' },
  { id: 'm21', name: 'Avocado Veggie Bowl', description: 'Avocado, corn, beans, and cheese bowl', price: 250, image: 'https://images.pexels.com/photos/6065181/pexels-photo-6065181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Bowls', isVeg: true, isPopular: true, rating: 4.5, restaurantId: 'r5' },
  { id: 'm22', name: 'Poke Bowl', description: 'Eggs, fresh vegetables, and wholesome grains', price: 270, image: 'https://images.pexels.com/photos/15611222/pexels-photo-15611222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Bowls', isVeg: true, isPopular: false, rating: 4.4, restaurantId: 'r5' },

  // Sweet Tooth (r6) — Desserts
  { id: 'm23', name: 'Matcha Cake Slice', description: 'Layered matcha sponge with cream frosting', price: 150, image: 'https://images.pexels.com/photos/39240989/pexels-photo-39240989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Cakes', isVeg: true, isPopular: true, rating: 4.7, restaurantId: 'r6' },
  { id: 'm24', name: 'Mini Cream Cakes', description: 'Assorted mini cakes with icing and toppings', price: 180, image: 'https://images.pexels.com/photos/32916204/pexels-photo-32916204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Cakes', isVeg: true, isPopular: false, rating: 4.4, restaurantId: 'r6' },
  { id: 'm25', name: 'Berry Ice Cream Sundae', description: 'Berry ice cream with waffle cone and coffee', price: 130, image: 'https://images.pexels.com/photos/1352282/pexels-photo-1352282.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Ice Cream', isVeg: true, isPopular: true, rating: 4.8, restaurantId: 'r6' },
  { id: 'm26', name: 'Cherry Cheesecake', description: 'Creamy cheesecake with cherry topping and mint', price: 160, image: 'https://images.pexels.com/photos/38495630/pexels-photo-38495630.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Cakes', isVeg: true, isPopular: true, rating: 4.6, restaurantId: 'r6' },

  // Biryani House (r7) — Hyderabadi
  { id: 'm27', name: 'Vegetable Biryani', description: 'Fragrant rice with vegetables, cashews, and saffron', price: 220, image: 'https://images.pexels.com/photos/12669168/pexels-photo-12669168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Biryani', isVeg: true, isPopular: true, rating: 4.6, restaurantId: 'r7' },
  { id: 'm28', name: 'Lamb Biryani', description: 'Tender lamb biryani with spices and lime', price: 320, image: 'https://images.pexels.com/photos/5695615/pexels-photo-5695615.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Biryani', isVeg: false, isPopular: true, rating: 4.7, restaurantId: 'r7' },
  { id: 'm29', name: 'Chicken Biryani', description: 'Aromatic rice with spiced chicken and raita', price: 260, image: 'https://images.pexels.com/photos/8250738/pexels-photo-8250738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Biryani', isVeg: false, isPopular: true, rating: 4.5, restaurantId: 'r7' },
  { id: 'm30', name: 'Veg Fried Rice', description: 'Colorful fried rice with cashews and chilies', price: 180, image: 'https://images.pexels.com/photos/7593230/pexels-photo-7593230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Rice', isVeg: true, isPopular: false, rating: 4.2, restaurantId: 'r7' },

  // Dosa Junction (r8) — South Indian
  { id: 'm31', name: 'Masala Dosa', description: 'Crispy dosa with potato filling and chutneys', price: 120, image: 'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Dosa', isVeg: true, isPopular: true, rating: 4.7, restaurantId: 'r8' },
  { id: 'm32', name: 'Cone Dosa', description: 'Crispy cone-shaped dosa with three chutneys', price: 100, image: 'https://images.pexels.com/photos/20422121/pexels-photo-20422121.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Dosa', isVeg: true, isPopular: false, rating: 4.4, restaurantId: 'r8' },
  { id: 'm33', name: 'Triangular Dosa', description: 'Crispy folded dosa with sambar and chutney', price: 110, image: 'https://images.pexels.com/photos/20422133/pexels-photo-20422133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Dosa', isVeg: true, isPopular: false, rating: 4.3, restaurantId: 'r8' },
  { id: 'm34', name: 'Dosa Thali', description: 'Complete dosa meal with multiple chutneys and sambar', price: 180, image: 'https://images.pexels.com/photos/20422123/pexels-photo-20422123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Thali', isVeg: true, isPopular: true, rating: 4.6, restaurantId: 'r8' },
];

export function getMenuByRestaurant(restaurantId: string): MenuItem[] {
  return menuItems.filter((m) => m.restaurantId === restaurantId);
}

export function getPopularDishes(): MenuItem[] {
  return menuItems.filter((m) => m.isPopular).slice(0, 10);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((m) => m.id === id);
}
