// To parse this data:
//
//   import { Convert, Providers } from "./file";
//
//   const providers = Convert.toProviders(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Providers {
	id:      number;
	results: Results;
}

export interface Results {
	AR: Ar;
	AT: At;
	AU: At;
	BE: At;
	BO: Ar;
	BR: Ar;
	CA: At;
	CH: At;
	CL: Ar;
	CO: Ar;
	CR: Ar;
	DE: At;
	DK: At;
	EC: Ar;
	ES: At;
	FI: At;
	GB: At;
	GT: Ar;
	HK: Ar;
	HN: Ar;
	ID: At;
	IE: At;
	IN: Ar;
	IT: At;
	JP: At;
	KR: At;
	MX: Ar;
	MY: Ar;
	NL: At;
	NO: At;
	NZ: At;
	PE: Ar;
	PT: At;
	PY: Ar;
	RU: Ru;
	SE: At;
	SG: At;
	TH: Ar;
	TW: Ar;
	US: At;
	VE: Ar;
}

export interface Ar {
	link:     string;
	flatrate: Flatrate[];
}

export interface Flatrate {
	display_priority: number;
	logo_path:        string;
	provider_id:      number;
	provider_name:    string;
}

export interface At {
	link:     string;
	buy:      Flatrate[];
	flatrate: Flatrate[];
	rent?:    Flatrate[];
}

export interface Ru {
	link: string;
	buy:  Flatrate[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
	public static toProviders(json: string): Providers {
			return cast(JSON.parse(json), r("Providers"));
	}

	public static providersToJson(value: Providers): string {
			return JSON.stringify(uncast(value, r("Providers")), null, 2);
	}
}

function invalidValue(typ: any, val: any, key: any = ''): never {
	if (key) {
			throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
	}
	throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
	if (typ.jsonToJS === undefined) {
			const map: any = {};
			typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
			typ.jsonToJS = map;
	}
	return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
	if (typ.jsToJSON === undefined) {
			const map: any = {};
			typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
			typ.jsToJSON = map;
	}
	return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
	function transformPrimitive(typ: string, val: any): any {
			if (typeof typ === typeof val) return val;
			return invalidValue(typ, val, key);
	}

	function transformUnion(typs: any[], val: any): any {
			// val must validate against one typ in typs
			const l = typs.length;
			for (let i = 0; i < l; i++) {
					const typ = typs[i];
					try {
							return transform(val, typ, getProps);
					} catch (_) {}
			}
			return invalidValue(typs, val);
	}

	function transformEnum(cases: string[], val: any): any {
			if (cases.indexOf(val) !== -1) return val;
			return invalidValue(cases, val);
	}

	function transformArray(typ: any, val: any): any {
			// val must be an array with no invalid elements
			if (!Array.isArray(val)) return invalidValue("array", val);
			return val.map(el => transform(el, typ, getProps));
	}

	function transformDate(val: any): any {
			if (val === null) {
					return null;
			}
			const d = new Date(val);
			if (isNaN(d.valueOf())) {
					return invalidValue("Date", val);
			}
			return d;
	}

	function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
			if (val === null || typeof val !== "object" || Array.isArray(val)) {
					return invalidValue("object", val);
			}
			const result: any = {};
			Object.getOwnPropertyNames(props).forEach(key => {
					const prop = props[key];
					const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
					result[prop.key] = transform(v, prop.typ, getProps, prop.key);
			});
			Object.getOwnPropertyNames(val).forEach(key => {
					if (!Object.prototype.hasOwnProperty.call(props, key)) {
							result[key] = transform(val[key], additional, getProps, key);
					}
			});
			return result;
	}

	if (typ === "any") return val;
	if (typ === null) {
			if (val === null) return val;
			return invalidValue(typ, val);
	}
	if (typ === false) return invalidValue(typ, val);
	while (typeof typ === "object" && typ.ref !== undefined) {
			typ = typeMap[typ.ref];
	}
	if (Array.isArray(typ)) return transformEnum(typ, val);
	if (typeof typ === "object") {
			return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
					: typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
					: typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
					: invalidValue(typ, val);
	}
	// Numbers can be parsed by Date but shouldn't be.
	if (typ === Date && typeof val !== "number") return transformDate(val);
	return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
	return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
	return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
	return { arrayItems: typ };
}

