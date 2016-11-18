var rocky = require('rocky');

function h_to_hms(h) {
  var x = h * 3600;
  var hh = Math.floor(x / 3600);
  if (hh < 10) hh = "0" + hh;
  var y = x % 3600;
  var mm = Math.floor(y / 60);
  if (mm < 10) mm = "0" + mm;
  var ss = Math.round(y % 60);
  if (ss < 10) ss = "0" + ss;
  return hh + ":" + mm + ":" + ss;
}

rocky.on('draw', function(event) {
  var d = new Date();
  var millis = d.getTime();
  var jd_ut = 2440587.5 + (millis / 8.64E7);
  var jd_tt = jd_ut + (35 + 32.184) / 86400;
  var j2000 = jd_tt - 2451545.0;
  var msd = (((j2000 - 4.5) / 1.027491252) + 44796.0 - 0.00096);
  var mtc = (24 * msd) % 24;

  var ctx = event.context;
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '42px light Bitham';
  ctx.fillText(h_to_hms(mtc)+" SOL", w/2, h/4, w);
});

rocky.on('minutechange', function(event) {
  rocky.requestDraw();
});