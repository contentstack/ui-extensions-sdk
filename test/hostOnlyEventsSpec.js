import testData from './data/testData.json';
import Extension from '../lib/extension.js';

// Security bug: extensionEvent must be accepted only from the host window
// (window.parent), never from a sibling iframe or a popup.
// Karma runs specs in an iframe, so window.parent is replaced with a separate
// frame's window to prove the listener is scoped to whatever the parent is.
describe('Extension host-only events', () => {
  let parentDescriptor;
  let hostFrame;
  let siblingFrame;

  const listeners = () => window.__postRobot__.requestListeners.extensionEvent;

  beforeEach(() => {
    // other specs build Extension too; post-robot allows one listener per window
    delete window.__postRobot__.requestListeners.extensionEvent;
    hostFrame = document.createElement('iframe');
    siblingFrame = document.createElement('iframe');
    document.body.appendChild(hostFrame);
    document.body.appendChild(siblingFrame);
    parentDescriptor = Object.getOwnPropertyDescriptor(window, 'parent');
    Object.defineProperty(window, 'parent', { configurable: true, get: () => hostFrame.contentWindow });
  });

  afterEach(() => {
    Object.defineProperty(window, 'parent', parentDescriptor);
    hostFrame.remove();
    siblingFrame.remove();
  });

  it('registers the extensionEvent listener for window.parent only', () => {
    expect(window.parent).not.toBe(window);
    // eslint-disable-next-line no-new
    new Extension({ data: JSON.parse(JSON.stringify(testData)) });

    expect(listeners().get(hostFrame.contentWindow)).toBeDefined();
    expect(listeners().get(siblingFrame.contentWindow)).toBeUndefined();
    expect(listeners().get(window.__postRobot__.WINDOW_WILDCARD)).toBeUndefined();
  });

  // Behaviour: a request-shaped message, as post-robot's own 'message' listener
  // receives it, from the host is handled; the same message from a sibling is dropped.
  let messageId = 0;
  const deliver = (source, payload) => {
    messageId += 1;
    window.dispatchEvent(new MessageEvent('message', {
      source,
      origin: window.location.origin,
      data: JSON.stringify({
        __postRobot__: {
          type: 'postrobot_message_request',
          id: `host-only-spec-${messageId}`,
          hash: `host-only-spec-${messageId}`,
          name: 'extensionEvent',
          sourceDomain: window.location.origin,
          fireAndForget: true,
          data: payload
        }
      })
    }));
  };

  it('runs onSave for an entrySave from the host and ignores one from a sibling frame', (done) => {
    const extension = new Extension({ data: JSON.parse(JSON.stringify(testData)) });
    const saved = [];
    extension.entry.onSave((data) => saved.push(data));

    deliver(siblingFrame.contentWindow, { name: 'entrySave', data: { from: 'sibling' } });
    deliver(hostFrame.contentWindow, { name: 'entrySave', data: { from: 'host' } });

    setTimeout(() => {
      expect(saved).toEqual([{ from: 'host' }]);
      done();
    }, 100);
  });
});
