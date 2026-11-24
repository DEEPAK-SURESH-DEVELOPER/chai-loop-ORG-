import sourceMenu from './chaiLoopMenuData.json'

export const menuCategories = [
  { id: 'popular', label: 'Popular' },
  ...sourceMenu.categories.map(({ id, name }) => ({ id, label: name })),
  { id: 'combos', label: 'Combos' },
]

const categoryTiles = {
  wraps: 0, burgers: 1, loaded_fries: 2, momos: 3, starters: 4, juices: 5, mojitos: 6,
  bubble_tea: 7, shakes: 8, avil_milk: 9, falooda: 10, tea: 11, salads: 12, biryani: 13, other_drinks: 14, combos: 15,
}

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const addTile = (item, categoryId, extra = {}) => ({
  ...item, id: extra.id ?? slug(item.name), category: categoryId, imageCell: categoryTiles[categoryId], ...extra,
})

export const menuItems = [
  ...sourceMenu.categories.flatMap((category) => category.items.map((item) => addTile(item, category.id))),
  ...sourceMenu.combos.map((combo) => addTile({
    name: combo.name, price: combo.price, description: `Includes ${combo.includes.join(' · ')}.`,
  }, 'combos', { id: `combo-${slug(combo.name)}`, comboGroup: combo.category })),
]

export const popularMenuItems = [
  'smashed-beef-burger', 'chai-loop-special-loaded-fries', 'schezwan-momos',
  'chailoop-special-wrap', 'combo-2-persons-combo',
]
