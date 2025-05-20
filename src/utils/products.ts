import { Product } from "../types/Product";
export const products = [
    {
      id: '1',
      title: 'SSD NVMe Kingston 1TB',
      description: 'SSD Kingston NVMe de 1TB com alto desempenho e velocidade. Com tecnologia PCIE 4.0 NVME M.2, oferece gravação de 4000MB/s e leitura de 6000MB/s, garantindo acesso rápido a seus dados. Além disso, conta com 1 ano de garantia, proporcionando segurança e confiança a sua compra.',
      image: require('../assets/inf1.png'),
      price: 520.0,
      installment: {
        quantity: 12,
        value: 50.28,
      },
      category: 'Informática',
      quantily: 1,
    },
    // aqui você poderá adicionar mais produtos depois
  ];