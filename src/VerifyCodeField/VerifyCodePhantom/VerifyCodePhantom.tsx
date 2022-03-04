import { range } from 'lodash-es';

import ReactContentLoader from 'react-content-loader';

import useStyles from './styles';

import { VERIFY_CODE_CELL_SIZE } from '../constants';

type VerifyCodePhantomProps = {
  length: number;
};

const VerifyCodePhantom = ({ length }: VerifyCodePhantomProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {range(length).map((key) => (
        <ReactContentLoader
          speed={1}
          key={key}
          className={classes.element}
          viewBox={`0 0 ${VERIFY_CODE_CELL_SIZE.width} ${VERIFY_CODE_CELL_SIZE.height}`}
        >
          <rect width={VERIFY_CODE_CELL_SIZE.width} height={VERIFY_CODE_CELL_SIZE.height} />
        </ReactContentLoader>
      ))}
    </div>
  );
};

export default VerifyCodePhantom;
