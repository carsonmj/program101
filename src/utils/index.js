export const flattenFiles = (files) => {
  const queue = [];
  const result = [];

  const serachFiles = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      queue.push(arr[i]);

      while (queue.length) {
        const { id, type, name, level, child = null } = queue.shift();

        result.push({
          id,
          type,
          name,
          level,
        });

        if (child) {
          serachFiles(child);
        }
      }
    }
  };

  serachFiles(files);

  return result;
};

export const isSelectedFile = (selectedFiles, id) => {
  return selectedFiles && selectedFiles.length > 0 && selectedFiles.includes(id);
};
