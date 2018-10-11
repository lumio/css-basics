# CSS basics

the basics and more

---

## Linking CSS files

---

### Linking CSS files

```html
<html>
<head>
  <link rel="stylesheet" href="main.css" />
</head>
<body>
  ...
</body>
</html>
```

---

## Selectors

---

### Selector types

* Tag name selectors ... `p`, `div`, ... (`<p />`)
* Class selectors ... `.className` (`<p class="className" />`)
* ID selectors ... `#idName` (`<p id="idName" />`)
* Attribute selectors `[attribute="value"]` (`<p attribute="value" />`)
* Pseudo-class selectors ... `:first-child`, `:hover`, ...
* Pseudo-elements ... `::before`, `::after`

---

### Selector types

You can combine selectors like so

```css
a.fancy-box[href="https://example.org"] { 
  display: inline-block;
  padding: 1px 2px;
  margin: 0 -2px;
  background: pink;
}
```

This would select all anchor tags that have the class *.fancy-box* and link to
*https://example.org*. 

---

### TODO: Attribute selectors

* [attribute] … element with a certain attribute
* [attribute="value"] … element with exact attribute value
* [attribute^="value"] … starts with value
* [attribute$="value"] … ends with value
* [attribute*="value"] … contains value
* [attribute operator value i] … the i makes it case insensitive

---

### TODO Pseudo classes :*-child

* Caveats
	* `:first-child` and `:last-child` will ignore the element tag type

```
  <div>
    <span>Element 1</span> <!— this is the :first-child —>
    <p>Element 2</p> <!— p:first-child won't work here —>
  </div>
```

---

## Box model

---

### Box model

From the outside to the inside

* margin
* border
* padding
* content

So usually setting the width and height of an element only changes the width
and height of the content itself but does not take into account the outer boxes
for padding, border and margin.

---

### Box model

To get around this you *could* use the CSS function `calc` but that is a bit of
a mess anyway. So instead we can use `box-sizing` and set it to `border-box`.
As the value suggests, this will take *border* and *padding* into account,
but still leaves *margin* untouched.

---

## Positioning

---

### Positioning

You can freely position any elements. However, use this only sparingly.
Often you don't want to break elements from their natural flow.

Anyway... the available property values are as followed:

* static
* relative
* absolute
* fixed
* sticky *(no IE support, partially supported in other browsers)*

---

### Positioning

Why you usually don't want to position elements freely:

TODO

---

### Display modes

There are a ton of display modes for an element. These are as follows: 

#### `<display-outside>`

* **block**
* **inline**
* run-in

---

#### `<display-inside>`

* flow
* flow-root
* table
* **flex**
* **grid**
* ruby *(used for other markup languages like XML)*

#### `<display-listitem>`

* list-item

---

#### `<display-internal>`

* table-row-group
* table-header-group
* table-footer-group
* table-row
* table-cell
* table-column-group
* table-column
* table-caption
* ruby-base
* ruby-text
* ruby-base-container
* ruby-text-container

---

#### `<display-box>`

- contents
- **none**

#### `<display-legacy>`

* **inline-block**
* inline-table
* **inline-flex**
* **inline-grid**

---

#### Global values 

* **inherit**
* initial
* unset

---

##### display: block

TODO

---

##### display: inline

TODO

---

##### display: flex

TODO

---

##### display: grid

TODO

---

##### display: inline-block

TODO

---

##### display: inline-flex

TODO

---

##### display: inline-grid

TODO

---

##### display: inherit

TODO

---

## Specificity

---

### Specificity

The priority of rules and how to calculate them

* `*` = 0
* `element` = 1
* `.class` = 10
* `[attributes]` = 10
* `#id` = 100
* style-attributes = 1000

When there are 2 rules with the same level of specificity the latter is applied.

---

## Semantics

---

### Semantics

* Don't just use `div` and `span`.
* TODO

---

## Accessibility

---

### Accessibility

Further readings
https://moritzgiessmann.de/accessibility-cheatsheet/