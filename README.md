# Text highlighter

Example for implementation in your project, or use as a library. \
Analogue of the search in the browser on the page, but you can specify areas (custom root element) for highlighting the text.\
Also exclude paragraphs from highlighting inside the root.

> Using [CSS highlight](https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight)

## How to use

### Highlight style

Add style by specify the custom-highlight-name

```css
::highlight(example-highlight-name) {
  color: black;
  background-color: #fed330;
}
```

### Create highlighter

Create `Highlighter` by specify the custom-highlight-name

```javascript
import { Highlighter } from 'krt-text-highlighter'

// The root is any element inside which you want the highlight to work
const $root = document.getElementById('example-root')
const highlighter = new Highlighter('example-highlight-name')

highlighter.attach($root) // attach the root
highlighter.highlight(['example', 'words']) // highlight words
```

### Ignoring elements

Specify the css-selector with the second argument. \
By default `[data-nohls]`

```html
<!-- file.html -->
    <div id="example-root">
      <p>
        <b data-nohls>Highlight:</b> <!-- Ignored -->
        Any text can be highlighted</span>
      </p>
      <p>
        <b data-nohls>Exclude:</b><!-- Ignored -->
        <span data-nohls>Any text can be excluded for highlighting</span> <!-- Ignored -->
      </p>
    </div>
```

```js
// file.js
const highlighter = new Highlighter('example-highlight-name', '[data-nohls]') // by default [data-nohls]

highlighter.attach($root)
highlighter.highlight(['example', 'words'])
```

## [Example](./example)
