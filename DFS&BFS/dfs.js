// 9
const matrix1 = [
    [1,0,1,1,1,1],
    [1,0,1,0,1,0],
    [1,0,1,0,1,1],
    [1,1,1,0,1,1],
    [0,0,1,1,1,1]
];

// 18
const matrix2 = [
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
  ];

// 2
const matrix3 = [
    [1,0],
    [1,1]
];

// 큐를 스택으로 바꿔보기
// 한 방향에서 끝까지 가야하기 때문에 재귀적으로 호출해야한다
const DFS = (matrix, startNode, destNode) => {
    const maxRow = matrix.length;
    const maxCol = matrix[0].length;
    const visitedSet = new Set();

    const moveDirections = [
        [1, 0], [0, 1], [0, -1], [-1, 0]
    ];

    let shortestPath = Infinity;

    const dfsRecursive = (currentRow, currentCol, currentPath) => {
        // 목적지 도착시 최단 경로 업데이트
        if (currentRow === destNode[0] && currentCol === destNode[1]) {
            shortestPath = Math.min(shortestPath, currentPath);
            return;
        }

        for (const [moveRow, moveCol] of moveDirections) {
            const movedRow = currentRow + moveRow;
            const movedCol = currentCol + moveCol;

            if (movedRow >= 0 && movedRow < maxRow && 
                movedCol >= 0 && movedCol < maxCol && 
                matrix[movedRow][movedCol] === 1 && 
                !visitedSet.has(`${movedRow},${movedCol}`)) {
                
                visitedSet.add(`${movedRow},${movedCol}`);
                dfsRecursive(movedRow, movedCol, currentPath + 1);
                visitedSet.delete(`${movedRow},${movedCol}`);  // 백트래킹
            }
        }
    };

    visitedSet.add(`${startNode[0]},${startNode[1]}`);
    dfsRecursive(startNode[0], startNode[1], 0);
    
    return shortestPath === Infinity ? '경로가 존재하지 않습니다' : shortestPath;
};

console.log(`기대값 : 9`, DFS(matrix1,[0,0],[4,5]))
console.log(`기대값 : 18`, DFS(matrix2,[0,0],[9,9]))
console.log(`기대값 : 2`, DFS(matrix3,[0,0],[1,1]))