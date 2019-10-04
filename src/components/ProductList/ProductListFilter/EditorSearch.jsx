import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { DropDown } from './../../commons/';


const EDITORS_QUERY = gql`
  query FilterEditors($name: String) {
    editors(first:10, name: $name) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const FETCH_EDITOR = gql`
  query FilterEditors($first:Int, $id: ID) {
    editors(first:$first, ids: [$id]) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const EditorSearch = withApollo(
    ({
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
      // This editor-id is fetched from the URL.
      // We fetch editor details and set it as selected.
    }) => {
      const [showEditorDropDown, setShowEditorDropDown] = useState(false);
      const searchEditors = (name) => client.query({
        query: EDITORS_QUERY,
        variables: {
          name,
        }
      }).then(
        (
          {
            data: {
              editors: {
                edges
              }
            }
          }
        ) => (
          edges.map(
            (
              {
                node: { id, name }
              }
            ) => (
              {
                id,
                name
              }
            )
          )
        )
      );
  
      const loadEditor = () => (
        client.query({
          query: FETCH_EDITOR,
          variables: {
            id: urlEditorId,
            first: 1
          }
        }).then(({data:{editors: { edges }={} }={} }, errors) => {
          if(edges.length > 0 && (!errors || errors.length === 0)) {
            replaceEditor(urlEditorId, edges[0].node);
          }
          setShowEditorDropDown(true);
        })
      )
  
      useEffect(() => {
        const checkIfEditorAlreadyLoaded = (editorId) => {
          const selectedEditor = selectedEditors.find(({id}) => urlEditorId === id);
          if(selectedEditor && selectedEditor.name) {
            return false
          }
          return true;
        }
        if(urlEditorId && checkIfEditorAlreadyLoaded(urlEditorId)) {
          setShowEditorDropDown(false);
          loadEditor();
        } else {
          setShowEditorDropDown(true);
        }
        
      }, []);
  
      const checkIfEditorAlreadySelected = ({ id }) => selectedEditors.filter(({id: selectedId}) => selectedId === id).length > 0
      if(!showEditorDropDown){
        return <div>Loading..</div>;
      }
  
      const filteredSelectedEditors = selectedEditors.reduce((acc, editor) => {
        if(editor.name) {
          return acc.concat(editor);
        }
        return acc;
      }, [])
  
      return <DropDown
        className={className}
        label={"Editors"}
        enableSearch={true}
        loadData={editors}
        defaultOption={filteredSelectedEditors}
        searchData={searchEditors}
        multiSelect={true}
        onOptionSelect={
          (option) => {
            if(checkIfEditorAlreadySelected(option)) {
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
            if(checkIfEditorAlreadySelected(option)) {
              removeEditor({
                id: option.id,
              })
              if(selectedEditors.find(({id: editorId}) => editorId === option.id)) {
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