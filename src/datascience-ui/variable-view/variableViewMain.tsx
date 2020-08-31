// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import './variableViewMain.css';

import * as React from 'react';

import { SharedMessages } from '../../client/datascience/messages';
import { IDataScienceExtraSettings } from '../../client/datascience/types';
import { storeLocStrings } from '../react-common/locReactSide';
import { IMessageHandler, PostOffice } from '../react-common/postOffice';

// Our css has to come after in order to override body styles
export interface IVariableViewMainPanelProps {
    skipDefault?: boolean;
    baseTheme: string;
    testMode?: boolean;
}

//tslint:disable:no-any
interface IVariableViewMainPanelState {
    settings?: IDataScienceExtraSettings;
}

export class VariableViewMainPanel extends React.Component<IVariableViewMainPanelProps, IVariableViewMainPanelState>
    implements IMessageHandler {
    private container: React.Ref<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private postOffice: PostOffice = new PostOffice();

    // tslint:disable-next-line:max-func-body-length
    constructor(props: IVariableViewMainPanelProps, _state: IVariableViewMainPanelState) {
        super(props);

        this.state = {};
    }

    public componentWillMount() {
        // Add ourselves as a handler for the post office
        this.postOffice.addHandler(this);
    }

    public componentWillUnmount() {
        this.postOffice.removeHandler(this);
        this.postOffice.dispose();
    }

    public render = () => {
        if (!this.state.settings) {
            return (
                <div className="main-panel">
                    <h1>VARIABLES</h1>
                </div>
            );
        }

        return (
            <div className="main-panel" ref={this.container}>
                <h1>VARIABLES</h1>
            </div>
        );
    };

    // tslint:disable-next-line:no-any
    public handleMessage = (msg: string, payload?: any) => {
        switch (msg) {
            case SharedMessages.UpdateSettings:
                this.updateSettings(payload);
                break;

            case SharedMessages.LocInit:
                this.initializeLoc(payload);
                break;

            default:
                break;
        }

        return false;
    };

    private initializeLoc(content: string) {
        const locJSON = JSON.parse(content);
        storeLocStrings(locJSON);
    }

    private updateSettings(content: string) {
        const newSettingsJSON = JSON.parse(content);
        const newSettings = newSettingsJSON as IDataScienceExtraSettings;
        this.setState({
            settings: newSettings
        });
    }

    //private sendMessage<M extends IDataViewerMapping, T extends keyof M>(type: T, payload?: M[T]) {
    //this.postOffice.sendMessage<M, T>(type, payload);
    //}
}
