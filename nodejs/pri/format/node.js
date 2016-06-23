'use strict';

var sprintf=require('sprintf-js').sprintf;

module.exports = function(np) {
//  var np=node.properties;
  var NODE;

  // Check for any storage values rather than type?
  // if (np.initialstorage || np.el_ar_cap || np.finalstorage)
  // if( np.type === 'Reservior' ) {

    // JM - HACK
    if( np.endingstorage > 10000 ) {
      np.endingstorage = 0;
    }
    if( np.areacapfactor > 10000 ) {
      np.areacapfactor = 0;
    }

    NODE = sprintf('%-8.8s  %-10.10s','NODE', np.prmname);
    NODE += (np.initialstorage) ? sprintf('%10.3f', np.initialstorage) : sprintf('%10.10s','');
    NODE += (np.areacapfactor) ? sprintf('%10.4f', np.areacapfactor) : sprintf('%10.10s','');
    NODE += (np.endingstorage) ? sprintf('%10.3f', np.endingstorage) : sprintf('%10.10s','');

  if( np.description !== undefined ) {
    NODE += sprintf('\n%-8.8s  %-70.70s', 'ND', np.description);
  }
  return NODE;
};
