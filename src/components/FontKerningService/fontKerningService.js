import Module from './../module/module';
import Helper from './../Helper/Helper';

export default class FontKerningService extends Module{
    constructor(textNodes, settings){
       super(textNodes, settings);
    }
    processNodes(params) {
        super.processNodes(params);
        this.changeKerning(params);
    }
    changeKerning(percent){
        changeFontKerning(this.textNodes);
        changeFontKerning(this.textNodes,percent);
        function changeFontKerning(textNodes ,percent){
            for(let i=0;i<textNodes.length;i++){
                let elem=textNodes[i];
                if(!percent){
                    elem.style.letterSpacing = '';
                    Helper.setToParent(elem,'letterSpacing','');
                } else {
                    elem.style.letterSpacing = percent+'px';
                    Helper.setToParent(elem,'letterSpacing',percent+'px');
                }
            }
        }
    }
}

