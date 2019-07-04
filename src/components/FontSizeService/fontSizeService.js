import Module from './../module/module';
import Helper from './../Helper/Helper';

export default class FontSizeService extends Module {
    constructor(textNodes, settings){
      super(textNodes, settings);
    }
    processNodes(params) {
        super.processNodes(params);
        this.changeFontSize(params);
    }
    changeFontSize(stepPercent){
        changeFontSize(this.textNodes);
        changeFontSize(this.textNodes,stepPercent);
        function changeFontSize(textNodes ,stepPercent){
            for(let i=0;i<textNodes.length;i++){
                let elem=textNodes[i];
                Helper.setToParent(elem,'fontSize','',true);
                let elemStyle=Helper.getStyle(elem);
                let fontSize=parseInt(String(elem.style.fontSize? elem.style.fontSize : elemStyle.fontSize).replace('px',''));
                elem.style.transition = 'none';
                if(!stepPercent){
                    elem.style.fontSize='';
                    setTimeout(() => {
                        Helper.setToParent(elem,'fontSize','');
                    },10);
                } else {
                    elem.style.fontSize=fontSize*stepPercent+'px';
                    setTimeout(() => {
                        Helper.setToParent(elem,'fontSize',fontSize*stepPercent+'px');
                    },10);
                }
            }
        }
    }

}

module.exports = FontSizeService;
