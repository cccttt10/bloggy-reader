import { throttle } from 'throttle-debounce';

const throttleDelay = 1000;

// 用新的 throttle 包装 scroll 的回调
const lazyLoad = throttle(throttleDelay, () => {
    // 获取可视区域的高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;

    // 获取所有的图片标签
    const imgs = document.querySelectorAll('#list .wrap-img img');

    // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
    let num = 0;

    for (let i = num; i < imgs.length; i++) {
        // 用可视区域高度减去元素顶部距离可视区域顶部的高度
        let distance = viewHeight - imgs[i].getBoundingClientRect().top;

        // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
        if (distance >= 100) {
            // 给元素写入真实的 src，展示图片
            let hasLaySrc = imgs[i].getAttribute('data-has-lazy-src');
            if (hasLaySrc === 'false') {
                imgs[i].src = imgs[i].getAttribute('data-src');
                imgs[i].setAttribute('data-has-lazy-src', true);
            }

            // 前 i 张图片已经加载完毕，下次从第 i+1 张开始检查是否露出
            num = i + 1;
        }
    }
});

export default lazyLoad;
