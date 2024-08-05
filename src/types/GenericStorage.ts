interface setItem {
	(key: string, value: string): Promise<void>;
}

interface getItem {
	(key: string): Promise<string | null>;
}

export interface GenericStorageType {
	setItem: setItem;
	getItem: getItem;
}
