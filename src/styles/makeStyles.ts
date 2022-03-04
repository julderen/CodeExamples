import { Styles, makeStyles} from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { Omit } from '@material-ui/types';
import {
  ClassNameMap,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';

const Theme = createTheme();
export default function createMakeStyles<
  Props extends object = {},
  ClassKey extends string = string
>(
  styles: Styles<typeof Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<typeof Theme>, 'withTheme'>
): keyof Props extends never
  ? (props?: any) => ClassNameMap<ClassKey>
  : (props: Props) => ClassNameMap<ClassKey> {
  return makeStyles(styles, options);
}
