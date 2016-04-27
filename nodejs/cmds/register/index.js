module.exports = function(program, run) {
    program.on('--help', function(){
        console.log('');
        console.log('  More Info:');
        console.log('    See the github repo & README: https://github.com/ucd-cws/calvin-network-tools');
        console.log('');
    });
    
    require('./build')(program, run);
    require('./showBuild')(program, run);
    require('./run')(program, run);
    require('./update')(program, run);
    require('./show')(program, run);
    require('./list')(program, run);
    require('./crawl')(program, run);
    require('./excel')(program, run);
    require('./init')(program, run);
    require('./updateLibrary')(program, run);
}