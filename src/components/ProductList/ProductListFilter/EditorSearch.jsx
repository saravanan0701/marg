import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { DropDown } from './../../commons/';

export const EditorSearch = withApollo(
  ({
    label,
    client,
    applyFilter,
    removeFilter,
    editors,
    addEditor,
    removeEditor,
    selectedEditors,
    //Redux related variable which makes sure
    // a selected item is not selected again and again.
    // even if there's an inconsistency redux is not affected by it
    removeAllEditors,
    className,
    urlEditorId,
    replaceEditor,
    canDehyderateUrl,
    setUrlDeHyderation,
    selectedCategories,
    // This editor-id is fetched from the URL.
    // We fetch editor details and set it as selected.
    searchData,
    loadItem,
  }) => {
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
      const checkIfEditorAlreadyLoaded = (editorId) => {
        const selectedEditor = selectedEditors.find(({ id }) => urlEditorId === id);
        if (selectedEditor && selectedEditor.name) {
          return false
        }
        return true;
      }
      if (urlEditorId && checkIfEditorAlreadyLoaded(urlEditorId)) {
        setShowDropDown(false);
        loadItem(urlEditorId, client).then((loadedEditor) => {
          replaceEditor(urlEditorId, loadedEditor);
          setShowDropDown(true);
        })
      } else {
        setShowDropDown(true);
      }
    }, []);

    const checkIfEditorAlreadySelected = ({ id }) => selectedEditors.filter(({ id: selectedId }) => selectedId === id).length > 0
    if (!showDropDown) {
      return <div>Loading..</div>;
    }

    const filteredSelectedEditors = selectedEditors.reduce((acc, editor) => {
      if (editor.name) {
        return acc.concat(editor);
      }
      return acc;
    }, [])

    return <DropDown
      className={className}
      label={label}
      enableSearch={true}
      defaultOption={filteredSelectedEditors}
      searchData={(name) => searchData(name, selectedCategories, client)}
      multiSelect={true}
      onOptionSelect={
        (option) => {
          if (checkIfEditorAlreadySelected(option)) {
            return;
          }
          addEditor({
            id: option.id,
            name: option.name,
          })
        }
      }
      onOptionClose={
        (option) => {
          if (checkIfEditorAlreadySelected(option)) {
            removeEditor({
              id: option.id,
            })
            if (selectedEditors.find(({ id: editorId }) => editorId === option.id)) {
              setUrlDeHyderation(true);
            }
          }
        }
      }
      onUnselectAll={
        () => {
          removeAllEditors()
          setUrlDeHyderation(true)
        }
      }
    >
    </DropDown>
  }
);