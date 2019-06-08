var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    inventory: 5,
    isShow: true,
    details: ["80% cotton", "20% polyester", "gender-neutral"],
    variants: [
      { id: 2234, color: "green", image: "./assets/vmSocks-green-onWhite.jpg" },
      { id: 2235, color: "blue", image: "./assets/vmSocks-blue-onWhite.jpg" }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    updateProduct: function(variantImage) {
      this.image = variantImage;
    }
  }
});
