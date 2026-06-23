// ============================================
// DATOS DE PRODUCTOS - BMC VAPING
// ============================================

const productsData = [
    {
        id: 1,
        name: "VAPE LOST MARY BLACK MINT ",
        category: "desechable",
        brand: "LOST MARY",
        price: 250,
        oldPrice: 280,
        rating: 4.8,
        reviews: 23,
        image: "Inventario/lostmary.jpg",
        description: "Vape desechable con 35,000 PUFFS. Batería de larga duración y sabores intensos.",
        stock: 15,
        isNew: true,
        isBestSeller: true,
        flavors: ["Menta", "Frutos Rojos", "Uva", "Sandía"]
    },
    {
        id: 2,
        name: "Maskking High Pro Plus ",
        category: "recargable",
        brand: "Maskking",
        price: 180,
        oldPrice: null,
        rating: 4.6,
        reviews: 18,
        image: "Inventario/maskking.jpg",
        description: "Vape desechable con 1800 PUFFS. Batería de larga duración y sabores intensos.",
        stock: 20,
        isNew: true,
        isBestSeller: false,
        flavors: ["Menta", "Uva", "Sandía"]
    },
    {
        id: 3,
        name: "E-Liquid BMC Mix 30ml",
        category: "liquido",
        brand: "BMC",
        price: 90,
        oldPrice: 110,
        rating: 4.7,
        reviews: 31,
        image: "assets/images/products/liquid-mix.jpg",
        description: "Sales de nicotina 20mg/35mg. Sabores intensos y duraderos.",
        stock: 40,
        isNew: false,
        isBestSeller: true,
        flavors: ["Mango Helado", "Tabaco", "Menta Ártica", "Frutas del Bosque"]
    },
    {
        id: 4,
        name: "BMC Box Mod 80W",
        category: "mod",
        brand: "BMC",
        price: 450,
        oldPrice: 500,
        rating: 4.9,
        reviews: 12,
        image: "assets/images/products/box-mod.jpg",
        description: "Potencia ajustable hasta 80W, pantalla digital, compatible con resistencias 0.2-1.0 ohm.",
        stock: 8,
        isNew: false,
        isBestSeller: false,
        flavors: null
    },
    {
        id: 5,
        name: "Pack de Coils (5 unidades)",
        category: "accesorio",
        brand: "BMC",
        price: 60,
        oldPrice: null,
        rating: 4.5,
        reviews: 9,
        image: "assets/images/products/coils.jpg",
        description: "Resistencias de repuesto compatibles con la mayoría de pods BMC.",
        stock: 25,
        isNew: false,
        isBestSeller: false,
        flavors: null
    },
    {
        id: 6,
        name: "Combo Inicial Vaper",
        category: "recargable",
        brand: "BMC",
        price: 350,
        oldPrice: 420,
        rating: 4.8,
        reviews: 15,
        image: "assets/images/products/combo-inicial.jpg",
        description: "Pod recargable + 2 líquidos a elección + cargador. Ideal para empezar.",
        stock: 10,
        isNew: true,
        isBestSeller: true,
        flavors: null
    },
    {
        id: 7,
        name: "Waka de 30k ",
        category: "desechable",
        brand: "Waka",
        price: 150,
        oldPrice: 180,
        rating: 4.8,
        reviews: 23,
        image: "assets/images/products/cloud-6000.jpg",
        description: "Vape desechable con 30,000 puffs. Batería de larga duración y sabores intensos.",
        stock: 15,
        isNew: true,
        isBestSeller: true,
        flavors: ["Menta", "Frutos Rojos","Sandía"]
    }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productsData;
}