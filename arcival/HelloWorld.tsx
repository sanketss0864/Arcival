import * as React from 'react';
import { Label } from '@fluentui/react';
import { FluentProvider,webLightTheme } from '@fluentui/react-components';
import Data from './Component/data';
export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <FluentProvider theme={webLightTheme}>

<Data name={this.props.name} />
      {/* <Label>
        {this.props.name}
      </Label> */}
      </FluentProvider>
    )
  }
}
