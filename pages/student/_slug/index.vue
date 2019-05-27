<template>
  <section class="container">
    <div class="columns">
      <div class="column is-full">
        <h1>
          {{ result.firstName }} {{ result.lastName }}
        </h1>
        <h5 v-if="result.website">Student website:
          <a :href="result.website" target="_blank">
            {{ result.website }}
          </a>
        </h5>
      </div>
      <div class="column is-full">
        <div class="galleryContainer">
          <div v-for="project in result.projects" class="thumbContainer">
            <nuxt-link :to="`/project/${project.slug.current}`" class="thumbLink">
              <base-image v-if="project.headerImage" :image="project.headerImage" class="thumbImage"/>
              <h3>{{ project.name }}</h3>
            </nuxt-link>
            <ul>
              <li v-for="author in project.authors" class="byLine">
                <nuxt-link :to="`/student/${author.slug.current}`">
                  <h5>{{ author.firstName }}</h5>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import sanityClient from '@/utils/sanityClient'
import BaseImage from '@/components/BaseImage'

export default {
  components: {
    BaseImage
  },
  async asyncData ({ params }) {
    const result = await sanityClient.fetch(`
      *[_type == "student" && slug.current==$slug]{
        _id,
        slug,
        firstName,
        lastName,
        website,
        "projects": *[_type == 'project' && references(^._id)]{
          ...,
          headerImage{..., asset->},
          authors[]->{...}
        }
      }[0]
    `, {
      slug: params.slug,
    }).catch(err => console.log(err))
    if (result) {
      console.log(result)
      return {
        result,
        title: result.firstName + ' ' + result.lastName,
        firstName: result.firstName,
        url: 'https://aho.design/student/' + result.slug.current
      }
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.firstName + ' is a student from the Oslo School of Architecture and Design' },

        { hid: 'ogTitle', property: 'og:title', content: this.title},
        { hid: 'ogUrl', property: 'og:url', content: this.url},
        { hid: 'ogDescription', property: 'og:description', content: this.firstName + ' is a student from the Oslo School of Architecture and Design'},
        { hid: 'twitterTitle', name: 'twitter:title', content: this.title },
        { hid: 'twitterDescription', name: 'twitter:description', content: this.firstName + ' is a student from the Oslo School of Architecture and Design' },
      ]
    }
  }
}
</script>

<style>
</style>
