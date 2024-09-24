import Module from './../module/module';
import Helper from './../Helper/Helper';

export default class ListSomeCrearService extends Module {
    constructor(textNodes, settings){
      super(textNodes, settings);
    }
    processNodes(params) {
        super.processNodes(params);
    }
    afterUiCreated() {
      // code run after render buttons
    }
}

