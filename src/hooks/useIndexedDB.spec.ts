import { describe, it, expect, vi, beforeAll, Mock } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import useIndexedDB from "./useIndexedDB";

const flushPromises = () => new Promise((resolve) => setTimeout(resolve));

describe("useIndexedDB hook", () => {
  let open: Mock;
  let getAll: Mock;
  let put: Mock;
  let deleteMock: Mock;
  let createObjectStore: Mock;

  let instance: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  let result: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  beforeAll(() => {
    result = { onsuccess: null };
    getAll = vi.fn().mockReturnValue(result);
    put = vi.fn().mockReturnValue(result);
    deleteMock = vi.fn().mockReturnValue(result);
    createObjectStore = vi.fn();

    instance = {
      result: {
        transaction: () => ({ objectStore: () => ({ getAll, put, delete: deleteMock }) }),
        createObjectStore,
        objectStoreNames: { contains: () => 0 },
      },
      onsuccess: vi.fn(),
    };
    open = vi.fn().mockReturnValue(instance);
    window.indexedDB = { open } as unknown as IDBFactory;
  });

  it("opens the database when used", async () => {
    renderHook(() => useIndexedDB("testDB", "testStore"));

    expect(open).toHaveBeenCalledWith("testDB", expect.anything());
    expect(open).toHaveBeenCalledTimes(1);
  });

  it("updates the database if needed", async () => {
    renderHook(() => useIndexedDB("testDB", "testStore"));
    instance.onupgradeneeded();

    expect(createObjectStore).toHaveBeenCalledWith("testStore", { keyPath: "id" });
  });

  it("fetches all data when loaded", async () => {
    renderHook(() => useIndexedDB("testDB", "testStore"));
    instance.onsuccess();
    await flushPromises();
    result.onsuccess();

    expect(getAll).toHaveBeenCalledTimes(1);
  });

  it("adds an item to the store", async () => {
    const { result: res } = renderHook(() => useIndexedDB("testDB", "testStore"));
    instance.onsuccess();
    await flushPromises();
    result.onsuccess();

    act(() => res.current.add({ id: 1 }));
    instance.onsuccess();
    result.onsuccess();
    await flushPromises();
    result.onsuccess();

    expect(put).toHaveBeenCalledWith({ id: 1 });
  });

  it("removes an item to the store", async () => {
    const { result: res } = renderHook(() => useIndexedDB("testDB", "testStore"));
    instance.onsuccess();
    await flushPromises();
    result.onsuccess();

    act(() => res.current.destroy("1"));
    instance.onsuccess();
    result.onsuccess();
    await flushPromises();
    result.onsuccess();

    expect(deleteMock).toHaveBeenCalledWith("1");
  });
});
