(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.WebtreesFanChart = {}));
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

  function constant$3(x) {
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

    if (typeof value !== "function") value = constant$3(value);

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
    if (!compare) compare = ascending$1;

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

  function ascending$1(a, b) {
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

  var constant$2 = x => () => x;

  function linear$1(a, d) {
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
      return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear$1(a, d) : constant$2(isNaN(a) ? b : a);
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

  function numberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function(t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }

  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  function object(a, b) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate$1(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
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

  function interpolate$1(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant$2(b)
        : (t === "number" ? interpolateNumber
        : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
        : b instanceof color ? interpolateRgb
        : b instanceof Date ? date
        : isNumberArray(b) ? numberArray
        : Array.isArray(b) ? genericArray
        : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
        : interpolateNumber)(a, b);
  }

  function interpolateRound(a, b) {
    return a = +a, b = +b, function(t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  var degrees = 180 / Math.PI;

  var identity$3 = {
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
    return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$3;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
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

  function transition(name) {
    return selection().transition(name);
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = transition.prototype = {
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

  function ascending(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(f) {
    let delta = f;
    let compare1 = f;
    let compare2 = f;

    if (f.length === 1) {
      delta = (d, x) => f(d) - x;
      compare1 = ascending;
      compare2 = (d, x) => ascending(f(d), x);
    }

    function left(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = (lo + hi) >>> 1;
          if (compare2(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }

    function right(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = (lo + hi) >>> 1;
          if (compare2(a[mid], x) <= 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }

    function center(a, x, lo = 0, hi = a.length) {
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }

    return {left, center, right};
  }

  function number$1(x) {
    return x === null ? NaN : +x;
  }

  const ascendingBisect = bisector(ascending);
  const bisectRight = ascendingBisect.right;
  bisector(number$1).center;
  var bisect = bisectRight;

  var e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);

  function ticks(start, stop, count) {
    var reverse,
        i = -1,
        n,
        ticks,
        step;

    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [start];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      let r0 = Math.round(start / step), r1 = Math.round(stop / step);
      if (r0 * step < start) ++r0;
      if (r1 * step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);
      while (++i < n) ticks[i] = (r0 + i) * step;
    } else {
      step = -step;
      let r0 = Math.round(start * step), r1 = Math.round(stop * step);
      if (r0 / step < start) ++r0;
      if (r1 / step > stop) --r1;
      ticks = new Array(n = r1 - r0 + 1);
      while (++i < n) ticks[i] = (r0 + i) / step;
    }

    if (reverse) ticks.reverse();

    return ticks;
  }

  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log(step) / Math.LN10),
        error = step / Math.pow(10, power);
    return power >= 0
        ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
        : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }

  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;
    else if (error >= e5) step1 *= 5;
    else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0: break;
      case 1: this.range(domain); break;
      default: this.range(range).domain(domain); break;
    }
    return this;
  }

  function constants(x) {
    return function() {
      return x;
    };
  }

  function number(x) {
    return +x;
  }

  var unit = [0, 1];

  function identity$2(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= (a = +a))
        ? function(x) { return (x - a) / b; }
        : constants(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) { return Math.max(a, Math.min(b, x)); };
  }

  // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
  function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x) { return r0(d0(x)); };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1;

    // Reverse descending domains.
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function(x) {
      var i = bisect(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target
        .domain(source.domain())
        .range(source.range())
        .interpolate(source.interpolate())
        .clamp(source.clamp())
        .unknown(source.unknown());
  }

  function transformer() {
    var domain = unit,
        range = unit,
        interpolate = interpolate$1,
        transform,
        untransform,
        unknown,
        clamp = identity$2,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity$2) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }

    scale.invert = function(y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = Array.from(_), interpolate = interpolateRound, rescale();
    };

    scale.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity$2, rescale()) : clamp !== identity$2;
    };

    scale.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function(t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }

  function continuous() {
    return transformer()(identity$2, identity$2);
  }

  function formatDecimal(x) {
    return Math.abs(x = Math.round(x)) >= 1e21
        ? x.toLocaleString("en").replace(/,/g, "")
        : x.toString(10);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].
  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }

  function exponent(x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }

  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width === undefined ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
        + (this.trim ? "~" : "")
        + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": (x) => Math.round(x).toString(2),
    "c": (x) => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": (x) => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": (x) => Math.round(x).toString(16).toUpperCase(),
    "x": (x) => Math.round(x).toString(16)
  };

  function identity$1(x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function formatLocale(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "−" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") comma = true, type = "g";

      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision === undefined ? 6
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i, n, c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Determine the sign. -0 is not less than 0, but 1 / -0 is!
          var valueNegative = value < 0 || 1 / value < 0;

          // Perform the initial formatting.
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = formatTrim(value);

          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": value = valuePrefix + value + valueSuffix + padding; break;
          case "=": value = valuePrefix + padding + value + valueSuffix; break;
          case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
          default: value = padding + valuePrefix + value + valueSuffix; break;
        }

        return numerals(value);
      }

      format.toString = function() {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale;
  var format;
  var formatPrefix;

  defaultLocale({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function(count) {
      if (count == null) count = 10;

      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      
      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);
        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }

      return scale;
    };

    return scale;
  }

  function linear() {
    var scale = continuous();

    scale.copy = function() {
      return copy(scale, linear());
    };

    initRange.apply(scale, arguments);

    return linearish(scale);
  }

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

  var constant$1 = x => () => x;

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
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant$1(+_), zoom) : wheelDelta;
    };

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$1(!!_), zoom) : filter;
    };

    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$1(!!_), zoom) : touchable;
    };

    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant$1([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
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

  function roundNode(node) {
    node.x0 = Math.round(node.x0);
    node.y0 = Math.round(node.y0);
    node.x1 = Math.round(node.x1);
    node.y1 = Math.round(node.y1);
  }

  function treemapDice(parent, x0, y0, x1, y1) {
    var nodes = parent.children,
        node,
        i = -1,
        n = nodes.length,
        k = parent.value && (x1 - x0) / parent.value;

    while (++i < n) {
      node = nodes[i], node.y0 = y0, node.y1 = y1;
      node.x0 = x0, node.x1 = x0 += node.value * k;
    }
  }

  function partition() {
    var dx = 1,
        dy = 1,
        padding = 0,
        round = false;

    function partition(root) {
      var n = root.height + 1;
      root.x0 =
      root.y0 = padding;
      root.x1 = dx;
      root.y1 = dy / n;
      root.eachBefore(positionNode(dy, n));
      if (round) root.eachBefore(roundNode);
      return root;
    }

    function positionNode(dy, n) {
      return function(node) {
        if (node.children) {
          treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
        }
        var x0 = node.x0,
            y0 = node.y0,
            x1 = node.x1 - padding,
            y1 = node.y1 - padding;
        if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
        if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
        node.x0 = x0;
        node.y0 = y0;
        node.x1 = x1;
        node.y1 = y1;
      };
    }

    partition.round = function(x) {
      return arguments.length ? (round = !!x, partition) : round;
    };

    partition.size = function(x) {
      return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
    };

    partition.padding = function(x) {
      return arguments.length ? (padding = +x, partition) : padding;
    };

    return partition;
  }

  const pi$1 = Math.PI,
      tau$1 = 2 * pi$1,
      epsilon$1 = 1e-6,
      tauEpsilon = tau$1 - epsilon$1;

  function Path() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }

  function path() {
    return new Path;
  }

  Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function(x, y) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function(x, y) {
      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function(x1, y1, x, y) {
      this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
      this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon$1));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
        this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Otherwise, draw an arc!
      else {
        var x20 = x2 - x0,
            y20 = y2 - y0,
            l21_2 = x21 * x21 + y21 * y21,
            l20_2 = x20 * x20 + y20 * y20,
            l21 = Math.sqrt(l21_2),
            l01 = Math.sqrt(l01_2),
            l = r * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
            t01 = l / l01,
            t21 = l / l21;

        // If the start tangent is not coincident with (x0,y0), line to.
        if (Math.abs(t01 - 1) > epsilon$1) {
          this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
        }

        this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
      }
    },
    arc: function(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
        this._ += "L" + x0 + "," + y0;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau$1 + tau$1;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon$1) {
        this._ += "A" + r + "," + r + ",0," + (+(da >= pi$1)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
      }
    },
    rect: function(x, y, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
    },
    toString: function() {
      return this._;
    }
  };

  function constant(x) {
    return function constant() {
      return x;
    };
  }

  var abs = Math.abs;
  var atan2 = Math.atan2;
  var cos = Math.cos;
  var max = Math.max;
  var min = Math.min;
  var sin = Math.sin;
  var sqrt = Math.sqrt;

  var epsilon = 1e-12;
  var pi = Math.PI;
  var halfPi = pi / 2;
  var tau = 2 * pi;

  function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
  }

  function asin(x) {
    return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
  }

  function arcInnerRadius(d) {
    return d.innerRadius;
  }

  function arcOuterRadius(d) {
    return d.outerRadius;
  }

  function arcStartAngle(d) {
    return d.startAngle;
  }

  function arcEndAngle(d) {
    return d.endAngle;
  }

  function arcPadAngle(d) {
    return d && d.padAngle; // Note: optional!
  }

  function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
    var x10 = x1 - x0, y10 = y1 - y0,
        x32 = x3 - x2, y32 = y3 - y2,
        t = y32 * x10 - x32 * y10;
    if (t * t < epsilon) return;
    t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
    return [x0 + t * x10, y0 + t * y10];
  }

  // Compute perpendicular offset line of length rc.
  // http://mathworld.wolfram.com/Circle-LineIntersection.html
  function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
    var x01 = x0 - x1,
        y01 = y0 - y1,
        lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
        ox = lo * y01,
        oy = -lo * x01,
        x11 = x0 + ox,
        y11 = y0 + oy,
        x10 = x1 + ox,
        y10 = y1 + oy,
        x00 = (x11 + x10) / 2,
        y00 = (y11 + y10) / 2,
        dx = x10 - x11,
        dy = y10 - y11,
        d2 = dx * dx + dy * dy,
        r = r1 - rc,
        D = x11 * y10 - x10 * y11,
        d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
        cx0 = (D * dy - dx * d) / d2,
        cy0 = (-D * dx - dy * d) / d2,
        cx1 = (D * dy + dx * d) / d2,
        cy1 = (-D * dx + dy * d) / d2,
        dx0 = cx0 - x00,
        dy0 = cy0 - y00,
        dx1 = cx1 - x00,
        dy1 = cy1 - y00;

    // Pick the closer of the two intersection points.
    // TODO Is there a faster way to determine which intersection to use?
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

    return {
      cx: cx0,
      cy: cy0,
      x01: -ox,
      y01: -oy,
      x11: cx0 * (r1 / r - 1),
      y11: cy0 * (r1 / r - 1)
    };
  }

  function arc() {
    var innerRadius = arcInnerRadius,
        outerRadius = arcOuterRadius,
        cornerRadius = constant(0),
        padRadius = null,
        startAngle = arcStartAngle,
        endAngle = arcEndAngle,
        padAngle = arcPadAngle,
        context = null;

    function arc() {
      var buffer,
          r,
          r0 = +innerRadius.apply(this, arguments),
          r1 = +outerRadius.apply(this, arguments),
          a0 = startAngle.apply(this, arguments) - halfPi,
          a1 = endAngle.apply(this, arguments) - halfPi,
          da = abs(a1 - a0),
          cw = a1 > a0;

      if (!context) context = buffer = path();

      // Ensure that the outer radius is always larger than the inner radius.
      if (r1 < r0) r = r1, r1 = r0, r0 = r;

      // Is it a point?
      if (!(r1 > epsilon)) context.moveTo(0, 0);

      // Or is it a circle or annulus?
      else if (da > tau - epsilon) {
        context.moveTo(r1 * cos(a0), r1 * sin(a0));
        context.arc(0, 0, r1, a0, a1, !cw);
        if (r0 > epsilon) {
          context.moveTo(r0 * cos(a1), r0 * sin(a1));
          context.arc(0, 0, r0, a1, a0, cw);
        }
      }

      // Or is it a circular or annular sector?
      else {
        var a01 = a0,
            a11 = a1,
            a00 = a0,
            a10 = a1,
            da0 = da,
            da1 = da,
            ap = padAngle.apply(this, arguments) / 2,
            rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
            rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
            rc0 = rc,
            rc1 = rc,
            t0,
            t1;

        // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
        if (rp > epsilon) {
          var p0 = asin(rp / r0 * sin(ap)),
              p1 = asin(rp / r1 * sin(ap));
          if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
          else da0 = 0, a00 = a10 = (a0 + a1) / 2;
          if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
          else da1 = 0, a01 = a11 = (a0 + a1) / 2;
        }

        var x01 = r1 * cos(a01),
            y01 = r1 * sin(a01),
            x10 = r0 * cos(a10),
            y10 = r0 * sin(a10);

        // Apply rounded corners?
        if (rc > epsilon) {
          var x11 = r1 * cos(a11),
              y11 = r1 * sin(a11),
              x00 = r0 * cos(a00),
              y00 = r0 * sin(a00),
              oc;

          // Restrict the corner radius according to the sector angle.
          if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
            var ax = x01 - oc[0],
                ay = y01 - oc[1],
                bx = x11 - oc[0],
                by = y11 - oc[1],
                kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
                lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min(rc, (r0 - lc) / (kc - 1));
            rc1 = min(rc, (r1 - lc) / (kc + 1));
          }
        }

        // Is the sector collapsed to a line?
        if (!(da1 > epsilon)) context.moveTo(x01, y01);

        // Does the sector’s outer ring have rounded corners?
        else if (rc1 > epsilon) {
          t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
          t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

          context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

          // Have the corners merged?
          if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

          // Otherwise, draw the two corners and the ring.
          else {
            context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
            context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
            context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
          }
        }

        // Or is the outer ring just a circular arc?
        else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

        // Is there no inner ring, and it’s a circular sector?
        // Or perhaps it’s an annular sector collapsed due to padding?
        if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

        // Does the sector’s inner ring (or point) have rounded corners?
        else if (rc0 > epsilon) {
          t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
          t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

          context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

          // Have the corners merged?
          if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

          // Otherwise, draw the two corners and the ring.
          else {
            context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
            context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
            context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
          }
        }

        // Or is the inner ring just a circular arc?
        else context.arc(0, 0, r0, a10, a00, cw);
      }

      context.closePath();

      if (buffer) return context = null, buffer + "" || null;
    }

    arc.centroid = function() {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
      return [cos(a) * r, sin(a) * r];
    };

    arc.innerRadius = function(_) {
      return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
    };

    arc.outerRadius = function(_) {
      return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
    };

    arc.cornerRadius = function(_) {
      return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
    };

    arc.padRadius = function(_) {
      return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
    };

    arc.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
    };

    arc.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
    };

    arc.padAngle = function(_) {
      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
    };

    arc.context = function(_) {
      return arguments.length ? ((context = _ == null ? null : _), arc) : context;
    };

    return arc;
  }

  function responseText(response) {
    if (!response.ok) throw new Error(response.status + " " + response.statusText);
    return response.text();
  }

  function text(input, init) {
    return fetch(input, init).then(responseText);
  }

  function responseJson(response) {
    if (!response.ok) throw new Error(response.status + " " + response.statusText);
    if (response.status === 204 || response.status === 205) return;
    return response.json();
  }

  function json(input, init) {
    return fetch(input, init).then(responseJson);
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the configuration of the application.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Configuration
  {
      /**
       * Constructor.
       *
       * @param {String[]}  labels
       * @param {Number}    generations
       * @param {Number}    fanDegree
       * @param {String}    defaultColor
       * @param {Number}    fontScale
       * @param {String}    fontColor
       * @param {Boolean}   hideEmptySegments
       * @param {Boolean}   showColorGradients
       * @param {Boolean}   showParentMarriageDates
       * @param {Boolean}   rtl
       * @param {Number}    innerArcs
       */
      constructor(
          labels,
          generations = 6,
          fanDegree = 210,
          defaultColor = "rgb(238, 238, 238)",
          fontScale = 100,
          fontColor = "rgb(0, 0, 0)",
          hideEmptySegments = false,
          showColorGradients = false,
          showParentMarriageDates = false,
          rtl = false,
          innerArcs = 4
      ) {
          // Default number of generations to display
          this._generations = generations;

          // Padding in pixel between each generation circle
          this.circlePadding = 0;

          if (showParentMarriageDates) {
              this.circlePadding = 40;
          }

          this.padAngle = 0.03;
          this.padRadius = this.circlePadding * 10;
          this.padDistance = this.padAngle * this.padRadius;
          this.cornerRadius = 0;

          // Number of circles, large enough to print text along arc path
          this._numberOfInnerCircles = innerArcs;

          // Radius of the innermost circle
          this.centerCircleRadius = 85;

          // Height of each inner circle arc
          this.innerArcHeight = 85;

          // Height of each outer circle arc
          this.outerArcHeight = 110;

          if (showParentMarriageDates) {
              this.innerArcHeight = this.circlePadding + 110;
              this.outerArcHeight = this.circlePadding + 110;
          }

          // Width of the colored arc above each single person arc
          this.colorArcWidth = 5;

          // Left/Right padding of text (used with truncation)
          this.textPadding = 8;

          // Default background color of an arc
          this.defaultColor = defaultColor;

          // Default font size, color and scaling
          this._fontSize  = 15;
          this._fontScale = fontScale;
          this.fontColor = fontColor;

          this._hideEmptySegments  = hideEmptySegments;
          this._showColorGradients = showColorGradients;
          this._showParentMarriageDates = showParentMarriageDates;

          // Duration of update animation if clicked on a person
          this.updateDuration = 1250;

          // Default degrees of the fan chart
          this._fanDegree = fanDegree;

          this.rtl    = rtl;
          this.labels = labels;

          // Helper method to create a ongoing id
          this.id = (() => {
              let i = 1;

              return function (reset = false) {
                  if (reset) {
                      i = 0;
                  }

                  return i++;
              };
          })();
      }

      /**
       * Returns the number of generations to display.
       *
       * @return {Number}
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
       * Returns the degrees of the fan chart.
       *
       * @return {Number}
       */
      get fanDegree()
      {
          return this._fanDegree;
      }

      /**
       * Sets the degrees of the fan chart.
       *
       * @param {Number} value The degrees of the fan chart
       */
      set fanDegree(value)
      {
          this._fanDegree = value;
      }

      /**
       * Returns the font scaling.
       *
       * @return {Number}
       */
      get fontScale()
      {
          return this._fontScale;
      }

      /**
       * Sets the font scaling.
       *
       * @param {Number} value The font scaling
       */
      set fontScale(value)
      {
          this._fontScale = value;
      }

      /**
       * Returns whether to show or hide empty chart segments.
       *
       * @return {Boolean}
       */
      get hideEmptySegments()
      {
          return this._hideEmptySegments;
      }

      /**
       * Sets whether to show or hide empty chart segments.
       *
       * @param {Boolean} value Either true or false
       */
      set hideEmptySegments(value)
      {
          this._hideEmptySegments = value;
      }

      /**
       * Returns whether to show or hide a color gradient above each arc or display male/female colors instead.
       *
       * @return {Boolean}
       */
      get showColorGradients()
      {
          return this._showColorGradients;
      }

      /**
       * Sets whether to show or hide a color gradient above each arc or display male/female colors instead.
       *
       * @param {Boolean} value Either true or false
       */
      set showColorGradients(value)
      {
          this._showColorGradients = value;
      }

      /**
       * Returns whether to show or hide the parent marriage dates.
       *
       * @return {Boolean}
       */
      get showParentMarriageDates()
      {
          return this._showParentMarriageDates;
      }

      /**
       * Sets whether to show or hide the parent marriage dates.
       *
       * @param {Boolean} value Either true or false
       */
      set showParentMarriageDates(value)
      {
          this._showParentMarriageDates = value;
      }

      /**
       * Returns the number of inner arcs to display.
       *
       * @return {Number}
       */
      get numberOfInnerCircles()
      {
          return this._numberOfInnerCircles;
      }

      /**
       * Sets the number of inner arcs to display.
       *
       * @param {Number} value The number of inner arcs
       */
      set numberOfInnerCircles(value)
      {
          this._numberOfInnerCircles = value;
      }

      /**
       * Returns the font size in pixel.
       *
       * @return {Number}
       */
      get fontSize()
      {
          return this._fontSize;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  const SEX_MALE   = "M";
  const SEX_FEMALE = "F";

  /**
   * This class handles the hierarchical data.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
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
      }

      /**
       * Initialize the hierarchical chart data.
       *
       * @param {Object} data The JSON encoded chart data
       */
      init(data)
      {
          // Get the greatest depth
          // const getDepth       = ({children}) => 1 + (children ? Math.max(...children.map(getDepth)) : 0);
          // const maxGenerations = getDepth(data);

          // Construct root node from the hierarchical data
          let root = hierarchy(
              data,
              data => {
                  // Fill up the missing children to the requested number of generations
                  // if (!data.children && (data.generation < maxGenerations)) {
                  if (!data.children && (data.generation < this._configuration.generations)) {
                      data.children = [
                          this.createEmptyNode(data.generation + 1, SEX_MALE),
                          this.createEmptyNode(data.generation + 1, SEX_FEMALE)
                      ];
                  }

                  // Add missing parent record if we got only one
                  if (data.children && (data.children.length < 2)) {
                      if (data.children[0].sex === SEX_MALE) {
                          data.children.push(
                              this.createEmptyNode(data.generation + 1, SEX_FEMALE)
                          );
                      } else {
                          data.children.unshift(
                              this.createEmptyNode(data.generation + 1, SEX_MALE)
                          );
                      }
                  }

                  return data.children;
              })
              // Calculate number of leaves
              .count();

          // Create partition layout
          let partitionLayout = partition();

          // Map the node data to the partition layout
          this._nodes = partitionLayout(root).descendants();

          // Create unique ids for each element
          this._nodes.forEach(entry => {
              entry.data.id = this._configuration.id();
          });

          this._configuration.id(true);
      }

      /**
       * Returns the nodes.
       *
       * @return {Array}
       */
      get nodes()
      {
          return this._nodes;
      }

      /**
       * Create an empty child node object.
       *
       * @param {Number} generation Generation of the node
       * @param {String} sex        The sex of the individual
       *
       * @return {Object}
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
   * This class handles the tooltip overlay.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Overlay
  {
      /**
       * Constructor.
       *
       * @param {selection} parent The selected D3 parent element container
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
       * @return {selection}
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
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Defs
  {
      /**
       * Constructor.
       *
       * @param {selection} svg The selected D3 parent element container
       */
      constructor(svg)
      {
          // Create the <svg:defs> element
          this._element = svg.append("defs");
      }

      /**
       * Returns the internal element.
       *
       * @return {selection}
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
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 5.0;

  /**
   * This class handles the zoom.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Zoom
  {
      /**
       * Constructor.
       *
       * @param {selection} parent The selected D3 parent element container
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
       * @return {zoom}
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
   * Filter definition class
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Filter
  {
      /**
       * Constructor.
       *
       * @param {selection} defs The selected D3 parent element container
       */
      constructor(defs)
      {
          // Create the <svg:defs> element
          this._element = defs;

          // Filter is set in CSS via "filter: url(#drop-shadow);"

          // Chrome still does not support filtering SVG elements using CSS other than the root
          // https://bugs.chromium.org/p/chromium/issues/detail?id=109224
          let filter = this._element
              .append("filter")
              .attr("id", "drop-shadow");

          filter.append("feDropShadow")
              .attr("stdDeviation", "7 7")
              .attr("dx", "0")
              .attr("dy", "0")
              .attr("flood-opacity", "0.3")
              .attr("flood-color", "rgb(0,0,0)");
      }

      /**
       * Returns the internal element.
       *
       * @return {selection}
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
   * Base export class.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
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
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
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
          // Paper sizes (width, height) in pixel at 300 DPI/PPI
          const paperSize = {
              'A3': [4960, 3508],
              'A4': [3508, 2480],
              'A5': [2480, 1748]
          };

          this.cloneSvg(svg.get().node())
              .then(newSvg => {
                  this.copyStylesInline(svg.get().node(), newSvg);

                  const viewBox = this.calculateViewBox(svg.get().node());
                  const width   = Math.max(paperSize['A4'][0], viewBox[2]);
                  const height  = Math.max(paperSize['A4'][1], viewBox[3]);

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
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
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
                      data = data.replace(/#webtrees-fan-chart-container /g, "");

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
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
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
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Svg
  {
      /**
       * Constructor.
       *
       * @param {selection}     parent        The selected D3 parent element container
       * @param {Configuration} configuration The application configuration
       */
      constructor(parent, configuration)
      {
          // Create the <svg> element
          this._element       = parent.append("svg");
          this._defs          = new Defs(this._element);

          this._visual        = null;
          this._zoom          = null;
          this._div           = null;
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

          new Filter(this._defs.get());
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

          /** @var {selection} tooltip */
          const tooltip = select("div.tooltip");

          if (tooltip.empty()) {
              this._div = select("body")
                  .append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);
          } else {
              this._div = tooltip
                  .style("opacity", 0);
          }

          // Add group
          this._visual = this._element.append("g");

          this._visual
              .append("g")
              .attr("class", "personGroup");

          this._zoom = new Zoom(this._visual);
          this._element.call(this._zoom.get());
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
       * @return {PngExport|SvgExport}
       */
      export(type )
      {
          const factory = new ExportFactory();
          return factory.createExport(type);
      }

      /**
       * Returns the SVG definition instance.
       *
       * @return {Defs}
       */
      get defs()
      {
          return this._defs;
      }

      /**
       * Returns the SVG definition instance.
       *
       * @return {Zoom}
       */
      get zoom()
      {
          return this._zoom;
      }

      /**
       *
       *
       * @return {selection}
       */
      get visual()
      {
          return this._visual;
      }

      /**
       * Returns the internal element.
       *
       * @return {selection}
       */
      get()
      {
          return this._element;
      }

      /**
       * Returns the <div> container for the overlay tooltip.
       *
       * @return {selection}
       */
      get div()
      {
          return this._div;
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  const MATH_DEG2RAD = Math.PI / 180;
  const MATH_RAD2DEG = 180 / Math.PI;

  const MATH_PI2 = Math.PI * 2;

  /**
   * This class handles the geometric methods.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Geometry
  {
      /**
       * Constructor.
       *
       * @param {Configuration} configuration The application configuration
       */
      constructor(configuration)
      {
          this._configuration = configuration;
      }

      /**
       * @return {Number}
       *
       * @private
       */
      get startPi()
      {
          if (this._configuration.fanDegree === 90) {
              return 0;
          }

          return -(this._configuration.fanDegree / 2 * MATH_DEG2RAD);
      }

      /**
       * @return {Number}
       *
       * @private
       */
      get endPi()
      {
          if (this._configuration.fanDegree === 90) {
              return (this._configuration.fanDegree * MATH_DEG2RAD);
          }

          return (this._configuration.fanDegree / 2 * MATH_DEG2RAD);
      }

      /**
       * Scale the angles linear across the circle.
       *
       * @return {Number}
       */
      get scale()
      {
          return linear().range([this.startPi, this.endPi]);
      }

      /**
       * Get the inner radius depending on the depth of an element.
       *
       * @param {Number} depth The depth of the element inside the chart
       *
       * @return {Number}
       */
      innerRadius(depth)
      {
          if (depth === 0) {
              return 0;
          }

          if (depth <= this._configuration.numberOfInnerCircles) {
              return ((depth - 1) * (this._configuration.innerArcHeight))
                  + this._configuration.centerCircleRadius
                  + this._configuration.circlePadding;
          }

          return (this._configuration.numberOfInnerCircles * this._configuration.innerArcHeight)
              + ((depth - this._configuration.numberOfInnerCircles - 1) * this._configuration.outerArcHeight)
              + this._configuration.centerCircleRadius
              + this._configuration.circlePadding;
      }

      /**
       * Get the outer radius depending on the depth of an element.
       *
       * @param {Number} depth The depth of the element inside the chart
       *
       * @return {Number}
       */
      outerRadius(depth)
      {
          if (depth === 0) {
              return this._configuration.centerCircleRadius;
          }

          if (depth <= this._configuration.numberOfInnerCircles) {
              return ((depth - 1) * (this._configuration.innerArcHeight))
                  + this._configuration.centerCircleRadius
                  + this._configuration.innerArcHeight;
          }

          return (this._configuration.numberOfInnerCircles * this._configuration.innerArcHeight)
              + ((depth - this._configuration.numberOfInnerCircles - 1) * this._configuration.outerArcHeight)
              + this._configuration.centerCircleRadius
              + this._configuration.outerArcHeight;
      }

      /**
       * Get the center radius.
       *
       * @param {Number} depth The depth of the element inside the chart
       *
       * @return {Number}
       */
      centerRadius(depth)
      {
          return (this.innerRadius(depth) + this.outerRadius(depth)) / 2;
      }

      /**
       * Get an radius relative to the outer radius adjusted by the given
       * position in percent.
       *
       * @param {Number} depth    The depth of the element inside the chart
       * @param {Number} position Percent offset (0 = inner radius, 100 = outer radius)
       *
       * @return {Number}
       */
      relativeRadius(depth, position)
      {
          const outer = this.outerRadius(depth);
          return outer - ((100 - position) * (outer - this.innerRadius(depth)) / 100);
      }

      /**
       * Calculates the angle in radians.
       *
       * @param {Number} value The starting point of the rectangle
       *
       * @return {Number}
       *
       * @private
       */
      calcAngle(value)
      {
          return Math.max(this.startPi, Math.min(this.endPi, this.scale(value)));
      }

      /**
       * Gets the start angle in radians.
       *
       * @param {Number} depth The depth of the element inside the chart
       * @param {Number} x0    The left edge (x0) of the rectangle
       *
       * @return {Number}
       */
      startAngle(depth, x0)
      {
          // Starting from the left edge (x0) of the rectangle
          return (depth === 0) ? 0 : this.calcAngle(x0);
      }

      /**
       * Gets the end angle in radians.
       *
       * @param {Number} depth The depth of the element inside the chart
       * @param {Number} x1    The right edge (x1) of the rectangle
       *
       * @return {Number}
       */
      endAngle(depth, x1)
      {
          // Starting from the right edge (x1) of the rectangle
          return (depth === 0) ? MATH_PI2 : this.calcAngle(x1);
      }

      /**
       * Get an radius relative to the outer radius adjusted by the given
       * position in percent.
       *
       * @param {Object} data     The D3 data object
       * @param {Number} position The percent offset (0 = inner radius, 100 = outer radius)
       *
       * @return {Number}
       */
      arcLength(data, position)
      {
          return (this.endAngle(data.depth, data.x1) - this.startAngle(data.depth, data.x0))
              * this.relativeRadius(data.depth, position);
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * The class handles all the text and path elements.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Text
  {
      /**
       * Constructor.
       *
       * @param {Svg}           svg
       * @param {Configuration} configuration The application configuration
       */
      constructor(svg, configuration)
      {
          this._svg           = svg;
          this._configuration = configuration;
          this._geometry      = new Geometry(this._configuration);
      }

      /**
       * Creates all the labels and all dependent elements for a single person.
       *
       * @param {selection} parent The parent element to which the elements are to be attached
       * @param {Object}    data   The D3 data object
       */
      createLabels(parent, data)
      {
          // Inner labels
          if (this.isInnerLabel(data)) {
              let text     = this.createTextElement(parent, data);
              let parentId = select(parent.node().parentNode).attr("id");

              // First names
              let pathId1   = this.createPathDefinition(parentId, 0, data);
              let textPath1 = this.createTextPath(text, pathId1);
              this.addFirstNames(textPath1, data);
              this.truncateNames(textPath1, data, 0);

              // Last names
              let pathId2   = this.createPathDefinition(parentId, 1, data);
              let textPath2 = this.createTextPath(text, pathId2);
              this.addLastNames(textPath2, data);
              this.truncateNames(textPath2, data, 1);

              // Alternative names
              if (data.data.alternativeNames.length > 0) {
                  let pathId3   = this.createPathDefinition(parentId, 2, data);
                  let textPath3 = this.createTextPath(text, pathId3)
                      .attr("class", "alternativeName")
                      .classed("rtl", data.data.isAltRtl);

                  this.addAlternativeNames(textPath3, data);
                  this.truncateNames(textPath3, data, 2);
              }

              // Birth and death date
              let pathId4   = this.createPathDefinition(parentId, 3, data);
              let textPath4 = this.createTextPath(text, pathId4)
                  .attr("class", "date");

              this.addTimeSpan(textPath4, data);

          // Outer labels
          } else {
              // The outer most circles show the complete name and do
              // not distinguish between first name, last name and dates
              if (data.depth >= 7) {
                  let text1 = this.createTextElement(parent, data)
                      .attr("dy", "2px");

                  this.addFirstNames(text1, data);
                  this.addLastNames(text1, data, 0.25);
                  this.truncateNames(text1, data, 0);
              }

              if (data.depth < 7) {
                  // First names
                  let text2 = this.createTextElement(parent, data)
                      .attr("dy", "2px");

                  this.addFirstNames(text2, data);
                  this.truncateNames(text2, data, 0);

                  // Last names
                  let text3 = this.createTextElement(parent, data)
                      .attr("dy", "2px");

                  this.addLastNames(text3, data);
                  this.truncateNames(text3, data, 1);

                  // Birth and death date
                  if (data.depth < 6) {
                      // Birth and death date
                      let text4 = this.createTextElement(parent, data)
                          .attr("class", "date")
                          .attr("dy", "2px");

                      this.addTimeSpan(text4, data);
                  }
              }

              // Rotate outer labels in right position
              this.transformOuterText(parent, data);
          }

          // Marriage date
          if (this._configuration.showParentMarriageDates && data.children && (data.depth < 5)) {
              let text5     = this.createTextElement(parent, data);
              let parentId5 = select(parent.node().parentNode).attr("id");
              let pathId5   = this.createPathDefinition(parentId5, 4, data);
              let textPath5 = this.createTextPath(text5, pathId5)
                  .attr("class", "marriage-date");

              this.addMarriageDate(textPath5, data);
          }
      }

      /**
       * Creates a single <tspan> element for each single given name and append it to the
       * parent element. The "tspan" element containing the preferred name gets an
       * additional underline style in order to highlight this one.
       *
       * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
       * @param {Object}    data   The D3 data object containing the individual data
       */
      addFirstNames(parent, data)
      {
          let i = 0;

          for (let firstName of data.data.firstNames) {
              // Create a <tspan> element for each given name
              let tspan = parent.append("tspan")
                  .text(firstName);

              // The preferred name
              if (firstName === data.data.preferredName) {
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
       * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
       * @param {Object}    data   The D3 data object containing the individual data
       * @param {Number}    dx     Additional space offset to add between names
       */
      addLastNames(parent, data, dx = 0)
      {
          let i = 0;

          for (let lastName of data.data.lastNames) {
              // Create a <tspan> element for each last name
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
       * Creates a single <tspan> element for each alternative name and append it to the parent element.
       *
       * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
       * @param {Object}    data   The D3 data object containing the individual data
       * @param {Number}    dx     Delta X offset used to create a small spacing between multiple words
       */
      addAlternativeNames(parent, data, dx = 0)
      {
          let i = 0;

          for (let alternativeName of data.data.alternativeNames) {
              // Create a <tspan> element for each alternative name
              let tspan = parent.append("tspan")
                  .text(alternativeName);

              // Add some spacing between the elements
              if (i !== 0) {
                  tspan.attr("dx", (data.data.isAltRtl ? -0.25 : 0.25) + "em");
              }

              ++i;
          }
      }

      /**
       * Creates a single <tspan> element for the time span append it to the parent element.
       *
       * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
       * @param {Object}    data   The D3 data object containing the individual data
       */
      addTimeSpan(parent, data)
      {
          // Create a <tspan> element for the time span
          parent.append("tspan")
              .text(data.data.timespan);
      }

      /**
       * Creates a single <tspan> element for the marriage date and append it to the parent element.
       *
       * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
       * @param {Object}    data   The D3 data object containing the individual data
       */
      addMarriageDate(parent, data)
      {
          // Create a <tspan> element for the parent marriage date
          if (data.data.parentMarriage) {
              parent.append("tspan")
                  .text("\u26AD " + data.data.parentMarriage);
          }
      }

      /**
       * Loops over the <tspan> elements and truncates the contained texts.
       *
       * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are attached
       * @param {Object}    data   The D3 data object containing the individual data
       * @param {Number}    index  The index position of the element in parent container.
       * @param {Boolean}   hide   Whether to show or hide the label if the text takes to much space to be displayed
       */
      truncateNames(parent, data, index, hide = false)
      {
          let availableWidth = this.getAvailableWidth(data, index);

          // Select all not preferred names and not last names
          let names = parent.selectAll("tspan:not(.preferred):not(.lastName)");

          if (names.size()) {
              // Start truncating from last element to the first one
              names.nodes()
                  .reverse()
                  .forEach(element => {
                      select(element)
                          .each(this.truncateText(parent, availableWidth, hide));
                  });
          }

          // Afterwards the preferred ones if text takes still to much space
          parent.selectAll("tspan.preferred")
              .each(this.truncateText(parent, availableWidth, hide));

          // Truncate last names as last ones
          parent.selectAll("tspan.lastName")
              .each(this.truncateText(parent, availableWidth, hide));
      }

      /**
       * Returns a float representing the computed length of all <tspan> elements within the element.
       *
       * @param {selection} parent The parent (<text> or <textPath>) element containing the <tspan> child elements
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
       * Truncates the textual content of the actual element.
       *
       * @param {selection} parent         The parent (<text> or <textPath>) element containing the <tspan> child elements
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

          // Truncate text letter by letter

          // while ((textLength > availableWidth) && (text.length > 1)) {
          //     // Remove last char
          //     text = text.slice(0, -1);
          //
          //     if (text.length > 1) {
          //         self.text(text + "...");
          //     } else {
          //         self.text(text + ".");
          //     }
          //
          //     // Recalculate the text width
          //     textLength = this.getTextLength(parent);
          // }
      }

      /**
       * Returns TRUE if the depth of the element is in the inner range. So labels should
       * be rendered along an arc path. Otherwise returns FALSE to indicate the element
       * is either the center one or an outer arc.
       *
       * @param {Object} data The D3 data object
       *
       * @return {Boolean}
       */
      isInnerLabel(data)
      {
          // Note: The center element does not belong to the inner labels!
          return ((data.depth > 0) && (data.depth <= this._configuration.numberOfInnerCircles));
      }

      /**
       * Creates a <text> element and append it to the parent element.
       *
       * @param {selection} parent The parent element to which the <text> element is to be attached
       * @param {Object}    data   The D3 data object
       *
       * @return {selection} Newly created <text> element
       */
      createTextElement(parent, data)
      {
          return parent.append("text");
      }

      /**
       * Creates a <textPath> element and append it to the parent element.
       *
       * @param {selection} parent The parent element to which the <textPath> element is to be attached
       * @param {String}    refId  The id of the reference element
       *
       * @return {selection} Newly created <textPath> element
       */
      createTextPath(parent, refId)
      {
          return parent
              .append("textPath")
              .attr("xlink:href", "#" + refId)
              .attr("startOffset", "25%");
      }

      /**
       * Creates a new <path> definition and append it to the global definition list.
       *
       * @param {String} parentId The parent element id
       * @param {Number} index    Index position of element in parent container. Required to create a unique path id.
       * @param {Object} data     The D3 data object
       *
       * @return {String} The id of the newly created path element
       */
      createPathDefinition(parentId, index, data)
      {
          let pathId = "path-" + parentId + "-" + index;

          // If definition already exists return the existing path id
          if (this._svg.defs.get().select("path#" + pathId).node()) {
              return pathId;
          }

          let positionFlipped = this.isPositionFlipped(data.depth, data.x0, data.x1);
          let startAngle      = this._geometry.startAngle(data.depth, data.x0);
          let endAngle        = this._geometry.endAngle(data.depth, data.x1);
          let relativeRadius  = this._geometry.relativeRadius(data.depth, this.getTextOffset(positionFlipped, index));

          // Special treatment for center marriage date position
          if (this._configuration.showParentMarriageDates && (index === 4) && (data.depth < 1)) {
              startAngle = this._geometry.calcAngle(data.x0);
              endAngle   = this._geometry.calcAngle(data.x1);
          }

          // Create an arc generator for path segments
          let arcGenerator = arc()
              .startAngle(positionFlipped ? endAngle : startAngle)
              .endAngle(positionFlipped ? startAngle : endAngle)
              .innerRadius(relativeRadius)
              .outerRadius(relativeRadius);

          arcGenerator
              .padAngle(this._configuration.padAngle)
              .padRadius(this._configuration.padRadius)
              .cornerRadius(this._configuration.cornerRadius);

          // Store the <path> inside the definition list so we could
          // access it later on by its id
          this._svg.defs.get()
              .append("path")
              .attr("id", pathId)
              .attr("d", arcGenerator);

          return pathId;
      }

      /**
       * Check for the 360 degree chart if the current arc labels should be flipped for easier reading.
       *
       * @param {Number} depth The depth of the element inside the chart
       * @param {Number} x0    The left edge (x0) of the rectangle
       * @param {Number} x1    The right edge (x1) of the rectangle
       *
       * @return {Boolean}
       */
      isPositionFlipped(depth, x0, x1)
      {
          if ((this._configuration.fanDegree !== 360) || (depth <= 1)) {
              return false;
          }

          const startAngle = this._geometry.startAngle(depth, x0);
          const endAngle   = this._geometry.endAngle(depth, x1);

          // Flip names for better readability depending on position in chart
          return ((startAngle >= (90 * MATH_DEG2RAD)) && (endAngle <= (180 * MATH_DEG2RAD)))
              || ((startAngle >= (-180 * MATH_DEG2RAD)) && (endAngle <= (-90 * MATH_DEG2RAD)));
      }

      /**
       * Get the relative position offsets in percent for different text lines (firstName, lastName, dates).
       *   => (0 = inner radius, 100 = outer radius)
       *
       * @param {Boolean} positionFlipped TRUE if the labels should be flipped for easier reading
       * @param {Number}  index           The index position of element in parent container. Required to create a unique path id.
       *
       * @return {Number}
       */
      getTextOffset(positionFlipped, index)
      {
          // First names, Last name, Alternate name, Date, Parent marriage date
          return positionFlipped
              ? [23, 42, 61, 84, 125][index]
              : [73, 54, 35, 12, 120][index];
      }

      /**
       * Calculate the available text width. Depending on the depth of an entry in
       * the chart the available width differs.
       *
       * @param {Object} data  The D3 data object
       * @param {Number} index The index position of element in parent container.
       *
       * @returns {Number} Calculated available width
       *
       * @private
       */
      getAvailableWidth(data, index)
      {
          // Outer arcs
          if (data.depth > this._configuration.numberOfInnerCircles) {
              return this._configuration.outerArcHeight
                  - (this._configuration.textPadding * 2)
                  - this._configuration.circlePadding;
          }

          // Innermost circle (Reducing the width slightly, avoiding the text is sticking too close to the edge)
          let availableWidth = (this._configuration.centerCircleRadius * 2) - (this._configuration.centerCircleRadius * 0.15);

          if (data.depth >= 1) {
              let positionFlipped = this.isPositionFlipped(data.depth, data.x0, data.x1);

              // Calculate length of the arc
              availableWidth = this._geometry.arcLength(data, this.getTextOffset(positionFlipped, index));
          }

          return availableWidth - (this._configuration.textPadding * 2)
              - (this._configuration.padDistance / 2);
      }

      /**
       * Transform the D3 <text> elements in the group. Rotate each <text> element depending on its offset,
       * so that they are equally positioned inside the arc.
       *
       * @param {selection} parent The D3 parent group object
       * @param {Object}    data   The The D3 data object
       *
       * @public
       */
      transformOuterText(parent, data)
      {
          let that          = this;
          let textElements  = parent.selectAll("text");
          let countElements = textElements.size();
          let offset        = 1.0;

          // Special offsets for shifting the text around depending on the depth
          switch (data.depth) {
              case 0: offset = 1.5; break;
              case 1: offset = 6.5; break;
              case 2: offset = 3.5; break;
              case 3: offset = 2.2; break;
              case 4: offset = 1.9; break;
              case 5: offset = 1.5; break;
              case 6: offset = 0.5; break;
          }

          let mapIndexToOffset = linear()
              .domain([0, countElements - 1])
              .range([-offset, offset]);

          textElements.each(function (ignore, i) {
              const offsetRotate = mapIndexToOffset(i) * that._configuration.fontScale / 100.0;

              // Name of center person should not be rotated in any way
              if (data.depth === 0) {
                  // TODO Depends on font-size
                  select(this).attr("dy", (offsetRotate * 14) + (14 / 2) + "px");
              } else {
                  select(this).attr("transform", function () {
                      let dx        = data.x1 - data.x0;
                      let angle     = that._geometry.scale(data.x0 + (dx / 2)) * MATH_RAD2DEG;
                      let rotate    = angle - (offsetRotate * (angle > 0 ? -1 : 1));
                      let translate = (that._geometry.centerRadius(data.depth) - (that._configuration.colorArcWidth / 2.0));

                      if (angle > 0) {
                          rotate -= 90;
                      } else {
                          translate = -translate;
                          rotate += 90;
                      }

                      return "rotate(" + rotate + ") translate(" + translate + ")";
                  });
              }
          });
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the creation of the person elements of the chart.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Person
  {
      /**
       * Constructor.
       *
       * @param {Svg}           svg
       * @param {Configuration} configuration The application configuration
       * @param {selection}     person
       * @param {Object}        data
       */
      constructor(svg, configuration, person, data)
      {
          this._svg           = svg;
          this._configuration = configuration;
          this._geometry      = new Geometry(this._configuration);

          this.init(person, data);
      }

      /**
       * Initialize the required elements.
       *
       * @param {selection} person
       * @param {Object}    data
       */
      init(person, data)
      {
          if (person.classed("new") && this._configuration.hideEmptySegments) {
              this.addArcToPerson(person, data);
          } else {
              if (!person.classed("new")
                  && !person.classed("update")
                  && !person.classed("remove")
                  && ((data.data.xref !== "") || !this._configuration.hideEmptySegments)
              ) {
                  this.addArcToPerson(person, data);
              }
          }

          if (data.data.xref !== "") {
              this.addTitleToPerson(person, data.data.name);

              // Append labels (initial hidden)
              let text  = new Text(this._svg, this._configuration);
              let label = this.addLabelToPerson(person, data);

              text.createLabels(label, data);
              this.addColorGroup(person, data);

              // Hovering
              person
                  .on("contextmenu", (event, datum) => {
                      if (this._svg.div.property("active")) {
                          this._svg.div
                              .transition()
                              .duration(200)
                              .style("opacity", 0);

                          this._svg.div.property("active", false);
                          event.preventDefault();
                      } else {
                          this._svg.div.property("active", true);
                          this.setTooltipHtml(datum);

                          event.preventDefault();
                      }
                  })
                  // Handles the event when a pointing device initially enters an element.
                  .on("mouseenter", (event, datum) => {
                      if (datum.data.xref === "") {
                          this._svg.div
                              .style("opacity", 0);
                      }

                      this.setTooltipHtml(datum);
                  })
                  // Handles the event when a pointing device leaves an element.
                  .on("mouseleave", (event, datum) => {
                      if (datum.data.xref === "") {
                          this._svg.div
                              .style("opacity", 0);
                      }
                  })
                  // Handles the event when a pointing device is moved around an element.
                  .on("mousemove", (event, datum) => {
                      this._svg.div
                          .style("left", (event.pageX) + "px")
                          .style("top", (event.pageY - 30) + "px");
                  })
                  // Handles the event when a pointing device is moved onto an element.
                  .on("mouseover", function (event, datum) {
                      const elements = person.nodes();
                      const index    = elements.indexOf(this);

                      // Use raise() to move element to the top, as in SVG the last element is always the
                      // one drawn on top of the others.
                      select(elements[index])
                          .classed("hover", true)
                          .raise();
                  })
                  // Handles the event when a pointing device is moved off an element.
                  .on("mouseout", function (event, datum) {
                      const elements = person.nodes();
                      const index    = elements.indexOf(this);

                      select(elements[index])
                          .classed("hover", false);
                  });
          }
      }

      /**
       *
       * @param {Object} datum The D3 data object
       */
      setTooltipHtml(datum)
      {
          // Ignore empty elements
          if (datum.data.xref === "") {
              return;
          }

          const image = (datum.data.thumbnail
              ? "<img src=\"" + datum.data.thumbnail + "\" alt=\"\" />"
              : "<i class=\"icon-silhouette-" + datum.data.sex + "\" ></i>");

          const dates = datum.data.birth || datum.data.marriage || datum.data.death;

          this._svg.div
              .html(
                  "<div class=\"image\">" + image + "</div>"
                  + "<div class=\"name\">" + datum.data.name + "</div>"
                  + (dates
                      ? "<table>"
                          + (datum.data.birth
                          ? ("<tr class=\"date\"><th>\u2605</th><td>" + datum.data.birth + "</td></tr>")
                          : "")
                          + (datum.data.marriage
                          ? ("<tr class=\"date\"><th>\u26AD</th><td>" + datum.data.marriage + "</td></tr>")
                          : "")
                          + (datum.data.death
                          ? ("<tr class=\"date\"><th>\u2020</th><td>" + datum.data.death + "</td></tr>")
                          : "")
                      + "</table>"
                      : "")
              )
              .style("left", (event.pageX) + "px")
              .style("top", (event.pageY - 30) + "px");

          if (this._svg.div.property("active")) {
              this._svg.div
                  .transition()
                  .duration(200)
                  .style("opacity", 1);
          }
      }

      /**
       * Adds an color overlay for each arc.
       *
       * @param {selection} person
       * @param {Object}    data   The D3 data object
       */
      addColorGroup(person, data)
      {
          // Arc generator
          let arcGenerator = arc()
              .startAngle(this._geometry.startAngle(data.depth, data.x0))
              .endAngle(this._geometry.endAngle(data.depth, data.x1))
              .innerRadius(this._geometry.outerRadius(data.depth) - this._configuration.colorArcWidth)
              .outerRadius(this._geometry.outerRadius(data.depth) + 1);
          // .innerRadius((data) => this._geometry.outerRadius(data.depth) - this._configuration.colorArcWidth - 2)
          // .outerRadius((data) => this._geometry.outerRadius(data.depth) - 1);

          arcGenerator.padAngle(this._configuration.padAngle)
              .padRadius(this._configuration.padRadius)
          //     .cornerRadius(this._configuration.cornerRadius - 2)
              ;

          let color = person
              .append("g")
              .attr("class", "color");

          color.append("path")
              .attr("fill", () => {
                  if (this._configuration.showColorGradients) {
                      // Innermost circle (first generation)
                      if (!data.depth) {
                          return "rgb(225, 225, 225)";
                      }

                      return "url(#grad-" + data.data.id + ")";
                  }

                  return data.data.color;
              })
              .attr("d", arcGenerator);
      }

      /**
       * Appends the arc element to the person element.
       *
       * @param {selection} person The parent element used to append the arc too
       * @param {Object}    data   The D3 data object
       *
       * @private
       */
      addArcToPerson(person, data)
      {
          // Create arc generator
          let arcGenerator = arc()
              .startAngle(this._geometry.startAngle(data.depth, data.x0))
              .endAngle(this._geometry.endAngle(data.depth, data.x1))
              .innerRadius(this._geometry.innerRadius(data.depth))
              .outerRadius(this._geometry.outerRadius(data.depth));

          arcGenerator.padAngle(this._configuration.padAngle)
              .padRadius(this._configuration.padRadius)
              .cornerRadius(this._configuration.cornerRadius);

          // Append arc
          let arcGroup = person
              .append("g")
              .attr("class", "arc");

          let path = arcGroup
              .append("path")
              .attr("d", arcGenerator);

          // Hide arc initially if its new during chart update
          if (person.classed("new")) {
              path.style("opacity", 1e-6);
          }
      }

      /**
       * Add title element to the person element containing the full name of the individual.
       *
       * @param {selection} person The parent element used to append the title too
       * @param {String}    value  The value to assign to the title
       *
       * @private
       */
      addTitleToPerson(person, value)
      {
          person
              .insert("title", ":first-child")
              .text(value);
      }

      /**
       * Append labels (initial hidden).
       *
       * @param {selection} parent The parent element used to append the label element too
       * @param {Object}    data   The D3 data object
       *
       * @return {selection} Newly added label element
       *
       * @private
       */
      addLabelToPerson(parent, data)
      {
          return parent
              .append("g")
              .attr("class", "name")
              .style("font-size", this.getFontSize(data) + "px")
              .style("fill", this._configuration.fontColor);
      }

      /**
       * Get the scaled font size.
       *
       * @param {Object} data The The D3 data object
       *
       * @return {Number}
       */
      getFontSize(data)
      {
          let fontSize = this._configuration.fontSize;

          if (data.depth >= (this._configuration.numberOfInnerCircles + 1)) {
              fontSize += 1;
          }

          return ((fontSize - data.depth) * this._configuration.fontScale / 100.0);
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the gradient coloring.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Gradient
  {
      /**
       * Constructor.
       *
       * @param {Svg}           svg
       * @param {Configuration} configuration The application configuration
       */
      constructor(svg, configuration)
      {
          this._svg           = svg;
          this._configuration = configuration;
          this._geometry      = new Geometry(this._configuration);
      }

      /**
       * Initializes the gradient fill.
       *
       * @param {Object} data D3 data object
       *
       * @return {void}
       */
      init(data)
      {
          if (data.depth < 1) {
              return;
          }

          if (data.depth === 1) {
              // Define initial gradient colors starting with second generation
              let color1 = [64, 143, 222];
              let color2 = [161, 219, 117];

              if (data.data.sex === SEX_FEMALE) {
                  color1 = [218, 102, 13];
                  color2 = [235, 201, 33];
              }

              data.data.colors = [color1, color2];
          } else {
              // Calculate subsequent gradient colors
              let c = [
                  Math.ceil((data.parent.data.colors[0][0] + data.parent.data.colors[1][0]) / 2.0),
                  Math.ceil((data.parent.data.colors[0][1] + data.parent.data.colors[1][1]) / 2.0),
                  Math.ceil((data.parent.data.colors[0][2] + data.parent.data.colors[1][2]) / 2.0),
              ];

              if (data.data.sex === SEX_MALE) {
                  data.data.colors[0] = data.parent.data.colors[0];
                  data.data.colors[1] = c;
              }

              if (data.data.sex === SEX_FEMALE) {
                  data.data.colors[0] = c;
                  data.data.colors[1] = data.parent.data.colors[1];
              }
          }

          // Add a new radial gradient
          let newGrad = this._svg.defs.get()
              .append("svg:linearGradient")
              .attr("id", "grad-" + data.data.id);

          // Define start and stop colors of gradient
          newGrad.append("svg:stop")
              .attr("offset", "0%")
              .attr("stop-color", "rgb(" + data.data.colors[0].join(",") + ")");

          newGrad.append("svg:stop")
              .attr("offset", "100%")
              .attr("stop-color", "rgb(" + data.data.colors[1].join(",") + ")");
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the visual update of all text and path elements.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Update
  {
      /**
       * Constructor.
       *
       * @param {Svg}           svg
       * @param {Configuration} configuration The application configuration
       * @param {Hierarchy}     hierarchy
       */
      constructor(svg, configuration, hierarchy)
      {
          this._svg           = svg;
          this._configuration = configuration;
          this._hierarchy     = hierarchy;
      }

      /**
       * Update the chart with data loaded from AJAX.
       *
       * @param {String}   url      The update URL
       * @param {Function} callback The callback method to execute after the update
       *
       * @public
       */
      update(url, callback)
      {
          let that = this;

          this._svg.get()
              .selectAll("g.person")
              .classed("hover", false)
              .on("click", null)
              .on("mouseover", null)
              .on("mouseout", null);

          json(
              url
          ).then((data) => {
              // Initialize the new loaded data
              this._hierarchy.init(data);

              // Flag all elements which are subject to change
              this._svg.get()
                  .selectAll("g.person")
                  .data(this._hierarchy.nodes, (d) => d.data.id)
                  .each(function (d) {
                      let empty  = d.data.xref === "";
                      let person = select(this);

                      person.classed("remove", empty)
                          .classed("update", !empty && person.classed("available"))
                          .classed("new", !empty && !person.classed("available"));

                      if (!person.classed("new")) {
                          person.selectAll("g.name, g.color, title")
                              .classed("old", true);
                      }

                      new Person(that._svg, that._configuration, person, d);
                  });

              // Hide all new labels of not removed elements
              this._svg.get()
                  .selectAll("g.person:not(.remove)")
                  .selectAll("g.name:not(.old), g.color:not(.old)")
                  .style("opacity", 1e-6);

              // Create transition instance
              let t = transition()
                  .duration(this._configuration.updateDuration)
                  .call(this.endAll, () => this.updateDone(callback));

              // Fade out old arc
              this._svg.get()
                  .selectAll("g.person.remove g.arc path")
                  .transition(t)
                  .style("fill", () => this._configuration.hideEmptySegments ? null : "rgb(235, 235, 235)")
                  .style("opacity", () => this._configuration.hideEmptySegments ? 1e-6 : null);

              // Fade in new arcs
              this._svg.get()
                  .selectAll("g.person.new g.arc path")
                  .transition(t)
                  .style("fill", "rgb(250, 250, 250)")
                  .style("opacity", () => this._configuration.hideEmptySegments ? 1 : null);

              // Fade out all old labels and color group
              this._svg.get()
                  .selectAll("g.person.update, g.person.remove")
                  .selectAll("g.name.old, g.color.old")
                  .transition(t)
                  .style("opacity", 1e-6);

              // Fade in all new labels and color group
              this._svg.get()
                  .selectAll("g.person:not(.remove)")
                  .selectAll("g.name:not(.old), g.color:not(.old)")
                  .transition(t)
                  .style("opacity", 1);
          });
      }

      /**
       * Function is executed as callback after all transitions are done in update method.
       *
       * @param {Function} callback The callback method to execute after the update
       *
       * @private
       */
      updateDone(callback)
      {
          // Remove arc if segments should be hidden
          if (this._configuration.hideEmptySegments) {
              this._svg.get()
                  .selectAll("g.person.remove")
                  .selectAll("g.arc")
                  .remove();
          }

          // Remove styles so CSS classes may work correct, Uses a small timer as animation seems not
          // to be done already if the point is reached
          let t = timer(() => {
              this._svg.get()
                  .selectAll("g.person g.arc path")
                  .attr("style", null);

              this._svg.get()
                  .selectAll("g.person g.name, g.person g.color")
                  .style("opacity", null);

              t.stop();
          }, 10);

          this._svg.get()
              .selectAll("g.person.new, g.person.update, g.person.remove")
              .classed("new", false)
              .classed("update", false)
              .classed("remove", false)
              .selectAll("g.name.old, g.color.old, title.old")
              .remove();

          this._svg.get()
              .selectAll("g.person.available")
              .classed("available", false);

          // Execute callback function after everything is done
          callback();
      }

      /**
       * Helper method to execute callback method after all transitions are done of a selection.
       *
       * @param {Transition} transition D3 transition object
       * @param {Function}   callback   Callback method
       *
       * @private
       */
      endAll(transition, callback)
      {
          let n = 0;

          transition
              .on("start", () => ++n)
              .on("end", () => {
                  if (!--n) {
                      callback.apply(transition);
                  }
              });
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  const MIN_HEIGHT  = 500;
  const MIN_PADDING = 10;   // Minimum padding around view box

  /**
   * This class handles the overall chart creation.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class Chart
  {
      /**
       * Constructor.
       *
       * @param {selection}     parent        The selected D3 parent element container
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
       * @return {Svg}
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

          // Set view box attribute
          this._svg.get()
              .attr("viewBox", [
                  viewBoxLeft,
                  viewBoxTop,
                  viewBoxWidth,
                  viewBoxHeight
              ]);

          // Add rectangle element
          // this._svg
          //     .insert("rect", ":first-child")
          //     .attr("class", "background")
          //     .attr("width", "100%")
          //     .attr("height", "100%")
          //     .style("fill", "none")
          //     .style("pointer-events", "all");
          //
          // // Adjust rectangle position
          // this._svg
          //     .select("rect")
          //     .attr("x", viewBoxLeft)
          //     .attr("y", viewBoxTop);
      }

      /**
       * Returns the chart data.
       *
       * @return {Object}
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

          let personGroup = this._svg.get().select("g.personGroup");
          let gradient    = new Gradient(this._svg, this._configuration);
          let that        = this;

           personGroup
              .selectAll("g.person")
              .data(this._hierarchy.nodes, (d) => d.data.id)
              .enter()
              .append("g")
              .attr("class", "person")
              .attr("id", (d) => "person-" + d.data.id);

          // Create a new selection in order to leave the previous enter() selection
          personGroup
              .selectAll("g.person")
              .each(function (d) {
                  let person = select(this);

                  if (that._configuration.showColorGradients) {
                      gradient.init(d);
                  }

                  new Person(that._svg, that._configuration, person, d);
              });

          this.bindClickEventListener();
          this.updateViewBox();
      }

      /**
       * This method bind the "click" event listeners to a "person" element.
       */
      bindClickEventListener()
      {
          let persons = this._svg.get()
              .select("g.personGroup")
              .selectAll("g.person")
              .filter((d) => d.data.xref !== "")
              .classed("available", true);

          // Trigger method on click
          persons.on("click", this.personClick.bind(this));
      }

      /**
       * Method triggers either the "update" or "individual" method on the click on an person.
       *
       * @param {Event}  event The current event
       * @param {Object} data  The D3 data object
       *
       * @private
       */
      personClick(event, data)
      {
          // Trigger either "update" or "redirectToIndividual" method on click depending on person in chart
          (data.depth === 0) ? this.redirectToIndividual(data.data.url) : this.update(data.data.updateUrl);
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
          let update = new Update(this._svg, this._configuration, this._hierarchy);

          update.update(url, () => this.bindClickEventListener());
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * This class handles the storage of form values.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
   */
  class Storage
  {
      /**
       * Constructor.
       *
       * @param {String} name The name of the storage
       */
      constructor(name)
      {
          this._name    = name;
          this._storage = JSON.parse(localStorage.getItem(this._name)) || {};
      }

      /**
       * Register a HTML element.
       *
       * @param {String} name The id or name of a HTML element
       */
      register(name)
      {
          let input       = document.getElementById(name);
          let storedValue = this.read(name);

          if (storedValue) {
              if (input.type && (input.type === "checkbox")) {
                  input.checked = storedValue;
              } else {
                  input.value = storedValue;
              }
          } else {
              this.onInput(input);
          }

          // Add event listener
          input.addEventListener("input", (event) => {
              this.onInput(event.target);
          });
      }

      /**
       * This methods stores the value of an input element depending on its type.
       *
       * @param {EventTarget|HTMLInputElement} element The HTML input element
       */
      onInput(element)
      {
          if (element.type && (element.type === "checkbox")) {
              this.write(element.name, element.checked);
          } else {
              this.write(element.name, element.value);
          }
      }

      /**
       * Returns the stored value belonging to the HTML element id.
       *
       * @param {String} name The id or name of a HTML element
       *
       * @return {String|Boolean|Number}
       */
      read(name)
      {
          return this._storage[name];
      }

      /**
       * Stores a value to the given HTML element id.
       *
       * @param {String}                name  The id or name of a HTML element
       * @param {String|Boolean|Number} value The value to store
       */
      write(name, value)
      {
          this._storage[name] = value;

          localStorage.setItem(this._name, JSON.stringify(this._storage));
      }
  }

  /**
   * See LICENSE.md file for further details.
   */

  /**
   * The application class.
   *
   * @author  Rico Sonntag <mail@ricosonntag.de>
   * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
   * @link    https://github.com/magicsunday/webtrees-fan-chart/
   */
  class FanChart
  {
      /**
       * Constructor.
       *
       * @param {String} selector The CSS selector of the HTML element used to assign the chart too
       * @param {Object} options  A list of options passed from outside to the application
       *
       * @param {String[]}  options.labels
       * @param {Number}    options.generations
       * @param {Number}    options.fanDegree
       * @param {String}    options.defaultColor
       * @param {Number}    options.fontScale
       * @param {String}    options.fontColor
       * @param {Boolean}   options.hideEmptySegments
       * @param {Boolean}   options.showColorGradients
       * @param {Boolean}   options.rtl
       * @param {Number}    options.innerArcs
       */
      constructor(selector, options)
      {
          this._selector = selector;
          this._parent   = select(this._selector);

          // Set up configuration
          this._configuration = new Configuration(
              options.labels,
              options.generations,
              options.fanDegree,
              options.defaultColor,
              options.fontScale,
              options.fontColor,
              options.hideEmptySegments,
              options.showColorGradients,
              options.showParentMarriageDates,
              options.rtl,
              options.innerArcs
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
       * @return {Configuration}
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
          const product = this._chart.svg.export('png');

          product.svgToImage(this._chart.svg, "fan-chart.png");

      }

      /**
       * Exports the chart as SVG image and triggers a download.
       *
       * @private
       */
      exportSVG()
      {
          const product = this._chart.svg.export('svg');

          product.svgToImage(this._chart.svg, this._cssFile, "fan-chart.svg");
      }
  }

  exports.FanChart = FanChart;
  exports.Storage = Storage;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
