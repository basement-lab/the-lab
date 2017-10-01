
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default () => (
  <div>
    <Input placeholder="@mxstbr" type="text" />
    <Input defaultValue="@geelen" type="text" />
  </div>
);

