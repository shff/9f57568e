import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import useBroadcast from "./useBroadcast";

describe("useBroadcast hook", () => {
  it("should call postMessage whenever deps change", async () => {
    const callback = vi.fn();
    const postMessageMock = vi.fn();

    window.BroadcastChannel = vi.fn().mockImplementation(() => ({
      postMessage: postMessageMock,
      close: vi.fn(),
    }));

    renderHook(() => useBroadcast("test-channel", callback, [1]));
    renderHook(() => useBroadcast("test-channel", callback, [2]));
    renderHook(() => useBroadcast("test-channel", callback, [3]));
    expect(postMessageMock).toHaveBeenCalledTimes(3);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should call callback whenever a message is received via onmessage", async () => {
    const callback = vi.fn();

    const channel = { onmessage: null } as BroadcastChannel;
    window.BroadcastChannel = vi.fn().mockImplementation(() => channel);

    renderHook(() => useBroadcast("test-channel", callback, [1]));

    act(() => {
      channel.onmessage?.({} as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    });

    expect(callback).toHaveBeenCalled();
  });
});
