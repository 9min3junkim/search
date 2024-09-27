//Dijkstra

// 6
const matrix1 = [
    [0, 3, 1],
    [2, 5, 1],
    [4, 2, 1]
]

// 36
const matrix2 = [
    [0, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 1]
]

// 40
const matrix3 = [
    [0, 4, 2, 5, 3, 7],
    [3, 1, 9, 4, 2, 6],
    [5, 3, 8, 1, 6, 2],
    [2, 7, 4, 6, 3, 5],
    [8, 1, 5, 9, 2, 4],
    [6, 3, 7, 2, 8, 1]
]

const Dijkstra = (matrix) => {
    
    const maxRow = matrix.length
    const maxCol = matrix[0].length
    
    const visitedSet = new Set()

    const moveDirections = [
        [1, 0], [0, 1], [0, -1], [-1, 0]
    ];

    minimumCost = Infinity

    const dijsktraRecursive = (currentRow, currentCol, currentValue) => {
        if (currentRow === maxRow-1 &&
            currentCol === maxCol-1
        ) {
            minimumCost = Math.min(minimumCost, currentValue)
            return
        }

        if (currentValue >= minimumCost) {
            return
        }

        let tempValue = currentValue
   
        for ( const [moveRow, moveCol] of moveDirections) {
            const movedRow = currentRow + moveRow
            const movedCol = currentCol + moveCol

                if(movedRow >= 0 && movedRow < maxRow && 
                    movedCol >= 0 && movedCol < maxCol && 
                    !visitedSet.has(`${movedRow},${movedCol}`)) {
                        visitedSet.add(`${movedRow},${movedCol}`);
                        tmepValueNow += matrix[movedRow][movedCol]
                        dijsktraRecursive(movedRow, movedCol, tempValue);
                        visitedSet.delete(`${movedRow},${movedCol}`);
                    }
        }
    }

    visitedSet.add(`0,0`)
    dijsktraRecursive(0,0,0)


    return minimumCost === Infinity ? '최단 경로가 존재하지 않습니다' : minimumCost
}

console.log(`기대값 : 6`, Dijkstra(matrix1))
console.log(`기대값 : 36`, Dijkstra(matrix2))
console.log(`기대값 : 40`, Dijkstra(matrix3))