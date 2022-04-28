window.onload = function () {
    var setwidth = document.getElementById("wrapper");
    var maxpx = screen.width;
    console.log(maxpx);
    setwidth.style.width = maxpx + 'px';
    document.getElementById("wrapper2").style.width = maxpx + 'px';
}
