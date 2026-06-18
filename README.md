# Muskan's Kitchen - Cloud Kitchen Web Application

A modern, responsive web application for a cloud kitchen built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

### 🎨 Design System
- **Color Palette**: Buttermilk Cream, Muted Salmon Pink, Apricot, Warm Espresso
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, aesthetic, and warm design language

### 🍽️ Customer Experience
- **Menu Display**: Grid layout showing dishes with images, prices, and descriptions
- **Search Functionality**: Real-time search bar to find dishes by name
- **Availability Filters**: Toggle to show/hide unavailable items
- **Today's Specials**: Highlighted section for special dishes
- **Shopping Cart**: Add/remove items, adjust quantities, sticky drawer UI
- **Order Summary**: Real-time cart total and item count

### 📱 WhatsApp Integration
- **Automated Ordering**: Pre-filled WhatsApp messages with customer details
- **Order Format**:
  ```
  *Muskan's Kitchen - New Order*
  ─────────────────────
  Customer: [Name]
  Address: [Address]
  Notes: [Optional]
  ─────────────────────
  Items:
  • [Qty]x [Dish Name] (₹[Price])
  ─────────────────────
  *Total: ₹[Total Price]*
  ```
- **Direct WhatsApp Link**: +91 9586600874

### 👨‍💼 Admin Panel
- **Dish Management**: Toggle availability status for each item
- **Today's Specials**: Mark dishes as featured specials
- **Operating Hours**: Set opening and closing times
- **Closed Today Toggle**: Disable orders when closed
- **Persistent State**: Changes reflected immediately on customer side

### 📞 Contact & Social
- **Phone**: +91 9586600874
- **WhatsApp Chat**: Direct messaging link
- **Instagram**: Social media integration
- **Email Contact**: order@muskanskitchen.com

## Project Structure

```
.
├── index.html          # Main HTML file with all UI components
├── js/
│   └── app.js         # State management and JavaScript logic
└── README.md          # This file
```

## File Descriptions

### index.html
- Complete HTML structure with semantic markup
- Tailwind CSS classes for styling
- Font Awesome icons for UI elements
- All modal and drawer components
- Hero section with CTA
- Footer with contact information

### js/app.js
**State Management**
- `state` object: Central store for menu, cart, and admin settings
- Menu data with 10 demo dishes
- Cart operations and management
- Admin configuration

**Core Functions**
- `getCartTotal()`: Calculate order total
- `formatWhatsAppMessage()`: Build pre-filled WhatsApp message
- `renderMenu()`: Display menu with filters and search
- `renderCart()`: Display cart items and total
- `renderAdminPanel()`: Display admin controls
- `addToCart()`, `removeFromCart()`, `updateQuantity()`: Cart operations
- `openCart()`, `closeCart()`: Cart UI management
- `openAdmin()`, `closeAdmin()`: Admin panel management
- `openOrderModal()`, `closeOrderModal()`: Order form management

## Menu Items (Demo Data)

1. **Veg Manchurian** - ₹180 (Main Course, Special)
2. **Paneer Tikka** - ₹220 (Main Course, Special)
3. **Paneer Chilli** - ₹200 (Main Course)
4. **Mexican Burger** - ₹150 (Burgers)
5. **Chinese Bowl** - ₹160 (Bowls)
6. **Mexican Bowl** - ₹170 (Bowls)
7. **Iced Tea** - ₹60 (Beverages)
8. **Cold Coffee** - ₹80 (Beverages)
9. **Tea** - ₹40 (Beverages)
10. **Chocolate Brownie** - ₹90 (Desserts)

## How to Use

### For Customers
1. **Browse Menu**: View all available dishes in the grid layout
2. **Search**: Use the search bar to find specific dishes
3. **Filter**: Toggle "Show Unavailable" to see out-of-stock items
4. **Add Items**: Click "Add to Cart" to add dishes
5. **Review Cart**: Click the cart icon to view your order
6. **Manage Order**: Adjust quantities or remove items
7. **Checkout**: Click "Place Order" and fill in your details
8. **Send Order**: Click "Send via WhatsApp" to complete the order

### For Admin
1. **Open Admin Panel**: Click the "Admin Panel" button
2. **Set Hours**: Set operating hours
3. **Close Today**: Toggle "Closed Today" to disable orders
4. **Manage Dishes**: 
   - Toggle availability for each dish
   - Mark items as "Today's Special"
5. **Save Changes**: Click "Save Changes" to apply updates

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: State management and interactivity
- **Font Awesome**: Icon library
- **WhatsApp Business API**: Order automation via wa.me links

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Mobile**: 0px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Features & Customization

### To Add New Dishes
Edit the `state.menu` array in `js/app.js`:
```javascript
{ id: 11, name: 'New Dish', price: 150, category: 'Category', available: true, special: false, description: 'Description' }
```

### To Change WhatsApp Number
Update the phone number in:
1. `js/app.js`: `https://wa.me/919586600874`
2. `index.html`: Footer WhatsApp links

### To Change Colors
Modify the Tailwind color config in the `<head>` of `index.html`:
```javascript
colors: {
    'cream': '#FFFDD0',
    'salmon': '#E8B4B8',
    'apricot': '#FFBF7F',
    'espresso': '#3E2723'
}
```

## Performance Optimizations

- Lightweight JavaScript (no external dependencies)
- Efficient DOM manipulation with event delegation
- CSS optimizations with Tailwind purging
- Responsive images with lazy loading ready

## Future Enhancements

- Backend integration for persistent data storage
- User authentication and order history
- Payment gateway integration
- Real-time order tracking
- Image uploads for menu items
- Email notifications
- Analytics dashboard
- Multiple language support

## License

MIT License - Feel free to use and modify this project

## Support

For issues or questions, contact: order@muskanskitchen.com

---

**Made with ❤️ for Muskan's Kitchen**