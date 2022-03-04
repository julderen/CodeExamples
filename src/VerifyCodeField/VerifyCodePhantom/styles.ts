import { makeStyles } from '../../../../styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  element: {
    width: '44px',
    height: '44px',
    flexShrink: 0,

    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
