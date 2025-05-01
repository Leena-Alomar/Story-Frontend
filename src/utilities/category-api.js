import sendRequest from "./sendRequest";
const url = "/categories/"

export async function index() {
    return sendRequest(url)
}

export async function show(categoryId) {
    return sendRequest(`${url}${categoryId}/`)
}