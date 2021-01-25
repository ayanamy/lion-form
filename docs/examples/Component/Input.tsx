import React from 'react';

export default props => {
  const { value = '', onChange, ...restProps } = props;
  return <input {...restProps} value={value} onChange={onChange} />;
};
