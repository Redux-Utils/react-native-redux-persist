import returnStorageType from "../src/returnStorageType";
import type { WebStorageOptions } from "../src/types/WebStorage";

describe("returnStorageType", () => {
	it("should return default storage type if storage is undefined", () => {
		const result = returnStorageType(undefined);
		expect(result).toEqual({ type: "localStorage" });
	});

	it("should return the provided storage type if storage is defined", () => {
		const storage: WebStorageOptions = { type: "sessionStorage" };
		const result = returnStorageType(storage);
		expect(result).toEqual(storage);
	});
});
