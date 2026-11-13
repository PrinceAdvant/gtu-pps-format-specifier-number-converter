# GTU PPS printf format specifiers: %d %u %o %x %c and width, for any int

GTU Hero's PPS guide lists wrong format specifiers among the syntax mistakes that cost marks, and output tracing as a skill the theory paper tests. Ek number daalo: this page shows exactly what printf prints for %d, %u, %o, %x, %X, %#x, %5d, %-5d, %05d and %c, plus the 32-bit binary. The repo also has specifiers.c so you can check the same output with gcc.

Live page: https://princeadvant.github.io/gtu-pps-format-specifier-number-converter/

## Facts used

- %d signed decimal, %u unsigned decimal, %o octal, %x and %X hexadecimal, %#x adds 0x, %c character.
- %5d right-aligns in 5 columns, %-5d left-aligns, %05d pads with zeros.
- A negative int printed with %u, %o or %x shows its two's complement bit pattern: -1 becomes 4294967295 or ffffffff with a 4-byte int.
- %c of 65 prints A because 65 is the ASCII code of 'A'.

## Test

`node test.js` checks the calculations against hand-worked values and prints `All checks passed`.

`gcc -Wall -o spec specifiers.c && ./spec 65` prints the same table from real C.

## Tips

- Use %d for int, %f for float, %lf for double in scanf, %c for char and %s for strings. Mismatched specifiers give garbage or crashes.
- In scanf, %c needs a leading space (" %c") to skip the leftover newline.
- Output tracing questions: write the exact spaces for width specifiers. [   65] and [65   ] are different answers.
- Run specifiers.c with gcc -Wall: gcc warns when a specifier does not match its argument.

PPS program list, viva questions and paper links: [https://gtuhero.com/blogs/gtu-pps-previous-year-paper](https://gtuhero.com/blogs/gtu-pps-previous-year-paper) (GTU Hero is my project).
