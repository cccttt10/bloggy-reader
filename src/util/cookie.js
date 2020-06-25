export function setCookie(cName, value, expiredays) {
    if (expiredays > 0 && expiredays !== '100') {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie =
            cName +
            '=' +
            escape(value) +
            (expiredays === null ? '' : ';expires=' + exdate.toGMTString());
    }
    if (expiredays === '100') {
        let exdate = new Date('2118-01-01 00:00:00');
        document.cookie =
            cName +
            '=' +
            escape(value) +
            (expiredays === null ? '' : ';expires=' + exdate.toGMTString());
    }
}

export function getCookie(cName) {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(cName + '=');
        if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            let cEnd = document.cookie.indexOf(';', cStart);
            if (cEnd === -1) cEnd = document.cookie.length;
            return unescape(document.cookie.substring(cStart, cEnd));
        }
    }
    return '';
}

export function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval !== null)
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}

export function clearCookie(name) {
    setCookie(name, '', -1);
}
