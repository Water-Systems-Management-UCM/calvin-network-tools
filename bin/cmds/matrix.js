const command_line_params = {
  format: {
    describe : 'Output Format, dot | png (graphviz required)',
    choices : ['csv', 'tsv', 'dot', 'png'],
    default : 'csv',
    alias : 'f'
  },
  'no-header': {
    describe : 'Suppress CSV/TSV Header',
    type : 'boolean',
    alias : 'N'
  },
  ts : {
    describe : '<sep> Time step separator',
    default : '@',
    alias : 'S'
  },
  fs : {
    describe : '<sep> Field Separator',
    default : ',',
    alias : 'F'
  },
  start : {
    describe : '[YYYY-MM] Specify start date for TimeSeries data',
    alias : 's'
  },
  stop : {
    describe : '[YYYY-MM] Specify stop date for TimeSeries data',
    alias : 't'
  },
  'max-ub' : {
    describe : 'Replace null upper bounds with a big number.  Like 1000000',
    type: 'number',
    alias : 'M'
  },
  debug : {
    describe : 'Set debug nodes.  Either "ALL", "*" or comma seperated list of prmnames (no spaces)',
    alias : 'D'
  },
  to : {
    describe : '<filename> Send matrix to filename',
    default : 'STDOUT',
    alias : 'T'
  },
  'dump-nodes' : {
    describe : '<filename> Send list of nodes to filename, default=no output, can use STDOUT',
    alias : 'O'
  },
  'outbound-penalty' : {
    describe : '<json> Specify a penalty function for outbound boundary conditions. eg. [[10000,"-10%"],[0,0],[-10000,"10%"]]',
    alias : 'p'
  },
  regions : {
    describe : 'Specify a list of regions to include.  All nodes within the regions will be added to the NODES list.  Comma seperate',
    alias : 'r'
  }
};

exports.command = 'matrix [nodes...]';
exports.desc = 'Create a delimited matrix file to run in 3rd party solvers, such as PyVIN\'s Pyomo-based solver.'
exports.builder = require('../shared')(command_line_params);

exports.handler = require('../handler');

// The following docstring duplicates the code above (can't get it to autoprint :( ) - but includes it in the
// documentation as a reference for the command arguments. We use a blank function as a hook, but should
// probably just move all of this directly to the document - it's just nice to keep it all in one file to make
// it more obvious that it needs to get updated in parallel.
/**
 * CNF Matrix Command
 *
 *	.. code-block:: javascript
 *
 *		{
 *			format: {
 *				describe : 'Output Format, dot | png (graphviz required)',
 *				choices : ['csv', 'tsv', 'dot', 'png'],
 *				default : 'csv',
 *				alias : 'f'
 *			},
 *			'no-header': {
 *				describe : 'Suppress CSV/TSV Header',
 *				type : 'boolean',
 *				alias : 'N'
 * 			},
 *			ts : {
 *				describe : '<sep> Time step separator',
 *				default : '@',
 *				alias : 'S'
 *			},
 * 			fs : {
 *				describe : '<sep> Field Separator',
 *				default : ',',
 *				alias : 'F'
 *			},
 *			start : {
 *				describe : '[YYYY-MM] Specify start date for TimeSeries data',
 *				alias : 's'
 *			},
 *			stop : {
 *				describe : '[YYYY-MM] Specify stop date for TimeSeries data',
 *				alias : 't'
 *			},
 *			'max-ub' : {
 *				describe : 'Replace null upper bounds with a big number.  Like 1000000',
 *				type: 'number',
 *				alias : 'M'
 *			},
 *			debug : {
 *				describe : 'Set debug nodes.  Either "ALL", "*" or comma seperated list of prmnames (no spaces)',
 *				alias : 'D'
 *			},
 *			to : {
 *				describe : '<filename> Send matrix to filename',
 *				default : 'STDOUT',
 *				alias : 'T'
 *			},
 *			'dump-nodes' : {
 *				describe : '<filename> Send list of nodes to filename, default=no output, can use STDOUT',
 *				alias : 'O'
 * 			},
 *			'outbound-penalty' : {
 *				describe : '<json> Specify a penalty function for outbound boundary conditions. eg. [[10000,"-10%"],[0,0],[-10000,"10%"]]',
 *				alias : 'p'
 *			},
 *			regions : {
 *				describe : 'Specify a list of regions to include.  All nodes within the regions will be added to the NODES list.  Comma seperate',
 *				alias : 'r'
 *			}
 *      };
 */
function __matrix_doc_hook(){
  return;
}