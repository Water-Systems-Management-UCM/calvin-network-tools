'use strict';

/* Given a storage node
return a list of every set of cost storage links at each timestep.
*/

var cost = require('./cost');
var bound = require('./bound');
var netu = require('./split_utils');
var evaporation = require('./evaporation');
var u=require('./utils');

module.exports = function(stor, steps) {
  var p = stor.properties;
  var id= p.hobbes.networkId;
  var step_costs;
  var step_bounds;
  var i,k;
  var rows = [];

  // Assume there IS a storage, otherwise, we need steps!
  var cap = p.storage;

  // Boundary conditions
  var initial=p.initialstorage;
  var ending=p.endingstorage;
  var first=null;
  var last=null;

  var step_keys={};
  steps.forEach((s) => {
    step_keys[s] =1;
  });

  // Get initial and Final storage capacities
  for( i = 1; i < cap.length; i++ ) { // i=0 is header;
    if (step_keys[cap[i][0]]) {
      if (! first) {
        if ( i > 1 ) initial=cap[i-1][1];
        first++;
      }
      last=i;
    }
  }
  if (last !== cap.length-1 && last !== null) {
    ending=cap[last][1];
  }

  // Add Initial [i,j,k,cost,amplitude,lower,upper]
  rows.push(['INITIAL',u.id(id,steps[0]),0,0,1,initial,initial]);

  var step_bounds = bound(p.bounds, steps);
  var step_costs = cost(p.costs, step_bounds, steps, p.prmname);
  
  var step_amp = evaporation(stor, steps);
  var i;
  var stepBounds, costs;
  var clb,cub;
  var amp;
  var next;

  for(i = 0; i < steps.length; i++ ) { // i=0 is header;
    stepBounds = step_bounds[i];
    costs = step_costs[i];
    amp = step_amp[i];

    if(i === steps.length-1 ) { // Fixed to final storage
      // JM fix for issue 35
      if( ending === null ) {
        stepBounds.LB = 0;
      } else {
        stepBounds.LB = ending;
      }
      stepBounds.UB = ending;

      next = 'FINAL';
      rows.push([
        u.id(id,steps[i]),
        next,
        0,
        0,
        1,
        stepBounds.LB,
        stepBounds.UB
      ]);

    } else {
      next = u.id(id,steps[i+1]);
      
      for( k = 0; k < costs.length; k++ ) {
        if( costs[k].lb > stepBounds.LB ) {
          clb = costs[k].lb;
        } else if ( (costs[k].ub || 0) <= stepBounds.LB ) {
          clb = costs[k].ub || 0;
        } else {
          clb = stepBounds.LB;
        }

        stepBounds.LB -= clb;
        if( stepBounds.UB === null ) {
          cub = costs[k].ub;
        } else {
          if( costs[k].ub !== null && costs[k].ub <= stepBounds.LB ) {
            cub = costs[k].ub
          /** start of final fix for issue #36 */
          } else if( k === costs.length - 1 ) {
            cub = stepBounds.UB - clb;
          /** end of final fix for issue #36 */
          } else {
            cub = stepBounds.LB;
          }

          stepBounds.UB -= cub;
        }


        if( cub === null || cub > 0) {
          rows.push([
            u.id(id,steps[i]),
            next,
            k, 
            costs[k].cost, 
            amp, 
            clb, 
            cub
          ]);
        }
      }
    }
  }

return rows;
};
