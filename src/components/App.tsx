import React, { useState } from 'react';
import saveDataToFile from './saveDataToFile';

  const [data, setData] = useState({ name: 'John', age: 30 });

  const handleSaveClick = () => {
    saveDataToFile(data);
  };

  return (
    <div>
      <button onClick={handleSaveClick}>Save Data</button>
    </div>
  );
};

export default App;


