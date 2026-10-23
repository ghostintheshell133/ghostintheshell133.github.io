var track = document.getElementById('track');
var pager = document.getElementById('pager');
var counter = document.getElementById('counter');
var prevBtn = document.getElementById('prev');
var nextBtn = document.getElementById('next');

var mobileQuery = window.matchMedia('(max-width: 600px)');
var page = 0;

function perView() {
    return mobileQuery.matches ? 1 : 3;
}

function total() {
    return track.children.length;
}

function pageCount(count) {
    return Math.ceil(count / perView());
}

function buildPager() {
    var count = pageCount(total());
    pager.textContent = '';
    var i = 0;
    while (i < count) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Страница ' + (i + 1));
        (function (index) {
            dot.addEventListener('click', function () {
                goTo(index);
            });
        })(i);
        pager.appendChild(dot);
        i++;
    }
}

function render() {
    var items = total();
    var view = perView();
    var count = pageCount(items);
    var start = Math.min(page * view, items - view);
    track.style.transform = 'translateX(' + (-start * 100 / view) + '%)';

    var dots = pager.children;
    for (var i = 0; i < dots.length; i++) {
        if (i === page) {
            dots[i].classList.add('active');
            dots[i].setAttribute('aria-current', 'true');
        } else {
            dots[i].classList.remove('active');
            dots[i].removeAttribute('aria-current');
        }
    }

    counter.textContent = 'Страница ' + (page + 1) + ' из ' + count;
}

function goTo(newPage) {
    var count = pageCount(total());
    page = (newPage + count) % count;
    render();
}

function onBreakpointChange() {
    page = 0;
    buildPager();
    render();
}

function init() {
    prevBtn.addEventListener('click', function () {
        goTo(page - 1);
    });
    nextBtn.addEventListener('click', function () {
        goTo(page + 1);
    });

    buildPager();
    render();

    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener('change', onBreakpointChange);
    } else {
        mobileQuery.addListener(onBreakpointChange);
    }
}

document.addEventListener('DOMContentLoaded', init);
