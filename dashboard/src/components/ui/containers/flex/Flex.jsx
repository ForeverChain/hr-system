import tw from 'tailwind-styled-components';

export const Flex = tw.div`
  flex
  ${(props) => (props.column ? 'flex-col' : 'flex-row')}
  ${(props) => (props.gap ? `gap-${props.gap}` : '')}
  ${(props) => (props.align ? `items-${props.align}` : 'items-start')}
  ${(props) => (props.justify ? `justify-${props.justify}` : 'justify-start')}
  ${(props) => (props.width ? `w-${props.width}` : 'w-full')}
  ${(props) => (props.py ? `py-${props.py}` : '')}
  ${(props) => (props.px ? `px-${props.px}` : '')}
  ${(props) => (props.position ? props.position : 'relative')}
  ${(props) => props.wrap && 'flex-wrap'}
`;
