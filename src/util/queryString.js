// 获取QueryString的数组
export function getQueryString() {
    let result = window.location.search.match(new RegExp('[?&][^?&]+=[^?&]+', 'g'));
    if (result === null) {
        return '';
    }
    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}

// 根据 QueryString 参数名称获取值
export function getQueryStringByName(name) {
    let result = window.location.search.match(
        new RegExp('[?&]' + name + '=([^&]+)', 'i')
    );
    if (result === null || result.length < 1) {
        return '';
    }
    return result[1];
}
