// made seperate fetchers folder for code re-use

export const handleSendingNewPost = async (token, message, url) => {
    // try catch are essential for async fucntions for cathing errors
    try {
      const response = await fetch(`${url}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: message })
      });
      const data = await response.json();
      return data
    } catch(e) {
      console.log(e)
    }
}

export const handleSendingNewComment = async (token, post, comment, url) => {
    // try catch are essential for async fucntions for cathing errors
    try {
      const response = await fetch(`${url}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            postId: post._id,
            comment: comment,
            token: token, 
          }
        )
      });
      const data = await response.json();
      console.log(data)
    } catch(e) {
      console.log(e)
    }
}

export const fetchPosts = (token, setToken, setPosts) => {
    if(token) {
      return fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
}

export const fetchUser = (token, setToken, setUser) => {
  if(token) {
    return fetch("/users", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setUser(data);
      })
  }
}

// returns the comments array of a single post using a postID
export const fetchComments = (token, setToken, setComments, postId) => {
  if(token) {
    fetch("/posts", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        let commentData = data.posts.filter((post) => {
          return post._id === postId
        })[0].comments;
        setComments(commentData);
      })
  }
}

export const handleSendingNewLike = async (token, post, url) => {
  try {
      const response = await fetch(`${url}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        postId: post._id,
      })
    });
    return response;
  } catch(e) {
    console.log(e)
  }
}
