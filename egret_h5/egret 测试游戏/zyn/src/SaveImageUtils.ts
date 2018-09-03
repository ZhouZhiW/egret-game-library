/**
 *
 * @author 
 *
 */
class SaveImageUtils {
    public constructor() {
    }
    public static imageTagVisible(visible: boolean) {
        if (visible) {
            document.getElementById("saveContainer").style.display = "block";
        } else {
            document.getElementById("saveContainer").style.display = "none";
        }
    }
    public static drawCanvasimages() {
        var num = Math.floor(Math.random() * 10);
        var str1 = _data.game_result[num].strleft;
        var str2 = _data.game_result[num].strright
        var str3 =_data.game_result[num].str;
            CanvasToimages_1(str1, str2, str3);
    }
}
