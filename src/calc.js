function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') throw new Error('add expects numbers');
  return a + b;
}

function sub(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') throw new Error('sub expects numbers');
  return a - b;
}

function mul(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') throw new Error('mul expects numbers');
  return a * b;
}

function div(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') throw new Error('div expects numbers');
  if (b === 0) throw new Error('division by zero');
  return a / b;
}

function isPrime(n) {
  if (typeof n !== 'number' || !Number.isInteger(n)) throw new Error('isPrime expects integer');
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

module.exports = { add, sub, mul, div, isPrime };
