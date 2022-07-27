import { useMemo } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

const useClasses = (stylesElement) => {
    const theme = useTheme();
    return useMemo(() => {
      const rawClasses = typeof stylesElement === 'function'
        ? stylesElement(theme)
        : stylesElement;
      const prepared = {};
  
      Object.entries(rawClasses).forEach(([key, value = {}]) => {
        prepared[key] = css(value);
      });
  
      return prepared;
    }, [stylesElement, theme]);
  };

const SelectButton = ({ children, selected, onClick }) => {
    const styles = theme => ({
    selectbutton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",

    },
  });

  const classes = useClasses(styles);

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;