import { RefObject, useEffect, useRef } from 'react';
import ReactCodeInput from 'react-verification-code-input';
import { Typography } from '@material-ui/core';

import { cn } from '../styles';

import { VerifyCodePhantom } from './VerifyCodePhantom';
import { VERIFY_CODE_CELL_SIZE } from './constants';
import useStyles from './styles';

type VerifyCodeFieldProps = {
  length: number;
  label?: string;
  className?: string;
  loading?: boolean;
  isError?: boolean;
  onChange: (value: string) => void;
};

const VerifyCodeField = ({
  length,
  className,
  label,
  loading = false,
  isError,
  onChange,
}: VerifyCodeFieldProps) => {
  const classes = useStyles({ isError });
  const codeRef = useRef<any>(null);

  useEffect(() => {
    codeRef.current?.iRefs.forEach(
      ({ current }: RefObject<HTMLInputElement>) => {
        current?.setAttribute('autocomplete', 'off');
      }
    );
  }, []);

  useEffect(() => {
    if (isError) {
      // react-verification-code-input не смотрит на value, единственный способ сбросить значение использовать внутреннюю функцию
      // https://github.com/suweya/react-verification-code-input/issues/15
      // eslint-disable-next-line no-underscore-dangle
      codeRef.current?.__clearvalues__();
    }
  }, [isError]);

  if (loading) {
    return (
      <div className={cn(classes.wrapper, className)}>
        {label && (
          <Typography component="span" className={classes.label}>
            {label}
          </Typography>
        )}
        <VerifyCodePhantom length={length} />
      </div>
    );
  }

  return (
    <label className={cn(classes.wrapper, className)}>
      {label && (
        <Typography component="span" className={classes.label}>
          {label}
        </Typography>
      )}
      <ReactCodeInput
        autoFocus
        ref={codeRef}
        fields={length}
        fieldWidth={VERIFY_CODE_CELL_SIZE.width}
        fieldHeight={VERIFY_CODE_CELL_SIZE.height}
        className={classes.verifyCode}
        onChange={onChange}
      />
    </label>
  );
};

export default VerifyCodeField;
