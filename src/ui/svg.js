function folderIcon (className) {
  return '<svg ' + (className && 'class="' + className + '"') + ' width="10" height="8" viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg"><path d="M4 1L3 0H.495C.215 0 0 .226 0 .505v6.992C0 7.767.228 8 .51 8h8.98c.282 0 .51-.225.51-.503V1.503C10 1.233 9.772 1 9.49 1H4z" fill="#000" fill-rule="evenodd"/></svg>'
}

function browserExpandIcon (className) {
  return '<svg ' + (className && 'class="' + className + '"') + ' width="20" height="13" viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg"><path d="M9 0h1v13H9V0zM2 2h5v1H2V2zM0 2h1v1H0V2zm2 2h3v1H2V4zm0 2h5v1H2V6zM0 6h1v1H0V6zm2 2h4v1H2V8zm0 2h3v1H2v-1zm10.8-4v1h5.293l-1.207 1.207.707.707L20 6.5l-2.407-2.414-.707.707L18.093 6H12.8z" fill="#000" fill-rule="evenodd"/></svg>'
}

function browserCollapseIcon (className) {
  return '<svg ' + (className && 'class="' + className + '"') + ' width="20" height="13" viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg"><path d="M9 0h1v13H9V0zM2 2h5v1H2V2zM0 2h1v1H0V2zm2 2h3v1H2V4zm0 2h5v1H2V6zM0 6h1v1H0V6zm2 2h4v1H2V8zm0 2h3v1H2v-1zm18-4v1h-5.293l1.207 1.207-.707.707L12.8 6.5l2.407-2.414.707.707L14.707 6H20z" fill="#000" fill-rule="evenodd"/></svg>'
}

function squiggleIcon (className) {
  return '<svg ' + (className && 'class="' + className + '"') + ' width="26" height="6" viewBox="0 0 26 6" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 5.727c-2.033 0-3.064-1.29-3.923-2.32-.86-1.06-1.432-1.69-2.577-1.69s-1.747.63-2.577 1.69c-.83 1.03-1.89 2.32-3.923 2.32-2.033 0-3.064-1.29-3.923-2.32-.86-1.06-1.432-1.69-2.577-1.69V0c2.033 0 3.064 1.29 3.923 2.32.86 1.06 1.432 1.69 2.577 1.69s1.747-.63 2.577-1.69C9.907 1.29 10.967 0 13 0c2.033 0 3.064 1.29 3.923 2.32.86 1.06 1.432 1.69 2.577 1.69s1.747-.63 2.577-1.69C22.907 1.29 23.967 0 26 0v1.718c-1.145 0-1.747.63-2.577 1.69-.83 1.03-1.89 2.32-3.923 2.32z" fill="#000" fill-rule="evenodd"/></svg>'
}


export {folderIcon, browserExpandIcon, browserCollapseIcon, squiggleIcon}
