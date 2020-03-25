/**
 * Check if a string is a valid web url
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
    const regex = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)');
    return regex.test(url);
}

/**
 * Moves the cursor to a specific point
 * @param node
 * @param position
 */
export function moveCursorToPoint(node, position = 0) {
    const selection = window.getSelection();
    const range = document.createRange();

    range.setStart(node, position);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
}

/**
 * Check if a node is inside a specific container node
 * @param node
 * @param container
 * @returns {boolean}
 */
export function isInContainer(node, container) {
    while (node) {
        if (node === container) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}