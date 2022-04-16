window.onload = function () {
    var setwidth = document.getElementById("wrapper");
    var maxpx = screen.width;
    console.log(maxpx);
    setwidth.style.width = maxpx + 'px';
    document.getElementById("whithback").style.width = maxpx * 0.7 + 'px';
    document.getElementById("indeximg").style.width = maxpx * 0.7 + 'px';
    document.getElementById("wrapper2").style.width = maxpx + 'px';
}
