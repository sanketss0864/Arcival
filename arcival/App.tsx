import * as React from 'react';
import { Label } from '@fluentui/react';
import { FluentProvider,webLightTheme } from '@fluentui/react-components';
import Data from './Component/data';
export interface IArchivalProps {
  data?: string;
}

export class Archival extends React.Component<IArchivalProps> {
  public render(): React.ReactNode {
    return (
      <FluentProvider theme={webLightTheme}>

<Data name={this.props.data} />
      {/* <Label>
        {this.props.name}
      </Label> */}
      </FluentProvider>
    )
  }
}
