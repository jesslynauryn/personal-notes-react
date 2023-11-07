import React from 'react';

function ArchiveButton({ id, onArchive,   archived }) {
  const archiveButtonLabel = archived ? 'Pindahkan dari arsip' : 'Arsipkan';

  return (
    <button className="note-item__archive-button" onClick={() => onArchive(id)}>
     {archiveButtonLabel}
    </button>
  );
}

export default ArchiveButton;
