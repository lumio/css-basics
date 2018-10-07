CSS basics
==========

Selectors
---------

A selector is a way to select a DOM element by certain features.

* p … would select all p-tags
* .className … would select all tags that have the class className in their class attribute.
* #idName … would select [all] tags that have an id attribute that is set to idName. Just to make sure: an id should only occur once.
* [attribute=“value”] … an attribute selector.
* :first-child, :hover … a pseudo-class, only selects elements with a certain state/position/rule
* ::before, ::after … a pseudo-element, actually creates an inline element with CSS. Useful for decorative purposes.

You can combine selectors like so

```
a.fancy-box[href=“https://example.org“] {
  display: inline-block;
  padding: 1px 2px;
  margin: 0 -2px;
  background: pink;
}
```

This would select all anchor tags that have the class .fancy-box and link to https://example.org.

Box model
---------

From the outside to the inside

* Margin
* Border
* Padding
* Content

So usually setting the width and height of an element only changes the width and height of the content itself but does not take into account the outer boxes for padding, border and margin.

To get around this you could use the CSS function `calc` but that is a bit of a mess anyway. So instead we can use box-sizing and set it to border-box. As the value suggests, this will take border and padding into account, but still leaves the margin untouched.

Position
--------

* static
* relative
* absolute
* fixed
* sticky (no IE support, no support for tables in some browsers)

Use position properties only sparingly.

### Why not to use ‘em

TODO

Display modes
-------------

The display property explained

### <display-outside>
* **block**
* **inline**
* run-in

### <display-inside>
* flow
* flow-root
* table
* **flex**
* **grid**
* ruby (used for other markup languages like XML)

### <display-listitem>
* list-item

### <display-internal>
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

### <display-box>
* contents
* **none**

### <display-legacy>
* **inline-block**
* inline-table
* **inline-flex**
* **inline-grid**

## Global values
* **inherit**
* initial
* unset

Explained in detail
display: block
display: inline
display: flex
display: grid

display: inline-block
display: inline-flex
display: inline-grid

display: inherit

Specificity
-----------

The priority of rules and how to calculate them

* * = 0
* element = 1
* class = 10
* attributes = 10
* id = 100
* style-attribute = 1000

When there are 2 rules with the same level of specificity the latter is applied.

I find the decimal system better than a table view.

Semantic
--------

The meaning of some tags and their default styles

Accessibility
-------------

https://moritzgiessmann.de/accessibility-cheatsheet/
