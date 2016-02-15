$(function onWindowLoad() {

  var checkout = new State({
    defaultState: 'step-cart',
    activeClass: 'active'
  });

  checkout.init();
});
