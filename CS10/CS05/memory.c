#include <stdio.h>
#include <stdlib.h>

const int constval = 30; // 상수   --- 📃TEXT
int function() { // 함수           --- 📃TEXT
    return 20;
}

int uninitial; // 초기화되지 않은 전역변수 --- 🗃️ DATA (전역변수, 정적변수)
int initial = 30; // 초기화된 전역변수    --- 🗃️ DATA (전역변수, 정적변수)
static int staticval = 70; // 정적변수   --- 🗃️ DATA (전역변수, 정적변수)

int main(int argc, const char * argv[]) {
    int localval1 = 30; // 지역변수 1    --- 🥞 STACK
    int localval2; // 지역변수 2         --- 🥞 STACK

    printf("ENTER NUMBER : ");
    scanf("%d", &localval2);

    char *arr = malloc(sizeof(char) * 10) // 동적 할당 변수  --- 🗻 HEAP

    /* 포인터 출력 영역 */
    printf("상수 Memory Address : \t\t %p \n", &constval);
    printf("비초기화 변수 Memory Address :\t %p \n", &uninitial);
    printf("초기화 변수 Memory Address : \t %p \n", &initial);
    printf("정적 변수 Memory Address : \t %p \n", &staticval);
    printf("함수 Memory Address : \t\t %p \n", function);
    printf("지역변수1 Memory Address : \t %p \n", &localval1);
    printf("지역변수2 Memory Address : \t %p \n", &localval2);
    printf("동적할당변수 Memory Address : \t %p \n\n", arr);

    return 0;
}