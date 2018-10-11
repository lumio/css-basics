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

- Tag name selectors ... `p`, `div`, ... (`<p />`)
- Class selectors ... `.className` (`<p class="className" />`)
- ID selectors ... `#idName` (`<p id="idName" />`)
- Attribute selectors `[attribute="value"]` (`<p attribute="value" />`)
- Pseudo-class selectors ... `:first-child`, `:hover`, ...
- Pseudo-elements ... `::before`, `::after`

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

- [attribute] … element with a certain attribute
- [attribute="value"] … element with exact attribute value
- [attribute^="value"] … starts with value
- [attribute$="value"] … ends with value
- [attribute*="value"] … contains value
- [attribute operator value i] … the i makes it case insensitive

---

### TODO Pseudo classes :*-child

- Caveats
  - `:first-child` and `:last-child` will ignore the element tag type

```
  <div>
    <span>Element 1</span> <!— this is the :first-child —>
    <p>Element 2</p> <!— p:first-child won’t work here —>
  </div>
```

---

## Box model

---

### Box model

From the outside to the inside

- margin
- border
- padding
- content

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
