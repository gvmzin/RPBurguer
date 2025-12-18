export const MENU_ITEMS = {
    gourmet: [
        {
            id: 'rp-classico',
            name: 'RPCLASSICO',
            price: 18.00,
            description: 'Pão de batata, carne fraldinha, queijo cheddar, molho cheddar, ketchup, maionese da casa, barbecue, alface, tomate.',
            image: '/RP_CLASSICO.png',
            type: 'card'
        },
        {
            id: 'rp-burguer',
            name: 'RPBURGER',
            price: 22.00,
            description: 'Pão de batata, carne fraldinha, queijo cheddar, cebola caramelizada, bacon, molho cheddar, ketchup, maionese da casa, barbecue, alface, tomate.',
            image: '/PRBURGUER.png',
            popular: true,
            type: 'card'
        },
        {
            id: 'dupla-ignorancia',
            name: 'DUPLA IGNORÂNCIA',
            price: 31.00,
            description: 'Pão de batata, 2x carne fraldinha, 2x queijo cheddar, cebola caramelizada, bacon, molho cheddar, ketchup, maionese da casa, barbecue, alface, tomate.',
            image: '/DUPLAIGNORANCIA.png',
            type: 'card'
        }
    ],
    tradicionais: [
        {
            id: 'misto',
            name: 'MISTO',
            price: 6.00,
            description: 'Pão, queijo, presunto, ketchup, mostarda, maionese.',
            type: 'list'
        },
        {
            id: 'hamburguer',
            name: 'HAMBURGUER',
            price: 8.00,
            description: 'Pão, carne de hambúrguer, alface, tomate, ketchup, mostarda, maionese.',
            type: 'list'
        },
        {
            id: 'misburguer',
            name: 'MISBURGUER',
            price: 12.00,
            description: 'Pão, carne de hambúrguer, queijo, presunto, alface, tomate, ketchup, mostarda, maionese.',
            type: 'list'
        },
        {
            id: 'misbacon',
            name: 'MISBACON',
            price: 16.00,
            description: 'Pão, carne de hambúrguer, queijo, presunto, bacon, alface, tomate, ketchup, mostarda, maionese.',
            type: 'list'
        }
    ],
    batatas: [
        {
            id: 'batata-100g',
            name: 'Batata 100g',
            price: 7.00,
            type: 'list'
        },
        {
            id: 'batata-200g',
            name: 'Batata 200g',
            price: 10.00,
            type: 'list'
        },
        {
            id: 'batata-200g-special',
            name: 'Batata 200g Especial',
            price: 15.00,
            description: 'Acompanhada de Cheddar & Bacon',
            type: 'list'
        }
    ],
    bebidas: [
        {
            id: 'goob-250ml',
            name: 'Goob 250ml',
            price: 2.50,
            type: 'list'
        },
        {
            id: 'refri-350ml',
            name: 'Refri 350ml',
            price: 5.00,
            type: 'list'
        },
        {
            id: 'refri-1l',
            name: 'Refri 1L',
            price: 7.00,
            type: 'list'
        },
        {
            id: 'agua-500ml',
            name: 'Água 500ml',
            price: 2.00,
            type: 'list'
        }
    ]
};
