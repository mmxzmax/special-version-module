import Module from './../module/module';

export default class ColorSchemeService extends Module {
    constructor(textNodes, settings){
        super(textNodes, settings);

    }
    processNodes(params) {
        super.processNodes(params);
        this.setScheme(params);
    }
    afterUiCreated() {
        this.processButtons(this.buttons);
    }
    processButtons(buttons){
        for(let i=0; i<buttons.length; i++){
            const currentButton = buttons[i];
            const value =currentButton.getAttribute('data-value');
            currentButton.style.setProperty('background-color', this.settings.scheme[value][0], 'important');
            currentButton.style.setProperty('color', this.settings.scheme[value][1], 'important');
        }
    }
    setScheme(id){
        const self = this;
        setScheme(this.textNodes);
        setScheme(this.textNodes,id);
        function setScheme(textNodes,id){
            if(!!id){
                document.body.style.backgroundColor = self.settings.scheme[id][0];
            } else {
                document.body.style.backgroundColor = '';
            }
            for(let i=0;i<textNodes.length;i++){
                let elem=textNodes[i];
                if(!!id){
                    try {
                        elem.style.backgroundColor = self.settings.scheme[id][0];
                        elem.parentNode.style.backgroundColor = self.settings.scheme[id][0];
                        elem.style.color = self.settings.scheme[id][1];
                        elem.parentNode.style.color = self.settings.scheme[id][1];
                    } catch (e) {
                        console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;");
                    }

                } else {
                    try {
                        elem.style.backgroundColor = '';
                        elem.parentNode.style.backgroundColor = '';
                        elem.style.color = '';
                        elem.parentNode.style.color = '';
                    } catch (e) {
                        console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;");
                    }

                }

            }
        }
    }
}
