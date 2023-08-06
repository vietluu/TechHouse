export type product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  images: [string];
  discountPercentage: number;
  rating: number;
  brand: string;
  thumbnail: string;
  stock: number;
};
export type Listproduct = {
  products: [
    {
      id: number;
      title: string;
      price: number;
      category: string;
      description: string;
      images: [string];
      discountPercentage: number;
      rating: number;
      brand: string;
      thumbnail: string;
      stock: number;
    }
  ];

  total: number;
  skip: number;
  limit: number;
};
export type cart = {
  isLoading: Boolean;
  hasErr: Boolean;
  data: {
    carts: [
      {
        id: number;
        products: [
          {
            id: number;
            title: string;
            price: number;
            quantity: number;
            total: number;
            discountPercentage: number;
            discountedPrice: number;
          }
        ];
        total: number;
        discountedTotal: number;
        userId: number; // user id is 5
        totalProducts: number;
        totalQuantity: number;
      }
    ];
    total: number;
    skip: number;
    limit: number;
  } | null;
};

export type cartAdd = {
  userId: number;
  products: [
    {
      id: number;
      quantity: number;
    }
  ];
};
