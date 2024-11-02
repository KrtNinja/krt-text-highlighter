/** Text highlight controller */
export declare class Highlighter {
    #private;
    readonly customHighlightName: string;
    readonly ignoreSelector: string;
    /**
     *{@link https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight|MDN CSS highlight}
     * @param {string} customHighlightName - name from ::highlight(custom-highlight-name)
     * @param [ignoreSelector=data-nohls] - css selector to ignore highlight
     */
    constructor(customHighlightName: string, ignoreSelector?: string);
    /**
     * Attach the root element.
     * @param {HTMLElement} root - Words will be searched inside the root
     */
    attach(root: HTMLElement): void;
    /**
     * Highlight words inside the root (case-insensitive)
     * @param {string[]} words
     */
    highlight(words: string[]): void;
    /** Clear highlight */
    clear(): void;
}
