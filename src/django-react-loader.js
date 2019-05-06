function createAppendix(name) {
  return (
    "import { render } from 'react-dom'                                   \n\
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

export default function(source) {
  let name
  try {
    name = this._module.issuer.name
  } catch {
    name = 'Component'
  }

  return source.concat(createAppendix(name));
}
