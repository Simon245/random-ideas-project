import IdeasApi from '../services/ideasApi';
import IdeaList from '../components/IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');
    this._isEdit = null;
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
    document.addEventListener('updateform', (e) => this.updateForm(e));
  }

  updateForm(e) {
    this.render(e.detail);
    document.dispatchEvent(new Event('openmodal'));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert('Please enter all fields');
      return;
    }

    // Save user to local storage
    localStorage.setItem('username', this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    if (this._isEdit) {
      const updatedIdea = await IdeasApi.updateIdea(this._updateIdeaId, idea);
      this._ideaList.updateIdeaList(updatedIdea.data.data, true);
    } else {
      const newIdea = await IdeasApi.createIdea(idea);
      // Add idea to list
      this._ideaList.updateIdeaList(newIdea.data.data);
    }

    // Clear form
    this._form.elements.text.value = '';
    this._form.elements.tag.value = '';
    this._form.elements.username.value = '';
    this._isEdit = false;
    this._updateIdeaId = null;

    this.render();

    document.dispatchEvent(new Event('closemodal'));
  }

  render(data = null) {
    if (data) {
      this._isEdit = data;
      this._updateIdeaId = data._id;
    }
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text"
                 name="username"
                 id="username" 
                 value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"
          />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text">${data ? data.text : ''}</textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" value="${data ? data.tag : ''}" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
    `;
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
