export type Item = {
    id: number;
    title: string;
    subtitle: string;
  };
  

  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }
  
  export  interface APIProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

  

  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number; 
  }
  