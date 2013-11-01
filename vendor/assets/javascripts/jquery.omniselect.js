!function($, window) {
  var omniselect = function(spec) {
    var plugin = {}, data = { visible: false };

    var defaults = {
      cycle: false,
      source: [],
      resultsClass: 'omniselect-results',
      activeClass: 'omniselect-active',
      searchDelay: 300,
      numResults: 5,
      allowAdd: false
    };

    var keys = {
      tab: 9,
      enter: 13,
      shift: 16,
      control: 17,
      alt: 18,
      escape: 27,
      up: 38,
      down: 40
    }

    var $input = $(spec.input),
      options = $.extend({}, defaults, spec.options),
      $results = $('<ol></ol>', { class: options.resultsClass }),
      activeClassSelector = '.' + options.activeClass.split(' ').join('.'),
      resultsClassSelector = '.' + options.resultsClass.split(' ').join('.');

    var init = function() {
      $results.insertAfter($input);
      bind();
    };

    var show = function() {
      var visible = get('visible');
      if (!visible) {
        set('visible', true);
        $results.show();
      }
    };

    var hide = function() {
      var visible = get('visible');
      if (visible) {
        set('visible', false);
        set('index', 0);
        $results.hide();
      }
    }

    var bind = function() {
      $input.on('keyup.omniselect', keyup)
        .on('keydown.omniselect', keydown);
      $results.on('click.omniselect', 'li', click)
        .on('mouseenter.omniselect', 'li', mouseenter);
      $input.on('omniselect:results:changed', resultsChanged)
        .on('omniselect:index:changed', indexChanged);
    };

    var destroy = function() {
      $input.off('keydown.omniselect').off('keyup.omniselect')
      $results.off('click.omniselect', 'li')
        .off('mouseenter.omniselect', 'li');
      $input.off('omniselect:results:changed')
        .off('omniselect:index:changed');
    };

    var set = function(key, value) {
      var oldValue = data[key];
      data[key] = value;
      if (value != oldValue) {
        $input.trigger('omniselect:' + key + ':changed', [value, oldValue]);
      }
    };

    var get = function(key) {
      return data[key];
    };

    var selectedItem = function() {
      var index = get('index'), results = get('results');
      return results[index];
    }

    var resultsChanged = function() {
      var results = get('results'), query = get('query'), renderedItems = [];
      results.forEach(function(item, index) {
        var $renderedItem = $(renderItem(item, index));
        $renderedItem.data('omniselect-index', index);
        renderedItems.push($renderedItem);
      });
      show();
      $results.html(renderedItems);
      set('renderedItems', renderedItems);
      set('index', 0)
    };

    var indexChanged = function() {
      var index = get('index'), renderedItems = get('renderedItems');
      renderedItems.forEach(function($item, itemIndex) {
        if (index == itemIndex) {
          $item.addClass(options.activeClass);
        } else {
          $item.removeClass(options.activeClass);
        }
      });
    };

    var parse = options.parse || function (input) {
      return input.val();
    };

    var renderItem = options.renderItem || function(item, index) {
      return '<li><a href="#" class="item">' + itemLabel(item, index) + '</a></li>';
    };

    var hasModifierKey = function(e) {
      return e.altKey || e.ctrlKey || e.metaKey;
    }

    var keydown = function(e) {
      if (get('visible') && !hasModifierKey(e)) {
        switch(e.keyCode) {
          case keys.tab:
          case keys.enter:
          case keys.escape:
          case keys.up:
          case keys.down:
            e.preventDefault();
            return;
        }
      }
    };

    var keyup = function(e) {
      if (hasModifierKey(e)) return;
      if (get('visible')) {
        switch (e.keyCode) {
          case keys.up:
            previous(); e.preventDefault(); return false;
          case keys.down:
            next(); return;
          case keys.escape:
            hide(); return false;
          case keys.tab:
          case keys.enter:
            select(); return false;
        }
      }
      search();
    };

    var mouseenter = function(e) {
      set('index', $(e.currentTarget).data('omniselect-index'));
    };

    var click = function(e) {
      set('index', $(e.currentTarget).data('omniselect-index'));
      select();
      return false;
    };

    var select = function() {
      var item = selectedItem();
      if (fire('omniselect:select', item)) { hide(); }
    }

    var findItemIndex = function(id) {
      var itemIndex;
      results.forEach(function(item, index) {
        if (itemId(item, index) == id) {
          itemIndex = index;
        }
      });
      return itemIndex;
    }

    var itemId = options.itemId || function(item, index) {
      return item;
    };

    var itemLabel = options.itemLabel || function(item, index) {
      return item;
    };

    var search = function() {
      var query = parse($input), lastQuery = get('query'), searching = get('searching');
      set('query', query);
      if (query == '') { hide(); return }
      if (query == lastQuery) { return }

      var callback = function(results) {
        var exactMatch = false;
        results.forEach(function(result) {
          if (result.name == query) { exactMatch = true }
          result.isAddItem = false;
        });
        if (options.allowAdd && !exactMatch) {
          var addResult = {
            isAddItem: true,
            name: query
          };
          results.push(addResult);
        }
        set('results', results)
      }

      if ($.isFunction(options.source)) {
        if (searching) { clearTimeout(searching) };
        set('searching', setTimeout(function() { options.source(query, callback) }, options.searchDelay));
      } else {
        callback(options.source);
      }
    };

    var previous = function() {
      var index = get('index'), renderedItems = get('renderedItems');
      if (index > 0) {
        set('index', index - 1);
      } else if (options.cycle) {
        set('index', renderedItems.length - 1);
      }
    }

    var next = function() {
      var index = get('index'), renderedItems = get('renderedItems');
      if (index < renderedItems.length - 1) {
        set('index', index + 1);
      } else if (options.cycle) {
        set('index', 0);
      }
    }

    var fire = function(name, eventData) {
      var event = $.Event(name);
      $input.trigger(event, eventData);
      return event.result !== false;
    };

    init();
  };
  window.omniselect = omniselect;

  $.fn.omniselect = function(options) {
    return this.each(function() {
      omniselect({ input: this, options: options });
    });
  };

}(jQuery, window);

/* vim: set ts=2 sw=2: */
