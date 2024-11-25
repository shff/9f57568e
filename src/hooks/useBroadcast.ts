import { useEffect, useRef } from "react";

/**
 * This hook will triggers a broadcast messages to all tabs open in the browser
 * whenever the dependencies change. The dependencies use the same rules of useEffect.
 * It receives a callback that is called automatically when in other tabs.
 *
 * @param {string} channelName Name of the broadcast channel
 * @param {function} callback Callback function to be called when a message is received
 * @param {array} deps Dependencies that trigger a broadcast message when changed
 * @returns Function to broadcast a message to all tabs
 */
const useBroadcast = (channelName: string, callback: () => void, deps: unknown[]) => {
  const channel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    channel.current = new BroadcastChannel(channelName);

    channel.current.onmessage = () => callback();

    return () => channel.current?.close();
  }, [channelName, callback]);

  useEffect(() => {
    channel.current?.postMessage({});
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useBroadcast;
