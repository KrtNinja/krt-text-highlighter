import { escapeRegExp, getTreeNodes } from './helpers/index.js';
/** Text highlight controller */
export class Highlighter {
    customHighlightName;
    ignoreSelector;
    #root = null;
    /**
     *{@link https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight|MDN CSS highlight}
     * @param {string} customHighlightName - name from ::highlight(custom-highlight-name)
     * @param [ignoreSelector=data-nohls] - css selector to ignore highlight
     */
    constructor(customHighlightName, ignoreSelector = '[data-nohls]') {
        this.customHighlightName = customHighlightName;
        this.ignoreSelector = ignoreSelector;
        if (!CSS.highlights) {
            console.warn('CSS.highlights not supported');
        }
        if (!customHighlightName) {
            throw new Error('Missing required parameter: customHighlightName');
        }
        this.attach = this.attach.bind(this);
        this.highlight = this.highlight.bind(this);
    }
    /**
     * Attach the root element.
     * @param {HTMLElement} root - Words will be searched inside the root
     */
    attach(root) {
        if (!root) {
            console.error('Can not attach an empty root');
            return;
        }
        this.#root = root;
    }
    /**
     * Highlight words inside the root (case-insensitive)
     * @param {string[]} words
     */
    highlight(words) {
        if (!this.#root) {
            console.error('Root not found. Attach root element before highlight');
            return;
        }
        const allowedHighlightNotes = this.#getAllowedHighlightNodes();
        const indices = this.#findMatchIndices(allowedHighlightNotes, words);
        const ranges = this.#createRanges(indices);
        CSS.highlights.set(this.customHighlightName, new Highlight(...ranges));
    }
    #getAllowedHighlightNodes() {
        if (!this.#root) {
            return [];
        }
        const allowedHighlightNotesTree = document.createTreeWalker(this.#root, NodeFilter.SHOW_TEXT, this.#isAllowedHls.bind(this));
        return [...getTreeNodes(allowedHighlightNotesTree)].map(node => {
            return { node, text: node.textContent || '' };
        });
    }
    #findMatchIndices(source, words) {
        return source.flatMap(({ node, text }) => {
            const regExpString = words.map(escapeRegExp).join('|');
            const searchRegExp = new RegExp(regExpString, 'gi');
            const matches = [...text.matchAll(searchRegExp)];
            return matches.map(match => ({
                node,
                word: match[0],
                start: match.index,
                end: match.index + match[0].length
            }));
        });
    }
    #createRanges(source) {
        return source.map(({ node, start, end }) => {
            const range = new Range();
            range.setStart(node, start);
            range.setEnd(node, end);
            return range;
        });
    }
    #isAllowedHls(node) {
        if (node.parentElement?.closest(this.ignoreSelector)) {
            return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
    }
    /** Clear highlight */
    clear() {
        CSS.highlights.clear();
    }
}
