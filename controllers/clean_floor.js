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
    
    function countMoves(floorArr){
        var moves = 0;
        var pointer = 0;

        while (!checkFloor(floorArr)){
            if (pointer < floorArr.length && !checkFloor(floorArr.slice(pointer+1,floorArr.length))){
                pointer++;
                if (floorArr[pointer]>0){
                    floorArr[pointer]--;
                    moves += 1;
                } else {
                    floorArr[pointer]++;
                }
                continue;
            }
            

            else if (pointer > 0 && !checkFloor(floorArr.slice(0, pointer))){
                pointer--;
                if (floorArr[pointer]>0){
                    floorArr[pointer]--;
                    moves += 1;
                } else {
                    floorArr[pointer]++;
                }
                continue;
            }
            else {
                return moves;
            }
        }
        return moves;

    }

    result = {};

    for (const [testId, test] of Object.entries(tests)) {
        var testArr = test.floor;
        result[testId] = countMoves(testArr);
    }

    return res.status(200).json({answers: result})


}