import React, {Component} from "react"
import {cloneDeep} from "lodash"
import {squiggleIcon, folderIcon, browserCollapseIcon} from './svg'

export default class Nav extends Component {
  spaceCamelCase (title) {
    return title.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
  }

  renderSection (tree, components, path) {
    const fullPath = '/' + path.join('/')
    const links = components.map((c) => {
      const route = fullPath + '/' + c
      const fragments = c.split('/')
      const undupedFragments = fragments.length == 1
        ? fragments
        : fragments.filter((frag) => {
            return !fragments.every((f) => f.indexOf(frag) != -1)
          })

      const pagedVariations = Object.keys(tree[c])
                                    .filter((k) => k !== "_component")

      const variationLinks = pagedVariations.map((page) => {
        return rj`
          li.ComponentServerNav__pageLi(key=page)
            a.ComponentServerNav__pageLink(href=route + '/' + page)
              = this.spaceCamelCase(page)
        `
      })

      return rj`
        li.ComponentServerNav__sectionLi(key=c)
          a.ComponentServerNav__sectionLink(href=route)
            = undupedFragments.join('/')
          if variationLinks.length > 0
            ul.ComponentServerNav__sectionLinkPages
              = variationLinks
      `
    })

    return rj`
      section.ComponentServerNav__section(key=fullPath)
        h2.ComponentServerNav__sectionHeader
          != folderIcon("ComponentServerNav__sectionIcon") + ' ' + path.join('/')
        ul.ComponentServerNav__sectionLinks= links
    `
  }

  delveTree (sections, tree, path) {
    const treeKeys = Object.keys(tree).filter((k) => k !== "_directory")
    const directories = treeKeys.filter((k) => tree[k]._directory)
    const components = treeKeys.filter((k) => tree[k]._component)

    const sectionsNext = components.length > 0
      ? sections.concat(this.renderSection(tree, components, path))
      : sections

    return directories.reduce((acc, dir) => {
      return this.delveTree(acc, tree[dir], path.concat([dir]))
    }, sectionsNext)
  }

  flattenTree (wholeTree) {
    const checkLeafFlat = (leaf) => {
      if (Object.keys(leaf).length > 2) {
        const keys = Object.keys(leaf).filter((lk) => {
          return lk !== "_directory" && lk !== "_component"
        })

        const areVariations = keys.every((k) => leaf[k]._pagedVariation)

        if (leaf._component && areVariations) {
          return true;
        }
      }

      if (Object.keys(leaf).length <= 2) {
        const key = Object.keys(leaf).filter((lk) => {
          return lk !== "_directory" && lk !== "_component"
        })[0]
        if (leaf._directory) {
          return checkLeafFlat(leaf[key])
        } else {
          return true
        }
      } else {
        return false
      }
    }

    const flattenLeaf = (path, leaf) => {
      const key = Object.keys(leaf).filter((lk) => {
        return lk !== "_directory" && lk !== "_component"
      })[0]

      if (leaf._directory) {
        return flattenLeaf(path.concat([key]), leaf[key])
      } else {
        return [path, leaf]
      }
    }

    const flattenTree = (tree, base) => {
      const newTree = {}

      Object.keys(tree).forEach((key) => {
        if (key == "_directory" || key == "_component") {
          newTree[key] = true
          return
        }

        const leaf = tree[key]

        if (checkLeafFlat(leaf) && !base) {
          const [path, end] = flattenLeaf([key], leaf)
          newTree[path.join('/')] = end
        } else {
          newTree[key] = flattenTree(leaf)
        }
      })

      return newTree
    };

    return flattenTree(wholeTree, true)
  }

  render () {
    const {tree} = this.props
    const flatTree = this.flattenTree(cloneDeep(tree))
    const sections = this.delveTree([], flatTree, [])

    return rj`
      nav.ComponentServerNav
        header.ComponentServerNav__header
          span!= squiggleIcon('ComponentServerNav__headerIcon')
          span.ComponentServerNav__headerTitle Component Library
          a.ComponentServerNav__testModeLink(href="?test")
            != browserCollapseIcon()
        main.ComponentServerNav__bd
          = sections
    `
  }
}
