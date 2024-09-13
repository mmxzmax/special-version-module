export default class TtsService {
  constructor(apiURL,lng,LNGCodes){
    this.api = apiURL;
    console.log(this.api);
    this.player = this.createPlayer();
    this.lng = lng;
    this.lngCodes = LNGCodes;
  }
  createPlayer(){
    const player = document.createElement('audio');
    player.style.display='none';
    document.body.appendChild(player);
    return player;
  }
  play(text){
    this.player.pause();
    this.player.src= this.parseApiSettings(text);
    this.player.play();
  }
  parseApiSettings(text){
    let str = this.api.replace('{{lang}}',this.getLngCode(this.lng));
    str = str.replace('{{text}}',text);
    return str;
  }
  getLngCode(lngCode){
    const LNG = this.lngCodes;
    const LANG = new RegExp(lngCode,'g');
    for(let i=0; i<LNG.length; i++){
      if(LANG.test(String(LNG[i]))){
          return  LNG[i];
      }
    }
  }
}
