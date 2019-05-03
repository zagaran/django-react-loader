function createAppendix(name) {
  return (
    "import { render } from 'react-dom'                                   \
    window.reactComponents." + name + " = (function() {                   \
    let _args = {}                                                        \
                                                                          \
    return {                                                              \
      init: function (Args) {                                             \
        _args = Args                                                      \
      },                                                                  \
      render: function () {                                               \
        const  { id, ...props } = JSON.parse(_args)                       \
        render(<" + name + " {...props}/>, document.getElementById(id))   \
      }                                                                   \
    }                                                                     \
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
