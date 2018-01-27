function spiralMatrix(a, b) {
    var total = a*b
    var result= []

    for(var i=0;i<a;i++) {
        var rs = []
        for(var j=0;j<b;j++) {
            rs.push(0)
        }
        result.push(rs)
    }

    var x=0
    var y=0
    var step = 0
    for(var i=0;i<total;){
        while(y+step<a){
            i++
            result[x][y]=i
            y++
        }
        y--
        x++

        while(x+step<b){
            i++
            result[x][y]=i
            x++
        }
        x--
        y--

        while(y>=step){
            i++
            result[x][y]=i
            y--
        }
        y++
        x--
        step++

        while(x>=step){
            i++
            result[x][y]=i
            x--
        }
        x++
        y++
    }
    for (let i = 0; i < result.length; i++) {
        console.log(result[i].join(' '))
    }
}

spiralMatrix(3, 3)