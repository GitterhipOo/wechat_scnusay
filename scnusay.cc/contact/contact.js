window.onload = function () {
    var setwidth = document.getElementById("wrapper");
    var maxpx = document.body.clientWidth;
    console.log(maxpx);
    setwidth.style.width = maxpx + 'px';
}
window.onresize = function () {
    var setwidth = document.getElementById("wrapper");
    var maxpx = document.body.clientWidth;
    console.log(maxpx);
    setwidth.style.width = maxpx + 'px';
}