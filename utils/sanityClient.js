import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'qj5g82aw',
  dataset: 'production',
  useCdn: true
})
