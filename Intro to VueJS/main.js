Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `      <div class="product">
  <div class="product-image">
    <img v-bind:src="image" />
  </div>
  <div class="product-info">
    <h1>{{ title }}</h1>
    <h2>{{ product }}</h2>
    <p v-if="inventory > 5">In Stock</p>
    <p v-else-if="inventory <= 5 && inventory > 0">Almost sold out</p>
    <p v-else>Out of Stock</p>
    <p>User is premium: {{ premium }}</p>
    <p> Shipping is {{shipping}} </p>
    <p v-show="isShow">Show it !</p>
    <p v-show="!isShow">Hide it !</p>
    <ul>
      <li v-for="_detail in details">{{ _detail }}</li>
    </ul>
    <div
      v-for="(_variant, index) in variants"
      :key="_variant.id"
      class="color-box"
      :style="{backgroundColor: _variant.color}"
      @mouseover="updateProduct(index)"
    >
      <p>
        {{ _variant.color }}
      </p>
    </div>
    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="[ inStock ? '' : 'disabledButton', 'errorClass' ]"
    >
      Add to cart
    </button>
    <div class="cart">
      <p>Cart({{ cart }})</p>
    </div>
  </div>
</div>`,
  data() {
    return {
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
    };
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
    },
    shipping: function() {
      return this.premium ? "Free" : "$3.99";
    }
  }
});
var app = new Vue({
  el: "#app",
  data: {
    premium: true
  }
});