function u(...typs: any[]) {
	return { unionMembers: typs };
}

function o(props: any[], additional: any) {
	return { props, additional };
}

function m(additional: any) {
	return { props: [], additional };
}

function r(name: string) {
	return { ref: name };
}

const typeMap: any = {
	"Providers": o([
			{ json: "id", js: "id", typ: 0 },
			{ json: "results", js: "results", typ: r("Results") },
	], false),
	"Results": o([
			{ json: "AR", js: "AR", typ: r("Ar") },
			{ json: "AT", js: "AT", typ: r("At") },
			{ json: "AU", js: "AU", typ: r("At") },
			{ json: "BE", js: "BE", typ: r("At") },
			{ json: "BO", js: "BO", typ: r("Ar") },
			{ json: "BR", js: "BR", typ: r("Ar") },
			{ json: "CA", js: "CA", typ: r("At") },
			{ json: "CH", js: "CH", typ: r("At") },
			{ json: "CL", js: "CL", typ: r("Ar") },
			{ json: "CO", js: "CO", typ: r("Ar") },
			{ json: "CR", js: "CR", typ: r("Ar") },
			{ json: "DE", js: "DE", typ: r("At") },
			{ json: "DK", js: "DK", typ: r("At") },
			{ json: "EC", js: "EC", typ: r("Ar") },
			{ json: "ES", js: "ES", typ: r("At") },
			{ json: "FI", js: "FI", typ: r("At") },
			{ json: "GB", js: "GB", typ: r("At") },
			{ json: "GT", js: "GT", typ: r("Ar") },
			{ json: "HK", js: "HK", typ: r("Ar") },
			{ json: "HN", js: "HN", typ: r("Ar") },
			{ json: "ID", js: "ID", typ: r("At") },
			{ json: "IE", js: "IE", typ: r("At") },
			{ json: "IN", js: "IN", typ: r("Ar") },
			{ json: "IT", js: "IT", typ: r("At") },
			{ json: "JP", js: "JP", typ: r("At") },
			{ json: "KR", js: "KR", typ: r("At") },
			{ json: "MX", js: "MX", typ: r("Ar") },
			{ json: "MY", js: "MY", typ: r("Ar") },
			{ json: "NL", js: "NL", typ: r("At") },
			{ json: "NO", js: "NO", typ: r("At") },
			{ json: "NZ", js: "NZ", typ: r("At") },
			{ json: "PE", js: "PE", typ: r("Ar") },
			{ json: "PT", js: "PT", typ: r("At") },
			{ json: "PY", js: "PY", typ: r("Ar") },
			{ json: "RU", js: "RU", typ: r("Ru") },
			{ json: "SE", js: "SE", typ: r("At") },
			{ json: "SG", js: "SG", typ: r("At") },
			{ json: "TH", js: "TH", typ: r("Ar") },
			{ json: "TW", js: "TW", typ: r("Ar") },
			{ json: "US", js: "US", typ: r("At") },
			{ json: "VE", js: "VE", typ: r("Ar") },
	], false),
	"Ar": o([
			{ json: "link", js: "link", typ: "" },
			{ json: "flatrate", js: "flatrate", typ: a(r("Flatrate")) },
	], false),
	"Flatrate": o([
			{ json: "display_priority", js: "display_priority", typ: 0 },
			{ json: "logo_path", js: "logo_path", typ: "" },
			{ json: "provider_id", js: "provider_id", typ: 0 },
			{ json: "provider_name", js: "provider_name", typ: "" },
	], false),
	"At": o([
			{ json: "link", js: "link", typ: "" },
			{ json: "buy", js: "buy", typ: a(r("Flatrate")) },
			{ json: "flatrate", js: "flatrate", typ: a(r("Flatrate")) },
			{ json: "rent", js: "rent", typ: u(undefined, a(r("Flatrate"))) },
	], false),
	"Ru": o([
			{ json: "link", js: "link", typ: "" },
			{ json: "buy", js: "buy", typ: a(r("Flatrate")) },
	], false),
};
