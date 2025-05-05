import sendRequest from "./sendRequest";
const url = "/review"


export function categoryReview(storyId) {
    return sendRequest(`/story/${storyId}/review/new`)
}


export async function create(formData, storyId) {
    return await sendRequest(`/story/${storyId}/review/new/`, 'POST', formData);
  }
  
export async function getReviewsByStory(storyId) {
    return await sendRequest(`/story/${storyId}/review/new/`,'GET');
  }
  

export async function index() {
    return sendRequest(url)
}

export async function show(reviewId) {
    return sendRequest(`${url}/${reviewId}/`)
}

export async function  deleteReview(reviewId) {
    return sendRequest(`${url}/${reviewId}/`,'DELETE')
}