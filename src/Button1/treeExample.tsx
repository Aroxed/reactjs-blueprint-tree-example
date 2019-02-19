/*
https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/core-examples/dialogExample.tsx
*/

import * as React from "react";

import { Classes, Icon, Button, Dialog, ITreeNode, Position, Tooltip, Tree } from "@blueprintjs/core";
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import { isOpen } from "@blueprintjs/core/lib/esm/components/context-menu/contextMenu";

export interface IDialogExampleState {
    autoFocus: boolean;
    canEscapeKeyClose: boolean;
    canOutsideClickClose: boolean;
    enforceFocus: boolean;
    isOpen: boolean;
    usePortal: boolean;
}

export interface ITreeExampleState {
    nodes: ITreeNode[];
    dialogOptions: IDialogExampleState;    
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
export class TreeExample extends React.Component<IExampleProps, ITreeExampleState> {
    public state: ITreeExampleState = { 
        nodes: INITIAL_STATE, 
        dialogOptions: {autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            isOpen: false,
            usePortal: true} 
    };
    
    public render() {
        return (
            <Example options={false} {...this.props}>
                <Tree
                    contents={this.state.nodes}
                    onNodeClick={this.handleNodeClick}
                    onNodeCollapse={this.handleNodeCollapse}
                    onNodeExpand={this.handleNodeExpand}
                    className={Classes.ELEVATION_0}
                />
                 <Dialog
                    {...this.state}
                    icon="info-sign"
                    title="Delete confirmation"
                >
                <p>Are you ready to delete this node?</p>
                <Button intent="danger" text="Delete" />
                <Button intent="primary" text="Cancel">
                    <Icon icon="document" /> 
                </Button>
                </Dialog>
            </Example>
        );
    }

    private handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            //this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        };
        this.addNode(nodeData, "Abc");
//        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state);
    };

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    private deleteNode = (currentNode: ITreeNode) => {
        this.setState( {isOpen: true} );
    private addNode = (currentNode: ITreeNode, label: string) => {
        let newNode = {id: Math.random().toString(), label:label};
        if (currentNode.childNodes !== undefined) {
            currentNode.childNodes.push(newNode);
        }    
        this.setState(this.state);
    }

    private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
      //      this.forEachNode(node.childNodes, callback);
        }
    }
}

/* tslint:disable:object-literal-sort-keys so childNodes can come last */
const INITIAL_STATE: ITreeNode[] = [
    {
        id: 0,
        hasCaret: true,
        icon: "folder-close",
        label: "Folder 0",
    },
    {
        id: 1,
        icon: "folder-close",
        isExpanded: true,
        label: (
            <Tooltip content="I'm a folder <3" position={Position.RIGHT}>
                Folder 1
            </Tooltip>
        ),
        childNodes: [
            {
                id: 2,
                icon: "document",
                label: "Item 0",
                secondaryLabel: (
                    <Tooltip content="An eye!">
                        <Icon icon="eye-open" />
                    </Tooltip>
                ),
            },
            {
                id: 3,
                icon: "tag",
                label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
            },
            {
                id: 4,
                hasCaret: true,
                icon: "folder-close",
                label: (
                    <Tooltip content="foo" position={Position.RIGHT}>
                        Folder 2
                    </Tooltip>
                ),
                childNodes: [
                    { id: 5, label: "No-Icon Item" },
                    { id: 6, icon: "tag", label: "Item 1" },
                    {
                        id: 7,
                        hasCaret: true,
                        icon: "folder-close",
                        label: "Folder 3",
                        childNodes: [
                            { id: 8, icon: "document", label: "Item 0" },
                            { id: 9, icon: "tag", label: "Item 1" },
                        ],
                    },
                ],
            },
        ],
    },
];
/* tslint:enable:object-literal-sort-keys */