// Change base URL for API requests to the local IP of the Post Central API server
const BASE_URL = "http://localhost:3000";

// ============================================================================
// AUTH TOKEN - Stored after login/register, sent with every request
// ============================================================================

/**
 * The JWT token received from login or register.
 * This token proves who you are to the server.
 */
let authToken = null;

/**
 * Save the token. Called by the UI after login/register and by unit tests.
 */
const setToken = (token) => {
  authToken = token;
};

/**
 * Get the current token. Use this to build the Authorization header
 * for authenticated requests: `Bearer ${getToken()}`
 */
const getToken = () => authToken;

// ============================================================================
// HELLO ENDPOINT - Already implemented! Read this as a reference for your code.
// ============================================================================

/**
 * Get a hello message from Post Central
 * Method: GET | Endpoint: /posts/hello | Auth: No
 * Response: { id: number, user: string, text: string, timestamp: string }
 */
const getHello = async () => {
  const response = await fetch(`${BASE_URL}/posts/hello`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Failed to get hello: ${response.status}`);
  }

  return data;
};

// ============================================================================
// STAGE 1: GET REQUEST - Read data from the server
// ============================================================================

/**
 * Get current user information
 * Method: GET | Endpoint: /users/me | Auth: Yes
 * Response: { user: string }
 */
const getMe = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data.message || `Failed to get user info: ${response.status}`,
    );
  }

  return data;
};

// ============================================================================
// STAGE 2: POST REQUEST - createUser() is provided as a reference. Implement loginUser().
// ============================================================================

/**
 * Register a new user
 * Method: POST | Endpoint: /users/register | Auth: No
 * Body: { name, password }
 * Response: { user: string, token: string }
 */
const createUser = async (name, password) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not register user");
  }
  return data;
};

/**
 * Log in an existing user
 * Method: POST | Endpoint: /users/login | Auth: No
 * Body: { name, password }
 * Response: { user: string, token: string }
 */
const loginUser = async (name, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not log in");
  }
  return data;
};

// ============================================================================
// STAGE 3: More CRUD Operations
// ============================================================================

/**
 * Create a new post
 * Method: POST | Endpoint: /posts | Auth: Yes
 * Body: { text }
 * Response: { id: number, text: string, user: string }
 */
const createPost = async (text) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not create post");
  }
  return data;
};

/**
 * Get all posts for the current user
 * Method: GET | Endpoint: /posts/me | Auth: Yes
 * Response: Array of { id, text, user }
 */
const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not retrieve posts");
  }
  return data;
};

/**
 * Update an existing post
 * Method: PUT | Endpoint: /posts/:id | Auth: Yes
 * Body: { text }
 * Response: { id: number, text: string }
 */
const updatePost = async (id, text) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not update post");
  }
  return data;
};

/**
 * Delete current user
 * Method: DELETE | Endpoint: /users/me | Auth: Yes
 * Response: { user: string, message: string }
 */
const deleteUser = async () => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not delete user");
  }
  return data;
};

/**
 * Delete a post
 * Method: DELETE | Endpoint: /posts/:id | Auth: Yes
 * Response: { id: number, text: string, message: string }
 */
const deletePost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not delete post");
  }
  return data;
};

// ============================================================================
// EXPORTS - Make functions available for testing and main.js
// ============================================================================

export {
  createPost,
  createUser,
  deletePost,
  deleteUser,
  getHello,
  getMe,
  getPosts,
  getToken,
  loginUser,
  setToken,
  updatePost,
};
