
// TODO: Is there a real API, rather than querying static files?
function getURL(year, quarter) {
  var url = 'https://data.sfgov.org/resource/';

  // TODO: Build out the list of mappings from
  // the table found in https://github.com/sfbrigade/datasci-housing-pipeline#links
  var mappings = {
    '2015-1': 'auw5-vpae.json',
    '2015-2': 'b6nb-tyvq.json'
  };
  var key = [year, quarter].join('-');
  var resource = mappings[key];
  if (!resource) return '';
  return url + resource;
}

function transformData(year, quarter, data) {
  // So it seems that the mappings only apply to the table
  // but not to the JSON objects returned

  // var mappings = {
  //   '2015-1': {
  //     neighborhood: 'PLNNBRHOOD',
  //     units: 'UNITS',
  //     unitsNet: 'UNITSNET'
  //   },
  //   '2015-2': {
  //     neighborhood: 'NEIGHBORHOOD',
  //     units: 'UNITS',
  //     unitsNet: 'UNITSNET'
  //   }
  // };
  // var key = [year, quarter].join('-');
  // var mapping = mappings[key];
  return _.map(data, function(d) {
    return _.pick(d, ['neighborhood', 'unitsnet']);
  });
};

function getData(year, quarter, cb) {
  var url = getURL(year, quarter);
  if (!url) cb(new Error('Couldn\'t find data for year ' + year + ' and quarter ' + quarter));

  d3.json(url, function(err, res) {
    if (err) return cb(err);

    var data = transformData(year, quarter, res);
    console.log(data);
  });
}

getData(2015, 1);
getData(2015, 2);
