import Module from './../module/module';
import Helper from './../Helper/Helper';

export default class FontIntervalService extends Module{
    constructor(textNodes,settings){
       super(textNodes,settings);
    }
    processNodes(params) {
        super.processNodes(params);
        this.changeInterval(params);
    }
    changeInterval(percent){
        changeFontInterval(this.textNodes);
        changeFontInterval(this.textNodes,percent);
        function changeFontInterval(textNodes ,percent){
            for(let i=0;i<textNodes.length;i++){
                let elem=textNodes[i];
                if(!percent){
                    elem.style.lineHeight = '';
                    Helper.setToParent(elem,'lineHeight','');
                } else {
                    elem.style.lineHeight = percent;
                    Helper.setToParent(elem,'lineHeight',percent);
                }
            }
        }
    }
}

