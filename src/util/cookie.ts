export function setCookie(cookieName: string, value: string, numDays: number): void {
    if (numDays > 0 && numDays !== 100) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + numDays);
        document.cookie =
            cookieName +
            '=' +
            escape(value) +
            (numDays === null ? '' : ';expires=' + expiryDate.toUTCString());
    }
    if (numDays === 100) {
        const expiryDate = new Date('2118-01-01 00:00:00');
        document.cookie =
            cookieName +
            '=' +
            escape(value) +
            (numDays === null ? '' : ';expires=' + expiryDate.toUTCString());
    }
}

export function getCookie(cookieName: string): string {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(cookieName + '=');
        if (cStart !== -1) {
            cStart = cStart + cookieName.length + 1;
            let cEnd = document.cookie.indexOf(';', cStart);
            if (cEnd === -1) cEnd = document.cookie.length;
            return unescape(document.cookie.substring(cStart, cEnd));
        }
    }
    return '';
}

export function deleteCookie(name: string): void {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cookieValue = getCookie(name);
    if (cookieValue !== null)
        document.cookie = name + '=' + cookieValue + ';expires=' + exp.toUTCString();
}

export function clearCookie(name: string): void {
    setCookie(name, '', -1);
}
