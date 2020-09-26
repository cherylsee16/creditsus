exports.trace = async (req, res) => {
    var infected = req.body.infected;
    var origin = req.body.origin;
    var cluster = req.body.cluster;

    var infected_processed = {
        name: infected.name,
        genome: infected.genome.split('-')
    };

    var origin_processed = {
        name: origin.name,
        genome: origin.genome.split('-')
    }

    var cluster = []; // array of objects
    
    for (var i = 0; i < cluster.length; i++){
        everyone.push(
            {
                name: cluster[i].name,
                genome: cluster[i].genome.split('-')
            }
        );
    }

    // Helper function to check number of alterations in a gene
    // Also checks to see if first letter is altered 
    function compareGene(gene1, gene2){
        var counter = 0;
        var nonSilent = false;
        for (var i = 0; i < 3; i++){
            if (gene1.charAt(i) != gene2.charAt(i)){
                counter+=1;
                if (i == 0) {
                    nonSilent = True;
                }
            }
        }
        return {
            mutationCount: counter,
            nonSilent: nonSilent
        }
    }

    // Check if infected got it from origin
    // Returen true is person 1 got it from person 2
    function compareWholeGenome(person1, person2){
        for (i = 0; i < person1.genome.length; ++i){
            if (person1.genome[i] == )
        }
    }

    return res.status(200).json(everyone);
    
};