document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('supports-js');

    var sections = document.getElementsByTagName('section');
    for (var i = 0; i < sections.length; i++) {
        var timeout = 300 * (i + 1);
        setTimeout(function (ti) {
            sections[ti].classList.add('loaded');
        }, timeout, i);
    }
});

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-67731642-3', 'auto');
ga('send', 'pageview');
