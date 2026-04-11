// function DivideBy(num){
//     if(num % 21 == 0)
//         console.log("eded 3 e ve 7 e bolunur");
//     else console.log("ugursuz bolunme");
//     };

// DivideBy(41);

// var count = 0;
// function Compare(n,m){
//     for(i = n; i<m; i++){
//         if(i%2!=0)
//             count++;
//     }
//     console.log(count)
// };

// Compare(5,10);

// var sum = 0
// function Sum(n,m){
//     for(i = n; i<m; i++){
//         if(i%2!=0)
//             sum+=i;
//     }
//     console.log(sum)
// };

// Sum(5,10);


// var devideCount = 0;

// function Devides(m){
//     for(i=1; i<=m;i++){
//         if(m%i==0)
//             devideCount++;
//     }

//     if(devideCount>2)
//         console.log("Eded murekkebdir");
//     else console.log("eded sadedir")
// };

// Devides(0);


// const m = [1,2,3,4,5];
// var arraysum=0
// function SumArray(m){
//     for(i=0;i<m.length;i++){
//         arraysum+=m[i];
//     };
//     console.log(arraysum);

// };

// SumArray(m);


// var arr = [1,2,3,4,5];
// var kv = 0;
// function ArrayKVSum(arr){
//     for(i=0;i<arr.length;i++){
//         kv+=arr[i]*arr[i];
//     }
//     console.log(kv)
// }

// ArrayKVSum(arr);

// var summ = 0;
// function Logical(a,b){
//     if(isNaN(a) == false && isNaN(b)==false){
//         for(i=a;i<=b;i++){
//             summ+=i;
//         }
//         console.log(summ)
//     }

// }

// Logical(1,5);


var a = 0;
var b = 1;
var c = a+b;

var arr = [];
arr.push(a,b);
function Fibonaci(m){
    for(i=0;i<m;i++){
        
        arr.push(c);
        
        a = b;
        b = c;
        c = a+b;
    }
    console.log(arr);

}

Fibonaci(10);