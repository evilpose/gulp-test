(function(){
    function foo(num1, num2) {
        return num1 + num2
    }
    console.log(foo(5, 5))
    // 如果上句给注掉，就是在这个js里面，foo函数并没有用到，在合并的文件里面，不会有不一样的表现，但是在合并并且压缩过的文件里面，是不会有这个文件了，
    // 因为没有用到，所以直接给省略了
    console.log(foo(5, 10))
    console.log(foo(10, 10))
})();
(function(){
    var result = [1,2,3,4,5].map(function (item, index) {
        return item + 10
    })
    console.log(result);
    console.log('js修改成功agent');
})();