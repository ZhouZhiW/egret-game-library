class EasyNumber {
    public static easyNum(t: number): string {
        if (t < 100000) {
            return "" + Math.round(t);
        }
        if (this.mathVals == null) {
            this.mathVals = [];
            for (let r = 0; r < this.mathKeys.length; r++)
                this.mathVals.push(Math.pow(10, 3 * (r + 1)))
        }
        var t = Math.floor(t);
        if (1e3 > t) return t.toString().replace(/\B(?=(?:\d{3})+\b)/g, ",");

        for (var i = 0; i < this.mathKeys.length; i++) {

            var n, s = t / this.mathVals[i];

            if (n = 10 > s ? parseFloat(s.toFixed(2)) : 100 > s ? parseFloat(s.toFixed(1)) : parseFloat(s.toFixed(0)), 1e3 > n)
                return n.toString().replace(/\B(?=(?:\d{3})+\b)/g, ",") + this.mathKeys[i]
        }
        return n.toString().replace(/\B(?=(?:\d{3})+\b)/g, ",") + this.mathKeys[this.mathKeys.length - 1]
    }

    private static mathVals;
    private static mathKeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk","ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz", "Aa", "Bb", "Cc", "Dd", "Ee", "Ff", "Gg", "Hh", "Ii", "Jj", "Kk", "Ll", "Mm", "Nn", "Oo", "Pp", "Qq", "Rr", "Ss", "Tt", "Uu", "Vv"];

}