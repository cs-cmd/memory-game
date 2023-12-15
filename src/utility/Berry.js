export default function makeBerryObject(berryName, berryImageLink, berryId) {
  return {
    name: berryName,
    img_src: berryImageLink,
    uuid: berryId,
  }
}