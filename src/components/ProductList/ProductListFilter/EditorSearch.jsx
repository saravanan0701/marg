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
    selectedItems,
    //Redux related variable which makes sure
    // a selected item is not selected again and again.
    // even if there's an inconsistency redux is not affected by it
    removeAllEditors,
    className,
    urlItemId,
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
      const checkIfItemAlreadyLoaded = (editorId) => {
        const selectedItem = selectedItems.find(({ id }) => urlItemId === id);
        if (selectedItem && selectedItem.name) {
          return false
        }
        return true;
      }
      if (urlItemId && checkIfItemAlreadyLoaded(urlItemId)) {
        setShowDropDown(false);
        loadItem(urlItemId, client).then((loadedEditor) => {
          replaceEditor(urlItemId, loadedEditor);
          setShowDropDown(true);
        })
      } else {
        setShowDropDown(true);
      }
    }, []);

    const checkIfItemAlreadySelected = ({ id }) => selectedItems.filter(({ id: selectedId }) => selectedId === id).length > 0
    if (!showDropDown) {
      return <div>Loading..</div>;
    }

    const filteredSelectedItems = selectedItems.reduce((acc, editor) => {
      if (editor.name) {
        return acc.concat(editor);
      }
      return acc;
    }, [])

    return <DropDown
      className={className}
      label={label}
      enableSearch={true}
      defaultOption={filteredSelectedItems}
      searchData={(name) => searchData(name, selectedCategories, client)}
      multiSelect={true}
      onOptionSelect={
        (option) => {
          if (checkIfItemAlreadySelected(option)) {
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
          if (checkIfItemAlreadySelected(option)) {
            removeEditor({
              id: option.id,
            })
            if (selectedItems.find(({ id: editorId }) => editorId === option.id)) {
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