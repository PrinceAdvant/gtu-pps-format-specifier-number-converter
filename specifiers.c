/* GTU PPS: printf format specifiers for one int. gcc -Wall -o spec specifiers.c && ./spec 65 */
#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    int n = argc > 1 ? atoi(argv[1]) : 65;
    printf("%%d  -> %d\n", n);
    printf("%%u  -> %u\n", (unsigned) n);
    printf("%%o  -> %o\n", (unsigned) n);
    printf("%%x  -> %x\n", (unsigned) n);
    printf("%%X  -> %X\n", (unsigned) n);
    printf("%%#x -> %#x\n", (unsigned) n);
    printf("%%5d -> [%5d]\n", n);
    printf("%%-5d-> [%-5d]\n", n);
    printf("%%05d-> [%05d]\n", n);
    if (n >= 32 && n <= 126) printf("%%c  -> %c\n", n);
    printf("sizeof(int) = %zu bytes on this machine\n", sizeof(int));
    return 0;
}
