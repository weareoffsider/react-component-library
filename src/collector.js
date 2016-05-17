import glob from "glob"
import path from "path"


const attachFragments = (tree, fragments, pages = []) => {
  const frag = fragments[0]

  if (fragments.length > 1) {
    tree[frag] = attachFragments(
      tree[frag] || {_directory: true}, fragments.slice(1), pages
    )
    return tree
  } else {
    tree[frag] = {_component: true}
    if (pages.length > 1) {
      pages.forEach((page) => { tree[frag][page] = {_pagedVariation: true} })
    }

    return tree
  }
}

export default function collectComponents (base, matcher, testGetter, baseDir, cb) {
  glob(matcher, {
    cwd: base,
  }, (er, files) => {
    const pathList = files

    const fullTree = files.reduce((tree, componentPath) => {
      const mod = require(baseDir + '/' + componentPath)
      const component = mod.default ? mod.default : mod
      const testData = testGetter(component, baseDir + '/' + componentPath);

      const pages = testData.pagedVariations
        ? Object.keys(testData).filter((key) => key !== 'pagedVariations')
        : []

      const fragments = componentPath.split(path.sep)
      return attachFragments(tree, fragments, pages)
    }, {})

    cb({ pathList, fullTree, })
  })
}
