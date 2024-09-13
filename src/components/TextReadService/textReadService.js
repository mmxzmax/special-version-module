import Module from './../module/module';
import TtsService from './TtsService';



export default class PluginSpeechSystem extends Module{
    constructor(textBlocks,settings){
        super(textBlocks,settings);
        this.button = '';
        this.enabled = (this.value === 'on');
        this.voice = {};
        this.voice.name = undefined;
        this.hasSpeech = false;
        this.msg = null;
        this.synth = null;
        this.progress = 0;
        this.hasSpeech = true;
        this.isNativeApi = false;
        if('speechSynthesis' in window) {
            this.isNativeApi = true;
            this.synth = window.speechSynthesis;
            this.initService();
        } else {
          console.log(this.settings);
            this.synth = new TtsService(
              this.settings.api,
              this.settings.lngCode,
              this.settings.lngCodes);
        }
    }
    initService(){
      const SELF = this;
      const TIMER = setInterval(()=>{
        if(!SELF.msg){
          SELF.msg = SELF.getvoices();
        } else {
          clearInterval(TIMER);
        }
      },250);
    }
    getvoices(){
      const VOICES = this.synth.getVoices();
      for(let i = 0; i < VOICES.length ; i++) {
        const LANG = new RegExp(this.settings.lngCode,'g');
        const VOICE = VOICES[i];
        if(LANG.test(VOICE.lang)){
          this.voice.name = VOICE.name;
          break;
        }
      }
      const MSG = new window.SpeechSynthesisUtterance();
      MSG.voice = this.synth.getVoices().filter(voice => { return voice.name === this.voice.name; })[0];
      return MSG;
    }
    processNodes(params) {
      super.processNodes();
      if(params){
        if(params === 'on'){
          this.enabled = (params === 'on');
        } else {
          setTimeout(()=>{
            this.enabled = (params === 'on');
          },250);
        }
      }
    }
  initReadNodes(){
    let TIMER = null;
        document.addEventListener('selectionchange', () => {
          clearTimeout(TIMER);
          this.progress = 0;
          TIMER =setTimeout(()=>{
            this.playText(this.getSelectionHtml());
          },100);
        });
        const buttons = document.querySelectorAll('.js-special-version__button');
        for(let i=0;i<buttons.length;i++){
            const currentButton = buttons[i];
            currentButton.addEventListener('click',()=>{
              clearTimeout(TIMER);
              this.progress = 0;
                const text = currentButton.getAttribute('data-read');
                TIMER =setTimeout(()=>{
                  this.playText(text);
                },100);
            },false);
        }
    }
    createUi(uiTittle) {
      if(this.hasSpeech){
        this.button = super.createUi(uiTittle);
      }
      return this.button;
    }

    playText(text,callback){
      if(this.isNativeApi){
        this.playNative(text,callback);
      } else {
        this.playByTts(text,callback);
      }
    }

    playNative(text,callback){
      this.msg = this.getvoices();
      this.progress = 0;
      this.synth.cancel();
      const SELF = this;
      if(this.enabled){
        this.msg.text = text? text : '';
        this.synth.speak(this.msg);
        this.msg.customCallback = callback;
        this.msg.onend = function() {
          if(SELF.msg.customCallback){
            SELF.msg.customCallback();
          }
        };
        const REPEATER = setInterval(function () {
          console.log(SELF.synth.speaking);
          if (!SELF.synth.speaking) clearInterval(REPEATER);
          else SELF.synth.resume();
        }, 14000);
      }
      if(!SELF.msg){
        const TIMER = setInterval(()=>{
          if(SELF.msg){
            SELF.playText(text,callback);
            clearInterval(TIMER);
          }
        },250);
      }
    }

    playByTts(text,callback){
      if(this.enabled) {
        this.synth.play(text);
        this.synth.player.addEventListener('ended', () => {
          callback();
        }, false);
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
