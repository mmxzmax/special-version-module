import Promise from 'promise-polyfill';

export default class Helper {
    constructor(){}
    static getNodes(ignoreNodes){
        return new Promise(( resolve, reject ) => {
            readDom(document.body.querySelectorAll('*')).then(nodes => {
                // console.log(nodes);
                Helper.cleanNodes(nodes,ignoreNodes).then(result => {
                    resolve(result);
                });
            })
        });
        function toArr(collection){
            let arr=[];
            for(let i=0;i<collection.childNodes.length;i++){
                arr.push(collection.childNodes[i]);
            }
            return arr;
        }
        function readDom(collection){
            return new Promise((resolve, reject) => {
                let textNodes=[];
                const nodesLength = collection.length;
                // console.log('nodesLength',nodesLength);
                let iterrator = 0;
                let i = 0;
                const timer = setInterval(()=>{
                    for (i = iterrator; i < iterrator + 10 ; i++) {//добавляем элементы dom к массиву
                        let elem=collection[i];
                        if(i<nodesLength){
                            // console.log('processed:'+(i+1)+' of '+nodesLength+ ' body child nodes');
                            textNodes.push(elem);
                        }
                    }
                    if(iterrator < nodesLength){
                        iterrator = i;
                    } else {
                        clearInterval(timer);
                        resolve(textNodes);
                    }
                },10)
            })
        }

    }
    static cleanNodes(nodes,ignoreNodes){
        let ignore = ignoreNodes? ignoreNodes :  [];
        ignore.push('script');
        ignore.push('#text');
        ignore.push('#comment');
        ignore.push('img');
        ignore.push('svg');
        ignore.push('use');
        ignore.push('noscript');
        ignore.push('br');
        ignore.push('hr');
        ignore.push('ymaps');
        return new Promise((resolve, reject) => {
            let iterrator = 0;
            let i = 0;

            if(!nodes){
                reject();
            }

            const timer = setInterval(()=>{
                for (i = iterrator; i < iterrator + 10 ; i++) {//добавляем элементы dom к массиву
                    if(i<nodes.length){
                        let elem = null;
                        try{
                            elem = nodes[i];
                        }
                        catch (e) {}
                        for(let j = 0; j<ignore.length;j++){
                            if(elem){
                                if(String(elem.nodeName).toLowerCase()===ignore[j]){
                                    try{
                                        elem.classList.add('special-version__ignore');
                                    } catch (e) {}
                                    try {
                                        nodes.splice(i, 1);
                                        i--;
                                    } catch (e) {
                                        reject();
                                        break;
                                    }
                                }
                            }

                        }
                    }
                }
                if(iterrator < nodes.length
                ){
                    iterrator = i;
                } else {
                    clearInterval(timer);
                    resolve(nodes);
                }
            },10);
        });
    }
    static getStyle(element){
        return  window.getComputedStyle(element, null) || element.currentStyle;
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
