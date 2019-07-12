import Module from './../module/module';


export default class ImagesService extends Module{
    constructor(nodeList,settings){
        super(nodeList,settings);
    }
    init(){
        this.nodes = [];
        const img =ImagesService.findImages();
        const bgImg =ImagesService.findBgImages();
        const svg = ImagesService.findSvgImg();
        this._cacheBlocks(img);
        this._cacheBlocks(bgImg);
        this._cacheBlocks(svg);
    }
    static findImages(){
        return document.getElementsByTagName("img");
    }
    static findBgImages(){
        let imgNodes = document.querySelectorAll('*');
        let resultArr = [];
        for(let i=0;i<imgNodes.length;i++){
            const element = imgNodes[i];
            const styleString  =String(element.getAttribute('style'));
            const pos = !(styleString.indexOf('url(') + 1);
            if(!pos){
                resultArr.push(element);
            }
        }
        return resultArr;
    }
    static findSvgImg(){
        return document.getElementsByTagName("svg");
    }
    _cacheBlocks(elemets){
        for(let i=0;i<elemets.length;i++){
            const element = elemets[i];
            this.nodes.push(element);
        }
    }
    hideImages(){
        this.showImages();
        for(let i=0;i<this.nodes.length;i++){
            const element = this.nodes[i];
            element.style.display = 'none';
        }
    }
    showImages(){
        for(let i=0;i<this.nodes.length;i++){
            const element = this.nodes[i];
            element.style.display = '';
            element.style.filter = '';
        }
    }
    setToMonochrome(){
        this.showImages();
        for(let i=0;i<this.nodes.length;i++){
            const element = this.nodes[i];
            element.style.filter = 'grayscale(100%)';
        }
    }
    changeImg(value) {
      try {
        let val;
        if(value.value){
          val = value.value;
        } else {
          val = value;
        }
        if(parseInt(val) === 2){
          this.hideImages();
        } else if(parseInt(val) === 3){
          this.showImages();
          this.setToMonochrome();
        } else {
          this.showImages();
        }
      } catch (e) {
        console.warn(e);
      }
    }
  processNodes(params) {
    super.processNodes(params);
    this.changeImg(params)
  }
}

module.exports = ImagesService;
