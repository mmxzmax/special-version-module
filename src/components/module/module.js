import Helper from './../Helper/Helper';


export default class SpecialVersionModule {
    constructor(nodeList,settings){
        this.group = null;
        this.settings = settings;
        this.textNodes= nodeList;
        this.value = window.localStorage.getItem(this.settings.cacheName);
        this.buttons = [];
        this.init();
        if(this.value){
            this.setStyle();
            this.processNodes(this.value);
        }

    }
    setStyle(){
        let callbackParam = null;
        for(let i=0;i<this.settings.params.length; i++){
            let param = this.settings.params[i];
            if(String(param.value) === String(this.value)){
                callbackParam = param;
            }
        }
        if(callbackParam){
            this.callback(callbackParam);
        }
    }
    init(){}
    processNodes(params){
        if(params){
            window.localStorage.setItem(this.settings.cacheName, params);
            try{
                document.head.appendChild(this.sizeStyes);
            } catch (e) {
                console.log('no stylesheets');
            }
        } else {
            try{
                this.sizeStyes = document.head.removeChild(this.sizeStyes);
            } catch (e) {
                console.log('no stylesheets');
            }
            window.localStorage.removeItem(this.settings.cacheName);
        }
    }
    saveToCache(value){
        let settings = JSON.parse(window.localStorage.getItem('specialVersionSettings'));
        if(!settings){
            settings = {};
        }
        settings[this.settings.cacheName] = value;
        window.localStorage.setItem('specialVersionSettings',JSON.stringify(settings));
    }
    createUi(uiTittle){
        this.group = Helper.createGroup(uiTittle);
        const innerGroup = Helper.createGroup();
        for(let i = 0; i < this.settings.params.length; i++){
            let param = this.settings.params[i];

            let button = Helper.createButton(param.buttonTittle,param.buttonAltText);
            if(param.buttonClass){
                const list = param.buttonClass.split(',');
                if(Array.isArray(list)){
                    for(let classIndex = 0; classIndex<list.length;classIndex++){
                        button.classList.add(list[classIndex]);
                    }
                } else {
                    button.classList.add(param.buttonClass);
                }

            }
            if(String(this.value) === String(param.value)){
                button.classList.add('state_active');
            }
            this.bindEvent(button,param);
            button.setAttribute('data-value', param.value);
            innerGroup.appendChild(button);
            this.buttons.push(button);
        }
        this.group.appendChild(innerGroup);
        this.afterUiCreated();
        return this.group;
    }
    bindEvent(button,param){
        button.addEventListener('click',(e) => {
            this.processNodes(param.value);
            Helper.buttonClassTrigger(e.currentTarget);
            this.saveToCache(param.value);
            this.callback(param);
        },false);
    }
    callback(value){
        this.setSizeStyle(value)
    }
    afterUiCreated(){
        return false;
    }
    setSizeStyle(value){
        if(value.styleSheet){
            if(!this.sizeStyes){
                this.sizeStyes = Helper.addStyleSheet(value.styleSheet);
            } else {
                this.sizeStyes.href = value.styleSheet;
            }
        }
    }
}
