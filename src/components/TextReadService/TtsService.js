export default class TtsService {
  constructor(lng,apiKey){
    this.player = this.createPlayer();
    this.lng = lng;
    this.apiKey = apiKey;
  }
  createPlayer(){
    const player = document.createElement('audio');
    player.style.display='none';
    // const source = document.createElement('source');
    // source.type ='audio/mp3';
    // player.appendChild(source);
    // this.source = source;
    document.body.appendChild(player);
    return player;
  }
  play(text){
    this.player.pause();
    this.player.src= `http://api.voicerss.org/?key=${this.apiKey}&hl=${this.getLngCode(this.lng)}&c=MP3&src=${text}`;
    this.player.play();
  }
  getLngCode(lngCode){
    const LNG =[
      "ca-es",
      "zh-cn",
      "zh-hk",
    "zh-tw",
    "da-dk",
    "nl-nl",
    "en-au",
    "en-ca",
    "en-gb",
    "en-in",
    "en-us",
    "fi-fi",
    "fr-ca",
    "fr-fr",
    "de-de",
    "it-it",
    "ja-jp",
    "ko-kr",
    "nb-no",
    "pl-pl",
    "pt-br",
    "pt-pt",
    "ru-ru",
    "es-mx",
    "es-es",
    "sv-se",
    ];
    const LANG = new RegExp(lngCode,'g');
    for(let i=0; i<LNG.length; i++){
      if(LANG.test(String(LNG[i]))){
          return  LNG[i];
      }
    }
  }
}

module.exports = TtsService;
