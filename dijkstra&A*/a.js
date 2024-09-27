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

// 우선순위 큐
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(coordinate, weight) {
        this.values.push({coordinate, weight});
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.weight - b.weight);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

const Dijkstra = (matrix) => {
    
    // 최대 범위 지정
    const maxRow = matrix.length
    const maxCol = matrix[0].length

    //값을 담을 매트릭스 초기화
    const valueMatrix = Array.from({ length: maxRow }, () => 
        new Array(maxCol).fill(Infinity)
    );
    
    // 첫 값만 기본값으로 초기화
    valueMatrix[0][0] = matrix[0][0]

    // 작업 진행상황을 담을 set과 heap 초기화
    const visitedSet = new Set()
    const searchQueue = new PriorityQueue()
    searchQueue.enqueue([0,0],matrix[0][0])

    // 4방향 이동 설정
    const moveDirections = [
        [1, 0], [0, 1], [0, -1], [-1, 0]
    ];

    //실제 구현
    while(!searchQueue.isEmpty()){
        const {coordinate: [currentRow, currentCol], weight} = searchQueue.dequeue()

        // 도착 여부 확인
        if (currentRow === maxRow - 1 && currentCol === maxCol - 1) {
            return weight;
        }

        const search = `${currentRow},${currentCol}`;
        if (visitedSet.has(search)) continue;
        visitedSet.add(search);

        // 맞닿은 노드 탐색ㅂㅂ
        for (const [dx, dy] of moveDirections) {
            const newRow = currentRow + dx;
            const newCol = currentCol + dy;
            if (newRow >= 0 && newRow < maxRow &&
                newCol >= 0 && newCol < maxCol) {
                const newWeight = weight + matrix[newRow][newCol];
                if (newWeight < valueMatrix[newRow][newCol]) {
                    valueMatrix[newRow][newCol] = newWeight;
                    searchQueue.enqueue([newRow, newCol], newWeight);
                }
            }
        }

        
    }


    return -1

}

console.log(`기대값 : 6`, Dijkstra(matrix1))
console.log(`기대값 : 36`, Dijkstra(matrix2))
console.log(`기대값 : 32`, Dijkstra(matrix3))