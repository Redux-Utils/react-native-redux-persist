import type { WebStorageOptions } from "./types/WebStorage";

function returnStorageType(
	storage: WebStorageOptions | undefined,
): WebStorageOptions {
	if (!storage) {
		return { type: "localStorage" };
	}

	return storage;
}

export default returnStorageType;
