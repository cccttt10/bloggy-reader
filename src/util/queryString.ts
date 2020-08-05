/**
 * @return QueryString as an array
 */
export function getQueryString(): '' | RegExpMatchArray {
    const result = window.location.search.match(
        new RegExp('[?&][^?&]+=[^?&]+', 'g')
    );
    if (result === null) {
        return '';
    }
    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}

/**
 * @param {string} name - a query string's name
 * @return a query string according to name
 */
export function getQueryStringByName(name: string): string | null {
    const result = window.location.hash.match(
        new RegExp('[?&]' + name + '=([^&]+)', 'i')
    );
    if (result === null || result.length < 1) {
        return null;
    }
    return result[1];
}
