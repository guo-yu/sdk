import swig from 'swig'

export default (route, locals) => {
  return swig.render(route, {
    locals
  })
}
