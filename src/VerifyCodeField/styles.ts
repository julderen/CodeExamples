import { makeStyles } from '../styles';

export default makeStyles<{ isError?: boolean }>((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',

    cursor: 'pointer',
  },

  label: {
    marginBottom: '12px',
  },

  verifyCode: {
    width: '100% !important',

    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
    },

    '& > div > input': {
      border: '2px solid',
      borderColor: ({ isError }) =>
        `${
          isError ? theme.palette.error.main : theme.palette.grey[300]
        } !important`,
      borderRadius: `${theme.shape.borderRadius}px !important`,

      fontFamily: 'inherit',
      fontSize: theme.typography.pxToRem(21),
      color: theme.palette.grey[800],

      '&:last-child': {
        borderRight: '2px solid',
      },
    },

    '& div > input:focus + input': {
      borderLeft: '2px solid',
    },

    '& div > input:focus': {
      borderColor: theme.palette.primary.dark,
    },

    '& input:not([value=""])': {
      backgroundColor: theme.palette.background.default,
    },

    '& input:focus': {
      backgroundColor: theme.palette.background.default,

      border: `2px solid ${theme.palette.grey[500]}`,

      caretColor: `${theme.palette.grey[800]} !important`,
    },
  },
}));
