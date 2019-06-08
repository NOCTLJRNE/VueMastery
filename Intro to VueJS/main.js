var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    inventory: 5,
    isShow: true,
    details: ["80% cotton", "20% polyester", "gender-neutral"],
    variants: [{ id: 2234, color: "green" }, { id: 2235, color: "blue" }]
  }
});
