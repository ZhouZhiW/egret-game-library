class AnLogic {

    public static FEN: number = 0;

    public static Analysis(obj: Object[]): Object[] {

        console.log(obj)
        let firstM: Object;
        let secondM: Object;
        let firstW: Object;
        let secondW: Object;
        let newData: Object[] = [];
        for (let i = 0; i < obj.length; i++) {
            //console.log( "微笑值:",obj[i]["faceAttributes"]["smile"])
            //console.log( "性别值:",obj[i]["faceAttributes"]["gender"])
            //console.log( "年龄值:",obj[i]["faceAttributes"]["age"])

            if (obj[i]["faceAttributes"]["gender"] == "male") {
                //男
                if (firstM == null) {
                    firstM = obj[i]
                } else {
                    if (parseFloat(firstM["faceAttributes"]["smile"]) < parseFloat(obj[i]["faceAttributes"]["smile"])) {
                        if (secondM == null) {
                            secondM = firstM
                        } else {
                            if (parseFloat(secondM["faceAttributes"]["smile"]) < parseFloat(firstM["faceAttributes"]["smile"])) {
                                secondM = firstM
                            }
                        }
                        firstM = obj[i];
                    } else {
                        if (secondM == null) {
                            secondM = obj[i]
                        } else {
                            if (parseFloat(secondM["faceAttributes"]["smile"]) < parseFloat(obj[i]["faceAttributes"]["smile"])) {
                                secondM = obj[i]
                            }
                        }
                    }
                }
            } else {
                //女
                if (firstW == null) {
                    firstW = obj[i]
                } else {
                    if (parseFloat(firstW["faceAttributes"]["smile"]) < parseFloat(obj[i]["faceAttributes"]["smile"])) {
                        if (secondW == null) {
                            secondW = firstW
                        } else {
                            if (parseFloat(secondW["faceAttributes"]["smile"]) < parseFloat(firstW["faceAttributes"]["smile"])) {
                                secondW = firstW
                            }
                        }
                        firstW = obj[i];
                    } else {
                        if (secondW == null) {
                            secondW = obj[i]
                        } else {
                            if (parseFloat(secondW["faceAttributes"]["smile"]) < parseFloat(obj[i]["faceAttributes"]["smile"])) {
                                secondW = obj[i]
                            }
                        }
                    }
                }
            }

        }
        //判断最终结果
        if ( firstM != null ){
            newData.push(firstM)
        }
        if (firstW !=null){
            newData.push(firstW)
        }
        if (secondM != null){
            newData.push(secondM)
        }
        if (secondW != null){
            newData.push(secondW)
        }
        
        AnLogic.fenshu( parseFloat(newData[0]["faceAttributes"]["smile"]),
                        parseFloat(newData[0]["faceAttributes"]["age"]),
                        parseFloat(newData[1]["faceAttributes"]["smile"]),
                        parseFloat(newData[1]["faceAttributes"]["age"]),);
        console.log(newData)
        return newData
    }
    private static fenshu(sm1: number, age1: number, sm2: number, age2: number) {
        if(sm1<0.1){
            sm1*=10;
        }
        
        if(sm2<0.1){
            sm2*=10;
        }
        AnLogic.FEN = ((sm1+sm2)/2)*80 ;
        AnLogic.FEN += (Math.abs(age1-age2)/(age1+age2))*20;
        //AnLogic.FEN *= 1.7;
        AnLogic.FEN = Math.sqrt(AnLogic.FEN)*10
        if (AnLogic.FEN>=100)
        {
            AnLogic.FEN = 99
        }
    }
}