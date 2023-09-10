// In your React component (FileSaver.tsx)
import { useState } from 'react';
import { ipcRenderer } from 'electron';

function FileSaver() {
  const [fileContent, setFileContent] = useState('');

  const handleSaveFile = async () => {
    const { filePath } = await ipcRenderer.invoke('save-file-dialog', fileContent);
    if (filePath) {
      console.log('File saved successfully!');
    } else {
      console.log('File save was canceled.');
    }
  };

  return (
    <div>
      <textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
      />
      <button onClick={handleSaveFile}>Save File</button>
    </div>
  );
}

export default FileSaver;
