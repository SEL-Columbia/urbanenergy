var mm = com.modestmaps;
var m; // global for debugging REMOVE ME
               
var server   = 'http://tilestream.modilabs.org:8888/api/Tileset/';
var urlTotal = server + 'urban_energy_nyc';
var urlBlock = server + 'blocks_nyc';
var urlLot   = server + 'taxlots_nyc' ; 

wax.tilejson(urlTotal, function(json) {
  console.log(json['minzoom']);
  console.log(json['maxzoom']);

  m = new mm.Map('intro-map', new wax.mm.connector(json), new mm.Point(1000,700));
//  wax.mm.interaction(m, json);
  

  m.setCenterZoom(new mm.Location(json.center[1]+.02, json.center[0]+0.005),13);
  
  // i hate myself
  m.addCallback('zoomed', function(e) { 
    var zoom = m.getZoom();
    console.log(zoom);
    if (zoom > 15) { 
      console.log('lot');
      wax.tilejson(urlLot, function(json) { 
        wax.mm.interaction(m, json);
      });
    } else if (zoom < 15) {
      console.log('block');
      wax.tilejson(urlBlock, function(json) { 
        wax.mm.interaction(m, json);
      });
    };

  });

  wax.mm.zoomer(m).appendTo(m.parent);
//  wax.mm.legend(m, tilejson).appendTo(m.parent);



  wax.mm.attribution(m, json).appendTo(m.parent);
  wax.mm.fullscreen(m, json).appendTo(m.parent);

});
