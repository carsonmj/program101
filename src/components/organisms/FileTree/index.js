import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { flattenFiles, isSelectedFile } from "../../../utils";
import { fileSliceActions } from "../../../modules/slices/fileSlice";
import { FileItem } from "../../molecules";

const FileTree = () => {
  const dispatch = useDispatch();
  const fileTree = useSelector((state) => state.file.fileTree);
  const selectedFiles = useSelector((state) => state.file.selectedFiles);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (fileTree) {
      setFiles(flattenFiles(fileTree.folders));
    }
  }, [fileTree]);

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      const $fileItem = document.querySelector(`#${selectedFiles[0]}`);
      const rect = $fileItem?.getBoundingClientRect();

      dispatch(fileSliceActions.setModalCoordinate({ top: rect.y - 50 + rect.height, left: rect.right }));
    }
  }, [selectedFiles]);

  return (
    <Container>
      <Title>Files</Title>
      <div>
        {files.map((file) => {
          const { id, type, name, level } = file;

          return (
            <FileItem
              key={id}
              id={id}
              type={type}
              name={name}
              depth={level}
              selected={isSelectedFile(selectedFiles, id)}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default FileTree;

const Container = styled.div`
  width: fit-content;
  min-width: 18rem;
  height: calc(100% - 0.1rem);
  border: 0.1rem solid ${({ theme }) => theme.colors.gray_2};
  color: ${({ theme }) => theme.colors.white_1};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.light};
`;

const Title = styled.div`
  height: 2rem;
  padding: ${({ theme }) => theme.space.md};
  line-height: 2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray_2};
`;
