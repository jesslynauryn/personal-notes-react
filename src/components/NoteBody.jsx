import React from 'react';
import { getInitialData, showFormattedDate } from '../utils';
import NoteList from './NoteList';
import NoteInput from './NoteInput';

class NoteBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchKeyword: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onHandleSearchChange = this.onHandleSearchChange.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            createdAt: +new Date(),
            body,
          },
        ],
      };
    });
  }

  onArchiveHandler(id) {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      });
      return { notes: updatedNotes };
    });
  }

  onHandleSearchChange = (event) => {
    this.setState({ searchKeyword: event.target.value });
  };

  render() {
    const activeNotes = this.state.notes.filter((note) => !note.archived);
    const archivedNotes = this.state.notes.filter((note) => note.archived);

    let displayedActiveNotes = activeNotes;
    let displayedArchivedNotes = archivedNotes;
    let isSearching = this.state.searchKeyword !== '';

    if (isSearching) {
      const searchKeyword = this.state.searchKeyword.toLowerCase();
      displayedActiveNotes = activeNotes.filter((note) =>
        note.title.toLowerCase().includes(searchKeyword)
      );
      displayedArchivedNotes = archivedNotes.filter((note) =>
        note.title.toLowerCase().includes(searchKeyword)
      );
    }
    return (
      <>
        <div className="note-app__header">
          <h1> Notes </h1>
          <input
            type="text"
            placeholder="Cari judul catatan..."
            value={this.state.searchKeyword}
            onChange={this.onHandleSearchChange}
          />
        </div>

        <div className="note-app__body">
          <div className="note-input">
            <h2>Buat catatan</h2>
            <NoteInput addNote={this.onAddNoteHandler} />
          </div>

      
            <h2>Catatan Aktif</h2>
         
            <NoteList
              notes={displayedActiveNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
         
            <h2>Catatan Arsip</h2>
            <NoteList
              notes={displayedArchivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
         
        </div>
      </>
    );
  }
}

export default NoteBody;
