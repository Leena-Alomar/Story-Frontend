import sendRequest from "./sendRequest";
const url = "/like"


export function StoryLike(storyId) {
    return sendRequest(`/story/${storyId}/like/new`)
}


export async function create(formData, storyId) {
    return await sendRequest(`/story/${storyId}/like/new/`, 'POST', formData);
  }
  
export async function getLikesByStory(storyId) {
    return await sendRequest(`/story/${storyId}/like/new/`,'GET');
  }
  

export async function index() {
    return sendRequest(url)
}

export async function show(likeId) {
    return sendRequest(`${url}/${likeId}/`)
}

export async function  deleteLike(likeId) {
    return sendRequest(`${url}/${likeId}/`,'DELETE')
}