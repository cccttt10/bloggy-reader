export function getScrollTop(): number {
    return Math.max(
        //chrome
        document.body.scrollTop,
        //firefox/IE
        document.documentElement.scrollTop
    );
}

export function getDocumentHeight(): number {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );
}

export function getWindowHeight(): number {
    return document.compatMode === 'CSS1Compat'
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
}

export function isMobile(): boolean {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}
