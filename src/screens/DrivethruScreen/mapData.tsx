const Images = [
    { image: require('../../assets/images/KFC.png') },
    { image: require('../../assets/images/MCDonald.png') },
    { image: require('../../assets/images/KFC.png') },
    { image: require('../../assets/images/MCDonald.png') },
];

export const markers = [
    {
        id: 1,
        coordinate: {
            latitude: 10.79689789,
            longitude: 106.72606756, // Điều chỉnh longitude
        },
        title: "Amazing Food Place",
        description: "This is the best food place",
        image: Images[0].image,
        rating: 4,
        reviews: 99,
    },
    {
        id: 2,
        coordinate: {
            latitude: 10.79689745,
            longitude: 106.71656756, // Thay đổi longitude
        },
        title: "Second Amazing Food Place",
        description: "This is second best food place",
        image: Images[1].image,
        rating: 5,
        reviews: 102,
    },
    {
        id: 3,
        coordinate: {
            latitude: 10.79735693,
            longitude: 106.70598960, // Thay đổi longitude
        },
        title: "Third Amazing Food Place",
        description: "This is the third food place",
        image: Images[2].image,
        rating: 5,
        reviews: 201,
    },
    {
        id: 4,
        coordinate: {
            latitude: 10.80406935,
            longitude: 106.70296945, // Thay đổi longitude
        },
        title: "Fourth Amazing Food Place",
        description: "This is the fourth best food place",
        image: Images[3].image,
        rating: 3,
        reviews: 88,
    },
];
