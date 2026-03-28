import productVaso from "@/assets/product-vaso.jpg";
import productLuminaria from "@/assets/product-luminaria.jpg";
import productSuporte from "@/assets/product-suporte.jpg";
import productOrganizador from "@/assets/product-organizador.jpg";
import productDragao from "@/assets/product-dragao.jpg";
import productChaveiro from "@/assets/product-chaveiro.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  customizable: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Vaso Geométrico",
    description: "Vaso decorativo com design geométrico moderno, perfeito para suculentas e plantas pequenas.",
    price: 49.90,
    image: productVaso,
    category: "Decoração",
    customizable: true,
  },
  {
    id: "2",
    name: "Luminária Lunar",
    description: "Luminária em formato de lua com detalhes realistas de crateras. Iluminação LED inclusa.",
    price: 89.90,
    image: productLuminaria,
    category: "Iluminação",
    customizable: true,
  },
  {
    id: "3",
    name: "Suporte para Fone",
    description: "Suporte elegante para headset com design minimalista e encaixe universal.",
    price: 39.90,
    image: productSuporte,
    category: "Acessórios",
    customizable: false,
  },
  {
    id: "4",
    name: "Organizador de Mesa",
    description: "Organizador modular para escritório com compartimentos para canetas, celular e cartões.",
    price: 59.90,
    image: productOrganizador,
    category: "Escritório",
    customizable: true,
  },
  {
    id: "5",
    name: "Miniatura de Dragão",
    description: "Miniatura articulada de dragão com alto nível de detalhe. Ideal para colecionadores.",
    price: 79.90,
    image: productDragao,
    category: "Colecionáveis",
    customizable: false,
  },
  {
    id: "6",
    name: "Porta-Chaves Personalizado",
    description: "Porta-chaves com formato customizável. Adicione seu nome ou símbolo favorito.",
    price: 24.90,
    image: productChaveiro,
    category: "Acessórios",
    customizable: true,
  },
];
