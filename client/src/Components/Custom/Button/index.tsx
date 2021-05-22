import { useState } from 'react';
import { animated, useSpring, config } from 'react-spring';
import { lighten } from 'polished';
import styled from 'styled-components';

const Button = styled(animated.button)`
  cursor: pointer;
  display: inline-block;
  padding: 1rem;
  font-size: 2rem;
  color: #eee;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  user-select: none;
  box-shadow: 0.5rem 1rem 1rem rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.5s;
  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: 0.5rem 1rem 0.6rem rgba(0, 0, 0, 0.4);
  }
`;

interface IProps {
  children: any;
  color: string;
  width: string;
  marginBottom?: string;
  marginTop?: string;
  fontSize?: string;
  height?: string;
  onClick?: () => void;
}

const SpringButton = (props: IProps) => {
  const [clicked, set] = useState(false);
  const [hover, setHover] = useState(false);
  const hoverProps = useSpring({
    from: { transform: 'translate(0%, 0%)' },
    to: { transform: clicked ? 'translate(0%, 5%)' : 'translate(0%, 0%)' },
    config: config.gentle,
  });
  const { color, width, height, fontSize, marginBottom, marginTop } = useSpring(
    {
      width: props.width,
      color: !hover ? props.color : lighten(0.05, props.color),
      height: props.height ? props.height : 'auto',
      fontSize: props.fontSize ? props.fontSize : 'inherit',
      marginBottom: props.marginBottom && props.marginBottom,
      marginTop: props.marginTop && props.marginTop,
    }
  );
  return (
    <Button
      onMouseDown={() => set(true)}
      onMouseUp={() => set(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        set(false);
      }}
      style={{
        ...hoverProps,
        backgroundColor: color,
        height: height,
        width: width,
        fontSize: fontSize,
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default SpringButton;
export { Button };
