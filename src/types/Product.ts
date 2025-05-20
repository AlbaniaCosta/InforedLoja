export type Product = {
    title: string;
    description: string;
    image: any;
    price: number;
    installment: {
      quantity: number;
      value: number;
    };
  };