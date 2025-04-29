export default async function sendRequest(url, method = 'GET', payload) {
    // check if there is a token for a logged in / stored user
    const token = localStorage.getItem('token');

	const options = { method };
	if (payload) {
		options.headers = { 'Content-Type': 'application/json' };
		options.body = JSON.stringify(payload);
	}

    // this will add an Authorization header whether or not headers exist
    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

	try {
		const res = await fetch(`http://127.0.0.1:8000${url}`, options);
		if (res.ok) return res.json();
	} catch (err) {
		console.log(err, "error in send-request");
		throw new Error(err);
	}
}