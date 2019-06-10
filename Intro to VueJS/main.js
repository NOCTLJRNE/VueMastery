var app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "Socks",
    selectedVariant: 0,
    //  image: "./assets/vmSocks-green-onWhite.jpg",
    //inStock: false,
    inventory: 5,
    isShow: true,
    details: ["80% cotton", "20% polyester", "gender-neutral"],
    variants: [
      {
        id: 2234,
        color: "green",
        image: "./assets/vmSocks-green-onWhite.jpg",
        quantity: 10
      },
      {
        id: 2235,
        color: "blue",
        image: "./assets/vmSocks-blue-onWhite.jpg",
        quantity: 0
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title: function() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock: function() {
      return this.variants[this.selectedVariant].quantity;
    }
  }
});
