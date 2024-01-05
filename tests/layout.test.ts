import assert from 'node:assert/strict';

import { calculateBounds } from '../src/framework/layout';

const twoColumnBounds = calculateBounds(101, 50, [{ ratio: 0.5 }, { ratio: 0.5 }]);

assert.deepEqual(twoColumnBounds, [
    { x: 0, y: 0, width: 50, height: 50 },
    { x: 50, y: 0, width: 51, height: 50 },
]);
assert.equal(
    twoColumnBounds.reduce((sum, bound) => sum + bound.width, 0),
    101,
);

const sevenColumnBounds = calculateBounds(101, 50, Array.from({ length: 7 }, () => ({ ratio: 1 / 7 })));

assert.deepEqual(
    sevenColumnBounds.map((bound) => bound.width),
    [14, 14, 14, 14, 14, 14, 17],
);
assert.equal(sevenColumnBounds[6].x + sevenColumnBounds[6].width, 101);

assert.deepEqual(
    calculateBounds(100, 40, [{ ratio: 0.25 }, { ratio: 0.25 }]),
    [
        { x: 0, y: 0, width: 25, height: 40 },
        { x: 25, y: 0, width: 25, height: 40 },
    ],
);

assert.deepEqual(calculateBounds(100, 40, []), []);
