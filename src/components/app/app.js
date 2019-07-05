import Helper from './../Helper/Helper';
import Promise from 'promise-polyfill';


export default class Application {
    constructor(cssString, servicesList, lng, switchButtonElement){
        this._setDocumentStyle(cssString);
        this.servicesList = servicesList? servicesList : [];
        this.lng = lng? lng : {
            lngCode: 'ru',
            specialVersionOn: 'Включаю версию для слабовидящих',
            standardVersion: 'переходим в обычную версию сайта',
            closeAdditional: 'Закрыть дополнительные настройки',
            additionalSettings: 'дополнительные настройки'

        };
        const specialVersion = window.localStorage.getItem('specialVersion');
        this.ready = false;
        this.services = {};
        this.addedNodes = [];
        this.watcherTimer = null;
        const specialVersionButton = document.body.querySelectorAll(switchButtonElement? switchButtonElement : '.js-special-version');
        for(let i = 0; i<specialVersionButton.length; i++){
            specialVersionButton[i].addEventListener('click',()=>{
                document.body.classList.add('special-version-loading');
                if(!this.nodes){
                    Helper.getNodes().then(nodes => {
                        this.nodes = nodes;
                        this.start();
                    });
                } else {
                    this.ready = false;
                    this.start();
                }
            },false);
        }
        if(specialVersion){
            document.body.classList.add('special-version-loading');
             Helper.getNodes().then(nodes => {
                this.nodes = nodes;
               this.start();
            });
        }
    }
    start(){
      this.initServices();
      if(!this.uiBlock){
        this.init();
      }
      document.body.classList.remove('special-version-loading');
      try{
        this.services['textReadService'].playText(this.lng.specialVersionOn);
      } catch (e) {}
      this.watcher();
    }
    initServices(){
        window.localStorage.setItem('specialVersion','on');
        let settings = Helper.getSettings();
        if(!settings){
            settings = {};
            for(let i=0; i<this.servicesList.length;i++){
                const serviceListItem = this.servicesList[i];
                settings[serviceListItem.params.cacheName] = serviceListItem.params.params[0].value
            }
            Helper.setSettings(settings);
        }
        Object.keys(settings).forEach((key)=>{
            window.localStorage.setItem(key,settings[key]);
        });
        if(!this.ready){
            for(let i=0; i<this.servicesList.length;i++){
                const serviceListItem = this.servicesList[i];
                this.services[serviceListItem.serviceName] = new serviceListItem.service(this.nodes,serviceListItem.params);
            }
           this.ready = true;
        }
    }
    init(){
        document.body.classList.add('special-version-on');
        this.uiBlock = Application._createUiBlock();
        this._createUi();
    }
    watcher(){
        const self = this;
        try{
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if(mutation.addedNodes.length){
                        Helper.cleanNodes(mutation.addedNodes).then((nodes)=>{
                            for(let i = 0; i < nodes.length; i++){
                                const newNode = nodes[i];
                                self.addedNodes.push(newNode);
                            }
                            clearTimeout(self.watcherTimer);
                            self.watcherTimer = setTimeout(()=>{
                                self.updateOnWatchEvent();
                            },100)
                        });
                    }
                    if(mutation.removedNodes.length){
                        self.cleanNodesList(mutation.removedNodes).then(()=>{
                            clearTimeout(self.watcherTimer);
                            self.watcherTimer = setTimeout(()=>{
                                self.updateOnWatchEvent();
                            },100)
                        })
                    }
                });
            });
            const config = { attributes: false, childList: true, characterData: false,  subtree: true };
            observer.observe(document.body, config);
        } catch (e) {
            console.error('no watcher detect the version do not watch the dom changes')
        }

    }
    updateOnWatchEvent(){
        const self = this;
        for(let i = 0; i < self.addedNodes.length; i++){
            const newNode = self.addedNodes[i];
            self.nodes.push(newNode);
        }
        self.addedNodes = [];
        Object.keys(self.services).forEach((key)=>{
            let service = self.services[key];
            service.processNodes(localStorage.getItem(service.settings.cacheName));
        });
        console.log(self.nodes.length);
    }
    cleanNodesList(removedNodes){
        const self = this;
        return new Promise((resolve, reject)=>{
            let iterrator = 0;
            let i = 0;
            const timer = setInterval(()=>{
                for (i = iterrator; i < iterrator + 10 ; i++) {//добавляем элементы dom к массиву
                    if(i<self.nodes.length){
                        for(let j=0;j<removedNodes.length;j++){
                            const removedNode = removedNodes[j];
                            if(self.nodes[i] === removedNode){
                                self.nodes.splice(i, 1);
                                i--;
                            }

                        }
                    }
                }
                if(iterrator < self.nodes.length
                ){
                    iterrator = i;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            },10);
        });

    }
    static _createUiBlock(){
        const position = document.body.firstChild;
        const uiBlock = document.createElement('div');
        uiBlock.classList.add('special-version');
        uiBlock.classList.add('special-version__ignore');
        document.body.insertBefore(uiBlock,position);
        return uiBlock;
    }
    _createUi(){
        this._addServiceUi(this.uiBlock,1);
        this._initSettingsButton();
        this._createAdditionalMenu();
        this._addServiceUi(this.uiBlock,3);
        this._initResetButton();
        const textReadService = this.services['PluginSpeechSystem'];
        if(textReadService){
            let settings = Helper.getSettings();
            textReadService.enabled = (settings.speech === 'on');
            textReadService.initReadNodes();
        }
    }
    _addServiceUi(block,position){
        for(let i=0; i<this.servicesList.length;i++){
            const serviceListItem = this.servicesList[i];
            const currentService = this.services[serviceListItem.serviceName];
            if(currentService) {
                if(serviceListItem.position === position){
                    try{
                        block.appendChild(currentService.createUi(serviceListItem.groupName));
                    } catch (e) {

                    }
                }
            }
        }
    }
    _createAdditionalMenu(){
        this._addServiceUi(this.additionalSettingsBlockInner,2);
        const resetButtonGroup = Helper.createGroup();
        const resetInnerGrop = Helper.createGroup();
        let buttonContent =`<svg class="special-version__ignore"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 511 383" width="511" height="383"><path class="special-version__ignore"  d=" M 361.161 227.703 C 376.198 205.907 383.721 181.781 383.721 155.328 C 383.721 147.906 382.961 139.911 381.435 131.344 L 301.497 274.665 C 326.235 265.152 346.125 249.489 361.161 227.703 L 361.161 227.703 Z  M 158.456 298.936 C 108.97 276.667 68.33 240.981 36.547 191.873 C 65.478 146.952 101.737 113.355 145.324 91.09 C 133.714 110.882 127.907 132.296 127.907 155.327 C 127.907 175.692 132.568 195.007 141.897 213.282 C 151.224 231.556 164.167 246.682 180.727 258.674 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 Z  M 265.525 91.938 C 262.863 94.605 259.619 95.937 255.813 95.937 C 239.445 95.937 225.452 101.745 213.842 113.353 C 202.229 124.968 196.426 138.956 196.426 155.324 C 196.426 159.135 195.09 162.368 192.427 165.034 C 189.759 167.701 186.525 169.033 182.72 169.033 C 178.911 169.033 175.675 167.699 173.01 165.034 C 170.343 162.368 169.011 159.131 169.011 155.324 C 169.011 131.534 177.531 111.118 194.564 94.082 C 211.598 77.048 232.011 68.529 255.805 68.529 C 259.611 68.529 262.848 69.865 265.518 72.528 C 268.18 75.192 269.514 78.429 269.514 82.235 C 269.515 86.043 268.181 89.279 265.525 91.938 L 265.525 91.938 L 265.525 91.938 Z  M 372.872 30.272 C 373.063 29.894 373.152 29.037 373.152 27.704 C 373.152 24.467 371.63 21.902 368.581 19.989 C 368.013 19.609 366.158 18.514 363.013 16.702 C 359.875 14.897 356.873 13.135 354.024 11.42 C 351.17 9.707 348.035 7.948 344.602 6.14 C 341.176 4.331 338.227 2.856 335.756 1.713 C 333.277 0.572 331.567 0 330.615 0 C 327.189 0 324.523 1.525 322.621 4.569 L 307.208 32.265 C 289.892 29.031 272.757 27.411 255.817 27.411 C 204.616 27.411 157.413 40.357 114.204 66.242 C 70.998 92.131 34.836 127.436 5.711 172.165 C 1.903 178.07 0 184.637 0 191.87 C 0 199.101 1.903 205.671 5.711 211.568 C 22.459 237.641 42.303 260.964 65.239 281.517 C 88.175 302.078 113.25 318.535 140.468 330.913 C 132.093 345.186 127.906 353.469 127.906 355.755 C 127.906 359.18 129.43 361.843 132.476 363.745 C 155.695 377.074 168.446 383.73 170.732 383.73 C 174.154 383.73 176.821 382.201 178.724 379.155 L 192.714 353.749 C 212.891 317.782 242.962 263.818 282.936 191.871 C 322.908 119.922 352.886 66.056 372.872 30.272 L 372.872 30.272 L 372.872 30.272 Z  M 505.916 172.165 C 495.063 154.085 481.313 136.571 464.661 119.631 C 448.015 102.692 430.639 88.135 412.556 75.951 L 394.569 107.928 C 426.354 129.816 453.194 157.798 475.079 191.867 C 452.055 227.649 423.356 256.867 389.009 279.515 C 354.651 302.176 317.297 315.208 276.944 318.63 L 255.815 356.318 C 298.072 356.318 337.995 347.28 375.584 329.197 C 413.174 311.121 446.252 285.709 474.8 252.972 C 488.122 237.551 498.495 223.753 505.921 211.571 C 509.727 205.095 511.629 198.525 511.629 191.869 C 511.626 185.208 509.724 178.641 505.916 172.165 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg><span class="special-version__ignore" >${this.lng.standardVersion}</span>`;
        let resetButton = Helper.createButton(buttonContent,this.lng.standardVersion);
        resetButton.addEventListener('click',() => {
            this.reset();
        },false);
        resetInnerGrop.appendChild(resetButton);
        buttonContent =`<svg class="special-version__ignore" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 212 212" width="212" height="212"><path class="special-version__ignore" d=" M 131.196 106 L 206.782 30.414 C 213.74 23.456 213.74 12.176 206.782 5.219 C 199.824 -1.739 188.545 -1.739 181.587 5.219 L 106 80.806 L 30.413 5.218 C 23.455 -1.74 12.176 -1.74 5.218 5.218 C -1.739 12.176 -1.739 23.456 5.218 30.413 L 80.805 105.999 L 5.218 181.586 C -1.739 188.544 -1.739 199.824 5.218 206.781 C 12.176 213.739 23.455 213.739 30.413 206.781 L 106 131.194 L 181.587 206.781 C 188.544 213.739 199.824 213.739 206.782 206.781 C 213.74 199.823 213.74 188.544 206.782 181.586 L 131.196 106 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg><span class="special-version__ignore" >${this.lng.closeAdditional}</span>`;
        resetButton = Helper.createButton(buttonContent,this.lng.closeAdditional);
        resetButton.addEventListener('click',() => {
            this._triggerAdditionalBlock();
        },false);
        resetInnerGrop.appendChild(resetButton);
        resetButtonGroup.appendChild(resetInnerGrop);
        this.additionalSettingsBlockInner.appendChild(resetButtonGroup);
    }
    _initResetButton(){
        this.resetButtonGroup = Helper.createGroup();
        const buttonContent =`<svg class="special-version__ignore"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 511 383" width="511" height="383"><path class="special-version__ignore"  d=" M 361.161 227.703 C 376.198 205.907 383.721 181.781 383.721 155.328 C 383.721 147.906 382.961 139.911 381.435 131.344 L 301.497 274.665 C 326.235 265.152 346.125 249.489 361.161 227.703 L 361.161 227.703 Z  M 158.456 298.936 C 108.97 276.667 68.33 240.981 36.547 191.873 C 65.478 146.952 101.737 113.355 145.324 91.09 C 133.714 110.882 127.907 132.296 127.907 155.327 C 127.907 175.692 132.568 195.007 141.897 213.282 C 151.224 231.556 164.167 246.682 180.727 258.674 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 L 158.456 298.936 Z  M 265.525 91.938 C 262.863 94.605 259.619 95.937 255.813 95.937 C 239.445 95.937 225.452 101.745 213.842 113.353 C 202.229 124.968 196.426 138.956 196.426 155.324 C 196.426 159.135 195.09 162.368 192.427 165.034 C 189.759 167.701 186.525 169.033 182.72 169.033 C 178.911 169.033 175.675 167.699 173.01 165.034 C 170.343 162.368 169.011 159.131 169.011 155.324 C 169.011 131.534 177.531 111.118 194.564 94.082 C 211.598 77.048 232.011 68.529 255.805 68.529 C 259.611 68.529 262.848 69.865 265.518 72.528 C 268.18 75.192 269.514 78.429 269.514 82.235 C 269.515 86.043 268.181 89.279 265.525 91.938 L 265.525 91.938 L 265.525 91.938 Z  M 372.872 30.272 C 373.063 29.894 373.152 29.037 373.152 27.704 C 373.152 24.467 371.63 21.902 368.581 19.989 C 368.013 19.609 366.158 18.514 363.013 16.702 C 359.875 14.897 356.873 13.135 354.024 11.42 C 351.17 9.707 348.035 7.948 344.602 6.14 C 341.176 4.331 338.227 2.856 335.756 1.713 C 333.277 0.572 331.567 0 330.615 0 C 327.189 0 324.523 1.525 322.621 4.569 L 307.208 32.265 C 289.892 29.031 272.757 27.411 255.817 27.411 C 204.616 27.411 157.413 40.357 114.204 66.242 C 70.998 92.131 34.836 127.436 5.711 172.165 C 1.903 178.07 0 184.637 0 191.87 C 0 199.101 1.903 205.671 5.711 211.568 C 22.459 237.641 42.303 260.964 65.239 281.517 C 88.175 302.078 113.25 318.535 140.468 330.913 C 132.093 345.186 127.906 353.469 127.906 355.755 C 127.906 359.18 129.43 361.843 132.476 363.745 C 155.695 377.074 168.446 383.73 170.732 383.73 C 174.154 383.73 176.821 382.201 178.724 379.155 L 192.714 353.749 C 212.891 317.782 242.962 263.818 282.936 191.871 C 322.908 119.922 352.886 66.056 372.872 30.272 L 372.872 30.272 L 372.872 30.272 Z  M 505.916 172.165 C 495.063 154.085 481.313 136.571 464.661 119.631 C 448.015 102.692 430.639 88.135 412.556 75.951 L 394.569 107.928 C 426.354 129.816 453.194 157.798 475.079 191.867 C 452.055 227.649 423.356 256.867 389.009 279.515 C 354.651 302.176 317.297 315.208 276.944 318.63 L 255.815 356.318 C 298.072 356.318 337.995 347.28 375.584 329.197 C 413.174 311.121 446.252 285.709 474.8 252.972 C 488.122 237.551 498.495 223.753 505.921 211.571 C 509.727 205.095 511.629 198.525 511.629 191.869 C 511.626 185.208 509.724 178.641 505.916 172.165 Z " fill-rule="evenodd" fill="rgb(0,0,0)"/></svg>`;
        const resetButton = Helper.createButton(buttonContent,this.lng.standardVersion);
        resetButton.classList.add('special-version__button_square');
        resetButton.addEventListener('click',() => {
           this.reset();
        },false);
        this.resetButtonGroup.appendChild(resetButton);
        this.uiBlock.appendChild(this.resetButtonGroup);
    }
    _initSettingsButton(){
        this.settingsGroup = Helper.createGroup();
        this.settingsGroup.appendChild(this._createAdditionalSettingsBlock());
        this.uiBlock.appendChild(this.settingsGroup);
    }
    reset(){
        Object.keys(this.services).forEach((key)=>{
            let service = this.services[key];
            service.processNodes('');
        });
        document.body.classList.remove('special-version-on');
        try{
            this.services['PluginSpeechSystem'].playText(this.lng.specialVersionOn);
            this.services['PluginSpeechSystem'].playText(this.lng.standardVersion);
            this.services['PluginSpeechSystem'].enabled = false;
        } catch (e) {

        }
            document.body.removeChild(this.uiBlock);
            this.uiBlock = null;
            window.localStorage.removeItem('specialVersion');
    }
    _createAdditionalSettingsBlock(){
        const additionalSettingsBlock = document.createElement('div');
        additionalSettingsBlock.classList.add('special-version__additional-settings-block');
        additionalSettingsBlock.classList.add('special-version__ignore');
        this.additionalSettingsBlock = additionalSettingsBlock;
        this.additionalSettingsBlockInner = Helper.createGroup();
        this.additionalSettingsBlock.appendChild(this.additionalSettingsBlockInner);
        this.uiBlock.appendChild(additionalSettingsBlock);
        const button = Helper.createButton('<svg class="special-version__ignore" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 21.589 21.137" width="21.589" height="21.137"><path class="special-version__ignore"  d=" M 18.622 8.145 L 18.077 6.85 C 18.077 6.85 19.345 3.989 19.233 3.879 L 17.554 2.24 C 17.438 2.127 14.576 3.433 14.576 3.433 L 13.256 2.9 C 13.256 2.9 12.09 0 11.93 0 L 9.561 0 C 9.396 0 8.317 2.906 8.317 2.906 L 6.999 3.441 C 6.999 3.441 4.077 2.199 3.965 2.31 L 2.289 3.951 C 2.173 4.064 3.507 6.867 3.507 6.867 L 2.962 8.16 C 2.962 8.16 0 9.301 0 9.455 L 0 11.777 C 0 11.939 2.969 12.996 2.969 12.996 L 3.514 14.287 C 3.514 14.287 2.246 17.146 2.357 17.256 L 4.035 18.899 C 4.149 19.01 7.012 17.704 7.012 17.704 L 8.333 18.239 C 8.333 18.239 9.499 21.137 9.66 21.137 L 12.029 21.137 C 12.193 21.137 13.273 18.231 13.273 18.231 L 14.595 17.696 C 14.595 17.696 17.511 18.938 17.624 18.829 L 19.302 17.188 C 19.419 17.073 18.082 14.272 18.082 14.272 L 18.626 12.979 C 18.626 12.979 21.589 11.836 21.589 11.68 L 21.589 9.36 C 21.59 9.199 18.622 8.145 18.622 8.145 Z  M 14.256 10.568 C 14.256 12.435 12.703 13.955 10.795 13.955 C 8.889 13.955 7.334 12.435 7.334 10.568 C 7.334 8.701 8.889 7.183 10.795 7.183 C 12.704 7.184 14.256 8.701 14.256 10.568 Z " /></svg><span class="special-version__ignore" >'+this.lng.additionalSettings+'</span>',this.lng.additionalSettings);
        button.addEventListener('click',()=>{
            this._triggerAdditionalBlock();
        });
        return button;
    }
    _triggerAdditionalBlock(){
        if(this.additionalSettingsBlock.classList.contains('state_show')){
            this.additionalSettingsBlock.classList.remove('state_show');
            this.additionalSettingsBlock.style.height = 0;
        } else {
            this.additionalSettingsBlock.classList.add('state_show');
            this.additionalSettingsBlock.style.height = `${this.additionalSettingsBlockInner.offsetHeight}px`;
        }
    }
    _setDocumentStyle(cssString){
        if(cssString){
            if(!this.style){
                this.style = document.createElement('style');
                this.style.innerHTML = cssString;
                document.head.appendChild(this.style);
            }
        } else {
            try{
                document.head.removeChild(this.style);
            } catch (e) {
                console.log("%c there is no header styles add", "color: yellow; font-style: italic; background-color: grey; padding: 2px;");
            }
            this.style = null;
        }

    }
}

module.exports = Application;
