import { renderHook, act } from "@testing-library/react-hooks";
import useCategoryIndex from "../useCategoryIndex.hook";

describe("useCategoryIndex()", () => {
  it("should return 0 by default", () => {
    const categories = [];
    const input = new EventTarget();
    const { result } = renderHook(() => useCategoryIndex(categories, input));
    expect(result.current).toEqual(0);
  });

  it("should return initial value", () => {
    const categories = ["A", "B"];
    const input = new EventTarget();
    const initialValue = 1;
    const { result } = renderHook(() => useCategoryIndex(categories, input, initialValue));
    expect(result.current).toEqual(1);
  });

  it("should increase the value when input dispatch y event", () => {
    const categories = ["A", "B"];
    const input = new EventTarget();
    const { result } = renderHook(() => useCategoryIndex(categories, input));
    act(() => {
      input.dispatchEvent(new Event("y"));
    });
    expect(result.current).toEqual(1);
  });

  it("should decrease the value when input dispatch x event", () => {
    const categories = ["A", "B", "C"];
    const input = new EventTarget();
    const initialValue = 2;
    const { result } = renderHook(() => useCategoryIndex(categories, input, initialValue));
    act(() => {
      input.dispatchEvent(new Event("x"));
    });
    expect(result.current).toEqual(1);
  });

  it("should return 0 when increasing the value higher than the category count", () => {
    const categories = ["A", "B"];
    const input = new EventTarget();
    const initialValue = 1;
    const { result } = renderHook(() => useCategoryIndex(categories, input, initialValue));
    act(() => {
      input.dispatchEvent(new Event("y"));
    });
    expect(result.current).toEqual(0);
  });

  it("should return the max index when decreasing the value lower than 0", () => {
    const categories = ["A", "B"];
    const input = new EventTarget();
    const initialValue = 0;
    const { result } = renderHook(() => useCategoryIndex(categories, input, initialValue));
    act(() => {
      input.dispatchEvent(new Event("x"));
    });
    expect(result.current).toEqual(1);
  });
});
