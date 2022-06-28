const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};

const targetOffset = [0, 0];

const placements = {
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset
    },
    topLeft: {
        points: ['bl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset
    }
};

export default placements;
