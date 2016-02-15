(function (window, $) {

  var prefixes = { state: 'data-state', go: 'data-state-go' };
  var goEvent = 'click';

  window.State = function (options) {
    options = options || {};

    this.states = {};
    this.active = options.defaultState;
    this.onStateChange = options.onStateChange;
    this.activeClass = options.activeClass;
  };

  window.State.prototype.go = function (name) {
    this._assertStateExisting(name);

    // prevent double clicks to the same state
    if(name === this.active) {
      return false;
    }

    // set display to none on previous state
    this._toggleState(this.active);
    // delete active class from previous link
    this._toggleLink(this.active);
    // set display to block on current state
    this._toggleState(name);
    // set active class to previous link
    this._toggleLink(name);

    this.active = name;

    if(this.onStateChange) {
      this.onStateChange(this.active);
    }
  };

  window.State.prototype.init = function () {
    var self = this;

    $('[' + prefixes.state + ']').each(function (index, item) {
        var $container = $(item);
        var name = $container.attr(prefixes.state);

        self.states[name] = {
          $container: $container
        };
    });

    $('[' + prefixes.go + ']').on(goEvent, function (event) {
      event.preventDefault();

      self.go($(this).attr(prefixes.go));
    });

    // set default state link to active
    this._toggleLink(this.active);

    // set default state to active
    this._toggleState(this.active);
  };

  window.State.prototype._toggleState = function (name) {
    this.states[name].$container.toggle();
  };

  window.State.prototype._toggleLink = function (name) {
    $('[:attr=:value]'
      .replace(':attr', prefixes.go)
      .replace(':value', name)
    ).toggleClass(this.activeClass);
  };

  window.State.prototype._assertStateExisting = function (name) {
    if(!this.states[name]) {
      throw new Error('State ' + name + ' is undefined');
    }

    return true;
  };

})(window, $);
