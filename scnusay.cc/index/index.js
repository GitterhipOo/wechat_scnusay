window.onload = function () {
    var setwidth = document.getElementById("wrapper");
    var maxpx = document.body.clientWidth;
    console.log(maxpx);
    setwidth.style.width = maxpx + 'px';
    document.getElementById("home").style.width = maxpx * 0.7 + 'px';
}