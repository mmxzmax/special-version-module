import Promise from 'promise-polyfill';

export default class Helper {
    constructor(){}
    static getNodes(parentNode){
        return new Promise(( resolve, reject ) => {
            const PARENTNODE = parentNode? parentNode : document.body;
            try {
                const NODEITERATOR = document.createNodeIterator(
                    PARENTNODE,
                    NodeFilter.SHOW_TEXT, node => {
                        return node.wholeText ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                    }
                );
                const NODES = [];
                const ITERATORTIMER = setInterval(()=>{
                    const currentNode = NODEITERATOR.nextNode();
                    if(currentNode){
                        if(currentNode.parentNode !== PARENTNODE){
                            if(String(currentNode.wholeText).replace(/\s/g, '').length){
                                NODES.push(currentNode.parentNode);
                            }
                        }
                    } else {
                        clearInterval(ITERATORTIMER);
                        resolve(NODES);
                    }
                },1);
            } catch (e) {
                reject(e);
            }
        });
    }
    static createUiBlock(){
        const position = document.body.firstChild;
        const uiBlock = document.createElement('div');
        uiBlock.classList.add('special-version');
        uiBlock.classList.add('special-version__ignore');
        document.body.insertBefore(uiBlock,position);
        return uiBlock;
    }
    static getStyle(element){
        return  window.getComputedStyle(element, null) || element.currentStyle;
    }
    static getCurStyle(elem){
      const ELEMSTYLE = Helper.getStyle(elem);
      const CURRENTFONTSIZE = elem.style.fontSize? elem.style.fontSize : ELEMSTYLE.fontSize;
      const FONTSIZE = CURRENTFONTSIZE? CURRENTFONTSIZE : 14;
      return parseInt(String(FONTSIZE).replace('px',''));
    }
    static setToParent(element,propretyName,value,noDelay){
        if(element.parentNode!==document.body){
            if(!noDelay){
                setTimeout(()=> {
                    try{ element.parentNode.style[propretyName] = value;}
                    catch (e) {
                        console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;");
                    }

                },200);
            } else {
                try{ element.parentNode.style[propretyName] = value;}
                catch (e) {
                    console.log("%c no node found", "color: yellow; font-style: italic; background-color: grey; padding: 2px;");
                }
            }
        }
    }
    static isEmptyObject(obj) {
        for(var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return true;
    }
    static setSettings(settings){
        window.localStorage.setItem('specialVersionSettings',JSON.stringify(settings));
    }
    static createButton(content,altText){
        const button = document.createElement('div');
        button.type = 'button';
        button.classList.add('special-version__button');
        button.classList.add('js-special-version__button');
        button.classList.add('special-version__ignore');
        button.innerHTML = content;
        if(altText){
            button.setAttribute('data-read', altText);
        }
        return button;
    }
    static createGroup(groupTitle){
        const group = document.createElement('div');
        if(groupTitle){
            const legend =  document.createElement('h4');
            legend.classList.add('special-version__group-title');
            legend.classList.add('special-version__ignore');
            legend.innerHTML = groupTitle;
            group.appendChild(legend);
        }
        group.classList.add('special-version__group');
        group.classList.add('special-version__ignore');
        return group;
    }
    static buttonClassTrigger(button){
        const group = button.parentNode;
        const groupButtons = group.querySelectorAll('.special-version__button');
        for(let i=0;i<groupButtons.length;i++){
            groupButtons[i].classList.remove('state_active')
        }
        button.classList.add('state_active');
    }
    static getSettings(){
        const settingsString = window.localStorage.getItem('specialVersionSettings');
        return JSON.parse(settingsString);
    }
    static addStyleSheet(url){
        let styleSheet = document.createElement('link');
        styleSheet.rel = 'stylesheet';
        styleSheet.href =url;
        document.head.appendChild(styleSheet);
        return styleSheet;
    }
}

module.exports = Helper;
