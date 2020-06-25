/**
 * return a throttled function
 * @param {Function} fn - the event that we want to throttle, as a callback function
 * @param {number} delay - throttle time interval, in ms
 */
function throttle(fn, delay) {
    // last为上一次触发回调的时间
    let last = 0;
    let timer = null;

    // return the throttled function
    return function () {
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 记录本次触发回调的时间
        let now = +new Date();

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last < delay) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, delay);
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now;
            fn.apply(context, args);
        }
    };
}

export default throttle;
