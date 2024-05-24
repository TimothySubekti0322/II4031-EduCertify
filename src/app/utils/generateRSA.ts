const gcd = (a: bigint, b: bigint): bigint => {
    while (b !== BigInt(0)) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };
  
  const modInverse = (m: bigint, a: bigint): bigint => {
    let t = BigInt(0);
    let nextT = BigInt(1);
    let r = a;
    let nextR = m;
  
    while (nextR !== BigInt(0)) {
      const quotient = r / nextR;
      const tempT = t;
      t = nextT;
      nextT = tempT - quotient * nextT;
      const tempR = r;
      r = nextR;
      nextR = tempR - quotient * nextR;
    }
  
    if (r > BigInt(1)) {
      return -BigInt(1);
    }
    if (t < BigInt(0)) {
      t += a;
    }
    console.log(t);
    return t;
  };
  
  const generateKey = (p: number | string, q: number | string) => {
    // Calculate n = p * q
    const n = BigInt(p) * BigInt(q);
  
    // Calculate φ(n) = (p-1) * (q-1)
    const phi = (BigInt(p) - BigInt(1)) * (BigInt(q) - BigInt(1));
  
    // Choose 1 < e < φ(n), and e is coprime to φ(n)
    let e = (BigInt(65537)); // Commonly used value for e
    while (gcd(e, phi) !== BigInt(1)) {
      e++;
    }
  
    // Calculate d such that (d * e) % φ(n) == 1
    const d = modInverse(e, phi);
  
    return {
      publicKey: e,
      privateKey: d,
      modulus: n,
    };
  };
  
  export { generateKey };
  