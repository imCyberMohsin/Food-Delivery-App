# Food Delivery Website
- Welcome to our Food Delivery website, a seamless platform where users can browse a variety of delicious food items, place orders, and track their delivery in real-time. 
- This project aims to provide a smooth and enjoyable user experience from browsing the menu to receiving the food. 
- With a user-friendly admin panel, managing the menu and orders is straightforward and efficient.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/imCyberMohsin/Food-Delivery-App.git
    cd Food-Delivery-App
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a .env file in the root directory and add the following:
    ```sh
    MONGO_URI=your_mongodb_connection_string
    COOKIE_SECRET=your_cookie_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_PUBLIC_KEY=your_stripe_public_key
    ```
4. Start the server:
    ```sh
    npm run dev
        OR
    node app.js
    ```

## Usage
- Open your web browser and go to http://localhost:3000


## Features
- User authentication and authorization using Passport.js
- Real-time order status updates with Socket.io
- Payment processing with Stripe
- Admin panel for managing menu items and orders
- Search functionality for menu items

## Technologies Used
```
Frontend:
    EJS
    Tailwind CSS
    Javascript

Backend:
    Node.js
    Express.js
    MongoDB
    Mongoose.js

Express Modules
    Passport.js
    Socket.io
    Stripe
    Multer
    Axios
    Noty
```


## File Structure
```
food-delivery/
├─ app/
│   ├── config/
│   │   └── passport.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   └── statusController.js
│   ├── models/
│   │   ├── menu.js
│   │   ├── order.js
│   │   └── user.js
│   └── routes/
│       ├── admin.js
│       ├── auth.js
│       ├── index.js
│       └── order.js
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── views/
│   ├── admin/
│   ├── auth/
│   ├── orders/
│   ├── partials/
│   └── index.ejs
├── .env
├── .gitignore
├── package.json
├── app.js
└── README.md
```


## API Endpoints

### User Authentication
```
POST /login - Login a user
POST /register - Register a new user
GET /logout - Logout a user
```

### Orders
```
GET /orders - Get all orders for a user
POST /orders - Create a new order
```



## Contributing
If you would like to contribute, please fork the repository and submit a pull request 😁😄


## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE.txt) file for details.