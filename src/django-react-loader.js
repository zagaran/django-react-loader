const path = require('path')

function createAppendix(name) {
  return (
    "\n\
    import { render } from 'react-dom'                                    \n\
    if (window.reactComponents === undefined) {                           \n\
      window.reactComponents = {}                                         \n\
    }                                                                     \n\
    window.reactComponents." + name + " = (function() {                   \n\
    let _args = {}                                                        \n\
                                                                          \n\
    return {                                                              \n\
      init: function (Args) {                                             \n\
        _args = Args                                                      \n\
      },                                                                  \n\
      render: function () {                                               \n\
        const  { id, ...props } = JSON.parse(_args)                       \n\
        render(<" + name + " {...props}/>, document.getElementById(id))   \n\
      }                                                                   \n\
    }                                                                     \n\
  }())"
  )
}

module.exports = function(source) {
  // If the module being loaded matches a react component entrypoint, then modify the bundle to 'self-register'

  const issuing_module_path = path.relative(this.rootContext, this.resourcePath)
  const entry_paths = Object.values(this.query.entries).map((x) => path.join(x))

  if (entry_paths.includes(issuing_module_path)) {

    // Get the filename (without the extension)
    const component_name = issuing_module_path.split('/').pop().replace(/\.[^/.]+$/, "")
    console.log('Loaded Component: ', component_name)
    return source.concat(createAppendix(component_name));
  } else {
    return source
  }

}