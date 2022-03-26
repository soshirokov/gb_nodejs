import colors from "colors/safe.js";
import process from 'process';

let [primeStart, primeEnd] = process.argv.slice(2);
const palette = [colors.green, colors.yellow, colors.red];

if (!Number.isInteger(+primeStart) || !Number.isInteger(+primeEnd)) {
    console.log(colors.red('Один из аргументов не число'));
} else {
    let primeCount = 0;

    if (primeStart < 2) {
        primeStart = 2;
    }

    for (let i = primeStart; i <= primeEnd; i++) {
        let isPrime = true;

        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            console.log(palette[primeCount % 3](i));
            primeCount++;
        }
    }

    if (!primeCount) {
        console.log(colors.red('Не найдено простых чисел в диапазоне'))
    }
}
