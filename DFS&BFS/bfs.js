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

const BFS = (matrix, startNode, destNode) => {

    // 한계치 규정
    const maxRow = matrix.length
    const maxCol = matrix[0].length

    // 초기화
    const searchQueue = [startNode];
    const visitedSet = new Set()
    let count = 0

    // 스트링으로 넣어야지 set에서 중복값을 걸러낸다
    visitedSet.add(startNode.toString())

    // 4방향 움직이기
    const moveDirections = [
        [1,0],[0,1],[0,-1],[-1,0]
    ]

    // 작업시작
    while (searchQueue.length > 0) {

        // 큐에 제일 먼저 들어온 녀석의 좌표 빼오기
        const depth = searchQueue.length

        for (let i = 0 ; depth > i ; i++) {
            const [currentRow, currentCol] = searchQueue.shift()

            // 목적지에 도달했는지 확인
            if (currentRow === destNode[0] && currentCol === destNode[1]){
                return count
            }      

            // 네개의 인접 노드를 살펴보기
            for (const [moveRow, moveCol] of moveDirections) {
                const movedRow = currentRow + moveRow
                const movedCol = currentCol + moveCol

                // 이동하려는 노드가 매트릭스 안에 들어 있긴한지 + 값이 1인지(이동할 수 있는 곳인지) + 방문한적이 있는지(중복 이동 거르기)
                if (movedRow >= 0 && movedRow < maxRow && movedCol >= 0 && movedCol < maxCol && matrix[movedRow][movedCol] === 1 && !visitedSet.has([movedRow, movedCol].toString())) {
                
                    // 다음 루프를 위해 작업물 집어넣기
                    searchQueue.push([movedRow,movedCol])
                    visitedSet.add([movedRow,movedCol].toString())
                }
            }          
        }
         // 몇칸 이동했는지 세기
        count++        
    }



    
    return '경로가 존재하지 않습니다'
}
console.log(`기대값 : 9`, BFS(matrix1,[0,0],[4,5]))
console.log(`기대값 : 18`, BFS(matrix2,[0,0],[9,9]))
console.log(`기대값 : 2`, BFS(matrix3,[0,0],[1,1]))