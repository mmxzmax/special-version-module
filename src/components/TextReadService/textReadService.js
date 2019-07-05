import Module from './../module/module';



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
        if('speechSynthesis' in window) {
            this.hasSpeech = true;
            this.synth = window.speechSynthesis;
            this.initService();
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
      const SELF =this;
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
      this.progress = 0;
      this.synth.cancel();
      const SELF = this;
      const playlist = PluginSpeechSystem.processStr(text);
      if(this.enabled){
        this.playPart(playlist);
        this.msg.customCallback = callback;
        this.msg.onend = function() {
          if(playlist.length > SELF.progress){
              SELF.progress++;
              SELF.playPart(playlist);
          } else {
            if(SELF.msg.customCallback){
              SELF.msg.customCallback();
            }
          }
        };

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

    playPart(playlist){
      this.msg.text = playlist[this.progress] ? playlist[this.progress] : '';
      this.synth.speak(this.msg);
    }

    static processStr(text){
      let parts;
      if(text.length>100){
        parts = text.match(/[\s\S]{1,100}/g) || [];
      } else {
        parts = [];
        parts.push(text);
      }
      return parts;
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


module.exports = PluginSpeechSystem;
