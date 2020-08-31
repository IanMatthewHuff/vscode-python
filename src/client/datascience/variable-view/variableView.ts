// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import '../../common/extensions';

import { inject, injectable } from 'inversify';
import * as path from 'path';
import { ViewColumn } from 'vscode';

import { IWebPanelProvider, IWorkspaceService } from '../../common/application/types';
import { EXTENSION_ROOT_DIR, UseCustomEditorApi } from '../../common/constants';
import { IConfigurationService, IDisposable, Resource } from '../../common/types';
import * as localize from '../../common/utils/localize';
import { ICodeCssGenerator, IThemeFinder } from '../types';
import { WebViewHost } from '../webViewHost';
import { IVariableView, IVariableViewMapping } from './types';
import { VariableViewMessageListener } from './variableViewMessageListener';

const variableViewDir = path.join(EXTENSION_ROOT_DIR, 'out', 'datascience-ui', 'viewers');
@injectable()
export class VariableView extends WebViewHost<IVariableViewMapping> implements IVariableView, IDisposable {
    constructor(
        @inject(IWebPanelProvider) provider: IWebPanelProvider,
        @inject(IConfigurationService) configuration: IConfigurationService,
        @inject(ICodeCssGenerator) cssGenerator: ICodeCssGenerator,
        @inject(IThemeFinder) themeFinder: IThemeFinder,
        @inject(IWorkspaceService) workspaceService: IWorkspaceService,
        @inject(UseCustomEditorApi) useCustomEditorApi: boolean
    ) {
        super(
            configuration,
            provider,
            cssGenerator,
            themeFinder,
            workspaceService,
            (c, v, d) => new VariableViewMessageListener(c, v, d),
            variableViewDir,
            [path.join(variableViewDir, 'commons.initial.bundle.js'), path.join(variableViewDir, 'variableView.js')],
            localize.DataScience.variableViewTitle(),
            ViewColumn.One,
            useCustomEditorApi,
            false,
            Promise.resolve(false)
        );
    }

    protected get owningResource(): Resource {
        return undefined;
    }

    //tslint:disable-next-line:no-any
    protected onMessage(message: string, payload: any) {
        switch (message) {
            default:
                break;
        }

        super.onMessage(message, payload);
    }
}
