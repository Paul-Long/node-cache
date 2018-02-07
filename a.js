(function () {
  var total = 1;
  var h1 = document.getElementById('h1');
  var timer = setInterval(function () {
    if (total >= 10) {
      total = 0;
    }
    total += 1;
    h1.innerText = total
  }, 1000);
})();