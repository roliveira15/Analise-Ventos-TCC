import goalSeek from 'goal-seek';

const fn = (x,y,z) => x * y * z;
const fnParams = [4,5,6];

try {
  const result = goalSeek({
    fn,
    fnParams,
    percentTolerance: 1,
    maxIterations: 1000,
    maxStep: 1,
    goal: 140,
    independentVariableIdx: 2
  });

  console.log(`result: ${result}`);
} catch (e) {
  console.log('error', e);
}
