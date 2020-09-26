exports.count = async (req, res) => {
    var tests = req.body.tests;

    function checkFloor(floorArr){
        for (i = 0; i < floorArr.length; i++) { 
            if (floorArr[i]>0){
                return false;
            }
        }
        return true;
    }
    
    function countMoves(floorArr, moves){

        // Check if all the floor is clean
        if (checkFloor(floorArr)){
            return moves;
        } else {
            moves += 1;
            var tile = floorArr[1];
            if (tile > 0) {
                floorArr[1]-=1;
            } else {
                floorArr[1]+=1;
            }
            floorArr.push(floorArr.shift());

            return countMoves(floorArr, moves);
        }

    }

    result = {};

    for (const [testId, test] of Object.entries(tests)) {
        var testArr = test.floor;
        result[testId] = countMoves(testArr, 0);
    }

    return res.status(200).json({answers: result})


}