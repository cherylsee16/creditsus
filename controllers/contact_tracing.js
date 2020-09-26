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
    };

    var cluster_processed = []; // array of objects
    
    for (var i = 0; i < cluster.length; i++){
        cluster_processed.push(
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

    // Helper function to check if a person got it from another person
    // Return true if person 1 got it from person 2
    function compareWholeGenome(person1, person2){
        var total_mutations = 0;
        var nonSilent = false;
        var person1_genome = person1.genome;
        var person2_genome = person2.genome;
        for (i = 0; i < person1_genome.length; ++i){
            mutationResult = compareGene(person1_genome[i], person2_genome[i]);
            total_mutations += mutationResult.mutationCount;
            if (!nonSilent && mutationResult.nonSilent){
                nonSilent = true;
            }
            if (total_mutations>2){
                return {
                    related: false,
                    nonSilent: false // does not matter
                };
            }
        }
        return {
            related: true,
            nonSilent: nonSilent
        };
    }

    // Result
    paths = []; // [[[person(obj), nonSilent(boolean)], [person(obj), nonSilent(boolean)]]]

    [
        []
    ]

    // Helper function to create path
    function createPath(person1, person2){
        result = compareWholeGenome(person1, person2);
        if (result.related){
            var path = [];
            if (result.nonSilent){
                path.push([
                    person1,
                    true
                ]);
            } else {
                path.push([
                    person1,
                    false
                ]);
            }
            
            path.push([person2, false]);
            return path;

        } else {
            return false;
        }
    }

    // Helper function to convert path to string
    function processPaths(pathArr){
        function processPerson(person){
            var result = "";
            result += person[0].name;
            if (person[1] == true){
                result += "*";
            }
            return result;
        }

        return pathArr.map(
            path => path.map(
                person => processPerson(person)
            ).join(' -> ')
        );

    }

    // Check if infected got from origin
    var infectedOriginCheck = createPath(infected_processed, origin_processed); 
    if (infectedOriginCheck != false){
        paths.push(infectedOriginCheck);
    }

    var clusterPaths = [];
    var links = [];
    
    for (var i = 0; i < cluster_processed.length; ++i){
        // Check if infected got it from cluster
        var result2 = createPath(infected_processed, cluster_processed[i]);
        if (result2 != false) {
            clusterPaths.push(result2);
        }

        // Get cluster interactions 
        for (var j = i+1; j < cluster_processed.length; ++j){
            var result3 = createPath(cluster_processed[i], cluster_processed[j]);
            if (result3 != false){
                if (result3[0][1]) { // Means nonSilent mutation present
                    result3[1][1] = true;
                }
                links.push(result3)
            }
        }
    }

    // Helper function
    // function fni


    // for (var i = 0; i < clusterPaths.length; ++i){
    //     var clusterPathIndiv = clusterPaths[i];
    //     var clusterPerson = clusterPathIndiv[1][0];

    //     for (var j = 0; j < links.length; ++j){

    //     }
        
    //     if (clusterPerson.name === )
    // }

    // 



    return res.status(200).json(processPaths(paths));
    
};