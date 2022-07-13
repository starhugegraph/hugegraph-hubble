const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};

const targetOffset = [0, 0];

export const placements = {
    topLeft: {
        points: ['bl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset
    },
    topCenter: {
        points: ['bc', 'tc'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, -4]
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 4]
    },
    bottomCenter: {
        points: ['tc', 'bc'],
        overflow: autoAdjustOverflow,
        offset: [0, 4]
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 4]
    }
};

export default placements;
