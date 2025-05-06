import sendRequest from "./sendRequest";
const url = "/author"


export function categoryStory(categoryId) {
    return sendRequest(`/category/${categoryId}/author/new`)
}


export async function create(formData, categoryId) {
    return await sendRequest(`/category/${categoryId}/author/new/`, 'POST', formData);
  }
  

export async function index() {
    return sendRequest(url)
}

export async function show(authorId) {
    return sendRequest(`${url}/${authorId}/`)
}

export async function update(formData,authorId) {
    return sendRequest(`${url}/${authorId}/`,'PUT',formData)
}

