class NotesAdapter {
  constructor() {
    this.baseUrl = 'https://watchornah.herokuapp.com/api/v1/notes'
  }

  getNotes() {
    return fetch(this.baseUrl).then(response => response.json())
  }

  createNote(body) {
    const noteCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({body})
    }
    return fetch(this.baseUrl, noteCreateParams).then(resp => resp.json())
  }

}
