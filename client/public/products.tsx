const products: Array<Product>=[
    {
        id:'001',
        img:'../src/assets/productimages/71wD439AytL._SL1500_.jpg'
    },
    {
        id:'002',
        img:'../src/assets/productimages/71wD439AytL._SL1500_.jpg'
    },
    {
        id:'003',
        img:'../src/assets/productimages/71wD439AytL._SL1500_.jpg'
    },
    {
        id:'004',
        img:'../src/assets/productimages/71wD439AytL._SL1500_.jpg'
    },
    {
        id:'005',
        img:'../src/assets/productimages/71wD439AytL._SL1500_.jpg'
    }
]

export function getProductImage(id: string){
    let image = undefined
    products.forEach((prod)=>{
        if (prod.id === id){
            image = prod.img
        }
    })
    if(image){
        return image
    }else{
        return "null"
    }
}

export interface Product{
    id: string,
    img: string
}