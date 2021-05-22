import { ChangeEvent, useState, useEffect } from 'react';
import { useSpring, animated, useChain, useSpringRef } from 'react-spring';
import './input.styles.scss';

interface IProps {
  error?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Input = (props: IProps): JSX.Element => {
  const { error, type, name, onChange, value } = props;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (type === 'date') {
      setSelected(true);
    }
  }, [type]);

  const heightRef = useSpringRef();
  const height = useSpring({
    from: { height: '0%' },
    to: { height: selected || value ? '100%' : '0%' },
    config: {
      duration: 250,
    },
    ref: heightRef,
  });
  const widthRef = useSpringRef();
  const width = useSpring({
    from: { width: '0%' },
    to: { width: selected || value ? '50%' : '0%' },
    config: {
      duration: 250,
    },
    ref: widthRef,
  });
  const scaleRef = useSpringRef();
  const scale = useSpring({
    from: { transform: 'scale(0,1)' },
    to: { transform: selected || value ? 'scale(1, 1)' : 'scale(0, 1)' },
    config: {
      duration: 250,
    },
    ref: scaleRef,
  });
  const { pos, size, color } = useSpring({
    pos: selected || value ? -75 : 0,
    size: selected || value ? 1.5 : 2,
    color: !error ? (selected || value ? '#02a247' : '#6d6f76') : '#ff4e4e',
    height: selected || value ? 100 : 0,
  });

  useChain(
    selected || value
      ? [scaleRef, heightRef, widthRef]
      : [widthRef, heightRef, scaleRef],
    [0, 0.25, 0.5]
  );
  return (
    <div className='input'>
      <div className='input__body'>
        <input
          className='input__field'
          onFocus={() => {
            setSelected(true);
          }}
          onBlur={() => {
            if (!value && type !== 'date') setSelected(false);
          }}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
        />
        <label htmlFor={name} className='input__label'>
          <animated.span
            className='input__name'
            style={{
              fontSize: size.to((size) => `${size}rem`),
              color: color.to((color) => `${color}`),
              transform: pos.to((pos) => `translateY(${pos}%)`),
            }}
          >
            {props.label}
          </animated.span>
          <animated.span
            className='input__border--bottom'
            style={{ ...scale, borderColor: error ? '#ff4e4e' : '#02a247' }}
          ></animated.span>
          <animated.span
            className='input__border--top-l'
            style={{ ...width, borderColor: error ? '#ff4e4e' : '#02a247' }}
          ></animated.span>
          <animated.span
            className='input__border--top-r'
            style={{ ...width, borderColor: error ? '#ff4e4e' : '#02a247' }}
          ></animated.span>
          <animated.span
            className='input__border--left'
            style={{ ...height, borderColor: error ? '#ff4e4e' : '#02a247' }}
          ></animated.span>
          <animated.span
            className='input__border--right'
            style={{ ...height, borderColor: error ? '#ff4e4e' : '#02a247' }}
          ></animated.span>
        </label>
        {error && <div className='input__error'>{error}</div>}
      </div>
    </div>
  );
};

export default Input;
