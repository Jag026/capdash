function stockFormatter(str) {
    let strArr = str.split('$')

    if (Number(strArr[1]) < 1) {
        return strArr[1].split('0')[1];
    }

    if (strArr[1][strArr[1].length - 1] === 'T' || strArr[1][strArr[1].length - 1] === 'B') {
        let mcArr = strArr.pop();
        mcArr = mcArr.split(" ");
        if (mcArr[1] === 'B') {
            return ((mcArr[0]) * 1000000000).toLocaleString();
        }
        if (mcArr[1] === 'T') {
            return ((mcArr[0]) * 1000000000000).toLocaleString();
        }
    }
    
    return(Number(strArr[1]).toLocaleString())
}

export default stockFormatter;