'use strict';

var updateStorage = require('../lib/updateStorage');
var crawler = require('../../crawler');
var prepare = require('../lib/prepare');
var link = require('../../pri/format/link');
var path = require('path');

module.exports = function(argv) {
  if( argv._.length === 0 ) {
    console.log('Please provide a node command [list | show]');
    process.exit(-1);
  }

  if( !argv.data ) {
    console.log('Please provide a data repo location');
    process.exit(-1);
  }

  if( argv.show ) {
    show(argv._, argv);
  } else if( argv.list ) {
    list(argv._, argv.data);
  }
};

function list(nodes, datapath) {
  for (var i = 0 ; i < nodes.length; i++) {
    nodes[i] = nodes[i].toUpperCase();
  }

  crawler(datapath, {parseCsv : false}, function(results){
    var i, node;

    for( i = 0; i < results.nodes.length; i++ ) {
      node = results.nodes[i];
      if( nodes[0] === '' || nodes[0] === 'ALL' || nodes.indexOf(node.properties.prmname.toUpperCase()) > -1 ) {
      }
    }

  });
}

function show(nodes, argv) {
  for (var i = 0 ; i < nodes.length; i++) {
    nodes[i] = nodes[i].toUpperCase();
  }

  var config = prepare.init();
  crawler(argv.data, {parseCsv : false}, function(results){
    var node, i;
    var list = [];

    for( i = 0; i < results.nodes.length; i++ ) {
      node = results.nodes[i];
      if( nodes[0] === '' || nodes[0] === 'ALL' || nodes.indexOf(node.properties.prmname.toUpperCase()) > -1 ) {
        list.push(node);
      }
    }

    updateStorage(argv.start, argv.stop, list, function(){
      for( var i = 0; i < list.length; i++ ) {
        prepare.format(list[i], config);
      }

      console.log(prepare.pri(config, false));
    });
  });
}
