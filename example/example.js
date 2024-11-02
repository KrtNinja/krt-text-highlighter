import { Highlighter } from './dist/index.js'

const $input = document.getElementById('example-search')
const $root = document.getElementById('example-root')
const $searchButton = document.getElementById('example-search-button')
const $resetButton = document.getElementById('example-reset-button')

if (!$root || !$input || !$searchButton || !$resetButton) {
  throw new Error('Something wrong with elements')
}

const highlighter = new Highlighter('example-highlight-name') // create the highlighter
highlighter.attach($root) // attach the root

$searchButton.addEventListener('click', () => {
  const str = $input.value || ''
  const words = str.split(' ')
  highlighter.highlight(words) // highlight words
})

$resetButton.addEventListener('click', () => {
  highlighter.clear() // clear highlight
})

$input.value = 'high root :)'
$searchButton.click()
