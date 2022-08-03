'use babel';

import SlotJagoView from './slot-jago-view';
import { CompositeDisposable } from 'atom';

export default {

  slotJagoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotJagoView = new SlotJagoView(state.slotJagoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotJagoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-jago:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotJagoView.destroy();
  },

  serialize() {
    return {
      slotJagoViewState: this.slotJagoView.serialize()
    };
  },

  toggle() {
    console.log('SlotJago was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
