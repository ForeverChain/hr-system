const categories = [
    {
        _id: '61b0d3975741dd2e949d53f9',
        children: ['Sports', 'Fitness'],
        parent: 'Sports & Fitness',
        type: 'Sports & Fitness',
        icon: 'https://i.ibb.co/qNCvxT0/dumbbell.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5407',
        children: ['Oil', 'Rice', 'Flour', 'Dry Vegetable', 'Spices & Mixes'],
        parent: 'Cooking Essentials',
        type: 'Grocery',
        icon: 'https://i.ibb.co/hBv30Rt/frying-pan.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5408',
        children: ['Fresh Seafood'],
        parent: 'Fresh Seafood',
        type: 'Grocery',
        icon: 'https://i.ibb.co/pfscwF4/shrimp.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5409',
        children: ['Dry Fruits', 'Fresh Fruits', 'Fresh Vegetable'],
        parent: 'Fruits & Vegetable',
        type: 'Grocery',
        icon: 'https://i.postimg.cc/RZ275n3f/cabbage.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d53fc',
        children: ['Baby Food', 'Baby Accessories'],
        parent: 'Baby Care',
        type: 'Health Care',
        icon: 'https://i.postimg.cc/QNqrnQBB/baby.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5404',
        children: ['Dairy', 'Ice Cream', 'Butter & Ghee'],
        parent: 'Milk & Dairy',
        type: 'Grocery',
        icon: 'https://i.ibb.co/181Qpm8/milk.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d53fa',
        children: ['Bath', 'Cosmetics', 'Oral Care', 'Skin Care', 'Body Care', 'Shaving Needs'],
        parent: 'Beauty & Health',
        type: 'Health Care',
        icon: 'https://i.postimg.cc/gjz1P7wx/beauty.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d53ff',
        children: ['Chocolate', 'Chips & Nuts', 'Canned Food'],
        parent: 'Snacks & Instant',
        type: 'Grocery',
        icon: 'https://i.ibb.co/HT7c6VT/chips.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5401',
        children: ['Sauces', 'Pickles & Condiments'],
        parent: 'Sauces & Pickles',
        type: 'Grocery',
        icon: 'https://i.postimg.cc/mk09xvk4/chili-sauce.png',
        status: 'Hide',
    },
    {
        _id: '61b0d3975741dd2e949d53fd',
        children: [
            'Cleaner',
            'Laundry',
            'Air Freshener',
            'Water Filter',
            'Pest Control',
            'Cleaning Tools',
        ],
        parent: 'Household Tools',
        type: 'Home Accessories',
        icon: 'https://i.ibb.co/rdY6zL0/cleaner.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5400',
        children: ['Jam & Jelly'],
        parent: 'Jam & Jelly',
        type: 'Grocery',
        icon: 'https://i.postimg.cc/rmLvfsMC/strawberry-jam-1.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d53fe',
        children: ['Cakes', 'Biscuits'],
        parent: 'Biscuits & Cakes',
        type: 'Grocery',
        icon: 'https://i.postimg.cc/0jVF5Cmc/cookie.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5402',
        children: ['Honey'],
        parent: 'Honey',
        type: 'Grocery',
        icon: 'https://i.postimg.cc/65JSfy6H/honey-1.png',
        status: 'Hide',
    },
    {
        _id: '61b0d3975741dd2e949d5405',
        children: ['Tea', 'Water', 'Juice', 'Coffee', 'Energy Drinks'],
        parent: 'Drinks',
        type: 'Grocery',
        icon: 'https://i.ibb.co/Dz8LKDX/soft-drink.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d53fb',
        children: ['Cat Care', 'Dog Care', 'Bird Care'],
        parent: 'Pet Care',
        type: 'Grocery',
        icon: 'https://i.postimg.cc/RVVzrWfg/cat.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5406',
        children: ['Bread', 'Cereal'],
        parent: 'Breakfast',
        type: 'Grocery',
        icon: 'https://i.ibb.co/dgPzSt7/bagel.png',
        status: 'Hide',
    },
    {
        _id: '61b0d3975741dd2e949d540a',
        children: ['Fish', 'Meat'],
        parent: 'Fish & Meat',
        type: 'Grocery',
        icon: 'https://i.ibb.co/y0zXYj5/carp-fish.png',
        status: 'Show',
    },
    {
        _id: '61b0d3975741dd2e949d5403',
        children: ['Organic Food'],
        parent: 'Organic Food',
        type: 'Grocery',
        icon: 'https://i.ibb.co/xmGhNRF/apple.png',
        status: 'Show',
    },
];

const categoryData = categories.sort((a, b) => -1);

export default categoryData;
