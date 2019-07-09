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
    afterUiCreated() {
      this.processButtons(this.buttons);
    }
    processButtons(buttons){
      for(let i=0; i<buttons.length; i++){
        const currentButton = buttons[i];
        const value = currentButton.getAttribute('data-value');
        let fontSize = Helper.getCurStyle(currentButton);
        currentButton.style.setProperty('font-size', fontSize*value+'px', 'important');
      }
    }
    changeFontSize(stepPercent){
        changeFontSize(this.textNodes);
        changeFontSize(this.textNodes,stepPercent);
        function changeFontSize(textNodes ,stepPercent){
            for(let i=0;i<textNodes.length;i++){
                let elem=textNodes[i];
                Helper.setToParent(elem,'fontSize','',true);
                let fontSize=Helper.getCurStyle(elem);
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
