import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'


import React from 'react'
import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'

BraftEditor.use(
    CodeHighlighter({
  includeEditors: ['myEditor'],
        syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    }, {
      name: 'HTML',
      syntax: 'html'
    }, {
      name: 'CSS',
      syntax: 'css'
    }, {
      name: 'Python',
      syntax: 'python',
    }, {
      name: 'PHP',
      syntax: 'php'
    }
  ]
}))

export default class CodeHighlighterDemo extends React.Component {

  render () {

    return (
      <div className="editor-container">
        <BraftEditor id="myEditor"/>
      </div>
    )

  }

}