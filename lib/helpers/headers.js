const headers = exports;

const invalid = [
  'server',
  'age',
  'connection',
  'content-encoding',
  // 'vary', // set vary header on app.js to enable browser cache
  'date'
]

headers.clean = function (headers, invalidate = []) {
  var invalidations = invalid.concat(invalidate);
  var array = headers;
  for (var i = 0; i < invalidations.length; i++) {
    array.hasOwnProperty(invalidations[i]);
    delete array[invalidations[i]];
  }
  return array;
};

headers.build = function (headers, invalidate = []) {
  var invalidations = invalid.concat(invalidate);
  var array = headers;
  for (var i = 0; i < invalidations.length; i++) {
    array.hasOwnProperty(invalidations[i]);
    delete array[invalidations[i]];
  }
  return array;
};
