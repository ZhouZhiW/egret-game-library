import * as fs from 'fs';
import * as path from 'path';
export class WxgamePlugin implements plugins.Command {

    constructor() {
    }
    async onFile(file: plugins.File) {
        if (file.extname == '.js') {
            const filename = file.origin;
			if(filename == 'lib/modules/d5sdk/d5sdk.js' || filename=='libs/modules/d5sdk/d5sdk.min.js')
            {
                let content = file.contents.toString();
                content += `;window.d5power = d5power;`;
                content = content.replace(/definition = __global/, "definition = window");
                file.contents = new Buffer(content);
            }
			
            if (filename == "libs/modules/promise/promise.js" || filename == 'libs/modules/promise/promise.min.js') {
                return null;
            }
            if (filename == 'libs/modules/egret/egret.js' || filename == 'libs/modules/egret/egret.min.js') {
                let content = file.contents.toString();
                content += `;window.egret = egret;`;
                content = content.replace(/definition = __global/, "definition = window");
                file.contents = new Buffer(content);
            }
            else {
                let content = file.contents.toString();
                if (
                    filename == "libs/modules/res/res.js" ||
                    filename == 'libs/modules/res/res.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.min.js' ||
                    filename == 'libs/modules/assetsmanager/assetsmanager.js'
                ) {
                    content += ";window.RES = RES;"
                }
                if (filename == "libs/modules/eui/eui.js" || filename == 'libs/modules/eui/eui.min.js') {
                    content += ";window.eui = eui;"
                }
                if (filename == 'libs/modules/dragonBones/dragonBones.js' || filename == 'libs/modules/dragonBones/dragonBones.min.js') {
                    content += ';window.dragonBones = dragonBones';
                }
				if (filename == 'libs/modules/d5/d5.js' || filename == 'libs/modules/d5/d5.min.js' || filename == 'libs/modules/d5bitmapui/d5bitmapui.js' || filename == 'libs/modules/d5bitmapui/d5bitmapui.min.js')
                {
                    content = "var d5power = window.d5power;" + content;
                }
				content = content.replace(/var d5power;/gi,'');
                content = "var egret = window.egret;" + content;
                if (filename == 'main.js') {
                    content += ";window.Main = Main;"
                }
                file.contents = new Buffer(content);
            }
        }
        return file;
    }
    async onFinish(pluginContext) {

    }
}