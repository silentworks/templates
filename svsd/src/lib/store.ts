import { writable } from "svelte/store";

export type PageState = "SIGN_IN" | "SIGN_UP" | "SIGNED_IN";

export const pageState = writable<PageState>("SIGN_IN");
