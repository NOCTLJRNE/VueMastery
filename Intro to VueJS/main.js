var eventBus = new Vue();
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Number,
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
    <button v-on:click="removeFromCart" v-bind:disabled="!cart" :class="[cart ? '' : 'disabledButton', 'errorClass']"> Remove from cart</button>
  </div>
  <product-tabs :reviews="reviews" ></product-tabs>

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
      reviews: []
    };
  },
  methods: {
    addToCart: function() {
      //this.cart += 1;
      this.$emit("add-to-cart-event", this.variants[this.selectedVariant].id);
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      console.log("remove");
      this.$emit("remove-from-cart-event");
    }
    // addReview(productReview) {
    //   this.reviews.push(productReview);
    // }
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
  },
  mounted() {
    eventBus.$on("review-submitted-event", productReview => {
      this.reviews.push(productReview);
    });
  }
});
Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
  <b>Please correct the following error(s)</b>
  <ul>
    <li v-for="error in errors">{{error}}</li>
  </ul>
  </p>
  <p>
    <label for="name">Name;</label>
    <input id="name" v-model="name">
  </p>
  <p>
    <label for="review">Review;</label>
    <textarea id="review" v-model="review" required></textarea> 
  </p>
  <label for="rating">Rating:</label>
  <select id="rating" v-model.number="rating">
    <option>5</option>  
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>  
  </select>
  </p>
<p>
<input type="submit" value="Submit">
</p>
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        eventBus.$emit("review-submitted-event", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
      }
    }
  }
});
Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
    // addReview: {
    //   type: Function,
    //   required: true
    // }
  },
  template: `

    <div>
      <span class="tab" v-for="(tab, index) in tabs" :class="{ activeTab: selectedTab === tab }" :key="index" @click="selectedTab = tab">{{tab}}</span>
   
      <div v-show="selectedTab === 'Reviews'">
      <h2> Reviews </h2>
        <p v-if="!reviews.length"> There are no reviews yet. </p>
          <ul>
            <li v-for="review in reviews"> 
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            </li>
          </ul>
       
      </div>
      <product-review v-show="selectedTab === 'Make a Review'"></product-review>  
    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
  }
});
var app = new Vue({
  el: "#app",

  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart: function(id) {
      this.cart.push(id);
    },
    removeCart: function() {
      var element = this.cart.pop();
      console.log(`${element} removed`);
    }
  }
});
Vue.config.devtools = true;
