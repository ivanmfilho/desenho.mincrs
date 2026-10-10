import familyPhoto from '@/assets/famila-capsula-7e994.jpg'

export default function ResponsiveFamilyPhoto() {
  return (
    <img
      src={familyPhoto}
      alt="Família reunida em casa com a Cápsula do Tempo Minc."
      width="1536"
      height="864"
      loading="lazy"
      decoding="async"
    />
  )
}
