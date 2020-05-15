const _ = require("lodash");
function tabularize(arr, opts = {}) {
  opts = Object.assign(
    {
      separator: " | ",
      headerSeparator: false,
      compact: false,
    },
    opts
  );
  var col_size = [];
  arr.forEach(function (row) {
    row.forEach(function (v, i) {
      col_size[i] = col_size[i] || 0;
      var len = (v + "").length;
      if (len > col_size[i]) col_size[i] = len;
    });
  });

  let output = [];
  arr.forEach(function (arrRow, i) {
    let header = i === 0 && opts.headerSeparator ? [] : false;
    let row = [];
    col_size.forEach(function (size, i) {
      let v = arrRow[i] || "";
      if (!opts.compact || arrRow[i]) row[i] = _.padEnd(v + "", size);
      if (header) header.push(_.pad("", size, opts.headerSeparator));
    });
    output.push(_.trimEnd(row.join(opts.separator)));
    if (header) output.push(_.trimEnd(header.join(_.pad("", opts.separator.length, opts.headerSeparator))));
  });
  return output.join("\n");
}

_.mixin({ tabularize }, { chain: false });

module.exports = tabularize;
