import Module from './../module/module';
import Helper from './../Helper/Helper';

export default class FontFamilyService extends Module {
    constructor(textNodes, settings){
        super(textNodes, settings);
    }
    init() {
        const fontList = this.settings.fontList;
        if(fontList){
            this.fontList=fontList;
            this.fontListIds=[];
            this.head = document.head || document.getElementsByTagName('head')[0];
            let fontCssList=[];
            for(let i=0;i<fontList.length;i++){
                fontCssList.push(this.fontList[i]);
            }
            this.addFonts(fontCssList);
        }
    }
    processNodes(params) {
        super.processNodes(params);
        this.changeFontFamily(params);
    }
    addFonts(fontList){
        let counter=0;
        for(let i=0;i<fontList.length;i++){
            let font = fontList[i];
            if(font){
                let pluginFonts=document.createElement('link');
                pluginFonts.rel='stylesheet';
                pluginFonts.type='text/css';
                let id=`font${counter}`;
                pluginFonts.id=id;
                this.fontListIds.push(id);
                counter++;
                pluginFonts.href=font;
                this.head.appendChild(pluginFonts);
            }
        }
    }
    changeFontFamily(name){
        setFontFamily(this.textNodes);
        setFontFamily(this.textNodes,name);
        function setFontFamily(textNodes,fontFamily){
            for(let i=0;i<textNodes.length;i++){
                let elem=textNodes[i];
                elem.style.fontFamily=fontFamily;
                Helper.setToParent(elem,'fontFamily',fontFamily);
            }
        }
    }
}

module.exports = FontFamilyService;
