import React from "react";

import styled from "styled-components";

import { FileItem } from "../../molecules";

const data = {
  folders: [
    { id: "f0001", type: "folder", name: "public", level: 1, child: null },
    {
      id: "f0002",
      type: "folder",
      name: "src",
      level: 1,
      child: [
        { id: "f0003", type: "file", name: "index.js", level: 2 },
        { id: "f0004", type: "file", name: "App.js", level: 2 },
        {
          id: "f0005",
          type: "folder",
          name: "app",
          level: 2,
          child: [{ id: "f0006", type: "file", name: "store.js", level: 3 }],
        },
        {
          id: "f0007",
          type: "folder",
          name: "feature",
          level: 2,
          child: [
            {
              id: "f0008",
              type: "folder",
              name: "counter",
              level: 3,
              child: [
                { id: "f0009", type: "file", name: "Counter.js", level: 4 },
                { id: "f0010", type: "file", name: "counterSlice.js", level: 4 },
              ],
            },
          ],
        },
      ],
    },
    { id: "f0011", type: "file", name: "package.json", level: 1, child: null },
  ],
};

const flattenFiles = (files) => {
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

const FileTree = () => {
  const files = flattenFiles(data.folders);

  return (
    <Container>
      <Title>Files</Title>
      <FilesWrapper>
        {files.map((file) => {
          const { id, type, name, level } = file;

          return <FileItem key={id} id={id} type={type} name={name} depth={level} />;
        })}
      </FilesWrapper>
    </Container>
  );
};

export default FileTree;

const Container = styled.div`
  width: fit-content;
  min-width: 20rem;
  height: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray_2};
  color: ${({ theme }) => theme.colors.white_1};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.light};
`;

const Title = styled.div`
  height: 2rem;
  padding: ${({ theme }) => theme.space.md};
  line-height: 2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray_2};
`;

const FilesWrapper = styled.div`
  padding-left: 0.8rem;
`;
