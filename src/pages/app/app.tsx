import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';

export default function App() {
  return (
    <Sidebar onSidebarItemClicked={name => console.log(name)} />
  );
}
