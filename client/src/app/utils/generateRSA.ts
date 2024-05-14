const  gcd = (a: number, b: number) => {
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

const modInverse = (m: number, a: number) => {
    let t = 0n; let nextT = 1n;
    let r = a; let nextR = m;

    while (nextR !== 0n) {
        let quotient = r/nextR;
        let tempT = t;
        t = nextT;
        nextT = tempT - (quotient*nextT);
        let tempR = r;
        r = nextR;
        nextR = tempR - (quotient*nextR);
    }

    if (r > 1) {
        return -1;
    } 
    if(t<0){
        t += a
    }
    console.log(t);
    return t;
}   

const generateKey = (p: number, q: number) => {
        // Calculate n = p * q
        const n = BigInt(p) * BigInt(q);

        // Calculate φ(n) = (p-1) * (q-1)
        const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);

        // Choose 1 < e < φ(n), and e is coprime to φ(n)
        let e = 65537n; // Commonly used value for e
        while (gcd(e, phi) !== 1n) {
            e++;
        }

        // Calculate d such that (d * e) % φ(n) == 1
        const d = modInverse(e, phi);

        return {publicKey:e,
            privateKey: d,
            modulus: n};
    }

export { generateKey };