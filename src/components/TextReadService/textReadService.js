import Module from './../module/module';



export default class PluginSpeechSystem extends Module{
    constructor(textBlocks,settings){
        super(textBlocks,settings);
        this.button = '';
        this.enabled = (this.value === 'on');
        this.voice = {};
        this.hasLang = false;
        this.hasSpeech = false;
        if('speechSynthesis' in window) {

            this.hasSpeech = true;

            window.addEventListener('load',() => {
                this.getvoices();
            },false);
            window.speechSynthesis.onvoiceschanged = () => {
                this.getvoices();
            };
        }
    }
    initReadNodes(){

        document.addEventListener('selectionchange', () => {
            this.playText(this.getSelectionHtml());
        });

        const buttons = document.querySelectorAll('.js-special-version__button');

        for(let i=0;i<buttons.length;i++){
            const currentButton = buttons[i];
            currentButton.addEventListener('click',()=>{
                const text = currentButton.getAttribute('data-read');
                    this.playText(text);
            },false);
        }

    }
    getvoices(){
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        for(let i = 0; i < voices.length ; i++) {
            const lang = new RegExp(this.settings.lngCode,'g');
            if(lang.test(voices[i].lang)){
                this.hasLang = true;
                this.voice.name = voices[i].name;
            }
        }
        console.log(this.voice.name);
        if(!this.hasLang){
            this.button.style.display = 'none';
        }
    }
    createUi(uiTittle) {
        if(this.hasSpeech){
            this.button = super.createUi(uiTittle);
        }
        return this.button;
    }

    playText(text,callback){
        let timeoutResumeInfinity;
        if(this.enabled){
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance();

            msg.voice = speechSynthesis.getVoices().filter(voice => { return voice.name === this.voice.name; })[0];
            msg.text = text;
            window.speechSynthesis.speak(msg);
            msg.onstart = function() {
                resumeInfinity();
            };
            msg.onend = function() {
                clearTimeout(timeoutResumeInfinity);
                if(callback){
                    callback();
                }
            };
        }
        function resumeInfinity() {
            window.speechSynthesis.resume();
            timeoutResumeInfinity = setTimeout(resumeInfinity, 1000);
        }

    }
    callback(param) {
        if(param.value === 'on'){
            this.enabled = true;
            this.playText(param.buttonAltText);
        } else {
            this.playText(param.buttonAltText,() => {
                this.enabled = (param.value === 'on');
            });
        }
    }
    getSelectionHtml() {
        let html = "";
        if (typeof window.getSelection != "undefined") {
            const sel = window.getSelection();
            if (sel.rangeCount) {
                const container = document.createElement("div");
                for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerText;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type === "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        return html;
    }

}


