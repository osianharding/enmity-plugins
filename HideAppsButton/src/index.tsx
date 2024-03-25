import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import { getByProps } from 'enmity/metro';
import { findInReactTree } from 'enmity/utilities';

const Patcher = create('hide-apps-button');
const ChatInputWrapper = getByProps('ChatInput');
const HideAppsButton: Plugin = {
   ...manifest,

   onStart() {
      Patcher.after(ChatInputWrapper.ChatInput.prototype, 'render', (ctx, [props], res) => {
         const chatInput: any = findInReactTree(res, r => r.props?.hideAppsButton === 'boolean');
         if (!chatInput) return;

         chatInput.props.hideAppsButton = true;
      });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(HideAppsButton);