import sendRequest from "./sendRequest";
const url = "/story"


export function categoryStory(categoryId) {
    return sendRequest(`/category/${categoryId}/story/new`)
}


export async function create(formData, categoryId) {
    return await sendRequest(`/category/${categoryId}/story/new/`, 'POST', formData);
  }
  

export async function index() {
    return sendRequest(url)
}

export async function show(storyId) {
    return sendRequest(`${url}/${storyId}/`)
}

export async function update(formData,storyId) {
    return sendRequest(`${url}/${storyId}/`,'PUT',formData)
}