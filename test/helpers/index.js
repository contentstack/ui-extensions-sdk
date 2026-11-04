const  clone = (source) => JSON.parse(JSON.stringify(source));
module.exports.clone = clone ; 
// Each Extension registers one post-robot 'extensionEvent' listener and post-robot
// refuses a second one for the same window, so specs that build several reset it.
const resetExtensionEventListener = () => {
  delete window.__postRobot__.requestListeners.extensionEvent;
};
module.exports.resetExtensionEventListener = resetExtensionEventListener;
