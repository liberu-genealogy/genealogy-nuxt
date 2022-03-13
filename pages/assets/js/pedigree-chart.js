(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.WebtreesPedigreeChart = {}));
})(this, (function (exports) { 'use strict';

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  // Given something array like (or null), returns something that is strictly an
  // array. This is used to ensure that array-like objects passed to d3.selectAll
  // or selection.selectAll are converted into proper arrays when creating a
  // selection; we don’t ever want to create a selection backed by a live
  // HTMLCollection or NodeList. However, note that selection.selectAll will use a
  // static NodeList as a group, since it safely derived from querySelectorAll.
  function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return Array.from(this.children);
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant$2(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$2(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  // Given some data, this returns an array-like view of it: an object that
  // exposes a length property and allows numeric indexing. Note that unlike
  // selectAll, this isn’t worried about “live” collections because the resulting
  // array will only be used briefly while data is being bound. (It is possible to
  // cause the data to change while iterating by using a key function, but please
  // don’t; we’d rather avoid a gratuitous copy.)
  function arraylike(data) {
    return typeof data === "object" && "length" in data
      ? data // Array, TypedArray, NodeList, array-like
      : Array.from(data); // Map, Set, iterable, string, or anything else
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(context) {
    var selection = context.selection ? context.selection() : context;

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection$1(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames$1(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function sourceEvent(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent) event = sourceEvent;
    return event;
  }

  function pointer(event, node) {
    event = sourceEvent(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  var noop = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy: function(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
      return this;
    },
    displayable: function() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    displayable: function() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl: function() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(")
          + (this.h || 0) + ", "
          + (this.s || 0) * 100 + "%, "
          + (this.l || 0) * 100 + "%"
          + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant$1 = x => () => x;

  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  var degrees = 180 / Math.PI;

  var identity$1 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$1;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var epsilon2 = 1e-12;

  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
          ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
          dx = ux1 - ux0,
          dy = uy1 - uy0,
          d2 = dx * dx + dy * dy,
          i,
          S;

      // Special case for u0 ≅ u1.
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      }

      // General case.
      else {
        var d1 = Math.sqrt(d2),
            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S,
              coshr0 = cosh(r0),
              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }

      i.duration = S * 1000 * rho / Math.SQRT2;

      return i;
    }

    zoom.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };

    return zoom;
  })(Math.SQRT2, 2, 4);

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  // These are typically used in conjunction with noevent to ensure that we can
  const nonpassivecapture = {capture: true, passive: false};

  function noevent$1(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function dragDisable(view) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent$1, nonpassivecapture);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent$1, nonpassivecapture);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  var constant = x => () => x;

  function ZoomEvent(type, {
    sourceEvent,
    target,
    transform,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      transform: {value: transform, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };

  var identity = new Transform(1, 0, 0);

  transform.prototype = Transform.prototype;

  function transform(node) {
    while (!node.__zoom) if (!(node = node.parentNode)) return identity;
    return node.__zoom;
  }

  function nopropagation(event) {
    event.stopImmediatePropagation();
  }

  function noevent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // Ignore right-click, since that should open the context menu.
  // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === 'wheel') && !event.button;
  }

  function defaultExtent() {
    var e = this;
    if (e instanceof SVGElement) {
      e = e.ownerSVGElement || e;
      if (e.hasAttribute("viewBox")) {
        e = e.viewBox.baseVal;
        return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
      }
      return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    }
    return [[0, 0], [e.clientWidth, e.clientHeight]];
  }

  function defaultTransform() {
    return this.__zoom || identity;
  }

  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function defaultConstrain(transform, extent, translateExtent) {
    var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
        dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
        dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
        dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
    return transform.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }

  function zoom() {
    var filter = defaultFilter,
        extent = defaultExtent,
        constrain = defaultConstrain,
        wheelDelta = defaultWheelDelta,
        touchable = defaultTouchable,
        scaleExtent = [0, Infinity],
        translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
        duration = 250,
        interpolate = interpolateZoom,
        listeners = dispatch("start", "zoom", "end"),
        touchstarting,
        touchfirst,
        touchending,
        touchDelay = 500,
        wheelDelay = 150,
        clickDistance2 = 0,
        tapDistance = 10;

    function zoom(selection) {
      selection
          .property("__zoom", defaultTransform)
          .on("wheel.zoom", wheeled, {passive: false})
          .on("mousedown.zoom", mousedowned)
          .on("dblclick.zoom", dblclicked)
        .filter(touchable)
          .on("touchstart.zoom", touchstarted)
          .on("touchmove.zoom", touchmoved)
          .on("touchend.zoom touchcancel.zoom", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    zoom.transform = function(collection, transform, point, event) {
      var selection = collection.selection ? collection.selection() : collection;
      selection.property("__zoom", defaultTransform);
      if (collection !== selection) {
        schedule(collection, transform, point, event);
      } else {
        selection.interrupt().each(function() {
          gesture(this, arguments)
            .event(event)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
        });
      }
    };

    zoom.scaleBy = function(selection, k, p, event) {
      zoom.scaleTo(selection, function() {
        var k0 = this.__zoom.k,
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p, event);
    };

    zoom.scaleTo = function(selection, k, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t0 = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
            p1 = t0.invert(p0),
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      }, p, event);
    };

    zoom.translateBy = function(selection, x, y, event) {
      zoom.transform(selection, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };

    zoom.translateTo = function(selection, x, y, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p, event);
    };

    function scale(transform, k) {
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
      return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
    }

    function translate(transform, p0, p1) {
      var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
      return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
    }

    function centroid(extent) {
      return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
    }

    function schedule(transition, transform, point, event) {
      transition
          .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
          .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
          .tween("zoom", function() {
            var that = this,
                args = arguments,
                g = gesture(that, args).event(event),
                e = extent.apply(that, args),
                p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                a = that.__zoom,
                b = typeof transform === "function" ? transform.apply(that, args) : transform,
                i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1) t = b; // Avoid rounding error on end.
              else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
              g.zoom(null, t);
            };
          });
    }

    function gesture(that, args, clean) {
      return (!clean && that.__zooming) || new Gesture(that, args);
    }

    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }

    Gesture.prototype = {
      event: function(event) {
        if (event) this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform) {
        if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
        this.that.__zoom = transform;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        var d = select(this.that).datum();
        listeners.call(
          type,
          this.that,
          new ZoomEvent(type, {
            sourceEvent: this.sourceEvent,
            target: zoom,
            type,
            transform: this.that.__zoom,
            dispatch: listeners
          }),
          d
        );
      }
    };

    function wheeled(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, args).event(event),
          t = this.__zoom,
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
          p = pointer(event);

      // If the mouse is in the same location as before, reuse it.
      // If there were recent wheel events, reset the wheel idle timeout.
      if (g.wheel) {
        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
          g.mouse[1] = t.invert(g.mouse[0] = p);
        }
        clearTimeout(g.wheel);
      }

      // If this wheel event won’t trigger a transform change, ignore it.
      else if (t.k === k) return;

      // Otherwise, capture the mouse point and location at the start.
      else {
        g.mouse = [p, t.invert(p)];
        interrupt(this);
        g.start();
      }

      noevent(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }

    function mousedowned(event, ...args) {
      if (touchending || !filter.apply(this, arguments)) return;
      var currentTarget = event.currentTarget,
          g = gesture(this, args, true).event(event),
          v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
          p = pointer(event, currentTarget),
          x0 = event.clientX,
          y0 = event.clientY;

      dragDisable(event.view);
      nopropagation(event);
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt(this);
      g.start();

      function mousemoved(event) {
        noevent(event);
        if (!g.moved) {
          var dx = event.clientX - x0, dy = event.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event)
         .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }

      function mouseupped(event) {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event.view, g.moved);
        noevent(event);
        g.event(event).end();
      }
    }

    function dblclicked(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var t0 = this.__zoom,
          p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
          p1 = t0.invert(p0),
          k1 = t0.k * (event.shiftKey ? 0.5 : 2),
          t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

      noevent(event);
      if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
      else select(this).call(zoom.transform, t1, p0, event);
    }

    function touchstarted(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var touches = event.touches,
          n = touches.length,
          g = gesture(this, args, event.changedTouches.length === n).event(event),
          started, i, t, p;

      nopropagation(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
      }

      if (touchstarting) touchstarting = clearTimeout(touchstarting);

      if (started) {
        if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
        interrupt(this);
        g.start();
      }
    }

    function touchmoved(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t, p, l;

      noevent(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
        else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
      }
      t = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1],
            p1 = g.touch1[0], l1 = g.touch1[1],
            dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
            dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t = scale(t, Math.sqrt(dp / dl));
        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      }
      else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
      else return;

      g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
    }

    function touchended(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t;

      nopropagation(event);
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
      }
      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
        if (g.taps === 2) {
          t = pointer(t, this);
          if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
            var p = select(this).on("dblclick.zoom");
            if (p) p.apply(this, arguments);
          }
        }
      }
    }

    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
    };

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
    };

    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
    };

    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    };

    zoom.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    };

    zoom.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    };

    zoom.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom) : constrain;
    };

    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };

    zoom.interpolate = function(_) {
      return arguments.length ? (interpolate = _, zoom) : interpolate;
    };

    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };

    zoom.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    };

    zoom.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    };

    return zoom;
  }

  function count(node) {
    var sum = 0,
        children = node.children,
        i = children && children.length;
    if (!i) sum = 1;
    else while (--i >= 0) sum += children[i].value;
    node.value = sum;
  }

  function node_count() {
    return this.eachAfter(count);
  }

  function node_each(callback, that) {
    let index = -1;
    for (const node of this) {
      callback.call(that, node, ++index, this);
    }
    return this;
  }

  function node_eachBefore(callback, that) {
    var node = this, nodes = [node], children, i, index = -1;
    while (node = nodes.pop()) {
      callback.call(that, node, ++index, this);
      if (children = node.children) {
        for (i = children.length - 1; i >= 0; --i) {
          nodes.push(children[i]);
        }
      }
    }
    return this;
  }

  function node_eachAfter(callback, that) {
    var node = this, nodes = [node], next = [], children, i, n, index = -1;
    while (node = nodes.pop()) {
      next.push(node);
      if (children = node.children) {
        for (i = 0, n = children.length; i < n; ++i) {
          nodes.push(children[i]);
        }
      }
    }
    while (node = next.pop()) {
      callback.call(that, node, ++index, this);
    }
    return this;
  }

  function node_find(callback, that) {
    let index = -1;
    for (const node of this) {
      if (callback.call(that, node, ++index, this)) {
        return node;
      }
    }
  }

  function node_sum(value) {
    return this.eachAfter(function(node) {
      var sum = +value(node.data) || 0,
          children = node.children,
          i = children && children.length;
      while (--i >= 0) sum += children[i].value;
      node.value = sum;
    });
  }

  function node_sort(compare) {
    return this.eachBefore(function(node) {
      if (node.children) {
        node.children.sort(compare);
      }
    });
  }

  function node_path(end) {
    var start = this,
        ancestor = leastCommonAncestor(start, end),
        nodes = [start];
    while (start !== ancestor) {
      start = start.parent;
      nodes.push(start);
    }
    var k = nodes.length;
    while (end !== ancestor) {
      nodes.splice(k, 0, end);
      end = end.parent;
    }
    return nodes;
  }

  function leastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = a.ancestors(),
        bNodes = b.ancestors(),
        c = null;
    a = aNodes.pop();
    b = bNodes.pop();
    while (a === b) {
      c = a;
      a = aNodes.pop();
      b = bNodes.pop();
    }
    return c;
  }

  function node_ancestors() {
    var node = this, nodes = [node];
    while (node = node.parent) {
      nodes.push(node);
    }
    return nodes;
  }

  function node_descendants() {
    return Array.from(this);
  }

  function node_leaves() {
    var leaves = [];
    this.eachBefore(function(node) {
      if (!node.children) {
        leaves.push(node);
      }
    });
    return leaves;
  }

  function node_links() {
    var root = this, links = [];
    root.each(function(node) {
      if (node !== root) { // Don’t include the root’s parent, if any.
        links.push({source: node.parent, target: node});
      }
    });
    return links;
  }

  function* node_iterator() {
    var node = this, current, next = [node], children, i, n;
    do {
      current = next.reverse(), next = [];
      while (node = current.pop()) {
        yield node;
        if (children = node.children) {
          for (i = 0, n = children.length; i < n; ++i) {
            next.push(children[i]);
          }
        }
      }
    } while (next.length);
  }

  function hierarchy(data, children) {
    if (data instanceof Map) {
      data = [undefined, data];
      if (children === undefined) children = mapChildren;
    } else if (children === undefined) {
      children = objectChildren;
    }

    var root = new Node(data),
        node,
        nodes = [root],
        child,
        childs,
        i,
        n;

    while (node = nodes.pop()) {
      if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
        node.children = childs;
        for (i = n - 1; i >= 0; --i) {
          nodes.push(child = childs[i] = new Node(childs[i]));
          child.parent = node;
          child.depth = node.depth + 1;
        }
      }
    }

    return root.eachBefore(computeHeight);
  }

  function node_copy() {
    return hierarchy(this).eachBefore(copyData);
  }

  function objectChildren(d) {
    return d.children;
  }

  function mapChildren(d) {
    return Array.isArray(d) ? d[1] : null;
  }

  function copyData(node) {
    if (node.data.value !== undefined) node.value = node.data.value;
    node.data = node.data.data;
  }

  function computeHeight(node) {
    var height = 0;
    do node.height = height;
    while ((node = node.parent) && (node.height < ++height));
  }

  function Node(data) {
    this.data = data;
    this.depth =
    this.height = 0;
    this.parent = null;
  }

  Node.prototype = hierarchy.prototype = {
    constructor: Node,
    count: node_count,
    each: node_each,
    eachAfter: node_eachAfter,
    eachBefore: node_eachBefore,
    find: node_find,
    sum: node_sum,
    sort: node_sort,
    path: node_path,
    ancestors: node_ancestors,
    descendants: node_descendants,
    leaves: node_leaves,
    links: node_links,
    copy: node_copy,
    [Symbol.iterator]: node_iterator
  };

  function defaultSeparation(a, b) {
    return a.parent === b.parent ? 1 : 2;
  }

  // function radialSeparation(a, b) {
  //   return (a.parent === b.parent ? 1 : 2) / a.depth;
  // }

  // This function is used to traverse the left contour of a subtree (or
  // subforest). It returns the successor of v on this contour. This successor is
  // either given by the leftmost child of v or by the thread of v. The function
  // returns null if and only if v is on the highest level of its subtree.
  function nextLeft(v) {
    var children = v.children;
    return children ? children[0] : v.t;
  }

  // This function works analogously to nextLeft.
  function nextRight(v) {
    var children = v.children;
    return children ? children[children.length - 1] : v.t;
  }

  // Shifts the current subtree rooted at w+. This is done by increasing
  // prelim(w+) and mod(w+) by shift.
  function moveSubtree(wm, wp, shift) {
    var change = shift / (wp.i - wm.i);
    wp.c -= change;
    wp.s += shift;
    wm.c += change;
    wp.z += shift;
    wp.m += shift;
  }

  // All other shifts, applied to the smaller subtrees between w- and w+, are
  // performed by this function. To prepare the shifts, we have to adjust
  // change(w+), shift(w+), and change(w-).
  function executeShifts(v) {
    var shift = 0,
        change = 0,
        children = v.children,
        i = children.length,
        w;
    while (--i >= 0) {
      w = children[i];
      w.z += shift;
      w.m += shift;
      shift += w.s + (change += w.c);
    }
  }

  // If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
  // returns the specified (default) ancestor.
  function nextAncestor(vim, v, ancestor) {
    return vim.a.parent === v.parent ? vim.a : ancestor;
  }

  function TreeNode(node, i) {
    this._ = node;
    this.parent = null;
    this.children = null;
    this.A = null; // default ancestor
    this.a = this; // ancestor
    this.z = 0; // prelim
    this.m = 0; // mod
    this.c = 0; // change
    this.s = 0; // shift
    this.t = null; // thread
    this.i = i; // number
  }

  TreeNode.prototype = Object.create(Node.prototype);

  function treeRoot(root) {
    var tree = new TreeNode(root, 0),
        node,
        nodes = [tree],
        child,
        children,
        i,
        n;

    while (node = nodes.pop()) {
      if (children = node._.children) {
        node.children = new Array(n = children.length);
        for (i = n - 1; i >= 0; --i) {
          nodes.push(child = node.children[i] = new TreeNode(children[i], i));
          child.parent = node;
        }
      }
    }

    (tree.parent = new TreeNode(null, 0)).children = [tree];
    return tree;
  }

  // Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
  function tree() {
    var separation = defaultSeparation,
        dx = 1,
        dy = 1,
        nodeSize = null;

    function tree(root) {
      var t = treeRoot(root);

      // Compute the layout using Buchheim et al.’s algorithm.
      t.eachAfter(firstWalk), t.parent.m = -t.z;
      t.eachBefore(secondWalk);

      // If a fixed node size is specified, scale x and y.
      if (nodeSize) root.eachBefore(sizeNode);

      // If a fixed tree size is specified, scale x and y based on the extent.
      // Compute the left-most, right-most, and depth-most nodes for extents.
      else {
        var left = root,
            right = root,
            bottom = root;
        root.eachBefore(function(node) {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
          if (node.depth > bottom.depth) bottom = node;
        });
        var s = left === right ? 1 : separation(left, right) / 2,
            tx = s - left.x,
            kx = dx / (right.x + s + tx),
            ky = dy / (bottom.depth || 1);
        root.eachBefore(function(node) {
          node.x = (node.x + tx) * kx;
          node.y = node.depth * ky;
        });
      }

      return root;
    }

    // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
    // applied recursively to the children of v, as well as the function
    // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
    // node v is placed to the midpoint of its outermost children.
    function firstWalk(v) {
      var children = v.children,
          siblings = v.parent.children,
          w = v.i ? siblings[v.i - 1] : null;
      if (children) {
        executeShifts(v);
        var midpoint = (children[0].z + children[children.length - 1].z) / 2;
        if (w) {
          v.z = w.z + separation(v._, w._);
          v.m = v.z - midpoint;
        } else {
          v.z = midpoint;
        }
      } else if (w) {
        v.z = w.z + separation(v._, w._);
      }
      v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
    }

    // Computes all real x-coordinates by summing up the modifiers recursively.
    function secondWalk(v) {
      v._.x = v.z + v.parent.m;
      v.m += v.parent.m;
    }

    // The core of the algorithm. Here, a new subtree is combined with the
    // previous subtrees. Threads are used to traverse the inside and outside
    // contours of the left and right subtree up to the highest common level. The
    // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
    // superscript o means outside and i means inside, the subscript - means left
    // subtree and + means right subtree. For summing up the modifiers along the
    // contour, we use respective variables si+, si-, so-, and so+. Whenever two
    // nodes of the inside contours conflict, we compute the left one of the
    // greatest uncommon ancestors using the function ANCESTOR and call MOVE
    // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
    // Finally, we add a new thread (if necessary).
    function apportion(v, w, ancestor) {
      if (w) {
        var vip = v,
            vop = v,
            vim = w,
            vom = vip.parent.children[0],
            sip = vip.m,
            sop = vop.m,
            sim = vim.m,
            som = vom.m,
            shift;
        while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
          vom = nextLeft(vom);
          vop = nextRight(vop);
          vop.a = v;
          shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
          if (shift > 0) {
            moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim.m;
          sip += vip.m;
          som += vom.m;
          sop += vop.m;
        }
        if (vim && !nextRight(vop)) {
          vop.t = vim;
          vop.m += sim - sop;
        }
        if (vip && !nextLeft(vom)) {
          vom.t = vip;
          vom.m += sip - som;
          ancestor = v;
        }
      }
      return ancestor;
    }

    function sizeNode(node) {
      node.x *= dx;
      node.y = node.depth * dy;
    }

    tree.separation = function(x) {
      return arguments.length ? (separation = x, tree) : separation;
    };

    tree.size = function(x) {
      return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : (nodeSize ? null : [dx, dy]);
    };

    tree.nodeSize = function(x) {
      return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : (nodeSize ? [dx, dy] : null);
    };

    return tree;
  }

  function responseText(response) {
    if (!response.ok) throw new Error(response.status + " " + response.statusText);
    return response.text();
  }

  function text(input, init) {
    return fetch(input, init).then(responseText);
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Tree layout variants.
   *
   * @type {String}
   *
   * @see \Fisharebest\Webtrees\Module\PedigreeChartModule
   */
  const LAYOUT_TOPBOTTOM = "down";
  const LAYOUT_BOTTOMTOP = "up";
  const LAYOUT_LEFTRIGHT = "right";
  const LAYOUT_RIGHTLEFT = "left";

  /**
   * Gender types.
   *
   * @type {String}
   */
  const SEX_MALE    = "M";
  const SEX_FEMALE  = "F";

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * The orientation base class.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Orientation
  {
      /**
       * Constructor.
       *
       * @param {Number} boxWidth  The width of a single individual box
       * @param {Number} boxHeight The height of a single individual box
       */
      constructor(boxWidth, boxHeight)
      {
          this._boxWidth     = boxWidth;
          this._boxHeight    = boxHeight;
          this._imagePadding = 5;
          this._imageRadius  = Math.min(40, (this._boxHeight / 2) - this._imagePadding);
          this._cornerRadius = 20;
      }

      /**
       * Returns the width of the box.
       *
       * @returns {Number}
       */
      get boxWidth()
      {
          return this._boxWidth;
      }

      /**
       * Returns the height of the box.
       *
       * @returns {Number}
       */
      get boxHeight()
      {
          return this._boxHeight;
      }

      /**
       * Returns the corner radius.
       *
       * @returns {Number}
       */
      cornerRadius()
      {
          return this._cornerRadius;
      }

      /**
       * Returns the radius of the image.
       *
       * @returns {Number}
       */
      imageRadius()
      {
          return this._imageRadius;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Draw the vertical connecting lines between the profile boxes for Top/Bottom and Bottom/Top layout.
   *
   * @param {Object}      datum       D3 data object
   * @param {Orientation} orientation The current orientation
   */
  function elbowVertical(datum, orientation)
  {
      // Left => Right, Right => Left
      let sourceX = orientation.x(datum.source),
          sourceY = orientation.y(datum.source) + (orientation.direction() * (orientation.boxHeight / 2)),
          targetX = orientation.x(datum.target),
          targetY = orientation.y(datum.target) - (orientation.direction() * (orientation.boxHeight / 2));

      return "M " + sourceX + " " + sourceY +
          " V " + (sourceY + ((targetY - sourceY) / 2)) +
          " H " + targetX +
          " V " + targetY;
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the orientation of the tree.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class OrientationTopBottom extends Orientation
  {
      /**
       * Constructor.
       *
       * @param {Number} boxWidth  The width of a single individual box
       * @param {Number} boxHeight The height of a single individual box
       */
      constructor(boxWidth, boxHeight)
      {
          super(boxWidth, boxHeight);

          this._splittNames = true;
      }

      direction()
      {
          return 1;
      }

      nodeWidth()
      {
          return (this._boxWidth * 2) + 30;
      }

      imageCornerRadius()
      {
          return this.cornerRadius() - this._imagePadding;
      }

      /**
       * Returns the X coordinate of the image position.
       *
       * @returns {Number}
       */
      imageX()
      {
          return -(this._boxWidth / 2) + this._imagePadding;
      }

      /**
       * Returns the Y coordinate of the image position.
       *
       * @returns {Number}
       */
      imageY()
      {
          return -(this._boxHeight / 2) + this._imagePadding;
      }

      imageWidth()
      {
          return this._boxWidth - (this._imagePadding * 2);
      }

      imageHeight()
      {
          return this.imageRadius() * 2;
      }

      textX()
      {
          return -(this._boxWidth / 2) + (this.imageRadius() * 2) + 20 - this._imagePadding;
      }

      textY()
      {
          return this.imageY() + this.imageHeight() + 20;
      }

      /**
       * Calculate the available text width.
       *
       * @returns {Number}
       */
      textWidth()
      {
          return this.imageWidth();
      }

      norm(d)
      {
          d.y = this.direction() * d.depth * (this._boxHeight + 30);
      }

      elbow(d)
      {
          return elbowVertical(d, this);
      }

      x(d)
      {
          return d.x;
      }

      y(d)
      {
          return d.y;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the orientation of the tree.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class OrientationBottomTop extends Orientation
  {
      /**
       * Constructor.
       *
       * @param {Number} boxWidth  The width of a single individual box
       * @param {Number} boxHeight The height of a single individual box
       */
      constructor(boxWidth, boxHeight)
      {
          super(boxWidth, boxHeight);

          this._splittNames = true;
      }

      direction()
      {
          return -1;
      }

      nodeWidth()
      {
          return (this._boxWidth * 2) + 30;
      }

      imageCornerRadius()
      {
          return this.cornerRadius() - this._imagePadding;
      }

      /**
       * Returns the X coordinate of the image position.
       *
       * @returns {Number}
       */
      imageX()
      {
          return -(this._boxWidth / 2) + this._imagePadding;
      }

      /**
       * Returns the Y coordinate of the image position.
       *
       * @returns {Number}
       */
      imageY()
      {
          return -(this._boxHeight / 2) + this._imagePadding;
      }

      imageWidth()
      {
          return this._boxWidth - (this._imagePadding * 2);
      }

      imageHeight()
      {
          return this.imageRadius() * 2;
      }

      textX()
      {
          return -(this._boxWidth / 2) + (this.imageRadius() * 2) + 20 - this._imagePadding;
      }

      textY()
      {
          return this.imageY() + this.imageHeight() + 20;
      }

      /**
       * Calculate the available text width.
       *
       * @returns {Number}
       */
      textWidth()
      {
          return this.imageWidth();
      }

      norm(d)
      {
          d.y = this.direction() * d.depth * (this._boxHeight + 30);
      }

      elbow(d)
      {
          return elbowVertical(d, this);
      }

      x(d)
      {
          return d.x;
      }

      y(d)
      {
          return d.y;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Draw the horizontal connecting lines between the profile boxes for Left/Right and Right/Left layout.
   *
   * @param {Object}      datum       D3 data object
   * @param {Orientation} orientation The current orientation
   */
  function elbowHorizontal(datum, orientation)
  {
      // Left => Right, Right => Left
      let sourceX = orientation.y(datum.source),
          sourceY = orientation.x(datum.source) + (orientation.direction() * (orientation.boxWidth / 2)),
          targetX = orientation.y(datum.target),
          targetY = orientation.x(datum.target) - (orientation.direction() * (orientation.boxWidth / 2));

      return "M " + sourceY + " " + sourceX +
          " H " + (sourceY + ((targetY - sourceY) / 2)) +
          " V " + targetX +
          " H " + targetY;
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the orientation of the tree.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class OrientationLeftRight extends Orientation
  {
      /**
       * Constructor.
       *
       * @param {Number} boxWidth  The width of a single individual box
       * @param {Number} boxHeight The height of a single individual box
       */
      constructor(boxWidth, boxHeight)
      {
          super(boxWidth, boxHeight);

          this._splittNames = false;
      }

      direction()
      {
          return 1;
      }

      nodeWidth()
      {
          return (this._boxHeight * 2) + 30;
      }

      imageCornerRadius()
      {
          return this.cornerRadius() - this._imagePadding;
      }

      imageX()
      {
          return -(this._boxWidth / 2) + this._imagePadding;
      }

      imageY()
      {
          return -this.imageRadius();
      }

      imageWidth()
      {
          return this.imageRadius() * 2;
      }

      imageHeight()
      {
          return this.imageRadius() * 2;
      }

      textX()
      {
          return -(this._boxWidth / 2) + (this.imageRadius() * 2) + 20 - this._imagePadding;
      }

      textY()
      {
          return -15;
      }

      /**
       * Calculate the available text width.
       *
       * @returns {Number}
       */
      textWidth()
      {
          return this._boxWidth - ((this.imageRadius() * 2) + 15 + this._imagePadding) - (15 * 2);
      }

      norm(d)
      {
          d.y = this.direction() * d.depth * (this._boxWidth + 30);
      }

      elbow(d)
      {
          return elbowHorizontal(d, this);
      }

      x(d)
      {
          return d.y;
      }

      y(d)
      {
          return d.x;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the orientation of the tree.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class OrientationRightLeft extends Orientation
  {
      /**
       * Constructor.
       *
       * @param {Number} boxWidth  The width of a single individual box
       * @param {Number} boxHeight The height of a single individual box
       */
      constructor(boxWidth, boxHeight)
      {
          super(boxWidth, boxHeight);

          this._splittNames = false;
      }

      direction()
      {
          return -1;
      }

      nodeWidth()
      {
          return (this._boxHeight * 2) + 30;
      }

      imageCornerRadius()
      {
          return this.cornerRadius() - this._imagePadding;
      }

      imageX()
      {
          return -(this._boxWidth / 2) + this._imagePadding;
      }

      imageY()
      {
          return -this.imageRadius();
      }

      imageWidth()
      {
          return this.imageRadius() * 2;
      }

      imageHeight()
      {
          return this.imageRadius() * 2;
      }

      textX()
      {
          return -(this._boxWidth / 2) + (this.imageRadius() * 2) + 20 - this._imagePadding;
      }

      textY()
      {
          return -15;
      }

      /**
       * Calculate the available text width.
       *
       * @returns {Number}
       */
      textWidth()
      {
          return this._boxWidth - ((this.imageRadius() * 2) + 15 + this._imagePadding) - (15 * 2);
      }

      norm(d)
      {
          d.y = this.direction() * d.depth * (this._boxWidth + 30);
      }

      elbow(d)
      {
          return elbowHorizontal(d, this);
      }

      x(d)
      {
          return d.y;
      }

      y(d)
      {
          return d.x;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the orientation of the tree.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class OrientationCollection
  {
      /**
       * Constructor.
       */
      constructor()
      {
          this._orientations = {
              [LAYOUT_TOPBOTTOM]: new OrientationTopBottom(150, 175),
              [LAYOUT_BOTTOMTOP]: new OrientationBottomTop(150, 175),
              [LAYOUT_LEFTRIGHT]: new OrientationLeftRight(300, 80),
              [LAYOUT_RIGHTLEFT]: new OrientationRightLeft(300, 80)
          };
      }

      /**
       * Returns the internal element.
       *
       * @returns {Array}
       */
      get()
      {
          return this._orientations;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the configuration of the application.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Configuration
  {
      /**
       * Constructor.
       *
       * @param {String[]} labels
       * @param {Number}   generations
       * @param {String}   defaultColor
       * @param {String}   fontColor
       * @param {Boolean}  showEmptyBoxes
       * @param {String}   treeLayout
       * @param {Boolean}  rtl
       * @param {Number}   direction
       */
      constructor(
          labels,
          generations = 4,
          defaultColor = "rgb(240, 240, 240)",
          fontColor = "rgb(0, 0, 0)",
          showEmptyBoxes = false,
          treeLayout = LAYOUT_LEFTRIGHT,
          rtl = false,
          direction = 1
      ) {
          // The layout/orientation of the tree
          this._treeLayout   = treeLayout;
          this._orientations = new OrientationCollection();

          //
          this.duration = 750;

          //
          this.padding   = 15;

          // Padding around the image circle
          this.imagePadding = 5;

          // The radius of the image
          // this.imageRadius = (this.orientation.boxHeight / 2) - this.imagePadding;

          // The diameter of the image
          // this.imageDiameter = this.imageRadius * 2;

          // Default number of generations to display
          this._generations = generations;

          // Left/Right padding of text (used with truncation)
          this.textPadding = 8;

          // Default background color of an arc
          this.defaultColor = defaultColor;

          // // Default font size, color and scaling
          this._fontSize  = 14;
          // this._fontScale = fontScale;
          this.fontColor = fontColor;

          this._showEmptyBoxes  = showEmptyBoxes;

          // Duration of update animation if clicked on a person
          // this.updateDuration = 1250;

          this.rtl    = rtl;
          this.labels = labels;

          // direction` is either 1 (forward) or -1 (backward)
          this.direction = direction;
      }

      /**
       * Returns the number of generations to display.
       *
       * @returns {Number}
       */
      get generations()
      {
          return this._generations;
      }

      /**
       * Sets the number of generations to display.
       *
       * @param {Number} value The number of generations to display
       */
      set generations(value)
      {
          this._generations = value;
      }

      /**
       * Returns whether to show or hide empty boxes.
       *
       * @returns {Boolean}
       */
      get showEmptyBoxes()
      {
          return this._showEmptyBoxes;
      }

      /**
       * Sets whether to show or hide empty boxes.
       *
       * @param {Boolean} value Either true or false
       */
      set showEmptyBoxes(value)
      {
          this._showEmptyBoxes = value;
      }

      /**
       * Returns the tree layout.
       *
       * @returns {String}
       */
      get treeLayout()
      {
          return this._treeLayout;
      }

      /**
       * Sets the tree layout.
       *
       * @param {String} value Tree layout value
       */
      set treeLayout(value)
      {
          this._treeLayout = value;
      }

      /**
       * Returns the current orientation.
       *
       * @returns {Orientation}
       */
      get orientation()
      {
          return this._orientations.get()[this.treeLayout];
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the hierarchical data.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Hierarchy
  {
      /**
       * Constructor.
       *
       * @param {Configuration} configuration The application configuration
       */
      constructor(configuration)
      {
          this._configuration = configuration;
          this._nodes         = null;
          this._root          = null;

          this.nodeWidth  = this._configuration.orientation.nodeWidth();
          this.nodeHeight = 0;
          this.separation = 0.5;
      }

      /**
       * Initialize the hierarchical chart data.
       *
       * @param {Object} data The JSON encoded chart data
       */
      init(data)
      {
          // Get the greatest depth
          const getDepth       = ({parents}) => 1 + (parents ? Math.max(...parents.map(getDepth)) : 0);
          const maxGenerations = getDepth(data);

          // Construct root node from the hierarchical data
          let root = hierarchy(
              data,
              data => {
                  if (!this._configuration.showEmptyBoxes) {
                      return data.parents;
                  }

                  // Fill up the missing parents to the requested number of generations
                  if (!data.parents && (data.generation < maxGenerations)) {
                  // if (!data.parents && (data.generation < this._configuration.generations)) {
                      data.parents = [
                          this.createEmptyNode(data.generation + 1, SEX_MALE),
                          this.createEmptyNode(data.generation + 1, SEX_FEMALE)
                      ];
                  }

                  // Add missing parent record if we got only one
                  if (data.parents && (data.parents.length < 2)) {
                      if (data.parents[0].sex === SEX_MALE) {
                          data.parents.push(
                              this.createEmptyNode(data.generation + 1, SEX_FEMALE)
                          );
                      } else {
                          data.parents.unshift(
                              this.createEmptyNode(data.generation + 1, SEX_MALE)
                          );
                      }
                  }

                  return data.parents;
              });

          // Declares a tree layout and assigns the size
          const treeLayout = tree()
              .nodeSize([this.nodeWidth, this.nodeHeight])
              .separation(d => this.separation);

          // Map the node data to the tree layout
          this._root  = root;
          this._nodes = treeLayout(root);
      }

      /**
       * Returns the nodes.
       *
       * @returns {Array}
       *
       * @public
       */
      get nodes()
      {
          return this._nodes;
      }

      /**
       * Returns the root note.
       *
       * @returns {Object}
       *
       * @public
       */
      get root()
      {
          return this._root;
      }

      /**
       * Create an empty child node object.
       *
       * @param {Number} generation Generation of the node
       * @param {String} sex        The sex of the individual
       *
       * @returns {Object}
       *
       * @private
       */
      createEmptyNode(generation, sex)
      {
          return {
              id               : 0,
              xref             : "",
              url              : "",
              updateUrl        : "",
              generation       : generation,
              name             : "",
              firstNames       : [],
              lastNames        : [],
              preferredName    : "",
              alternativeNames : [],
              isAltRtl         : false,
              sex              : sex,
              timespan         : "",
              color            : this._configuration.defaultColor,
              colors           : [[], []]
          };
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Returns the input as data URL, prefixed with data: scheme.
   *
   * @param {RequestInfo} input
   * @param {RequestInit} init
   *
   * @returns {Promise<unknown>}
   */
  function dataUrl(input, init)
  {
      return fetch(input, init)
          .then(response => response.blob())
          .then(blob => new Promise(
              (resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
              }
          )
      );
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * The class handles the creation of the tree.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Tree
  {
      /**
       * Constructor.
       *
       * @param {Svg}           svg
       * @param {Configuration} configuration The configuration
       * @param {Hierarchy}     hierarchy     The hierarchiecal data
       */
      constructor(svg, configuration, hierarchy)
      {
          this._svg           = svg;
          this._configuration = configuration;
          this._hierarchy     = hierarchy;

          this._hierarchy.root.x0 = 0;
          this._hierarchy.root.y0 = 0;

          this._orientation = this._configuration.orientation;

          this.draw(this._hierarchy.root);
      }

      /**
       * Draw the tree.
       *
       * @public
       */
      draw(source)
      {
          let nodes = this._hierarchy.nodes.descendants();
          let links = this._hierarchy.nodes.links();

          // // Start with only the first few generations of ancestors showing
          // nodes.forEach((person) => {
          //     if (person.parents) {
          //         person.parents.forEach((child) => this.collapse(child));
          //     }
          // });

          // Normalize for fixed-depth.
          nodes.forEach((person) => {
              this._orientation.norm(person);
          });

          this.drawLinks(links, source);
          this.drawNodes(nodes, source);

          // Stash the old positions for transition.
          nodes.forEach((person) => {
              person.x0 = person.x;
              person.y0 = person.y;
          });
      }

      // /**
      //  * Draw the tree.
      //  *
      //  * @public
      //  */
      // update(source)
      // {
      //     let nodes = this._hierarchy.nodes.descendants();
      //     let links = this._hierarchy.nodes.links();
      //
      //     // // Start with only the first few generations of ancestors showing
      //     // nodes.forEach((person) => {
      //     //     if (person.parents) {
      //     //         person.parents.forEach((child) => this.collapse(child));
      //     //     }
      //     // });
      //
      //     this.drawLinks(links, source);
      //     this.drawNodes(nodes, source);
      //
      //     // Stash the old positions for transition.
      //     nodes.forEach((person) => {
      //         person.x0 = person.x;
      //         person.y0 = person.y;
      //     });
      // }

      /**
       * Draw the person boxes.
       *
       * @param {Array} nodes Array of descendant nodes
       *
       * @private
       */
      drawNodes(nodes, source)
      {
          let i = 0;
          let that = this;

          this._svg
              .defs
              .get()
              .append('clipPath')
              .attr('id', 'clip-rect')
              .append("rect")
              .attr("rx", that._orientation.imageCornerRadius())
              .attr("ry", that._orientation.imageCornerRadius())
              .attr("x", that._orientation.imageX())
              .attr("y", that._orientation.imageY())
              .attr("width", that._orientation.imageWidth())
              .attr("height", that._orientation.imageHeight());

          this._svg.visual
              .transition()
              .duration(this._configuration.duration);

          let node = this._svg.visual
              .selectAll("g.person")
              .data(nodes, person => person.id || (person.id = ++i));

          let nodeEnter = node
              .enter()
              .append("g")
              .attr("class", "person")
              // Add new nodes at the right side of their child's box.
              // They will be transitioned into their proper position.
              // .attr("transform", person => {
              //     return "translate(" + (this._configuration.direction * (source.y0 + (this._orientation.boxWidth / 2))) + ',' + source.x0 + ")";
              // })
              // .attr("transform", person => {
              //     return "translate(" + (this._configuration.direction * (source.y + (this._orientation.boxWidth / 2))) + ',' + source.x + ")";
              // })
              // .attr("transform", person => `translate(${source.y0}, ${source.x0})`)
              .attr("transform", person => {
                  return "translate(" + this._orientation.x(person) + "," + this._orientation.y(person) + ")";
              })
          ;

          // Draw the rectangle person boxes. Start new boxes with 0 size so that we can
          // transition them to their proper size.
          nodeEnter
              .append("rect")
              .attr("class", d => (d.data.sex === SEX_FEMALE) ? "female" : (d.data.sex === SEX_MALE) ? "male" : "unknown")
              .attr("rx", this._orientation.cornerRadius())
              .attr("ry", this._orientation.cornerRadius())
              .attr("x", -(this._orientation.boxWidth / 2))
              .attr("y", -(this._orientation.boxHeight / 2))
              .attr("width", this._orientation.boxWidth)
              .attr("height", this._orientation.boxHeight)
              .attr("fill-opacity", 0.5)
              .attr("fill", d => d.data.color);

          // Names and Dates
          nodeEnter
              .filter(d => (d.data.xref !== ""))
              .each(function (d) {
                  let element = select(this);

                  element
                      .append("title")
                      .text(d => d.data.name);

                  let group = element
                      .append("g")
                      .attr("class", "image");

                  // Background (only required if thumbnail has transparency (like the silhouettes))
                  group
                      .append("rect")
                      .attr("rx", that._orientation.imageCornerRadius())
                      .attr("ry", that._orientation.imageCornerRadius())
                      .attr("x", that._orientation.imageX())
                      .attr("y", that._orientation.imageY())
                      .attr("width", that._orientation.imageWidth())
                      .attr("height", that._orientation.imageHeight())
                      .attr("fill", "rgb(255, 255, 255)");

                  // The individual image
                  let image = group
                      .append("image")
                      .attr("x", that._orientation.imageX())
                      .attr("y", that._orientation.imageY())
                      .attr("width", that._orientation.imageWidth())
                      .attr("height", that._orientation.imageHeight())
                      .attr("clip-path", "url(#clip-rect)");

                  dataUrl(that.getImageToLoad(d))
                      .then(dataUrl => image.attr("xlink:href", dataUrl))
                      .catch((exception) => {
                          console.error(exception);
                      });

                  // Border
                  group
                      .append("rect")
                      .attr("rx", that._orientation.imageCornerRadius())
                      .attr("ry", that._orientation.imageCornerRadius())
                      .attr("x", that._orientation.imageX())
                      .attr("y", that._orientation.imageY())
                      .attr("width", that._orientation.imageWidth())
                      .attr("height", that._orientation.imageHeight())
                      .attr("fill", "none")
                      .attr("stroke", "rgb(200, 200, 200)")
                      .attr("stroke-width", 1.5);

                  that.addNames(element, d);
                  that.addDates(element, d);
              });

      //     // Merge the update and the enter selections
      //     let nodeUpdate = nodeEnter.merge(node);
      //
      //     nodeUpdate
      //         .transition()
      //         .duration(this._configuration.duration)
      //         // .attr("transform", person => `translate(${person.y}, ${person.x})`);
      //         .attr("transform", person => {
      //             return "translate(" + (this._configuration.direction * person.y) + "," + person.x + ")";
      //         });
      //
      //     // Grow boxes to their proper size
      //     nodeUpdate.select('rect')
      //         .attr("x", -(this._orientation.boxWidth / 2))
      //         .attr("y", -(this._orientation.boxHeight / 2))
      //         .attr("width", this._orientation.boxWidth)
      //         .attr("height", this._orientation.boxHeight)
      //         // .attr("fill-opacity", "0.5")
      //         // .attr({
      //         //     x: -(this._orientation.boxWidth / 2),
      //         //     y: -(this._orientation.boxHeight / 2),
      //         //     width: this._orientation.boxWidth,
      //         //     height: this._orientation.boxHeight
      //         // })
      // ;
      //
      //     // Move text to it's proper position
      //     // nodeUpdate.select('text')
      //     //     .attr("dx", -(this._orientation.boxWidth / 2) + 10)
      //     //     .style("fill-opacity", 1);
      //
      //     // Remove nodes we aren't showing anymore
      //     let nodeExit = node
      //         .exit()
      //         .transition()
      //         .duration(this._configuration.duration)
      //         // Transition exit nodes to the source's position
      //         .attr("transform", person => {
      //             return "translate(" + (this._configuration.direction * (source.y + (this._orientation.boxWidth / 2))) + ',' + source.x + ")";
      //         })
      //         // .attr("transform", person => `translate(${source.y}, ${source.x})`)
      //         // .attr("transform", (d) => {
      //         //     return "translate(" + source.y + "," + source.x + ")";
      //         // })
      //         .remove();
      //
      //     // Shrink boxes as we remove them
      //     nodeExit.select('rect')
      //         .attr("x", 0)
      //         .attr("y", 0)
      //         .attr("width", 0)
      //         .attr("height", 0)
      //         // .attr("fill-opacity", 0)
      //         // .attr({
      //         //     x: 0,
      //         //     y: 0,
      //         //     width: 0,
      //         //     height: 0
      //         // })
      //     ;

          // Fade out the text as we remove it
          // nodeExit.select('text')
          //     .style('fill-opacity', 0)
          //     .attr('dx', 0);


          // nodeEnter
          //     .filter(d => (d.data.xref !== ""))
          //     .append("title")
          //     .text(d => d.data.name);

          // this.addImages(nodeEnter);

          // // Names and Dates
          // nodeEnter
          //     .filter(d => (d.data.xref !== ""))
          //     .each(function (d) {
          //         let parent = d3.select(this);
          //
          //         // Names
          //         let text1 = parent
          //             .append("text")
          //             .attr("dx", -(that.boxWidth / 2) + 80)
          //             .attr("dy", "-12px")
          //             .attr("text-anchor", "start")
          //             .attr("class", "name");
          //
          //         that.addNames(text1, d);
          //
          //         // Time span
          //         let text2 = parent
          //             .append("text")
          //             .attr("dx", -(that.boxWidth / 2) + 80)
          //             .attr("dy", "10px")
          //             .attr("text-anchor", "start")
          //             .attr("class", "date");
          //
          //         that.addTimeSpan(text2, d);
          //     });


          // node.join(
          //     enter => {
          //         let nodeEnter = enter
          //             .append("g")
          //             .attr("class", "person")
          //             // .attr("transform", person => `translate(${person.y}, ${person.x})`)
          //             .attr("transform", person => {
          //                 return "translate(" + (this._configuration.direction * (source.y0 + (this._orientation.boxWidth / 2))) + ',' + source.x0 + ")";
          //             })
          //             .on("click", this.togglePerson.bind(this));
          //
          //         nodeEnter
          //             .append("rect")
          //             // .attr("x", -(this._orientation.boxWidth / 2))
          //             // .attr("y", -(this._orientation.boxHeight / 2))
          //             // .attr("width", this._orientation.boxWidth)
          //             // .attr("height", this._orientation.boxHeight);
          //             .attr("x", 0)
          //             .attr("y", 0)
          //             .attr("width", 0)
          //             .attr("height", 0);
          //
          //         return nodeEnter;
          //     },
          //
          //     update => {
          //         let nodeUpdate = update
          //             .call(update => update
          //                 .transition(t)
          //                 .attr("transform", person => {
          //                     return "translate(" + (this._configuration.direction * person.y) + "," + person.x + ")";
          //                 })
          //             );
          //
          //         nodeUpdate
          //             .select('rect')
          //             .attr("x", -(this._orientation.boxWidth / 2))
          //             .attr("y", -(this._orientation.boxHeight / 2))
          //             .attr("width", this._orientation.boxWidth)
          //             .attr("height", this._orientation.boxHeight);
          //
          //         return nodeUpdate;
          //     },
          //
          //     exit => {
          //         let nodeExit = exit
          //             .call(exit => exit
          //                 .transition(t)
          //                 .attr("transform", person => {
          //                     return "translate(" + (this._configuration.direction * (source.y + (this._orientation.boxWidth / 2))) + ',' + source.x + ")";
          //                 })
          //             )
          //             .remove();
          //
          //         nodeExit
          //             .select('rect')
          //             .attr("x", 0)
          //             .attr("y", 0)
          //             .attr("width", 0)
          //             .attr("height", 0);
          //
          //         return nodeExit;
          //     }
          // )
          //     // .selectAll('rect')
          //     // .attr("x", -(this._orientation.boxWidth / 2))
          //     // .attr("y", -(this._orientation.boxHeight / 2))
          //     // .attr("width", this._orientation.boxWidth)
          //     // .attr("height", this._orientation.boxHeight);
          // ;
          //
          // return;

      }

      /**
       * Update a person's state when they are clicked.
       */
      togglePerson(event, person)
      {
          if (person.parents) {
              person._parents = person.parents;
              person.parents = null;
          } else {
              person.parents = person._parents;
              person._parents = null;
          }

          this.draw(person);

          // if (person.collapsed) {
          //     person.collapsed = false;
          // } else {
          //     this.collapse(person);
          // }
          //
          // this.draw(person);
      }

      /**
       * Collapse person (hide their ancestors). We recursively
       * collapse the ancestors so that when the person is
       * expanded it will only reveal one generation. If we don't
       * recursively collapse the ancestors then when
       * the person is clicked on again to expand, all ancestors
       * that were previously showing will be shown again.
       * If you want that behavior then just remove the recursion
       * by removing the if block.
       */
      collapse(person)
      {
          if (person.parents) {
              person._parents = person.parents;
              person._parents.forEach((child) => this.collapse(child));
              // person._parents.forEach(this.collapse);
              person.parents = null;
          }

          // person.collapsed = true;
          //
          // if (person.parents) {
          //     person.parents.forEach((child) => this.collapse(child));
          //     person.parents.forEach(this.collapse);
          // }
      }

      /**
       * Creates a single <tspan> element for each single given name and append it to the
       * parent element. The "tspan" element containing the preferred name gets an
       * additional underline style in order to highlight this one.
       *
       * @param {Selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
       * @param {Object}    datum  The D3 data object containing the individual data
       */
      addFirstNames(parent, datum)
      {
          let i = 0;

          for (let firstName of datum.data.firstNames) {
              // Create a <tspan> element for each given name
              let tspan = parent.append("tspan")
                  .text(firstName);

              // The preferred name
              if (firstName === datum.data.preferredName) {
                  tspan.attr("class", "preferred");
              }

              // Add some spacing between the elements
              if (i !== 0) {
                  tspan.attr("dx", "0.25em");
              }

              ++i;
          }
      }

      /**
       * Creates a single <tspan> element for each last name and append it to the parent element.
       *
       * @param {Selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
       * @param {Object}    datum  The D3 data object containing the individual data
       * @param {Number}    dx     Additional space offset to add between names
       */
      addLastNames(parent, datum, dx = 0)
      {
          let i = 0;

          for (let lastName of datum.data.lastNames) {
              // Create a <tspan> element for the last name
              let tspan = parent.append("tspan")
                  .attr("class", "lastName")
                  .text(lastName);

              // Add some spacing between the elements
              if (i !== 0) {
                  tspan.attr("dx", "0.25em");
              }

              if (dx !== 0) {
                  tspan.attr("dx", dx + "em");
              }

              ++i;
          }
      }

      /**
       * Loops over the <tspan> elements and truncates the contained texts.
       *
       * @param {Selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are attached
       * @param {Boolean}   hide   Whether to show or hide the label if the text takes to much space to be displayed
       */
      truncateNames(parent, hide = false)
      {
          let availableWidth = this._orientation.textWidth();

          // Select all not preferred and not last names
          this.truncateListOfNames(
              parent.selectAll("tspan:not(.preferred):not(.lastName)"),
              parent,
              availableWidth,
              hide
          );

          // Afterwards the preferred ones if text takes still to much space
          parent.selectAll("tspan.preferred")
              .each(this.truncateText(parent, availableWidth, hide));

          // Truncate lastnames
          parent.selectAll("tspan.lastName")
              .each(this.truncateText(parent, availableWidth, hide));
      }

      /**
       *
       * @param {Selection} names          A selection of name elements
       * @param {Selection} parent         The parent (<text> or <textPath>) element to which the <tspan> elements are attached
       * @param {Number}    availableWidth The total available width the text could take
       * @param {Boolean}   hide           Whether to show or hide the label if the text takes to much space to be displayed
       */
      truncateListOfNames(names, parent, availableWidth, hide)
      {
          if (names.size()) {
              // Start truncating from last element to the first one
              names.nodes()
                  .reverse()
                  .forEach(element => {
                      select(element)
                          .each(this.truncateText(parent, availableWidth, hide));
                  });
          }
      }

      /**
       * Truncates the textual content of the actual element.
       *
       * @param {Selection} parent         The parent (<text> or <textPath>) element containing the <tspan> child elements
       * @param {Number}    availableWidth The total available width the text could take
       * @param {Boolean}   hide           Whether to show or hide the label if the text takes to much space to be displayed
       */
      truncateText(parent, availableWidth, hide = false)
      {
          let that = this;

          return function () {
              let textLength = that.getTextLength(parent);
              let tspan      = select(this);
              let text       = tspan.text();

              if (textLength > availableWidth) {
                  if (hide) {
                      tspan.text("");
                  } else {
                      if (text.length > 1) {
                          // Keep only the first letter
                          tspan.text(text.slice(0, 1) + ".");
                      }
                  }
              }
          };
      }

      /**
       * Returns a float representing the computed length of all <tspan> elements within the element.
       *
       * @param {Selection} parent The parent (<text> or <textPath>) element containing the <tspan> child elements
       *
       * @returns {Number}
       */
      getTextLength(parent)
      {
          let totalWidth = 0;

          // Calculate the total used width of all <tspan> elements
          parent.selectAll("tspan").each(function () {
              totalWidth += this.getComputedTextLength();
          });

          return totalWidth;
      }

      /**
       * Add the individual names to the given parent element.
       *
       * @param {Selection} parent The parent element to which the elements are to be attached
       * @param {Object}    datum  The D3 data object
       */
      addNames(parent, datum)
      {
          let name = parent
              .append("g")
              .attr("class", "name");

          // Top/Bottom and Bottom/Top
          if (this._orientation._splittNames) {
              let text1 = name.append("text")
                  .attr("text-anchor", "middle")
                  .attr("alignment-baseline", "central")
                  .attr("dy", this._orientation.textY());

              let text2 = name.append("text")
                  .attr("text-anchor", "middle")
                  .attr("alignment-baseline", "central")
                  .attr("dy", this._orientation.textY() + 20);

              this.addFirstNames(text1, datum);
              this.addLastNames(text2, datum);

              this.truncateNames(text1);
              this.truncateNames(text2);

          // Left/Right and Right/Left
          } else {
              let text1 = name.append("text")
                  .attr("text-anchor", "start")
                  .attr("dx", this._orientation.textX())
                  .attr("dy", this._orientation.textY());

              this.addFirstNames(text1, datum);
              this.addLastNames(text1, datum, 0.25);
              this.truncateNames(text1);
          }
      }

      /**
       * Add the individual dates to the given parent element.
       *
       * @param {Selection} parent The parent element to which the elements are to be attached
       * @param {Object}    datum  The D3 data object
       */
      addDates(parent, datum)
      {
          let table = parent
              .append("g")
              .attr("class", "table");

          // Top/Bottom and Bottom/Top
          if (this._orientation._splittNames) {
              let text1 = table.append("text")
                  .attr("class", "date")
                  .attr("text-anchor", "middle")
                  .attr("alignment-baseline", "central")
                  .attr("dy", this._orientation.textY() + 50);

              text1.append("tspan")
                  .text(datum.data.timespan);

              return;
          }

          // A text element for the asterix and dagger
          let col1 = table
              .append("text")
              .attr("class", "date")
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .attr("x", this._orientation.textX())
              .attr("y", this._orientation.textY() + 15);

          // The asterix
          if (datum.data.birth) {
              col1.append("tspan")
                  .text("\u2605")
                  .attr("x", this._orientation.textX() + 5)
                  .attr("dy", this._orientation.textY() + 20);
          }

          // The dagger
          if (datum.data.death) {
              let death = col1
                  .append("tspan")
                  .text("\u2020");

              // Are both dates present?
              if (datum.data.birth) {
                  death.attr("x", this._orientation.textX() + 5)
                      .attr("dy", this._orientation.textY() + 35);
              } else {
                  // Only death date
                  death.attr("x", this._orientation.textX() + 5)
                      .attr("dy", this._orientation.textY() + 20);
              }
          }

          // A text element for the dates
          let col2 = table.append("text")
              .attr("class", "date")
              .attr("text-anchor", "start")
              .attr("dominant-baseline", "middle")
              .attr("x", this._orientation.textX())
              .attr("y", this._orientation.textY() + 20);

          if (datum.data.birth) {
              col2.append("tspan")
                  .text(datum.data.birth)
                  .attr("x", this._orientation.textX() + 15)
                  .attr("dy", this._orientation.textY() + 15);
          }

          if (datum.data.death) {
              let death = col2.append("tspan")
                  .text(datum.data.death);

              if (datum.data.birth) {
                  death.attr("x", this._orientation.textX() + 15)
                      .attr("dy", this._orientation.textY() + 35);
              } else {
                  death.attr("x", this._orientation.textX() + 15)
                      .attr("dy", this._orientation.textY() + 15);
              }
          }
      }

      /**
       * Return the image file or the placeholder.
       *
       * @param {Object} data The D3 data object
       *
       * @returns {String}
       */
      getImageToLoad(datum)
      {
          if (datum.data.thumbnail) {
              return datum.data.thumbnail;
          }

          return "";
      }

      /**
       * Draw the connecting lines.
       *
       * @param {Array} links Array of links
       *
       * @private
       */
      drawLinks(links, source)
      {

          let link = this._svg.visual
              .selectAll("path.link")
              .data(links, person => person.target.id);

          // Add new links. Transition new links from the source's old position to
          // the links final position.
          link
              .enter()
              .append("path")
              .classed("link", true)
              .attr("d", person => this._orientation.elbow(person));

          // // Add new links. Transition new links from the source's old position to
          // // the links final position.
          // let linkEnter = link.enter()
          //     .append("path")
          //     .classed("link", true)
          //     .attr("d", person => {
          //         const o = {
          //             x: source.x0,
          //             y: this._configuration.direction * (source.y0 + (this._orientation.boxWidth / 2))
          //         };
          //
          //         return this.transitionElbow({ source: o, target: o });
          //     });
          //
          // var linkUpdate = linkEnter.merge(link);
          //
          // // Update the old links positions
          // linkUpdate.transition()
          //     .duration(this._configuration.duration)
          //     .attr("d", person => this.elbow(person));
          //
          // // Remove any links we don't need anymore if part of the tree was collapsed. Transition exit
          // // links from their current position to the source's new position.
          // link.exit()
          //     .transition()
          //     .duration(this._configuration.duration)
          //     .attr("d", person => {
          //         const o = {
          //             x: source.x,
          //             y: this._configuration.direction * (source.y + this._orientation.boxWidth / 2)
          //         };
          //
          //         return this.transitionElbow({ source: o, target: o });
          //     })
          //     .remove();
      }

      // /**
      //  * Use a different elbow function for enter
      //  * and exit nodes. This is necessary because
      //  * the function above assumes that the nodes
      //  * are stationary along the x axis.
      //  *
      //  * @param {Object} datum D3 data object
      //  *
      //  * @private
      //  */
      // transitionElbow(datum)
      // {
      //     return "M" + datum.source.y + "," + datum.source.x
      //         + "H" + datum.source.y
      //         + "V" + datum.source.x
      //         + "H" + datum.source.y;
      // }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the tooltip overlay.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Overlay
  {
      /**
       * Constructor.
       *
       * @param {Selection} parent The selected D3 parent element container
       */
      constructor(parent)
      {
          // Create the tooltip overlay container
          this._element = parent
              .append("div")
              .attr("class", "overlay")
              .style("opacity", 1e-6);
      }

      /**
       * Stop any pending transition and hide overlay immediately.
       *
       * @param {String}   text     Text to display in overlay
       * @param {Number}   duration Duration of transition in msec
       * @param {Function} callback Callback method to execute on end of transition
       */
      show(text, duration = 0, callback = null)
      {
          // Remove any previously added <p> element
          this._element
              .select("p")
              .remove();

          this._element
              .append("p")
              .attr("class", "tooltip")
              .text(text);

          this._element
              .transition()
              .duration(duration)
              .style("opacity", 1)
              .on("end", () => {
                  if (typeof callback === "function") {
                      callback();
                  }
              });
      }

      /**
       * Stop any pending transition and hide overlay immediately.
       *
       * @param {Number} delay    Delay in milliseconds to wait before transition should start
       * @param {Number} duration Duration of transition in milliseconds
       */
      hide(delay = 0, duration = 0)
      {
          this._element
              .transition()
              .delay(delay)
              .duration(duration)
              .style("opacity", 1e-6);
      }

      /**
       * Returns the internal element.
       *
       * @returns {Selection}
       */
      get()
      {
          return this._element;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * SVG definition class
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Defs
  {
      /**
       * Constructor.
       *
       * @param {Selection} svg The selected D3 parent element container
       */
      constructor(svg)
      {
          // Create the <svg:defs> element
          this._element = svg.append("defs");
      }

      /**
       * Returns the internal element.
       *
       * @returns {Selection}
       */
      get()
      {
          return this._element;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Constants
   *
   * @type {Number}
   */
  const MIN_ZOOM = 0.1;
  const MAX_ZOOM = 20.0;

  /**
   * This class handles the zoom.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Zoom
  {
      /**
       * Constructor.
       *
       * @param {Selection} parent The selected D3 parent element container
       */
      constructor(parent)
      {
          this._zoom   = null;
          this._parent = parent;

          this.init();
      }

      /**
       * Initializes a new D3 zoom behavior.
       *
       * @private
       */
      init()
      {
          // Setup zoom and pan
          this._zoom = zoom();

          this._zoom
              .scaleExtent([MIN_ZOOM, MAX_ZOOM])
              .on("zoom", (event) => {
                  // Abort any action if only one finger is used on "touchmove" events
                  if (event.sourceEvent
                      && (event.sourceEvent.type === "touchmove")
                      && (event.sourceEvent.touches.length < 2)
                  ) {
                      return;
                  }

                  this._parent.attr("transform", event.transform);
              });

          // Adjust the wheel delta (see defaultWheelDelta() in zoom.js, which adds
          // a 10-times offset if ctrlKey is pressed)
          this._zoom.wheelDelta((event) => {
              return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002);
          });

          // Add zoom filter
          this._zoom.filter((event) => {
              // Allow "wheel" event only while control key is pressed
              if (event.type === "wheel") {
                  if (!event.ctrlKey) {
                      return false;
                  }

                  var transform$1 = transform(this);

                  if (transform$1.k) {
                      // Prevent zooming below lowest level
                      if ((transform$1.k <= MIN_ZOOM) && (event.deltaY > 0)) {
                          // Prevent browsers page zoom while holding down the control key
                          event.preventDefault();
                          return false;
                      }

                      // Prevent zooming above highest level
                      if ((transform$1.k >= MAX_ZOOM) && (event.deltaY < 0)) {
                          // Prevent browsers page zoom while holding down the control key
                          event.preventDefault();
                          return false;
                      }
                  }

                  return true;
              }

              // Allow "touchmove" event only with two fingers
              if (!event.button && (event.type === "touchmove")) {
                  return event.touches.length === 2;
              }

              return (!event.ctrlKey || event.type === 'wheel') && !event.button;
          });
      }

      /**
       * Returns the internal d3 zoom behaviour.
       *
       * @returns {zoom}
       */
      get()
      {
          return this._zoom;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Base export class.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Export
  {
      /**
       * Triggers the download by creating a new anchor element an simulate a mouse click on it.
       *
       * @param {String} imgURI   The image URI data stream
       * @param {String} fileName The file name to use in the download dialog
       */
      triggerDownload(imgURI, fileName)
      {
          let event = new MouseEvent("click", {
              view: window,
              bubbles: false,
              cancelable: true
          });

          let a = document.createElement("a");
          a.setAttribute("download", fileName);
          a.setAttribute("href", imgURI);
          a.setAttribute("target", "_blank");
          a.dispatchEvent(event);
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Export the chart as PNG image.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class PngExport extends Export
  {
      /**
       * Copies recursively all the styles from the list of container elements from the source
       * to the destination node.
       *
       * @param {SVGGraphicsElement} sourceNode
       * @param {SVGGraphicsElement} destinationNode
       */
      copyStylesInline(sourceNode, destinationNode)
      {
          return new Promise(resolve => {
              let containerElements = ["svg", "g", "text", "textPath"];

              for (let i = 0; i < destinationNode.childNodes.length; ++i) {
                  let child = destinationNode.childNodes[i];

                  if (containerElements.indexOf(child.tagName) !== -1) {
                      this.copyStylesInline(sourceNode.childNodes[i], child);
                      continue;
                  }

                  let computedStyle = window.getComputedStyle(sourceNode.childNodes[i]);

                  if (computedStyle === null) {
                      continue;
                  }

                  for (let j = 0; j < computedStyle.length; ++j) {
                      child.style.setProperty(computedStyle[j], computedStyle.getPropertyValue(computedStyle[j]));
                  }
              }

              resolve(destinationNode);
          })
      }

      /**
       * Returns the viewbox of the SVG. Mainly used to apply a padding around the chart.
       *
       * @param {SVGGraphicsElement} svg The SVG element
       *
       * @returns {Number[]}
       */
      calculateViewBox(svg)
      {
          // Get bounding box
          const boundingBox = svg.getBBox();
          const padding     = 50;   // Padding on each side

          // Return calculated view box
          return [
              boundingBox.x - padding,
              boundingBox.y - padding,
              boundingBox.width + (padding * 2),
              boundingBox.height + (padding * 2)
          ];
      }

      /**
       *
       * @param {Number} width
       * @param {Number} height
       *
       * @returns {HTMLCanvasElement}
       */
      createCanvas(width, height)
      {
          let canvas    = document.createElement("canvas");
          canvas.width  = width;
          canvas.height = height;

          return canvas;
      }

      /**
       * Converts the given SVG into a PNG image. Resolves to the PNG data URL.
       *
       * @param {SVGGraphicsElement} svg    The SVG element
       * @param {Number}             width  The width of the image
       * @param {Number}             height The height of the image
       *
       * @returns {Promise<String>}
       */
      convertToDataUrl(svg, width, height)
      {
          return new Promise(resolve => {
              let data    = (new XMLSerializer()).serializeToString(svg);
              let DOMURL  = window.URL || window.webkitURL || window;
              let svgBlob = new Blob([ data ], { type: "image/svg+xml;charset=utf-8" });
              let url     = DOMURL.createObjectURL(svgBlob);
              let img     = new Image();

              img.onload = () => {
                  let canvas = this.createCanvas(width, height);
                  let ctx    = canvas.getContext("2d");

                  ctx.fillStyle = "rgb(255,255,255)";
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, 0, 0);

                  DOMURL.revokeObjectURL(url);

                  let imgURI = canvas
                      .toDataURL("image/png")
                      .replace("image/png", "image/octet-stream");

                  resolve(imgURI);
              };

              img.src = url;
          });
      }

      /**
       * Clones the SVG element.
       *
       * @param {SVGGraphicsElement} svg
       *
       * @returns {Promise<SVGGraphicsElement>}
       */
      cloneSvg(svg)
      {
          return new Promise(resolve => {
              let newSvg = svg.cloneNode(true);

              resolve(newSvg);
          })
      }

      /**
       * Saves the given SVG as PNG image file.
       *
       * @param {Svg}    svg      The source SVG object
       * @param {String} fileName The file name
       */
      svgToImage(svg, fileName)
      {
          // 300 DPI (good quality for printing) / 96 DPI (common browser)
          //let scale = 300 / dpi();

          // Paper sizes (width, height) in pixel at 300 DPI/PPI
          // const paperSize = {
          //     'A3': [4960, 3508],
          //     'A4': [3508, 2480],
          //     'A5': [2480, 1748]
          // };

          this.cloneSvg(svg.get().node())
              .then(newSvg => {
                  this.copyStylesInline(svg.get().node(), newSvg);

                  const viewBox = this.calculateViewBox(svg.get().node());
                  const width = viewBox[2];
                  const height = viewBox[3];

                  newSvg.setAttribute("width", width);
                  newSvg.setAttribute("height", height);
                  newSvg.setAttribute("viewBox", viewBox);

                  this.convertToDataUrl(newSvg, width, height)
                      .then(imgURI => this.triggerDownload(imgURI, fileName))
                      .catch(() => {
                          console.log("Failed to save chart as PNG image");
                      });
              });
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * Export the chart as raw SVG image.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class SvgExport extends Export
  {
      /**
       * Copies recursively all the styles from the list of container elements from the source
       * to the destination node.
       *
       * @param {String}             cssFile
       * @param {SVGGraphicsElement} destinationNode
       *
       * @returns {Promise<SVGGraphicsElement>}
       */
      copyStylesInline(cssFile, destinationNode)
      {
          return new Promise(resolve => {
              text(cssFile)
                  .then((data) => {
                      // Remove parent container selector as the CSS is included directly into the SVG element
                      data = data.replace(/#webtrees-pedigree-chart-container /g, "");

                      let style = document.createElementNS("http://www.w3.org/2000/svg", "style");
                      style.appendChild(document.createTextNode(data));

                      destinationNode.prepend(style);

                      resolve(destinationNode);
                  });
          })
      }

      /**
       * Converts the given SVG into an object URL. Resolves to the object URL.
       *
       * @param {SVGGraphicsElement} svg The SVG element
       *
       * @returns {Promise<String>}
       */
      convertToObjectUrl(svg)
      {
          return new Promise(resolve => {
              let data    = (new XMLSerializer()).serializeToString(svg);
              let DOMURL  = window.URL || window.webkitURL || window;
              let svgBlob = new Blob([ data ], { type: "image/svg+xml;charset=utf-8" });
              let url     = DOMURL.createObjectURL(svgBlob);
              let img     = new Image();

              img.onload = () => {
                  resolve(url);
              };

              img.src = url;
          });
      }

      /**
       * Clones the SVG element.
       *
       * @param {SVGGraphicsElement} svg
       *
       * @returns {Promise<SVGGraphicsElement>}
       */
      cloneSvg(svg)
      {
          return new Promise(resolve => {
              let newSvg = svg.cloneNode(true);

              resolve(newSvg);
          })
      }

      /**
       * Saves the given SVG as SVG image file.
       *
       * @param {Svg}    svg      The source SVG object
       * @param {String} cssFile  The CSS file used together with the SVG
       * @param {String} fileName The file name
       */
      svgToImage(svg, cssFile, fileName)
      {
          this.cloneSvg(svg.get().node())
              .then(newSvg => this.copyStylesInline(cssFile, newSvg))
              .then(newSvg => this.convertToObjectUrl(newSvg))
              .then(objectUrl => this.triggerDownload(objectUrl, fileName))
              .catch(() => {
                  console.log("Failed to save chart as SVG image");
              });
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * The file export factory.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class ExportFactory
  {
      constructor()
      {
          this._exportClass = null;
      }

      setExportClass(type)
      {
          switch (type) {
              case 'png':
                  this._exportClass = PngExport;
                  break;
              case 'svg':
                  this._exportClass = SvgExport;
                  break;
          }
      };

      createExport(type)
      {
          this.setExportClass(type);

          switch (type) {
              case 'png':
                  return new this._exportClass();
              case 'svg':
                  return new this._exportClass();
          }
      };
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * SVG class
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Svg
  {
      /**
       * Constructor.
       *
       * @param {Selection}     parent        The selected D3 parent element container
       * @param {Configuration} configuration The application configuration
       */
      constructor(parent, configuration)
      {
          // Create the <svg> element
          this._element       = parent.append("svg");
          this._defs          = new Defs(this._element);

          this._visual        = null;
          this._zoom          = null;
          this._configuration = configuration;

          this.init();
      }

      /**
       * Initialize the <svg> element.
       *
       * @private
       */
      init()
      {
          // Add SVG element
          this._element
              .attr("width", "100%")
              .attr("height", "100%")
              .attr("text-rendering", "geometricPrecision")
              .attr("text-anchor", "middle")
              .attr("xmlns:xlink", "https://www.w3.org/1999/xlink");

          // new Filter(this._defs.get());
      }

      /**
       * Initialiaze the <svg> element events.
       *
       * @param {Overlay} overlay
       */
      initEvents(overlay)
      {
          this._element
              .on("contextmenu", (event) => event.preventDefault())
              .on("wheel", (event) => {
                  if (!event.ctrlKey) {
                      overlay.show(
                          this._configuration.labels.zoom,
                          300,
                          () => {
                              overlay.hide(700, 800);
                          }
                      );
                  }
              })
              .on("touchend", (event) => {
                  if (event.touches.length < 2) {
                      overlay.hide(0, 800);
                  }
              })
              .on("touchmove", (event) => {
                  if (event.touches.length >= 2) {
                      // Hide tooltip on more than 2 fingers
                      overlay.hide();
                  } else {
                      // Show tooltip if less than 2 fingers are used
                      overlay.show(this._configuration.labels.move);
                  }
              })
              .on("click", (event) => this.doStopPropagation(event), true);

          if (this._configuration.rtl) {
              this._element.classed("rtl", true);
          }

          // Add group
          this._visual = this._element.append("g");

          // this._visual
          //     .append("g")
          //     .attr("class", "personGroup");

          this._zoom = new Zoom(this._visual);
          this._element.call(this._zoom.get());

          // // For Top/Bottom and Bottom/Top layout set the initial zoom level to the number
          // // of displayed generations
          // if ((this._configuration.generations > 4)
          //     && ((this._configuration.treeLayout === LAYOUT_TOPBOTTOM)
          //     || (this._configuration.treeLayout === LAYOUT_BOTTOMTOP))
          // ) {
          //     // this._element
          //     //     .attr("transform", "translate(200, 200)")
          //     //
          //     // this._zoom.get().scaleTo(this._element, this._configuration.generations);
          // }
      }

      /**
       * Prevent default click and stop propagation.
       *
       * @param {Event} event
       *
       * @private
       */
      doStopPropagation(event)
      {
          if (event.defaultPrevented) {
              event.stopPropagation();
          }
      }

      /**
       * Exports the chart as PNG image and triggers a download.
       *
       * @param {String} type The export file type (either "png" or "svg")
       *
       * @returns {PngExport|SvgExport}
       */
      export(type )
      {
          const factory = new ExportFactory();
          return factory.createExport(type);
      }

      /**
       * Returns the SVG definition instance.
       *
       * @returns {Defs}
       */
      get defs()
      {
          return this._defs;
      }

      /**
       * Returns the SVG definition instance.
       *
       * @returns {Zoom}
       */
      get zoom()
      {
          return this._zoom;
      }

      /**
       *
       *
       * @returns {Selection}
       */
      get visual()
      {
          return this._visual;
      }

      /**
       * Returns the internal element.
       *
       * @returns {Selection}
       */
      get()
      {
          return this._element;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  const MIN_HEIGHT  = 300;
  const MIN_PADDING = 10;   // Minimum padding around view box

  /**
   * This class handles the overall chart creation.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Chart
  {
      /**
       * Constructor.
       *
       * @param {Selection}     parent        The selected D3 parent element container
       * @param {Configuration} configuration The application configuration
       */
      constructor(parent, configuration)
      {
          this._configuration = configuration;
          this._parent        = parent;
          this._hierarchy     = new Hierarchy(this._configuration);
          this._data          = {};
      }

      /**
       * Returns the SVG instance.
       *
       * @returns {Svg}
       */
      get svg()
      {
          return this._svg;
      }

      /**
       * Update/Calculate the viewBox attribute of the SVG element.
       *
       * @private
       */
      updateViewBox()
      {
          // Get bounding boxes
          let svgBoundingBox    = this._svg.visual.node().getBBox();
          let clientBoundingBox = this._parent.node().getBoundingClientRect();

          // View box should have at least the same width/height as the parent element
          let viewBoxWidth  = Math.max(clientBoundingBox.width, svgBoundingBox.width);
          let viewBoxHeight = Math.max(clientBoundingBox.height, svgBoundingBox.height, MIN_HEIGHT);

          // Calculate offset to center chart inside svg
          let offsetX = (viewBoxWidth - svgBoundingBox.width) / 2;
          let offsetY = (viewBoxHeight - svgBoundingBox.height) / 2;

          // Adjust view box dimensions by padding and offset
          let viewBoxLeft = Math.ceil(svgBoundingBox.x - offsetX - MIN_PADDING);
          let viewBoxTop  = Math.ceil(svgBoundingBox.y - offsetY - MIN_PADDING);

          // Final width/height of view box
          viewBoxWidth  = Math.ceil(viewBoxWidth + (MIN_PADDING * 2));
          viewBoxHeight = Math.ceil(viewBoxHeight + (MIN_PADDING * 2));

          // this._svg.visual
          //     .attr("transform", "translate(" + (-viewBoxLeft) + ", " + (-viewBoxTop) + ")");
          //
          // this._svg.get()
          //     .attr("width", viewBoxWidth)
          //     .attr("height", viewBoxHeight);

          // Set view box attribute
          this._svg.get()
              .attr("viewBox", [
                  viewBoxLeft,
                  viewBoxTop,
                  viewBoxWidth,
                  viewBoxHeight
              ]);
      }

      /**
       * Returns the chart data.
       *
       * @returns {Object}
       */
      get data()
      {
          return this._data;
      }

      /**
       * Sets the chart data.
       *
       * @param {Object} value The chart data
       */
      set data(value)
      {
          this._data = value;

          // Create the hierarchical data structure
          this._hierarchy.init(this._data);
      }

      /**
       * This method draws the chart.
       */
      draw()
      {
          // Remove previously created content
          this._parent.html("");

          // Create the <svg> element
          this._svg = new Svg(this._parent, this._configuration);

          // Overlay must be placed after the <svg> element
          this._overlay = new Overlay(this._parent);

          // Init the <svg> events
          this._svg.initEvents(this._overlay);

          new Tree(this._svg, this._configuration, this._hierarchy);

          // let personGroup = this._svg.get().select("g.personGroup");
          // let gradient    = new Gradient(this._svg, this._configuration);
          // let that        = this;
          //
          // personGroup
          //     .selectAll("g.person")
          //     .data(this._hierarchy.nodes, (d) => d.data.id)
          //     .enter()
          //     .append("g")
          //     .attr("class", "person")
          //     .attr("id", (d) => "person-" + d.data.id);
          //
          // // Create a new selection in order to leave the previous enter() selection
          // personGroup
          //     .selectAll("g.person")
          //     .each(function (d) {
          //         let person = d3.select(this);
          //
          //         if (that._configuration.showColorGradients) {
          //             gradient.init(d);
          //         }
          //
          //         new Person(that._svg, that._configuration, person, d);
          //     });

          this.bindClickEventListener();
          this.updateViewBox();
      }

      /**
       * This method bind the "click" event listeners to a "person" element.
       */
      bindClickEventListener()
      {
          var that = this;
          this._svg.visual
              .selectAll("g.person")
              .filter((d) => d.data.xref !== "")
              .each(function (d) {
                  select(this).on("click", function() { that.personClick(d.data); });
              });
      }

      /**
       * Method triggers either the "update" or "individual" method on the click on an person.
       *
       * @param {Object} data The D3 data object
       *
       * @private
       */
      personClick(data)
      {
          // Trigger either "update" or "redirectToIndividual" method on click depending on person in chart
          (data.generation === 1) ? this.redirectToIndividual(data.url) : this.update(data.updateUrl);
      }

      /**
       * Redirects to the individual page.
       *
       * @param {String} url The individual URL
       *
       * @private
       */
      redirectToIndividual(url)
      {
          window.location = url;
      }

      /**
       * Updates the chart with the data of the selected individual.
       *
       * @param {String} url The update URL
       */
      update(url)
      {
          window.location = url;
      }

      // /**
      //  * Changes root individual
      //  *
      //  * @param {String} url The update url
      //  *
      //  * @private
      //  */
      // update(url)
      // {
      //     var that = this;
      //
      //     $.getJSON(url, function(data) {
      //         that.data = data;
      //         that.draw();
      //
      //         var indSelector = $(document.getElementById('xref'));
      //         $.ajax({
      //             type: 'POST',
      //             url: indSelector.attr("data-ajax--url"),
      //             data: { q : data.xref }
      //         }).then(function (data) {
      //             // create the option and append to Select2
      //             var option = new Option(data.results[0].text, data.results[0].id, true, true);
      //             indSelector.append(option).trigger('change');
      //         });
      //     });
      // }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * The application class.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class PedigreeChart
  {
      /**
       * Constructor.
       *
       * @param {String} selector The CSS selector of the HTML element used to assign the chart too
       * @param {Object} options  A list of options passed from outside to the application
       *
       * @param {String[]} options.labels
       * @param {Number}   options.generations
       * @param {String}   options.defaultColor
       * @param {String}   options.fontColor
       * @param {Boolean}  options.showEmptyBoxes
       * @param {String}   options.treeLayout
       * @param {Boolean}  options.rtl
       */
      constructor(selector, options)
      {
          this._selector = selector;
          this._parent   = select(this._selector);

          // Set up configuration
          this._configuration = new Configuration(
              options.labels,
              options.generations,
              options.defaultColor,
              options.fontColor,
              options.showEmptyBoxes,
              options.treeLayout,
              options.rtl
          );

          // Set up chart instance
          this._chart = new Chart(this._parent, this._configuration);

          this.init();
      }

      /**
       * @private
       */
      init()
      {
          // Bind click event on center button
          select("#centerButton")
              .on("click", () => this.center());

          // Bind click event on export as PNG button
          select("#exportPNG")
              .on("click", () => this.exportPNG());

          // Bind click event on export as SVG button
          select("#exportSVG")
              .on("click", () => this.exportSVG());
      }

      /**
       * Resets the chart to initial zoom level and position.
       *
       * @private
       */
      center()
      {
          this._chart
              .svg.get()
              .transition()
              .duration(750)
              .call(this._chart.svg.zoom.get().transform, identity);
      }

      /**
       * Returns the configuration object.
       *
       * @returns {Configuration}
       */
      get configuration()
      {
          return this._configuration;
      }

      /**
       * Sets the URL to the CSS file used in SVG export.
       *
       * @param {String} cssFile
       */
      set cssFile(cssFile)
      {
          this._cssFile = cssFile;
      }

      /**
       * Updates the chart.
       *
       * @param {Object} url The update url
       */
      update(url) { this._chart.update(url); }

      /**
       * Draws the chart.
       *
       * @param {Object} data The JSON encoded chart data
       */
      draw(data)
      {
          this._chart.data = data;
          this._chart.draw();
      }

      /**
       * Exports the chart as PNG image and triggers a download.
       *
       * @private
       */
      exportPNG()
      {
          this._chart.svg
              .export('png')
              .svgToImage(this._chart.svg, "pedigree-chart.png");

      }

      /**
       * Exports the chart as SVG image and triggers a download.
       *
       * @private
       */
      exportSVG()
      {
          this._chart.svg
              .export('svg')
              .svgToImage(this._chart.svg, this._cssFile, "pedigree-chart.svg");
      }
  }

  exports.PedigreeChart = PedigreeChart;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
