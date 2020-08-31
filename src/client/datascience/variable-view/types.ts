import { IDisposable } from '../../common/types';
import { IWebviewViewProvider } from '../types';

// Map all messages to specific payloads
export type IVariableViewMapping = {
    //[DataViewerMessages.Started]: never | undefined;
    //[DataViewerMessages.UpdateSettings]: string;
    //[DataViewerMessages.InitializeData]: IDataFrameInfo;
    //[DataViewerMessages.GetAllRowsRequest]: never | undefined;
    //[DataViewerMessages.GetAllRowsResponse]: IRowsResponse;
    //[DataViewerMessages.GetRowsRequest]: IGetRowsRequest;
    //[DataViewerMessages.GetRowsResponse]: IGetRowsResponse;
    //[DataViewerMessages.CompletedData]: never | undefined;
};

export const IVariableView = Symbol('IVariableView');
export interface IVariableView extends IDisposable {
    //showData(dataProvider: IDataViewerDataProvider, title: string): Promise<void>;
}

export const IVariableViewProvider = Symbol('IVariableViewProvider');
export interface IVariableViewProvider extends IWebviewViewProvider {}
